import { useDispatch } from "react-redux";
import { ItemsList } from "./features/items/ItemsList";
import { ShoppingCart } from "./features/shopping-cart/ShoppingCart";
import { useCallback } from "react";
import { reset } from "./app/actions";
import { addItem } from "./features/items/itemsSlice";

export default function App() {
  const dispatch = useDispatch();

  const handleReset = useCallback(() => dispatch(reset()), [dispatch]);
  const handleAdd = useCallback(
    () => dispatch(addItem({ name: "Something Else", price: 600 })),
    [dispatch]
  );

  return (
    <>
      <h1>App</h1>
      <button onClick={handleReset}>reset</button>
      <button onClick={handleAdd}>add</button>
      <div className="App">
        <ItemsList />
        <ShoppingCart />
      </div>
    </>
  );
}
