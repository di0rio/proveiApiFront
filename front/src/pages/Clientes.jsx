import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Clientes = () => {
  return (
    <div className="container mt-5">
      <h1 className="mb-4">Clientes</h1>
      <form>
        <div className="mb-3">
          <label htmlFor="nome" className="form-label">
            Nome:
          </label>
          <input
            type="text"
            className="form-control"
            id="nome"
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="cpf" className="form-label">
            CPF:
          </label>
          <input
            type="text"
            className="form-control"
            id="cpf"
            onChange={(e) => setCpf(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email:
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="telefone" className="form-label">
            Telefone:
          </label>
          <input
            type="text"
            className="form-control"
            id="telefone"
            onChange={(e) => setTelefone(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Adicionar Cliente
        </button>
      </form>
    </div>
  );
};

export default Clientes;
