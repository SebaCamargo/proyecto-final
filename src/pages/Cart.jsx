import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, increaseQuantity, decreaseQuantity } from "../state/cartSlice";
import cartmarket from "../img/cart.png";
import more from "../img/plus.png"
import min from "../img/minus.png"
import delet from "../img/delete.png"

export default function Cart() {
  const cart = useSelector(state => state.cart);
  const dispatch = useDispatch();

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

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
                {console.log("IMG:", item.img)}
                  <img src={item.img} alt={item.title} width="100" className="item-thumbnail" />
                  <h3 className="film">{item.title}</h3>
                </div>
                <p className="quantity">Cantidad: {item.quantity} - $ {item.price} c/u</p>
                <div className="butons">
                  <img onClick={() => dispatch(increaseQuantity(item.id))} src={more} alt="plus icon " />
                  <img onClick={() => dispatch(decreaseQuantity(item.id))} src={min} alt="minus icon " />
                  <img onClick={() => dispatch(removeFromCart(item.id))} className="delete-icon" src={delet} alt="delete icon" />
                </div>

              </div>
            ))}
            <div className="total">Total: ${total.toFixed(2)}</div>
          </>
        )}
      </div>
    </div>
  );
}
