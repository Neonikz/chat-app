import React, { useContext, useEffect } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Redirect,
  } from "react-router-dom";
import { ChatPage } from '../pages/ChatPage';
import { AuthRouter } from './AuthRouter';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Spinner } from 'react-bootstrap';
import { AuthContext } from '../auth/AuthContext';
import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';

export const AppRouter = () => {

    // Extraemos el context
    const {auth, checkToken} = useContext( AuthContext );
    const { checking, logged } = auth;
    //Verifica el token
    useEffect(() => {
        checkToken();
    }, [checkToken])

    //Condicion de pantalla de carga
    if( checking ){
        return (
            <div className="spinner">
                <h2>Cargando</h2>
                <Spinner animation="grow" variant="white" role="status" />
            </div>
        )
    }


    return (
        <Router>
            <div>
                <Switch>
                    <PublicRoute isAuthenticated={ logged } path="/auth" component={ AuthRouter } />
                    <PrivateRoute isAuthenticated={ logged } exact path="/" component={ ChatPage } />
                    <Redirect to="/" />
                </Switch>
            </div>
        </Router>
    )
}
