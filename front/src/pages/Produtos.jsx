import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import api from "../services/api";
import { Trash2, Edit, Plus } from "lucide-react";

const Produtos = () => {
  const [produtos, setProdutos] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedProduto, setSelectedProduto] = useState(null);

  const [formData, setFormData] = useState({
    nome: "",
    descricao: "",
    preco: 0,
    quantidadeEmEstoque: 0,
    fornecedorId: "",
  });

  const fetchProdutos = async () => {
    try {
      const response = await api.get("/Produtos");
      setProdutos(response.data);
    } catch (error) {
      console.error("Erro ao carregar produtos:", error);
      alert("Erro ao carregar produtos");
    }
  };

  useEffect(() => {
    fetchProdutos();
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
      await api.post("/Produtos", formData);
      setShowCreateModal(false);
      resetForm();
      fetchProdutos();
      alert("Produto criado com sucesso!");
    } catch (error) {
      console.error("Erro ao criar produto:", error);
      alert("Erro ao criar produto");
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/Produtos/${selectedProduto.id}`, formData);
      setShowEditModal(false);
      resetForm();
      fetchProdutos();
      alert("Produto atualizado com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar produto:", error);
      alert("Erro ao atualizar produto");
    }
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/Produtos/${selectedProduto.id}`);
      setShowDeleteModal(false);
      setSelectedProduto(null);
      fetchProdutos();
      alert("Produto deletado com sucesso!");
    } catch (error) {
      console.error("Erro ao deletar produto:", error);
      alert("Erro ao deletar produto");
    }
  };

  const resetForm = () => {
    setFormData({
      nome: "",
      descricao: "",
      preco: 0,
      quantidadeEmEstoque: 0,
      fornecedorId: "",
    });
  };

  const openEditModal = (produto) => {
    setSelectedProduto(produto);
    setFormData({ ...produto });
    setShowEditModal(true);
  };

  const ProdutoForm = ({ onSubmit, title, submitText }) => (
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
        <div className="mb-3">
          <label htmlFor="descricao" className="form-label">
            Descrição:
          </label>
          <textarea
            name="descricao"
            className="form-control"
            value={formData.descricao || ""}
            onChange={handleOnChange}
            required
          ></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="preco" className="form-label">
            Preço:
          </label>
          <input
            name="preco"
            type="number"
            className="form-control"
            value={formData.preco || ""}
            onChange={handleOnChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="quantidadeEmEstoque" className="form-label">
            Quantidade em Estoque:
          </label>
          <input
            name="quantidadeEmEstoque"
            type="number"
            className="form-control"
            value={formData.quantidadeEmEstoque || ""}
            onChange={handleOnChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="fornecedorId" className="form-label">
            Fornecedor ID:
          </label>
          <input
            name="fornecedorId"
            type="text"
            className="form-control"
            value={formData.fornecedorId || ""}
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
        <h1>Produtos</h1>
        <button
          className="btn btn-primary"
          onClick={() => {
            resetForm();
            setShowCreateModal(true);
          }}
        >
          <Plus size={20} className="me-2" />
          Novo Produto
        </button>
      </div>

      {/* Tabela de Produtos */}
      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead className="table-dark">
            <tr>
              <th>Nome</th>
              <th>Descrição</th>
              <th>Preço</th>
              <th>Quantidade</th>
              <th>Fornecedor ID</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {produtos.map((produto) => (
              <tr key={produto.id}>
                <td>{produto.nome}</td>
                <td>{produto.descricao}</td>
                <td>{produto.preco}</td>
                <td>{produto.quantidadeEmEstoque}</td>
                <td>{produto.fornecedorId}</td>
                <td>
                  <button
                    className="btn btn-sm btn-primary me-2"
                    onClick={() => openEditModal(produto)}
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => {
                      setSelectedProduto(produto);
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
            <ProdutoForm
              onSubmit={handleCreate}
              title="Novo Produto"
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
            <ProdutoForm
              onSubmit={handleEdit}
              title="Editar Produto"
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
                <strong>{selectedProduto?.nome}</strong>?
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

export default Produtos;
