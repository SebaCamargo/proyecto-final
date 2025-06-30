import { useSelector, useDispatch } from "react-redux";
import { addOrder } from "../state/ordersSlice";
import { clearCart } from "../state/cartSlice"; 
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import "../styles/Checkout.css";

export default function Checkout() {
  const { user } = useSelector((state) => state.auth);
  const cart = useSelector((state) => state.cart[user?.id] || []);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleFinish = () => {
    const newOrder = {
      id: Date.now(),
      items: cart,
      total,
      date: new Date().toLocaleString(),
    };

    dispatch(addOrder({ 
      userId: user.id, 
      order: newOrder 
    }));

    dispatch(clearCart({ userId: user.id })); 
    
    toast.success("¡Compra realizada con éxito!");
    navigate("/profile");
  };

  return (
    <div className="checkout">
      <h1>Resumen de la Compra</h1>
      <div className="container-order">
        <div className="user-info">
          <h2>Información del perfil</h2>

          <p> Nombre: </p>
          <p className="info-details"> {user.firstname} </p>

          <p> Apellido: </p>
          <p className="info-details"> {user.lastname} </p>
          
          <p> Teléfono: </p>
          <p className="info-details"> {user.phone}</p>

          <p> Dirección: </p>
          <p className="info-details"> {user.address || "No disponible"} </p>

          <p> Email: </p>
          <p className="info-details"> {user.email} </p>

        </div>

        <div className="order-info">
          <h2>Películas a comprar</h2>
          {cart.map((item) => (
            <div key={item.id} className="order-item">
              <img src={item.img} alt={item.title} />
              <div className="order-details">
                <p>{item.title}</p>
                <p>{item.quantity} unidad(es) </p>
                <p> $ {item.price} c/u</p>
              </div>
            </div>
          ))}

          <h3>Total a pagar: ${total.toFixed(2)}</h3>
        </div>
      </div>
      <button onClick={handleFinish} className="btn-finish"> Finalizar transacción </button>
    </div>
  );
}