import axios from "axios";

const API_URL = "http://localhost:9091/api/v1/mesa";

class MesaModel {
  static async fetchMesas() {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      throw new Error("Erro ao buscar mesas: " + error.message);
    }
  }

  static async createMesa(codigoMesa) {
    try {
      await axios.post(API_URL, [{ codigoMesa }]);
    } catch (error) {
      throw new Error("Erro ao adicionar mesa: " + error.message);
    }
  }

  static async deleteMesa(codigoMesa) {
    try {
      await axios.delete(`${API_URL}/${codigoMesa}`);
    } catch (error) {
      throw new Error("Erro ao remover mesa: " + error.message);
    }
  }
}

export default MesaModel;
