import CategoriaModel from "../Model/CategoriaModel";

class CadastrarCategoriaController {
  static async handleSalvar(novaCategoria, categorias) {
    if (!novaCategoria) {
      throw new Error("Por favor, insira um nome para a categoria.");
    }

    // Verifica se a categoria já existe
    const categoriaExistente = categorias.find(
      (categoria) => categoria.descricao === novaCategoria
    );
    if (categoriaExistente) {
      throw new Error("Categoria já existe. Por favor, insira um nome diferente.");
    }

    // Cria a nova categoria
    await CategoriaModel.createCategoria(novaCategoria);

    return { descricao: novaCategoria };
  }
}

export default CadastrarCategoriaController;
