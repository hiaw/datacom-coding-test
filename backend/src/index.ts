import { serve } from "@hono/node-server"
import { Hono } from "hono"
import { HTTPException } from "hono/http-exception"
import { cors } from "hono/cors"

interface Order {
  status: "Pending" | "Processing" | "Completed"
  id: number
  name: string
  price: number
  customerName: string
}

const orders: Order[] = []

const app = new Hono()

app.use("/order", cors())

app.get("/order", (c) => {
  return c.json(orders)
})

app.post("/order", async (c) => {
  const order: Order = await c.req.json()
  if (order && order.id && order.name && order.price && order.customerName) {
    order.status = "Pending"
    orders.push(order)
  } else {
    throw new HTTPException(401, { message: "Invalid order" })
  }

  setTimeout(() => {
    order.status = "Processing"

    setTimeout(() => {
      order.status = "Completed"
    }, 6000)
  }, 2000)

  return c.json(order)
})

serve(
  {
    fetch: app.fetch,
    port: 3000,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`)
  },
)
