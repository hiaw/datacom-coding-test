import { useEffect, useState, type ChangeEvent } from "react"
import type { Item, Order } from "./type/item"
import OrderDropDown from "./components/OrderDropDown"

const items: Item[] = [
  { id: 1, name: "Laptop", price: 999 },
  { id: 2, name: "Phone", price: 699 },
  { id: 3, name: "Headphones", price: 199 },
  { id: 4, name: "Tablet", price: 499 },
]

function App() {
  const [customerName, setCustomerName] = useState("")
  const [selectedItemId, setSelectedItemId] = useState(1)

  const [orders, setOrders] = useState<Order[]>([])

  useEffect(() => {
    const getOrder = async () => {
      const orderResponse = await fetch("http://localhost:3000/order")
      const orderJson = await orderResponse.json()
      if (orderJson) {
        setOrders(orderJson)
      }
    }

    const interval = setInterval(getOrder, 500)

    return () => clearInterval(interval)
  }, [])

  const onTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (setCustomerName) {
      const newValue = e.target?.value
      setCustomerName(newValue)
    }
  }

  const onSubmit = async () => {
    const selectedItem = items.find((item) => item.id === selectedItemId)

    if (!customerName || customerName.length <= 0) {
      console.error("Missing customer name")
      return
    }

    if (selectedItem) {
      const response = await fetch("http://localhost:3000/order", {
        method: "POST",
        body: JSON.stringify({
          ...selectedItem,
          customerName,
        }),
      })
      if (!response.ok) {
        console.error(response.body)
      }
    } else {
      console.error("Invalid item selected")
    }
  }

  return (
    <div className="bg-blue-100 min-h-screen place-items-center">
      <div className="max-w-lg bg-blue-200 min-h-screen w-full p-4">
        <h1 className="text-3xl font-bold">Item Order Form</h1>
        <div className="pt-4 pb-2">
          <label htmlFor="customerName">Customer Name: </label>
          <input
            className="bg-white outline-1 pl-2"
            onChange={onTextChange}
            id="customerName"
          />
        </div>
        <OrderDropDown items={items} setSelectedItemId={setSelectedItemId} />
        <button
          className="py-2 px-4 my-2 rounded-full bg-blue-950 text-white "
          onClick={onSubmit}
        >
          Submit
        </button>
        <h1 className="text-3xl font-bold pt-6">Orders</h1>
        <div>
          {orders.map((order) => (
            <div
              className="my-2"
              key={`${order.customerName}-${order.id}-${Math.random()}`}
            >
              {order.customerName}: {order.name} - ${order.price} (
              {order.status})
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default App
