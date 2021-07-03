import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../auth/AuthContext';
import Swal from 'sweetalert2';

export const LoginPage = () => {

    const { login } = useContext( AuthContext );

    //Estado para los valores del form
    const [ form, setForm ] = useState({
        email:'correo@correo.com',
        password:'123456',
        rememberme: false
    });

    useEffect(() => {
        const email = localStorage.getItem('email');
        if ( email ){
            setForm( form => ({
                ...form,
                rememberme:true,
                email
            }))
        }
    }, [])

    //Funcion para poder escribir en los imput
    const onChange = ({ target }) => {
        const { name, value} = target;

        setForm({
            ...form,
            [name]: value
        });
    }
    //Setea el check del remember me
    const toggleCheck = () => {
        setForm({
            ...form,
            rememberme: !form.rememberme
        })
    }

    const onSubmit = async e => {
        e.preventDefault();

        //Guardar o borrar datos del storage si esta activado o no el remember me
        ( form.rememberme )
            ?localStorage.setItem('email',form.email)
            :localStorage.removeItem('email')
        
        //Llamada al backend
        const { email, password } = form;
        
        const ok = await login( email, password );

        if( !ok ){
            Swal.fire('Error','Verifique usuario y contraseña','error');
        }

    }

    //Funcion que bloquea o no el boton de ingresar
    const allOk = () => {
        return ( !form.email || !form.password ) ? true : false;
    }




    return (
        <form 
            className="login100-form validate-form flex-sb flex-w"
            onSubmit={ onSubmit }
        >
            <span className="login100-form-title mb-3">
                Chatsito - Ingresar
            </span>
            
            <div className="wrap-input100 validate-input mb-3">
                <input
                    className="input100"
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={ form.email }
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
                    value={ form.password }
                    onChange={ onChange } 
                />
                <span className="focus-input100"></span>
            </div>
            
            <div className="row mb-3">
                <div 
                    className="col"
                    onClick={ () => toggleCheck() }
                >
                    <input
                        className="input-checkbox100"
                        id="ckb1"
                        type="checkbox"
                        name="rememberme"
                        checked={ form.rememberme }
                        readOnly
                    />
                    <label className="label-checkbox100">
                        Recordarme
                    </label>
                </div>

                <div className="col text-right">
                    <Link to="/auth/register" className="txt1">
                        Nueva cuenta?
                    </Link>
                </div>
            </div>

            <div className="container-login100-form-btn m-t-17">
                <button 
                    type="submit"
                    className="login100-form-btn"
                    disabled={ allOk() }
                >
                    Ingresar
                </button>
            </div>

		</form>
    )
}
