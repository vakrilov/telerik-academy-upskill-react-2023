import { useSelector } from "react-redux";

export const ShoppingCart = () => {
  console.log("ShoppingCart rendered");
  const cart = useSelector((s) => s.cart);
  const items = useSelector((s) => s.items);

  return (
    <div className="panel">
      <h3>Cart</h3>
      <div className="panel">
        {Object.keys(cart).map((id) => {
          const item = items.find((item) => item.id === id);
          if (item) {
            return (
              <div className="cart-item" key={item.id}>
                {cart[id]} x {item.name}
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};
