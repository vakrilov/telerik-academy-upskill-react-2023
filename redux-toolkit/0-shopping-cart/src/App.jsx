import { Provider } from "react-redux";
import { store } from "./app/store";
import { ItemsList } from "./features/items/ItemsList";
import { ShoppingCart } from "./features/shopping-cart/ShoppingCart";

export default function App() {
  return (
    <Provider store={store}>
      <h1>App</h1>
      <div className="App">
        <ItemsList />
        <ShoppingCart />
      </div>
    </Provider>
  );
}
