import React from "react";
import { Link } from "react-router-dom";
import {
  ShoppingBag,
  Users,
  Truck,
  Package,
  CreditCard,
  Menu,
  Home,
} from "lucide-react";

const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg shadow-sm bg-white sticky-top">
      <div className="container">
        <Link
          className="navbar-brand d-flex align-items-center gap-2 text-primary fw-bold"
          to="/"
        >
          <ShoppingBag className="text-primary" size={24} />
          Padaria
        </Link>

        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <Menu size={24} />
        </button>

        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarNav"
        >
          <ul className="navbar-nav gap-1">
            <li className="nav-item">
              <Link
                className="nav-link d-flex align-items-center gap-2 px-3 py-2 rounded-pill hover:bg-gray-100"
                to="/"
              >
                <Home size={18} />
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link d-flex align-items-center gap-2 px-3 py-2 rounded-pill hover:bg-gray-100"
                to="/clientes"
              >
                <Users size={18} />
                Clientes
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link d-flex align-items-center gap-2 px-3 py-2 rounded-pill hover:bg-gray-100"
                to="/fornecedores"
              >
                <Truck size={18} />
                Fornecedores
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link d-flex align-items-center gap-2 px-3 py-2 rounded-pill hover:bg-gray-100"
                to="/produtos"
              >
                <Package size={18} />
                Produtos
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link d-flex align-items-center gap-2 px-3 py-2 rounded-pill hover:bg-gray-100"
                to="/vendas"
              >
                <CreditCard size={18} />
                Vendas
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
