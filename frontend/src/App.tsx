import { useState, type ChangeEvent } from "react"
import "./App.css"
import type { Item } from "./type/item"
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
      console.log(response)
    } else {
      console.error("Invalid item selected")
    }
  }

  return (
    <>
      <div className="card">
        <label htmlFor="customerName">Customer Name: </label>
        <input onChange={onTextChange} id="customerName" />
      </div>
      <OrderDropDown items={items} setSelectedItemId={setSelectedItemId} />
      <button onClick={onSubmit}>Submit</button>
    </>
  )
}

export default App
