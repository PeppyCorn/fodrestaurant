import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdicionarComida from "./pages/AdicionarComida";
import Cardapio from "./pages/Cardapio";
import EditarComida from "./components/EditarComida";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Cardapio />} />
        <Route path="/adicionar" element={<AdicionarComida />} />
        <Route path="/editar/:comidaId" element={<EditarComida />} />
      </Routes>
    </Router>
  );
}

export default App;
