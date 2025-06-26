import React from "react";
import "./Pages.css";

function About() {
  return (
    <div className="about">
      <h1>Sobre este proyecto</h1>
      <p>
        En este proyecto desarrollé una aplicación web de videoclub utilizando
        React como biblioteca principal para la interfaz de usuario. La
        aplicación permite a los usuarios explorar películas, agregarlas a un
        carrito, registrarse, iniciar sesión, editar su perfil y realizar
        compras simuladas a través de un proceso de checkout.
      </p>

      <p>
        Para la gestión del estado global utilicé Redux Toolkit, y además
        integré redux-persist para mantener la sesión y el estado del carrito
        incluso si el usuario recarga la página. La autenticación se maneja
        mediante un login que devuelve un token, el cual se guarda y se utiliza
        en las cabeceras de las peticiones con Axios para acceder a rutas
        protegidas de una API.
      </p>

      <p>
        Implementé un sistema de carrito de compras donde el usuario puede
        agregar películas, modificar la cantidad, eliminarlas y ver el total en
        tiempo real. Al finalizar la compra, se genera una orden que se guarda
        en el historial del usuario y se puede consultar desde su perfil.
      </p>

      <p>
        Para la navegación entre páginas utilicé React Router, y para mejorar la
        experiencia del usuario usé React Toastify, mostrando mensajes de éxito
        al agregar películas al carrito, al editar el perfil, o al realizar una
        compra.
      </p>

      <p>
        Finalmente, cuidé el aspecto visual con estilos personalizados en CSS y
        aseguré que la aplicación sea intuitiva y funcional tanto para
        navegación como para interacción con el carrito, el perfil del usuario y
        las órdenes realizadas.
      </p>

      <p>Creado por : Sebastian Camargo</p>
    </div>
  );
}

export default About;
