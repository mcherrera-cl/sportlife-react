import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Container } from "react-bootstrap";

import Sidebar from "@components/Sidebar";
import Header from "@components/Header";

import styles from "./DashboardLayout.module.css";

export default function DashboardLayout() {

  useEffect(() => {
    document.title = "Sportlife | Dashboard"

    return () => document.title = "Portlife"
  }, [])

  return (
    <div className={styles.layout}>
      <Sidebar />

      <div className={styles.main}>
        <Header />

        <Container fluid className={styles.content}>
          <Outlet />
        </Container>
      </div>
    </div>
  );
}
