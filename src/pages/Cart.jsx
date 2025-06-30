import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, increaseQuantity, decreaseQuantity } from "../state/cartSlice";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import cartmarket from "../img/cart.png";
import more from "../img/plus.png"
import min from "../img/minus.png"
import delet from "../img/delete.png"
import "../styles/Cart.css";

export default function Cart() {
  const { user } = useSelector(state => state.auth);
  const cart = useSelector(state => state.cart[user?.id] || []);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleRemoveFromCart = (movieId) => {
    dispatch(removeFromCart({ userId: user.id, movieId }));
  };

  const handleIncreaseQuantity = (movieId) => {
    dispatch(increaseQuantity({ userId: user.id, movieId }));
  };

  const handleDecreaseQuantity = (movieId) => {
    dispatch(decreaseQuantity({ userId: user.id, movieId }));
  };

  return (
    <div className="cart">
      <div className="cart-title">
        <img src={cartmarket} alt=" supermarket cart" />
        <h2>Carrito</h2>
      </div>
     
      <div className="cart-items">
        {cart.length === 0 ? (
          <p>No hay películas en el carrito.</p>
        ) : (
          <>
            {cart.map(item => (
              <div key={item.id} className="cart-item">
                <div className="item-info">
                  <img src={item.img} alt={item.title} width="100" className="item-thumbnail" />
                  <h3 className="film">{item.title}</h3>
                </div>
                <p className="quantity">Cantidad: {item.quantity} - $ {item.price} c/u</p>
                <div className="butons">
                  <img onClick={() => handleIncreaseQuantity(item.id)} src={more} alt="plus icon " />
                  <img onClick={() => handleDecreaseQuantity(item.id)} src={min} alt="minus icon " />
                  <img onClick={() => handleRemoveFromCart(item.id)} className="delete-icon" src={delet} alt="delete icon" />
                </div>

              </div>
            ))}
            <div className="total">Total: ${total.toFixed(2)}</div>
          </>
        )}

      </div>
        {cart.length > 0 && (
          <button
            className="btn-checkout"
            onClick={() => {
              toast.success("Ya es casi tuyo...");
              navigate("/checkout");
          }}> Finalizar compra </button>
        )}
      </div>
  );
}