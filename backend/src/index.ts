import { Hono } from "hono"
import { HTTPException } from "hono/http-exception"

const app = new Hono()

interface Order {
  status: "Pending" | "Processing" | "Completed"
  id: number
  name: string
  price: number
}

const orders: Order[] = []

app.get("/order", (c) => {
  return c.json(orders)
})

app.post("/order", async (c) => {
  const order: Order = await c.req.json()
  if (order && order.id && order.name && order.price) {
    order.status = "Pending"
    orders.push(order)
  } else {
    throw new HTTPException(401, { message: "Invalid order" })
  }

  return c.json(order)
})

export default app
