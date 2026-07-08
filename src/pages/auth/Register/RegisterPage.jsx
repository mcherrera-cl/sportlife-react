import { useEffect } from "react"
import { Container, Row, Col } from "react-bootstrap"
import RegisterForm from "./RegisterForm"
import styles from './RegisterPage.module.css';

export default () => {

  useEffect(() => {
    document.body.classList.add("register");
    document.title = 'Sportlife | Registro'
    return () => {
      document.body.className = "";
    };
  }, [])
  return (
    <Container className={styles.registerWrapper}>
      <Row>
        <Col xs={12} md={8} lg={6} className="mx-auto">
        <RegisterForm/>
        </Col>
      </Row>
    </Container>
  )
}