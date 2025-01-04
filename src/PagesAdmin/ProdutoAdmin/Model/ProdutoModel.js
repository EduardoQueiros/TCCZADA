import axios from "axios";
import { formatarImagemBase64 } from "../../../utils/ImagemUtils";
class ProdutoModel {
  // Buscar todos os produtos
  static async getAllProdutos() {
    try {
      const response = await axios.get("http://localhost:9091/api/v1/produto");
      return response.data.map((produto) => ({
        ...produto,
        imagemBase64: formatarImagemBase64(produto.imagemBase64), // Formata a imagem antes de retornar
      }));
    } catch (err) {
      throw new Error("Erro ao buscar produtos: " + err.message);
    }
  }

  static async fetchProdutoById(id) {
    try {
      const response = await axios.get(`http://localhost:9091/api/v1/produto/id/${id}`);
      const produto = response.data;
      return {
        ...produto,
        imagemBase64: formatarImagemBase64(produto.imagemBase64), // Formata a imagem ao buscar por ID
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
      await axios.put("http://localhost:9091/api/v1/produto", produto, {
        headers: { "Content-Type": "application/json" },
      });
    } catch (err) {
      throw new Error("Erro ao atualizar produto: " + err.message);
    }
  }

  // Cadastrar produto
  static async salvarProduto(produto) {
    try {
      const response = await axios.post("http://localhost:9091/api/v1/produto", produto, {
        headers: { "Content-Type": "application/json" },
      });
      return response.data;
    } catch (err) {
      throw new Error(err.response?.data?.mensagem || "Erro ao salvar produto.");
    }
  }

  /**
   * Remove um ou mais produtos pelo ID, conforme esperado pela API.
   * @param {Array<number>} ids - Lista de IDs dos produtos a serem removidos.
   */
  static async removerProdutos(ids) {
    try {
      await axios.delete("http://localhost:9091/api/v1/produto", {
        data: ids, // Envia os IDs no corpo da requisição
        headers: { "Content-Type": "application/json" },
      });
    } catch (err) {
      throw new Error("Erro ao remover produtos: " + err.message);
    }
  }
}

export default ProdutoModel;
