import MesaModel from "../Model/MesaModel";

class MesaAdminPageController {
  static async getFilteredMesas(searchTerm) {
    try {
      const mesas = await MesaModel.fetchMesas();
      return mesas.filter((mesa) =>
        mesa.codigoMesa.toLowerCase().includes(searchTerm.toLowerCase())
      );
    } catch (error) {
      throw new Error("Erro ao filtrar mesas: " + error.message);
    }
  }
}

export default MesaAdminPageController;
