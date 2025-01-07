import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import CadastrarProdutoController from "../Controller/CadastrarProdutoController";
import { useNavigate } from "react-router-dom";

function CadastrarProdutoView() {
  const navigate = useNavigate();
  const [codProduto, setCodProduto] = useState("");
  const [categoria, setCategoria] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [loadingSave, setLoadingSave] = useState(false);

  useEffect(() => {
    CadastrarProdutoController.fetchCategorias(setCategoria, setError, setIsLoading);
  }, []);

  const resizeImage = (file, maxWidth, maxHeight, callback) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        let width = img.width;
        let height = img.height;

        if (width > height && width > maxWidth) {
          height = Math.round((height *= maxWidth / width));
          width = maxWidth;
        } else if (height > maxHeight) {
          width = Math.round((width *= maxHeight / height));
          height = maxHeight;
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);
        callback(canvas.toDataURL("image/jpeg").split(",")[1]);
      };
    };
    reader.readAsDataURL(file);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (file.type !== "image/jpeg" && file.type !== "image/png") {
      Swal.fire("Erro", "Por favor, selecione uma imagem JPG ou PNG.", "error");
      return;
    }

    resizeImage(file, 800, 800, (base64) => setSelectedImage(base64));
  };

  const handleSalvar = async () => {
    if (!codProduto || !selectedCategory || !selectedImage) {
      Swal.fire("Atenção", "Preencha todos os campos antes de salvar.", "warning");
      return;
    }

    setLoadingSave(true);

    const produto = {
      descricao: codProduto,
      valor: 10.0,
      imagemBase64: selectedImage,
      tipoProdutoId: Number(selectedCategory),
    };

    try {
      await CadastrarProdutoController.salvarProduto(
        [produto],
        () => {
          Swal.fire("Sucesso", "Produto cadastrado com sucesso!", "success").then(() =>
            navigate("/admin/home/produto")
          );
        },
        (errorMessage) => {
          Swal.fire("Erro", `Erro ao salvar o produto: ${errorMessage}`, "error");
        }
      );
    } catch (err) {
      Swal.fire("Erro", "Erro inesperado ao salvar o produto.", "error");
    } finally {
      setLoadingSave(false);
    }
  };

  if (isLoading) {
    return <div className="text-center text-blue-600 mt-8">Carregando categorias...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 mt-8">{error}</div>;
  }

  return (
    <div className="bg-blue-100 min-h-screen flex flex-col items-center">
      <h1 className="text-center text-blue-700 font-bold text-4xl mt-8">Cadastro de Produto</h1>
      <div className="bg-white p-6 rounded-lg shadow-md w-11/12 max-w-2xl mt-6">
        <div className="flex flex-col items-center mb-6">
          <label className="cursor-pointer">
            <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
            <div className="w-48 h-48 border-2 border-blue-300 border-dashed rounded-lg bg-blue-50 flex items-center justify-center">
              {selectedImage ? (
                <img
                  src={`data:image/jpeg;base64,${selectedImage}`}
                  alt="Preview"
                  className="object-cover w-full h-full rounded-lg"
                />
              ) : (
                <span className="text-blue-500">Clique ou arraste uma imagem aqui</span>
              )}
            </div>
          </label>
        </div>
        <div className="mb-6">
          <label className="block text-blue-700 font-semibold mb-2">Nome do Produto</label>
          <input
            type="text"
            placeholder="Digite o nome do produto"
            value={codProduto}
            onChange={(e) => setCodProduto(e.target.value)}
            className="w-full border border-blue-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-6">
          <label className="block text-blue-700 font-semibold mb-2">Categoria</label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full border border-blue-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="" disabled>
              Selecione uma Categoria
            </option>
            {categoria.map(({ id, descricao }) => (
              <option key={id} value={id}>
                {descricao}
              </option>
            ))}
          </select>
        </div>
        <div className="flex justify-end">
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
            className="bg-red-500 text-white font-bold py-2 px-6 rounded-lg shadow-md hover:bg-red-600 transition-colors ml-4"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}

export default CadastrarProdutoView;
