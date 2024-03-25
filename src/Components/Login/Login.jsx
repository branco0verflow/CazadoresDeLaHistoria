import { Button, Form, FloatingLabel } from 'react-bootstrap';
import React, { useState } from 'react';
import Cargando from '../Cargando/Cargando';
import './Login.css';
import { Link } from 'react-router-dom';

function Login() {
    
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cargando, setcargando] = useState(false);

    function onLogin() {
        setcargando(true);
        fetch("https://history-hunters-evening-api.onrender.com/users/login",
            {
                method: "POST",
                body: JSON.stringify({
                    email: email,
                    password: password
                }),
                headers: myHeaders
            })
            .then((response) => response.json())
            .then((result) => {
                if (result.status === 200) {
                    const data = result.data;
                    sessionStorage.setItem('id', data.user.id);
                    window.location.assign('/inicio');
                } else {
                    alert('Usuario no encontrado');
                }
                setcargando(false);
            })
            .catch((error) => {
                setcargando(false);
                console.error(error)
            });
    }

    return cargando ? (<Cargando />) :
        (
            <div className='login'>


                <FloatingLabel
                    controlId="floatingInput"
                    label="Correo electrónico"
                    className="mb-3"
                >
                    <Form.Control type="email" placeholder="Correo electrónico" onChange={(event) => setEmail(event.target.value)}/>
                </FloatingLabel>

                <Form.Text className="text-light">
                    Tus datos personales estan protegidos con nosotros.
                </Form.Text>

                <FloatingLabel controlId="floatingPassword" label="Contraseña">
                    <Form.Control type="password" placeholder="Contraseña" onChange={(event) => setPassword(event.target.value)}/>
                </FloatingLabel>


                
                    <Form.Label className="text-light">Si aún no tienes una cuenta </Form.Label><Link to={`/registrate`}> Registrate aquí </Link>

                    <div className='container' >
                        <Button className='button' variant="secondary" onClick={onLogin} type="submit">
                            Ingresar
                        </Button>
                    </div>
                
            </div>
        );
}

export default Login;