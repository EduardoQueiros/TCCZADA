import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useParams, useNavigate } from "react-router-dom";
import EditarProdutoController from "../Controller/EditarProdutoController";

function EditarProdutoView() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [categorias, setCategorias] = useState([]);
  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedImage, setSelectedImage] = useState("");
  const [loadingSave, setLoadingSave] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [produto, categorias] = await Promise.all([
          EditarProdutoController.fetchProdutoById(id),
          EditarProdutoController.fetchCategorias(),
        ]);

        setDescricao(produto.descricao || "");
        setValor(produto.valor || "");
        setSelectedCategory(produto.tipoProduto?.id || "");
        setSelectedImage(produto.imagem || "");
        setCategorias(categorias);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchData();
  }, [id]);

  const handleSalvar = async () => {
    if (!descricao || !valor || !selectedCategory) {
      Swal.fire("Atenção", "Preencha todos os campos obrigatórios.", "warning");
      return;
    }

    setLoadingSave(true);

    const produto = {
      id,
      descricao,
      valor: parseFloat(valor),
      tipoProduto: { id: Number(selectedCategory) },
      imagem: selectedImage,
    };

    try {
      await EditarProdutoController.atualizarProduto(produto);
      Swal.fire("Sucesso", "Produto atualizado com sucesso!", "success").then(() =>
        navigate("/admin/home/produto")
      );
    } catch (err) {
      Swal.fire("Erro", `Erro ao salvar produto: ${err.message}`, "error");
    } finally {
      setLoadingSave(false);
    }
  };

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      const base64 = await EditarProdutoController.convertImageToBase64(file);
      setSelectedImage(base64);
    } catch (err) {
      Swal.fire("Erro", "Erro ao carregar a imagem.", "error");
    }
  };

  const handleRemoveImage = () => {
    setSelectedImage("");
  };

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  return (
    <div className="bg-blue-100 min-h-screen flex flex-col items-center">
      <h1 className="text-blue-700 font-bold text-4xl mt-8">Editar Produto</h1>
      <div className="bg-white p-6 rounded-lg shadow-md w-11/12 max-w-2xl mt-6">
        <div className="flex flex-col items-center">
          <label className="cursor-pointer">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
            <div className="w-48 h-48 border-2 border-blue-300 border-dashed rounded-lg bg-blue-50 flex items-center justify-center">
              {selectedImage ? (
                <div className="relative w-full h-full">
                  <img
                    src={`data:image/jpeg;base64,${selectedImage}`}
                    alt="Preview"
                    className="object-cover w-full h-full rounded-lg"
                  />
                  <button
                    onClick={handleRemoveImage}
                    className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"
                  >
                    ✖
                  </button>
                </div>
              ) : (
                <span className="text-blue-500">Clique ou arraste uma imagem aqui</span>
              )}
            </div>
          </label>
        </div>
        <div className="mt-6">
          <label className="block text-blue-700 font-semibold mb-2">Nome do Produto</label>
          <input
            type="text"
            placeholder="Digite o nome do produto"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            className="w-full border border-blue-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mt-6">
          <label className="block text-blue-700 font-semibold mb-2">Categoria</label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full border border-blue-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="" disabled>
              Selecione uma Categoria
            </option>
            {categorias.map((categoria) => (
              <option key={categoria.id} value={categoria.id}>
                {categoria.descricao}
              </option>
            ))}
          </select>
        </div>
        <div className="mt-6">
          <label className="block text-blue-700 font-semibold mb-2">Valor do Produto (R$)</label>
          <input
            type="number"
            placeholder="Digite o valor do produto"
            value={valor}
            onChange={(e) => setValor(e.target.value)}
            className="w-full border border-blue-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex justify-end space-x-4 mt-8">
          <button
            onClick={handleSalvar}
            disabled={loadingSave}
            className={`bg-blue-600 text-white font-bold py-2 px-6 rounded-lg shadow-md hover:bg-blue-700 transition-colors ${
              loadingSave ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loadingSave ? "Salvando..." : "Salvar"}
          </button>
          <button
            onClick={() => navigate("/admin/home/produto")}
            className="bg-red-500 text-white font-bold py-2 px-6 rounded-lg shadow-md hover:bg-red-600 transition-colors"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditarProdutoView;
