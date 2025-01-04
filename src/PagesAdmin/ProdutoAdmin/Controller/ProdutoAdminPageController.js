import ProdutoModel from "../Model/ProdutoModel";
import { formatarImagemBase64 } from "../../../utils/ImagemUtils";

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

      // Certifique-se de passar os produtos diretamente
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
   * Remove produtos pelo ID e atualiza a lista no estado.
   * @param {Array<number>} ids - Lista de IDs dos produtos a serem removidos.
   * @param {Function} setProdutos - Atualiza a lista de produtos no estado.
   * @param {Function} setError - Registra qualquer erro que ocorra.
   */
   static async removerProdutos(ids, setProdutos, setError) {
    try {
      await ProdutoModel.removerProdutos(ids); // Faz a exclusão no backend

      // Atualiza a lista localmente após a exclusão
      setProdutos((produtos) =>
        produtos.filter((produto) => !ids.includes(produto.id))
      );
    } catch (err) {
      setError(`Erro ao remover os produtos: ${err.message}`);
    }
  }
}

export default ProdutoAdminPageController;
