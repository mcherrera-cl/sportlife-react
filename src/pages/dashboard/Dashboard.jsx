import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { successAlert } from "@utils/alerts";
import { useAuth } from "@context/AuthContext";
import { Container } from "react-bootstrap";

import styles from './Dashboard.module.css'

export default () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    const message = location.state?.successMessage;

    if (message) {
      successAlert(message.title, message.text, "bottom-end");
      navigate(location.pathname, { replace: true });
    }
  }, []);

  return (
    <Container>
      <h1><span className={styles.hi}></span> Hola <span className="text-capitalize">{user.full_name}</span></h1>
    </Container>
  );
};
