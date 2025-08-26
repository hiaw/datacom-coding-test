export interface Item {
  id: number
  name: string
  price: number
}

export interface Order extends Item {
  customerName: string
  status: string
}
