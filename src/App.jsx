import { useEffect } from "react";
import { useTheme } from "@context/ThemeContext";
import AppRoutes from "./routes";

function App() {
  const { theme } = useTheme();

  useEffect(() => {
    document.body.classList.remove("light", "dark");
    document.body.classList.add(theme);

    document.documentElement.setAttribute(
      "data-bs-theme",
      theme
    );
  }, [theme]);

  return <AppRoutes />;
}

export default App;