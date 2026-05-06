import { type Product } from '@/types'

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Remera Oversize',
    description: 'Corte amplio, tela premium 100% algodón.',
    price: 18500,
    category: 'remeras',
    images: [],
    variants: [
      { id: 'v1', productId: '1', size: 'S', stock: 3 },
      { id: 'v2', productId: '1', size: 'M', stock: 5 },
      { id: 'v3', productId: '1', size: 'L', stock: 2 },
    ],
  },
  {
    id: '2',
    name: 'Buzo Canguro',
    description: 'Frisa interior, bolsillo central.',
    price: 32000,
    category: 'buzos',
    images: [],
    variants: [
      { id: 'v4', productId: '2', size: 'M', stock: 4 },
      { id: 'v5', productId: '2', size: 'L', stock: 6 },
      { id: 'v6', productId: '2', size: 'XL', stock: 1 },
    ],
  },
  {
    id: '3',
    name: 'Pantalón Cargo',
    description: 'Fit relajado, múltiples bolsillos.',
    price: 27000,
    category: 'pantalones',
    images: [],
    variants: [
      { id: 'v7', productId: '3', size: 'S', stock: 2 },
      { id: 'v8', productId: '3', size: 'M', stock: 3 },
    ],
  },
  {
    id: '4',
    name: 'Campera Técnica',
    description: 'Impermeable liviana, capucha desmontable.',
    price: 54000,
    category: 'camperas',
    images: [],
    variants: [
      { id: 'v9',  productId: '4', size: 'M',  stock: 2 },
      { id: 'v10', productId: '4', size: 'L',  stock: 3 },
      { id: 'v11', productId: '4', size: 'XL', stock: 4 },
    ],
  },
  {
    id: '5',
    name: 'Short Deportivo',
    description: 'Tela liviana con cintura elástica.',
    price: 14000,
    category: 'shorts',
    images: [],
    variants: [
      { id: 'v12', productId: '5', size: 'S', stock: 5 },
      { id: 'v13', productId: '5', size: 'M', stock: 7 },
    ],
  },
  {
    id: '6',
    name: 'Camiseta Lino',
    description: 'Tela natural, ideal para el calor.',
    price: 21000,
    category: 'remeras',
    images: [],
    variants: [
      { id: 'v14', productId: '6', size: 'S', stock: 3 },
      { id: 'v15', productId: '6', size: 'M', stock: 4 },
      { id: 'v16', productId: '6', size: 'L', stock: 2 },
    ],
  },
]
