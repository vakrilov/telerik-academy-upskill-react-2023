import { useSelector } from "react-redux";

export const ShoppingCart = () => {
  console.log("ShoppingCart rendered");
  const cart = useSelector((s) => s.cart);
  const items = useSelector((s) => s.items);

  const total = Object.keys(cart).reduce((total, id) => {
    const item = items.find((item) => item.id === id);
    const quantity = cart[id];
    return total + item.price * quantity;
  }, 0);

  return (
    <div className="panel">
      <h3>Cart</h3>
      <div className="panel cart">
        {Object.keys(cart).map((id) => {
          const item = items.find((item) => item.id === id);
          const quantity = cart[id];
          if (item) {
            return (
              <div className="cart-item" key={item.id}>
                <span>
                  {quantity} x {item.name}
                </span>
                <span>${(item.price * quantity).toFixed(2)}</span>
              </div>
            );
          }
        })}

        <div key="total" className="cart-item total">
          <span>Total:</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};
