import Admin from "./components/Admin";
import { ActionProvider } from "./context/ActionContext";

function App() {
  return (
    <ActionProvider>
      <Admin />
    </ActionProvider>
  );
}

export default App;
