import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import api from "../services/api";
import { Trash2, Edit, Plus } from "lucide-react";

const Fornecedores = () => {
  const [fornecedores, setFornecedores] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedFornecedor, setSelectedFornecedor] = useState(null);

  const [formData, setFormData] = useState({
    nomeEmpresa: "",
    cnpj: "",
    endereco: "",
    telefone: "",
    email: "",
  });

  const fetchFornecedores = async () => {
    try {
      const response = await api.get("/Fornecedores");
      setFornecedores(response.data);
    } catch (error) {
      console.error("Erro ao carregar fornecedores:", error);
      alert("Erro ao carregar fornecedores");
    }
  };

  useEffect(() => {
    fetchFornecedores();
  }, []);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await api.post("/Fornecedores", formData);
      setShowCreateModal(false);
      resetForm();
      fetchFornecedores();
      alert("Fornecedor criado com sucesso!");
    } catch (error) {
      console.error("Erro ao criar fornecedor:", error);
      alert("Erro ao criar fornecedor");
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/Fornecedores/${selectedFornecedor.id}`, formData);
      setShowEditModal(false);
      resetForm();
      fetchFornecedores();
      alert("Fornecedor atualizado com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar fornecedor:", error);
      alert("Erro ao atualizar fornecedor");
    }
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/Fornecedores/${selectedFornecedor.id}`);
      setShowDeleteModal(false);
      setSelectedFornecedor(null);
      fetchFornecedores();
      alert("Fornecedor deletado com sucesso!");
    } catch (error) {
      console.error("Erro ao deletar fornecedor:", error);
      alert("Erro ao deletar fornecedor");
    }
  };

  const resetForm = () => {
    setFormData({
        nomeEmpresa: "",
        cnpj: "",
        endereco: "",
        telefone: "",
        email: ""
    });
  };

  const openEditModal = (fornecedor) => {
    setSelectedFornecedor(fornecedor);
    setFormData({ ...fornecedor });
    setShowEditModal(true);
  };

  const FornecedorForm = ({ onSubmit, title, submitText }) => (
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
        <div className="mb-3">
          <label htmlFor="nomeEmpresa" className="form-label">
            Nome da Empresa:
          </label>
          <input
            name="nomeEmpresa"
            type="text"
            className="form-control"
            value={formData.nomeEmpresa || ""}
            onChange={handleOnChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="cnpj" className="form-label">
            CNPJ:
          </label>
          <input
            type="text"
            className="form-control"
            name="cnpj"
            value={formData.cnpj || ""}
            onChange={handleOnChange}
            required
          />
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
        <div className="mb-3">
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
        <div className="mb-3">
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
        <h1>Fornecedores</h1>
        <button
          className="btn btn-primary"
          onClick={() => {
            resetForm();
            setShowCreateModal(true);
          }}
        >
          <Plus size={20} className="me-2" />
          Novo Fornecedor
        </button>
      </div>

      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead className="table-dark">
            <tr>
              <th>Nome da Empresa</th>
              <th>CNPJ</th>
              <th>Endereço</th>
              <th>Telefone</th>
              <th>Email</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {fornecedores.map((fornecedor) => (
              <tr key={fornecedor.id}>
                <td>{fornecedor.nomeEmpresa}</td>
                <td>{fornecedor.cnpj}</td>
                <td>{fornecedor.endereco}</td>
                <td>{fornecedor.telefone}</td>
                <td>{fornecedor.email}</td>
                <td>
                  <button
                    className="btn btn-sm btn-primary me-2"
                    onClick={() => openEditModal(fornecedor)}
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => {
                      setSelectedFornecedor(fornecedor);
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

      <div
        className={`modal ${showCreateModal ? "d-block" : ""}`}
        tabIndex="-1"
        role="dialog"
        style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <FornecedorForm
              onSubmit={handleCreate}
              title="Novo Fornecedor"
              submitText="Criar"
            />
          </div>
        </div>
      </div>

      <div
        className={`modal ${showEditModal ? "d-block" : ""}`}
        tabIndex="-1"
        role="dialog"
        style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <FornecedorForm
              onSubmit={handleEdit}
              title="Editar Fornecedor"
              submitText="Salvar"
            />
          </div>
        </div>
      </div>

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
                <strong>{selectedFornecedor?.nomeEmpresa}</strong>?
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

export default Fornecedores;
