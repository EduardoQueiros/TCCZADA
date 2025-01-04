import React, { useState, useEffect } from "react";
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

  // Fetch de categorias
  useEffect(() => {
    CadastrarProdutoController.fetchCategorias(setCategoria, setError, setIsLoading);
  }, []);

  // Função para redimensionar a imagem
  const resizeImage = (file, maxWidth, maxHeight, callback) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxWidth) {
            height = Math.round((height *= maxWidth / width));
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = Math.round((width *= maxHeight / height));
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);
        callback(canvas.toDataURL("image/jpeg").split(",")[1]); // Retorna a string Base64
      };
    };
    reader.readAsDataURL(file);
  };

  // Função para manipular o upload da imagem
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (file.type !== "image/jpeg" && file.type !== "image/png") {
      alert("Por favor, selecione um arquivo de imagem no formato JPG ou PNG.");
      return;
    }

    resizeImage(file, 800, 800, (base64) => {
      setSelectedImage(base64);
    });
  };

  // Função para salvar o produto
  const handleSalvar = async () => {
    if (!codProduto || !selectedCategory || !selectedImage) {
      alert("Preencha todos os campos antes de salvar.");
      return;
    }

    setLoadingSave(true);

    const produto = {
      descricao: codProduto,
      valor: 10.0,
      imagemBase64: selectedImage,
      tipoProdutoId: Number(selectedCategory),
    };

    console.log("JSON enviado para a API:", JSON.stringify([produto], null, 2));

    try {
      await CadastrarProdutoController.salvarProduto(
        [produto],
        () => {
          alert("Produto cadastrado com sucesso!");
          navigate("/admin/home/produto");
        },
        (errorMessage) => {
          alert("Erro ao salvar o produto: " + errorMessage);
        }
      );
    } catch (err) {
      console.error("Erro inesperado:", err);
    } finally {
      setLoadingSave(false);
    }
  };

  if (isLoading) {
    return <div className="text-center text-gray-600 mt-8">Carregando categorias...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 mt-8">{error}</div>;
  }

  return (
    <div className="bg-orange-200 min-h-screen flex flex-col items-center">
      <h1 className="text-center text-white font-bold text-4xl mt-8">Cadastro de Produto</h1>

      <div className="bg-white p-6 rounded-lg shadow-md w-11/12 max-w-2xl mt-6">
        {/* Upload de Imagem */}
        <div className="flex flex-col items-center mb-6">
          <label className="cursor-pointer">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
            <div className="w-48 h-48 border-2 border-gray-300 border-dashed rounded-lg bg-gray-100 flex items-center justify-center">
              {selectedImage ? (
                <img
                  src={`data:image/jpeg;base64,${selectedImage}`}
                  alt="Preview"
                  className="object-cover w-full h-full rounded-lg"
                />
              ) : (
                <span className="text-gray-400">Clique ou arraste uma imagem aqui</span>
              )}
            </div>
          </label>
        </div>

        {/* Nome do Produto */}
        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">Nome do Produto</label>
          <input
            type="text"
            placeholder="Digite o nome do produto"
            value={codProduto}
            onChange={(e) => setCodProduto(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        {/* Categoria */}
        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">Categoria</label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            <option value="" disabled>Selecione uma Categoria</option>
            {categoria.map(({ id, descricao }) => (
              <option key={id} value={id}>{descricao}</option>
            ))}
          </select>
        </div>

        {/* Botão de Salvar */}
        <div className="flex justify-end">
          <button
            onClick={handleSalvar}
            disabled={loadingSave}
            className={`bg-blue-500 text-white font-bold py-2 px-6 rounded-lg shadow-md hover:bg-blue-600 transition-colors ${loadingSave ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            {loadingSave ? "Salvando..." : "Salvar"}
          </button>

          {/* Botão de Cancelar */}
          <button
            onClick={() => navigate("/admin/home/produto")}
            className="bg-red-500 text-white font-bold py-2 px-6 rounded-lg shadow-md hover:bg-red-600 transition-colors ml-4">
              Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}

export default CadastrarProdutoView;
