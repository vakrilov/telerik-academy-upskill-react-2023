import { useDispatch, useSelector } from "react-redux";
import {
  addItemToCart,
  removeItemFromCart,
} from "../shopping-cart/shoppingCartSlice";

export const ItemsList = () => {
  const dispatch = useDispatch();
  const items = useSelector((s) => s.items);
  const cart = useSelector((s) => s.cart);

  return (
    <main className="panel">
      <h3>Items List</h3>
      <div className="panel items-list">
        {items.map((item) => {
          const disableRemove = !cart[item.id];
          return (
            <div className="item" key={item.id}>
              <button
                disabled={disableRemove}
                onClick={() => dispatch(removeItemFromCart(item))}
              >
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
