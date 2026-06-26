import { AppContext } from "./context/contex";
import AppRoutes from "./routes";

function App() {

  return (
    <>
      <AppContext.Provider>
        <AppRoutes/>
      </AppContext.Provider>
    </>
  );
}

export default App;
