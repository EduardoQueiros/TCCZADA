import axios from "axios";

const API_URL = "https://iycy90ubq9.execute-api.us-east-1.amazonaws.com/build/api/v1/tipo-produto";

class CategoriaModel {
  static async fetchCategorias() {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      throw new Error("Erro ao buscar categorias: " + error.message);
    }
  }

  static async createCategoria(descricao) {
    try {
      await axios.post(API_URL, [{ descricao }]);
    } catch (error) {
      throw new Error("Erro ao adicionar categoria: " + error.message);
    }
  }

  static async deleteCategoria(id) {
    try {
      await axios.delete(`${API_URL}/${id}`);
    } catch (error) {
      throw new Error("Erro ao remover categoria: " + error.message);
    }
  }
}

export default CategoriaModel;
