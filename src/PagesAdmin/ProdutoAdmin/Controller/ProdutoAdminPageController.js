import ProdutoModel from "../Model/ProdutoModel";

class ProdutoAdminPageController {
  /**
   * Busca todos os produtos e atualiza o estado.
   * @param {Function} setProdutos - Função para atualizar os produtos no estado.
   * @param {Function} setError - Função para registrar erros.
   * @param {Function} setIsLoading - Função para gerenciar estado de carregamento.
   */
  static async fetchProdutos(setProdutos, setError, setIsLoading) {
    setIsLoading(true);
    try {
      const produtos = await ProdutoModel.getAllProdutos();
      setProdutos(produtos);
    } catch (err) {
      setError(`Erro ao buscar produtos: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  }

  /**
   * Filtra os produtos com base no termo de busca.
   * @param {string} term - Termo de busca fornecido pelo usuário.
   * @param {Array} produtos - Lista completa de produtos.
   * @param {Function} setFilteredProdutos - Atualiza os produtos filtrados.
   */
  static handleSearch(term, produtos, setFilteredProdutos) {
    if (!term) {
      setFilteredProdutos(produtos);
      return;
    }
    const filtered = produtos.filter((produto) =>
      produto.descricao.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredProdutos(filtered);
  }

  /**
   * Remove um produto pelo ID e atualiza a lista no estado.
   * @param {number} id - ID do produto a ser removido.
   * @param {Function} setProdutos - Atualiza a lista de produtos no estado.
   * @param {Function} setError - Registra qualquer erro que ocorra.
   */
  static async removerProduto(id, setProdutos, setError) {
    try {
      await ProdutoModel.deleteProduto(id);
      setProdutos((produtos) => produtos.filter((produto) => produto.id !== id));
    } catch (err) {
      setError(`Erro ao remover o produto: ${err.message}`);
      throw err; // Propaga o erro para tratamento adicional
    }
  }
}

export default ProdutoAdminPageController;
