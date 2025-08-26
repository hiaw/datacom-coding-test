import type { ChangeEvent } from "react"
import type { Item } from "../type/item"

function OrderDropDown({
  items,
  setSelectedItemId: setSelectedItem,
}: {
  items: Item[]
  setSelectedItemId: (id: number) => void
}) {
  const onSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    const id = parseInt(e.target.value)
    console.log({ id })
    if (id) setSelectedItem(id)
  }

  return (
    <div>
      <label htmlFor="items">
        Item:
        <select id="items" onChange={onSelect}>
          {items.map((item) => (
            <option value={item.id}>
              {item.name} - ${item.price}
            </option>
          ))}
        </select>
      </label>
    </div>
  )
}

export default OrderDropDown
