import React from "react";
import "../styles/About.css";

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
        Para la gestión global del estado, utilicé Redux Toolkit, estructurando
        diferentes slices para manejar la autenticación. Además, incorporé Redux
        Persist, lo que me permitió mantener el estado del store incluso después
        de que el usuario recargue la página. Gracias a esto, datos como la
        sesión activa, el contenido del carrito y las órdenes realizadas se
        conservan entre visitas.
      </p>

      <p>
        Las peticiones a la API y la gestión de datos del backend se manejan con
        Axios, incluyendo autenticación con token para acceder a rutas
        protegidas. Para la navegación utilicé React Router, lo que permitió
        implementar rutas privadas como el perfil del usuario y una pantalla de
        checkout detallada.
      </p>

      <p>
        El flujo de compra incluye la posibilidad de agregar películas al
        carrito, modificar la cantidad, eliminar productos, ver el total
        acumulado y confirmar la transacción. Al completar la compra, se genera
        una orden persistente que queda guardada y es visible desde el perfil
        del usuario.
      </p>

      <p>
        Además, usé React Toastify para mejorar la experiencia del usuario
        mostrando notificaciones en acciones clave, como agregar películas al
        carrito, actualizar datos del perfil o completar una compra con éxito.
      </p>

      <p>
        En conjunto, el proyecto ofrece una experiencia sólida de navegación,
        gestión de usuario y flujo de compra, con un manejo eficiente del estado
        y una estructura clara, pensada para escalar fácilmente y mantener la
        información crítica del usuario.
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
