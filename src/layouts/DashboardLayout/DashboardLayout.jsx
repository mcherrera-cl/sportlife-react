import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Container } from "react-bootstrap";
import { useTheme } from "@context/ThemeContext";

import Sidebar from "@components/Sidebar";
import Header from "@components/Header";

import styles from "./DashboardLayout.module.css";

export default function DashboardLayout() {
  const { theme } = useTheme();

  useEffect(() => {
    document.body.className = theme;
    document.documentElement.setAttribute(
      "data-bs-theme",
      theme
    );
  }, [theme]);


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
