import {
  AppStateProvider,
  useAppActions,
  useAppState,
} from "./AppStateProvider";
import { Chat } from "./Chat";

export default function App() {
  return (
    <AppStateProvider>
      <h1>App</h1>
      <div className="App">
        <Chat />
        <MainContent />
        <ShoppingCart />
      </div>
    </AppStateProvider>
  );
}

const MainContent = () => {
  console.log("MainContent rendered");
  const { items } = useAppState();
  const { addItemToCart, removeItemFromCart } = useAppActions();

  return (
    <main className="panel">
      <h3>Main Content</h3>
      <div className="panel">
        {items.map((item) => {
          return (
            <div key={item.id}>
              <button onClick={() => removeItemFromCart(item)}>-</button>
              {item.name}
              <button onClick={() => addItemToCart(item)} >+</button>
            </div>
          );
        })}
      </div>
    </main>
  );
};

const ShoppingCart = () => {
  console.log("ShoppingCart rendered");

  const { cart } = useAppState();

  return (
    <div className="panel">
      <h3>Cart</h3>
      <div className="panel">
        Items: {cart.items}
        <br />
        Price: {cart.price}
      </div>
    </div>
  );
};
