import axios from "axios";
import { formatarImagemBase64 } from "../../../utils/ImagemUtils";

const API_URL = "http://localhost:9091/api/v1/produto";

class ProdutoModel {
  // Buscar todos os produtos
  static async getAllProdutos() {
    try {
      const response = await axios.get(API_URL);
      return response.data.map((produto) => ({
        ...produto,
        imagemBase64: formatarImagemBase64(produto.imagemBase64),
      }));
    } catch (err) {
      throw new Error("Erro ao buscar produtos: " + err.message);
    }
  }

  static async fetchProdutoById(id) {
    try {
      const response = await axios.get(`${API_URL}/id/${id}`);
      const produto = response.data;
      return {
        ...produto,
        imagemBase64: formatarImagemBase64(produto.imagemBase64),
      };
    } catch (err) {
      throw new Error("Erro ao buscar o produto: " + err.message);
    }
  }

  // Buscar categorias
  static async fetchCategorias() {
    try {
      const response = await axios.get("http://localhost:9091/api/v1/tipo-produto");
      return response.data;
    } catch (err) {
      throw new Error("Erro ao buscar categorias: " + err.message);
    }
  }

  // Atualizar produto
  static async atualizarProduto(produto) {
    try {
      await axios.put(API_URL, produto, {
        headers: { "Content-Type": "application/json" },
      });
    } catch (err) {
      throw new Error("Erro ao atualizar produto: " + err.message);
    }
  }

  // Cadastrar produto
  static async salvarProduto(produto) {
    try {
      const response = await axios.post(API_URL, produto, {
        headers: { "Content-Type": "application/json" },
      });
      return response.data;
    } catch (err) {
      throw new Error(err.response?.data?.mensagem || "Erro ao salvar produto.");
    }
  }

  static async deleteProduto(id) {
    try {
      await axios.delete(API_URL, {
        headers: {
          "Content-Type": "application/json",
        },
        data: [id], // Enviando o ID como uma lista no corpo
      });
    } catch (error) {
      throw new Error("Erro ao remover produto: " + error.message);
    }
  }

}

export default ProdutoModel;
