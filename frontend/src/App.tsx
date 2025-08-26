import { useState, type ChangeEvent } from "react"
import "./App.css"

function App() {
  const [customerName, setCustomerName] = useState("")

  const onTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (setCustomerName) {
      const newValue = e.target?.value
      setCustomerName(newValue)
    }
  }

  const onSubmit = async () => {
    const response = await fetch("http://localhost:3000/order", {
      method: "POST",
      body: JSON.stringify({
        id: 1,
        name: "Laptop",
        price: 999,
        customerName,
      }),
    })

    console.log(response)
  }

  return (
    <>
      <div className="card">
        <label htmlFor="customerName">Customer Name: </label>
        <input onChange={onTextChange} id="customerName" />
      </div>
      <button onClick={onSubmit}>Submit</button>
    </>
  )
}

export default App
