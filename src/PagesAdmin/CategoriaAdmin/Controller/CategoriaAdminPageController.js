import CategoriaModel from "../Model/CategoriaModel";

class CategoriaAdminPageController {
  static async fetchCategorias() {
    return await CategoriaModel.fetchCategorias();
  }
}

export default CategoriaAdminPageController;
