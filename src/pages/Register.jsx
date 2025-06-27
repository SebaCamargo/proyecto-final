import { useState } from 'react';
import { useNavigate, Link } from 'react-router';
import { useSelector } from "react-redux";
import { toast } from 'react-toastify';
import axios from 'axios';
import "../styles/Register.css"

export default function Register() {
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token); // token desde redux

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    address: '',
    phone: '',
    email: '',
    password: '',
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await axios.post(
        'https://ha-videoclub-api-g1.vercel.app/users',
        {
          firstname: formData.firstName,
          lastname: formData.lastName,
          address: formData.address,
          phone: formData.phone,
          email: formData.email,
          password: formData.password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("¡Gracias por registrarte!");
      navigate('/login');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='container-register' id='registerContainer'>
      <div className='form-register'>
        <h1>Registrarse</h1>

        <div id='registerAlert' className='alert alert-error hidden'></div>

        <form id='registerForm' onSubmit={handleSubmit}>
          <div className='register-group'>
            <label forhtml='firstName'>Nombre</label>
            <input
              type='text'
              id='firstName'
              name='firstName'
              placeholder='María'
              value={formData.firstName}
              onInput={(e) =>
                setFormData({ ...formData, firstName: e.target.value })
              }
              required
            />
          </div>

          <div className='register-group'>
            <label forhtml='lastName'>Apellido</label>
            <input
              type='text'
              id='lastName'
              name='lastName'
              placeholder='Ortiz'
              value={formData.lastName}
              onInput={(e) =>
                setFormData({ ...formData, lastName: e.target.value })
              }
              required
            />
          </div>

          <div className='register-group alignment'>
            <label forhtml='address'>Dirección</label>
            <div className='input-register'>
              <input
                type='text'
                id='address'
                name='address'
                placeholder='Yi 2266'
                value={formData.address}
                onInput={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
                required
              />
            </div>
          </div>

          <div className='register-group alignment'>
            <label forhtml='phone'>Teléfono</label>
            <div className='input-register'>
              <input
                type='tel'
                id='phone'
                name='phone'
                placeholder='099776655'
                value={formData.phone}
                onInput={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                required
              />
            </div>
          </div>

          <div className='register-group alignment'>
            <label forhtml='registerEmail'>Email</label>
            <div className='input-register'>
              <input
                type='email'
                id='registerEmail'
                name='email'
                placeholder='algo@server.com'
                value={formData.email}
                onInput={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
              />
            </div>
          </div>

          <div className='register-group alignment'>
            <label forhtml='registerPassword'>Contraseña</label>
            <div className='input-register'>
              <input
                type='password'
                id='registerPassword'
                name='password'
                placeholder='••••••••'
                value={formData.password}
                onInput={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                required
              />
            </div>
          </div>

          <button type='submit' className='btn-create' id='registerBtn'>
            <span id='registerBtnText'>Crear Cuenta</span>
          </button>
        </form>

        <div className='switch-register'>
          <p>
            ¿Ya tienes cuenta? <Link to='/login'>Inicia sesión aquí</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
