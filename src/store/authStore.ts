import { create } from 'zustand'
import { supabase } from '@/services/supabase/client'
import { getProfile } from '@/services/supabase/auth'
import { type User } from '@/types'

interface AuthState {
  user: User | null
  loading: boolean
  setUser: (user: User | null) => void
  setLoading: (loading: boolean) => void
  init: () => () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: true,

  setUser: (user) => set({ user }),
  setLoading: (loading) => set({ loading }),

  init: () => {
    // Carga la sesión inicial
    supabase.auth.getSession().then(async ({ data }) => {
      if (data.session?.user) {
        const profile = await getProfile(data.session.user.id)
        set({
          user: {
            id: data.session.user.id,
            email: data.session.user.email!,
            name: profile?.name,
            role: profile?.role ?? 'customer',
          },
          loading: false,
        })
      } else {
        set({ user: null, loading: false })
      }
    })

    // Escucha cambios de sesión en tiempo real
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        const profile = await getProfile(session.user.id)
        set({
          user: {
            id: session.user.id,
            email: session.user.email!,
            name: profile?.name,
            role: profile?.role ?? 'customer',
          },
        })
      } else {
        set({ user: null })
      }
    })

    return () => subscription.unsubscribe()
  },
}))
