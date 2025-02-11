// eslint-disable-next-line no-unused-vars
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import { ThemeProvider } from "./context/ThemeContext";
import Review from "./components/Review";
import CardapioCompleto from "./components/CardapioCompleto";
import Cardapio from "./components/Cardapio";
import Footer from "./components/Footer";
import Localizacao from "./components/Localizacao";
import Galeria from "./components/Galeria";
import { AuthProvider } from "./context/AuthContext";
import Login from "./components/Login";
import AdicionarComida from "./components/AdicionarComida";
import EditarComida from "./components/EditarComida";
import PainelAdministrativo from "./components/PainelAdministrativo";
import PrivateRoute from "./routes/PrivateRoute";
import Register from "./components/Register";
import Buscar from "./pages/Buscar";


const App = () => (
  <AuthProvider>
    <ThemeProvider>
      <Router>
        <Navbar />
        <main className="p-4">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <div id="home">
                    <Home />
                  </div>
                  <div id="cardapio">
                    <Cardapio />
                  </div>
                  <div id="localizacao">
                    <Localizacao />
                  </div>
                  <div id="galeria">
                    <Galeria />
                  </div>
                  <div id="about">
                    <About />
                  </div>
                  <div id="review">
                    <Review />
                  </div>
                  <div id="footer">
                    <Footer />
                  </div>
                </>
              }
            />
            <Route path="/buscar" element={<Buscar />} />
            <Route path="/cardapio" element={<CardapioCompleto />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/signup" element={<Register />} />
            <Route element={<PrivateRoute requiredRole="admin" />}>
              <Route path="/admin" element={<PainelAdministrativo />} />
              <Route path="/admin/adicionar" element={<AdicionarComida />} />
              <Route path="/admin/editar/:comidaId" element={<EditarComida />} />
            </Route>
          </Routes>
        </main>
      </Router>
    </ThemeProvider>
  </AuthProvider>
);

export default App;
