import ProdutoModel from "../Model/ProdutoModel";

class EditarProdutoController {
  /**
   * Busca os detalhes de um produto por ID.
   * @param {number} id - ID do produto.
   */
  static async fetchProdutoById(id) {
    return await ProdutoModel.fetchProdutoById(id);
  }

  /**
   * Busca todas as categorias disponíveis.
   */
  static async fetchCategorias() {
    return await ProdutoModel.fetchCategorias();
  }

  /**
   * Atualiza os dados de um produto.
   * @param {object} produto - Dados do produto para atualização.
   */
  static async atualizarProduto(produto) {
    return await ProdutoModel.atualizarProduto(produto);
  }

  /**
   * Converte a imagem carregada em Base64.
   * @param {File} file - Arquivo da imagem.
   * @returns {Promise<string>} - String Base64 da imagem.
   */
  static async convertImageToBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result.split(",")[1]);
      reader.onerror = (err) => reject("Erro ao converter imagem: " + err);
      reader.readAsDataURL(file);
    });
  }
}

export default EditarProdutoController;
