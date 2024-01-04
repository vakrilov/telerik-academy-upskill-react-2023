import { useDispatch } from "react-redux";
import { ItemsList } from "./features/items/ItemsList";
import { ShoppingCart } from "./features/shopping-cart/ShoppingCart";
import { useCallback, useState } from "react";
import { fetchItemsFromAPI } from "./features/items/itemsSlice";
import { reset } from "./app/actions";

export default function App() {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);

  const handleReset = useCallback(() => dispatch(reset()), [dispatch]);
  const handleAdd = useCallback(async () => {
    await dispatch(fetchItemsFromAPI(page));
    setPage((p) => p + 1);
  }, [page, dispatch]);

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
