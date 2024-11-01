import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Clientes from "./pages/Clientes";
import Header from "./components/Header";
import Produtos from "./pages/Produtos";
import Vendas from "./pages/Vendas";
import Fornecedores from "./pages/Fornecedores";
// import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/clientes" element={<Clientes />} />
          <Route path="/produtos" element={<Produtos />} />
          <Route path="/fornecedores" element={<Fornecedores />} />
          <Route path="/vendas" element={<Vendas />} />
        </Routes>
        {/* <Footer /> */}
      </Router>
    </>
  );
}

export default App;
