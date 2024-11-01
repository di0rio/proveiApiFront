import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import api from "../services/api";
import { Trash2, Edit, Plus } from "lucide-react";

const Vendas = () => {
  const [vendas, setVendas] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedVenda, setSelectedVenda] = useState(null);

  const [formData, setFormData] = useState({
    dataEmissao: new Date().toISOString(), // Para definir a data atual automaticamente
    valorTotal: 0,
    clienteId: "",
  });

  const fetchVendas = async () => {
    try {
      const response = await api.get("/Vendas");
      setVendas(response.data);
    } catch (error) {
      console.error("Erro ao carregar vendas:", error);
      alert("Erro ao carregar vendas");
    }
  };

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
    fetchVendas();
    fetchClientes();
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
      const response = await api.post("/Vendas", formData);
      console.log("Venda criada:", response.data);
      setShowCreateModal(false);
      resetForm();
      fetchVendas();
      alert("Venda registrada com sucesso!");
    } catch (error) {
      console.error("Erro ao registrar venda:", error);
      if (error.response) {
        console.error("Dados do erro:", error.response.data);
      }
      alert("Erro ao registrar venda");
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/Vendas/${selectedVenda.id}`, formData);
      setShowEditModal(false);
      resetForm();
      fetchVendas();
      alert("Venda atualizada com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar venda:", error);
      alert("Erro ao atualizar venda");
    }
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/Vendas/${selectedVenda.id}`);
      setShowDeleteModal(false);
      setSelectedVenda(null);
      fetchVendas();
      alert("Venda deletada com sucesso!");
    } catch (error) {
      console.error("Erro ao deletar venda:", error);
      alert("Erro ao deletar venda");
    }
  };

  const resetForm = () => {
    setFormData({
      dataEmissao: "",
      valorTotal: "",
      clienteId: "",
    });
  };

  const openEditModal = (venda) => {
    setSelectedVenda(venda);
    setFormData({ ...venda });
    setShowEditModal(true);
  };

  const VendaForm = ({ onSubmit, title, submitText }) => (
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
          <label htmlFor="dataEmissao" className="form-label">
            Data de Emissão:
          </label>
          <input
            type="date"
            className="form-control"
            name="dataEmissao"
            value={formData.dataEmissao || ""}
            onChange={handleOnChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="valorTotal" className="form-label">
            Valor Total:
          </label>
          <input
            type="number"
            className="form-control"
            name="valorTotal"
            value={formData.valorTotal || ""}
            onChange={handleOnChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="clienteId" className="form-label">
            Cliente:
          </label>
          <select
            className="form-control"
            name="clienteId"
            value={formData.clienteId || ""}
            onChange={handleOnChange}
            required
          >
            <option value="">Selecione um Cliente</option>
            {clientes.map((cliente) => (
              <option key={cliente.id} value={cliente.id}>
                {cliente.nome}
              </option>
            ))}
          </select>
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
        <h1>Vendas</h1>
        <button
          className="btn btn-primary"
          onClick={() => {
            resetForm();
            setShowCreateModal(true);
          }}
        >
          <Plus size={20} className="me-2" />
          Nova Venda
        </button>
      </div>

      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead className="table-dark">
            <tr>
              <th>Data de Emissão</th>
              <th>Valor Total</th>
              <th>Cliente</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {vendas.map((venda) => (
              <tr key={venda.id}>
                <td>{new Date(venda.dataEmissao).toLocaleDateString()}</td>
                <td>R$ {venda.valorTotal.toFixed(2)}</td>
                <td>
                  {clientes.find((cliente) => cliente.id === venda.clienteId)
                    ?.nome || "Cliente não encontrado"}
                </td>
                <td>
                  <button
                    className="btn btn-sm btn-primary me-2"
                    onClick={() => openEditModal(venda)}
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => {
                      setSelectedVenda(venda);
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
            <VendaForm
              onSubmit={handleCreate}
              title="Nova Venda"
              submitText="Registrar"
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
            <VendaForm
              onSubmit={handleEdit}
              title="Editar Venda"
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
                Tem certeza que deseja excluir a venda de{" "}
                <strong>{selectedVenda?.nome}</strong>?
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

export default Vendas;
