import { resetStore } from "./app/action";
import { ItemsList } from "./features/items/ItemsList";
import { addItem } from "./features/items/itemsSlice";
import { ShoppingCart } from "./features/shopping-cart/ShoppingCart";
import { useDispatch } from "react-redux";

export default function App() {
  const dispatch = useDispatch();

  const handleAdd = () =>
    dispatch(addItem({ name: "Awesome Keyboard", price: 150 }));

  const handleReset = () => dispatch(resetStore());

  return (
    <>
      <h1>App</h1>
      <button onClick={handleAdd}>Add Item</button>
      <button onClick={handleReset}>Reset</button>

      <div className="App">
        <ItemsList />
        <ShoppingCart />
      </div>
    </>
  );
}
