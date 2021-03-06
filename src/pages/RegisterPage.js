import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../auth/AuthContext';
import Swal from 'sweetalert2';

export const RegisterPage = () => {

    const { register } = useContext( AuthContext );

    //Estado para los valores del form
    const [ form, setForm ] = useState({
        name:'',
        email:'',
        password:'',

    });

    //Funcion para poder escribir en los imput
    const onChange = ({ target }) => {
        const { name, value} = target;

        setForm({
            ...form,
            [name]: value
        });
    }

    const onSubmit = async e => {
        e.preventDefault();
        
        //Llamada al backend
        const { name, email, password } = form;
        
        const msg = await register( name, email, password );

        if( msg !== true ){
            Swal.fire('Error', msg ,'error');
        }

    }

    //Funcion que bloquea o no el boton de ingresar
    const allOk = () => {
        return ( !form.email || !form.password || !form.name ) ? true : false;
    }



    return (
        <form 
            className="login100-form validate-form flex-sb flex-w"
            onSubmit={ onSubmit }
        >
            <span className="login100-form-title mb-3">
                Chatsito - Registrar
            </span>

            <div className="wrap-input100 validate-input mb-3">
                <input
                    className="input100"
                    type="text"
                    name="name"
                    placeholder="Nombre"
                    value={ form.name}
                    onChange={ onChange }
                />
                <span className="focus-input100"></span>
            </div>

            
            <div className="wrap-input100 validate-input mb-3">
                <input
                    className="input100"
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={ form.email}
                    onChange={ onChange }
                />
                <span className="focus-input100"></span>
            </div>
            
            
            <div className="wrap-input100 validate-input mb-3">
                <input
                    className="input100"
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={ form.password}
                    onChange={ onChange }
                />
                <span className="focus-input100"></span>
            </div>
            
            <div className="row mb-3">
                <div className="col text-right">
                    <Link to="/auth/login" className="txt1">
                        Ya tienes cuenta?
                    </Link>
                </div>
            </div>

            <div className="container-login100-form-btn m-t-17">
                <button 
                    className="login100-form-btn"
                    type="submit"
                    disabled={ allOk() }
                >
                    Crear cuenta
                </button>
            </div>

        </form>
    )
}
