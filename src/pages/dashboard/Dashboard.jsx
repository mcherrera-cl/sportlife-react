import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { successAlert } from '@utils/alerts';

export default () => {

    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const message = location.state?.successMessage;

        if (message) {
            successAlert(message.title, message.text, "bottom-end");
            navigate(location.pathname, {replace: true});
        }
    }, [])

    return <h1>Hola</h1>
}