import { useDispatch, useSelector } from "react-redux";
import {
  addItemToCart,
  removeItemFromCart,
} from "../shopping-cart/shoppingCartSlice";

export const ItemsList = () => {
  const items = useSelector((s) => s.items);

  return (
    <main className="panel">
      <h3>Items List</h3>
      <div className="panel items-list">
        {items.map(({ id }) => (
          <Item key={id} id={id} />
        ))}
      </div>
    </main>
  );
};

const Item = ({ id }) => {
  const dispatch = useDispatch();

  const item = useSelector((s) => s.items.find((item) => item.id === id));
  const isItemInCart = useSelector((s) => !!s.cart[id]);

  return (
    <div className="item">
      <button
        disabled={!isItemInCart}
        onClick={() => dispatch(removeItemFromCart(item))}
      >
        -
      </button>
      {item.name}
      <button onClick={() => dispatch(addItemToCart(item))}>+</button>
    </div>
  );
};

// const Button = ({ children, onClick, isLoading, disabled }) => ()
