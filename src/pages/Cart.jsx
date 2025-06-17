import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, increaseQuantity, decreaseQuantity } from "../state/cartSlice";

export default function Cart() {
  const cart = useSelector(state => state.cart);
  const dispatch = useDispatch();

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="cart">
      <h2>Carrito</h2>
      {cart.length === 0 ? (
        <p>No hay películas en el carrito.</p>
      ) : (
        <>
          {cart.map(item => (
            <div key={item.id} className="cart-item">
                <strong>{item.title}</strong> - Cantidad: {item.quantity} - ${item.price} c/u
              <button onClick={() => dispatch(increaseQuantity(item.id))}>+</button>
              <button onClick={() => dispatch(decreaseQuantity(item.id))}>-</button>
              <button onClick={() => dispatch(removeFromCart(item.id))}>Eliminar</button>
            </div>
          ))}
          <div className="total">Total: ${total.toFixed(2)}</div>
        </>
      )}
    </div>
  );
}
