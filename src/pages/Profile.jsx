import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import axios from "axios";
import { login } from "../state/authSlice";
import "../styles/Profile.css";

export default function Profile() {
  const { token, user } = useSelector((state) => state.auth);
  const orders = useSelector((state) => state.orders[user?.id] || []);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({});
  const [newPassword, setNewPassword] = useState("");
  const [showPasswordField, setShowPasswordField] = useState(false);

  useEffect(() => {
    if (!token || !user) {
      navigate("/login");
      return;
    }

    axios
      .get(`https://ha-videoclub-api-g1.vercel.app/users/${user.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setUserData(res.data);
        setEditedData(res.data);
      })
      .catch((err) => console.error("Error al obtener el perfil:", err));
  }, [token, user, navigate]);

  const handleChange = (e) => {
    setEditedData({
      ...editedData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    try {
      const dataToSend = { ...editedData };
      if (newPassword.trim() !== "") {
        dataToSend.password = newPassword;
      }

      await axios.patch(
        `https://ha-videoclub-api-g1.vercel.app/users/${user.id}`,
        dataToSend,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const updated = await axios.get(
        `https://ha-videoclub-api-g1.vercel.app/users/${user.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch(login({ token, user: updated.data }));
      setUserData(updated.data);
      setEditedData(updated.data);
      setNewPassword("");
      setShowPasswordField(false);
      setIsEditing(false);
      toast.success("Cambios realizados correctamente!");
    } catch (error) {
      console.error("Error al actualizar el perfil:", error);
      toast.error("Hubo un error al guardar los cambios");
    }
  };

  const handleCancel = () => {
    setEditedData(userData);
    setNewPassword("");
    setShowPasswordField(false);
    setIsEditing(false);
  };

  if (!userData) {
    return (
      <div className="profile-container">
        <h1>Cargando perfil...</h1>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <h1>Mi Perfil</h1>

      <div className="profile-info">
        <div className="name">
          <h2>Nombre</h2>
          {isEditing ? (
            <input
              name="firstname"
              value={editedData.firstname}
              onChange={handleChange}
              className="input-edit"
            />
          ) : (
            <p>{userData.firstname}</p>
          )}
        </div>

        <div className="lastName">
          <h2>Apellido</h2>
          {isEditing ? (
            <input
              name="lastname"
              value={editedData.lastname}
              onChange={handleChange}
              className="input-edit"
            />
          ) : (
            <p>{userData.lastname}</p>
          )}
        </div>

        <div className="address">
          <h2>Dirección</h2>
          {isEditing ? (
            <input
              name="address"
              value={editedData.address || ""}
              onChange={handleChange}
              className="input-edit"
            />
          ) : (
            <p>{userData.address || "No disponible"}</p>
          )}
        </div>

        <div className="email">
          <h2>Correo electrónico</h2>
          {isEditing ? (
            <input
              name="email"
              value={editedData.email}
              onChange={handleChange}
              className="input-edit"
            />
          ) : (
            <p>{userData.email}</p>
          )}
        </div>

        <div className="phone">
          <h2>Teléfono</h2>
          {isEditing ? (
            <input
              name="phone"
              value={editedData.phone || ""}
              onChange={handleChange}
              className="input-edit"
            />
          ) : (
            <p>{userData.phone || "No disponible"}</p>
          )}
        </div>

        <div className="btn-password">
          {isEditing && (
            <>
              {showPasswordField && (
                <div className="password">
                  <h2>Nueva Contraseña</h2>
                  <input
                    type="password"
                    name="password"
                    value={newPassword}
                    className="input-edit"
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
              )}

              <button
                className="btn-password-toggle"
                type="button"
                onClick={() => {
                  setShowPasswordField(!showPasswordField);
                  if (showPasswordField) setNewPassword("");
                }}
              >
                {showPasswordField ? "No cambiar contraseña" : "Cambiar contraseña"}
              </button>
            </>
          )}
        </div>
      </div>

      <div className="container-btn">
        {isEditing ? (
          <>
            <button className="btn-save" onClick={handleSave}> Guardar cambios </button>
            <button className="btn-cancel" onClick={handleCancel}> Cancelar </button>
          </>
        ) : (
          <button className="btn-save" onClick={() => setIsEditing(true)}> Editar perfil </button>
        )}
      </div>

      <div className="orders-section">
        <h2>Mis Órdenes</h2>
        {orders.length === 0 ? (
          <p>No tienes órdenes registradas.</p>
        ) : (
          orders.map((order, index) => (
            <div key={order.id} className="order-item">
              <p className="order-title-data">
                <strong>Orden #{index + 1}</strong> - Fecha: {order.date}
              </p>
              <h3>Items</h3>
              {order.items.map((item) => (
                <ul className="order-list" key={item.id}>
                  <li> {item.title} </li>
                  <li> {item.quantity} unidad(es) </li>
                  <li> $ {item.price} c/u </li>
                </ul>
              ))}
              <p>
                <strong>Total:</strong> ${order.total.toFixed(2)}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
