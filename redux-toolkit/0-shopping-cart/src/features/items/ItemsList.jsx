import { useDispatch, useSelector } from "react-redux";
import { addItemToCart, removeItemFromCart } from "../shopping-cart/shoppingCartSlice";

export const ItemsList = () => {
  const dispatch = useDispatch();
  const items = useSelector(s => s.items);

  return (
    <main className="panel">
      <h3>Items List</h3>
      <div className="panel">
        {items.map((item) => {
          return (
            <div className="item" key={item.id}>
              <button onClick={() => dispatch(removeItemFromCart(item))}>
                -
              </button>
              {item.name}
              <button onClick={() => dispatch(addItemToCart(item))}>+</button>
            </div>
          );
        })}
      </div>
    </main>
  );
};
