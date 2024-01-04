import { useState } from "react";
import { resetStore } from "./app/action";
import { ItemsList } from "./features/items/ItemsList";
import { getItems } from "./features/items/itemsSlice";
import { ShoppingCart } from "./features/shopping-cart/ShoppingCart";
import { useDispatch } from "react-redux";

export default function App() {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleAdd = async () => {
    setLoading(true);
    await dispatch(getItems(page));
    setLoading(false);
    setPage((page) => page + 1);
  };

  const handleReset = () => dispatch(resetStore());

  return (
    <>
      <h1>App</h1>
      <button disabled={loading} onClick={handleAdd}>Load Items</button>
      <button onClick={handleReset}>Reset</button>
      {loading && <p>Loading...</p>}
      <div className="App">
        <ItemsList />
        <ShoppingCart />
      </div>
    </>
  );
}
