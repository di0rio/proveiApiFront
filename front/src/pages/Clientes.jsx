import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import api from "../services/api";
import { Trash2, Edit, Plus } from "lucide-react";

const Clientes = () => {
  const [clientes, setClientes] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedCliente, setSelectedCliente] = useState(null);

  const [formData, setFormData] = useState({
    nome: "",
    cpF_CNPJ: "",
    endereco: "",
    telefone: "",
    email: "",
    statusAtivo: true,
  });

  const fetchClientes = async () => {
    try {
      const response = await api.get("/Clientes");
      setClientes(response.data);
    } catch (error) {
      console.error("Erro ao carregar clientes:", error);
      alert("Erro ao carregar clientes");
    }
  };

  useEffect(() => {
    fetchClientes();
  }, []);

  const handleOnChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await api.post("/Clientes", formData);
      setShowCreateModal(false);
      resetForm();
      fetchClientes();
      alert("Cliente criado com sucesso!");
    } catch (error) {
      console.error("Erro ao criar cliente:", error);
      alert("Erro ao criar cliente");
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/Clientes/${selectedCliente.id}`, formData);
      setShowEditModal(false);
      resetForm();
      fetchClientes();
      alert("Cliente atualizado com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar cliente:", error);
      alert("Erro ao atualizar cliente");
    }
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/Clientes/${selectedCliente.id}`);
      setShowDeleteModal(false);
      setSelectedCliente(null);
      fetchClientes();
      alert("Cliente deletado com sucesso!");
    } catch (error) {
      console.error("Erro ao deletar cliente:", error);
      alert("Erro ao deletar cliente");
    }
  };

  const resetForm = () => {
    setFormData({
      nome: "",
      cpF_CNPJ: "",
      endereco: "",
      telefone: "",
      email: "",
      statusAtivo: true,
    });
  };

  const openEditModal = (cliente) => {
    setSelectedCliente(cliente);
    setFormData({ ...cliente });
    setShowEditModal(true);
  };

  const ClienteForm = ({ onSubmit, title, submitText }) => (
    <form onSubmit={onSubmit} className="needs-validation">
      <div className="modal-header">
        <h5 className="modal-title">{title}</h5>
        <button
          type="button"
          className="btn-close"
          onClick={() => {
            setShowCreateModal(false);
            setShowEditModal(false);
            resetForm();
          }}
        ></button>
      </div>
      <div className="modal-body">
        <div className="row">
          <div className="col-md-6 mb-3">
            <label htmlFor="nome" className="form-label">
              Nome:
            </label>
            <input
              name="nome"
              type="text"
              className="form-control"
              value={formData.nome || ""}
              onChange={handleOnChange}
              required
            />
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="cpF_CNPJ" className="form-label">
              CPF/CNPJ:
            </label>
            <input
              type="text"
              className="form-control"
              name="cpF_CNPJ"
              value={formData.cpF_CNPJ || ""}
              onChange={handleOnChange}
              required
            />
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="endereco" className="form-label">
            Endereço:
          </label>
          <input
            type="text"
            className="form-control"
            name="endereco"
            value={formData.endereco || ""}
            onChange={handleOnChange}
            required
          />
        </div>

        <div className="row">
          <div className="col-md-6 mb-3">
            <label htmlFor="email" className="form-label">
              Email:
            </label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={formData.email || ""}
              onChange={handleOnChange}
              required
            />
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="telefone" className="form-label">
              Telefone:
            </label>
            <input
              type="text"
              className="form-control"
              name="telefone"
              value={formData.telefone || ""}
              onChange={handleOnChange}
              required
            />
          </div>
        </div>

        <div className="mb-3">
          <div className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              name="statusAtivo"
              checked={formData.statusAtivo}
              onChange={handleOnChange}
              disabled
            />
            <label className="form-check-label">Cliente Ativo</label>
          </div>
        </div>
      </div>
      <div className="modal-footer">
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => {
            setShowCreateModal(false);
            setShowEditModal(false);
            resetForm();
          }}
        >
          Cancelar
        </button>
        <button type="submit" className="btn btn-primary">
          {submitText}
        </button>
      </div>
    </form>
  );

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Clientes</h1>
        <button
          className="btn btn-primary"
          onClick={() => {
            resetForm();
            setShowCreateModal(true);
          }}
        >
          <Plus size={20} className="me-2" />
          Novo Cliente
        </button>
      </div>

      {/* Tabela de Clientes */}
      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead className="table-dark">
            <tr>
              <th>Nome</th>
              <th>CPF/CNPJ</th>
              <th>Endereço</th>
              <th>Email</th>
              <th>Telefone</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {clientes.map((cliente) => (
              <tr key={cliente.id}>
                <td>{cliente.nome}</td>
                <td>{cliente.cpF_CNPJ}</td>
                <td>{cliente.endereco}</td>
                <td>{cliente.email}</td>
                <td>{cliente.telefone}</td>
                <td>
                  <span
                    className={`badge ${
                      cliente.statusAtivo ? "bg-success" : "bg-danger"
                    }`}
                  >
                    {cliente.statusAtivo ? "Ativo" : "Inativo"}
                  </span>
                </td>
                <td>
                  <button
                    className="btn btn-sm btn-primary me-2"
                    onClick={() => openEditModal(cliente)}
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => {
                      setSelectedCliente(cliente);
                      setShowDeleteModal(true);
                    }}
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal de Criação */}
      <div
        className={`modal ${showCreateModal ? "d-block" : ""}`}
        tabIndex="-1"
        role="dialog"
        style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <ClienteForm
              onSubmit={handleCreate}
              title="Novo Cliente"
              submitText="Criar"
            />
          </div>
        </div>
      </div>

      {/* Modal de Edição */}
      <div
        className={`modal ${showEditModal ? "d-block" : ""}`}
        tabIndex="-1"
        role="dialog"
        style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <ClienteForm
              onSubmit={handleEdit}
              title="Editar Cliente"
              submitText="Salvar"
            />
          </div>
        </div>
      </div>

      {/* Modal de Confirmação de Exclusão */}
      <div
        className={`modal ${showDeleteModal ? "d-block" : ""}`}
        tabIndex="-1"
        role="dialog"
        style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Confirmar Exclusão</h5>
              <button
                type="button"
                className="btn-close"
                onClick={() => setShowDeleteModal(false)}
              ></button>
            </div>
            <div className="modal-body">
              <p>
                Tem certeza que deseja excluir o cliente{" "}
                <strong>{selectedCliente?.nome}</strong>?
              </p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setShowDeleteModal(false)}
              >
                Cancelar
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={handleDelete}
              >
                Confirmar Exclusão
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Clientes;
