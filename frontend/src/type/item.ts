export interface Item {
  id: number
  name: string
  price: number
}

export interface Order {
  customerName: string
  status: string
  orderId: string
  itemId: number
  name: string
  price: number
}
