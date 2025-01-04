import ProdutoModel from "../Model/ProdutoModel";

class CadastrarProdutoController {
  // Buscar categorias
  static async fetchCategorias(setCategoria, setError, setIsLoading) {
    setIsLoading(true);
    try {
      const categorias = await ProdutoModel.fetchCategorias();
      setCategoria(categorias);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  // Buscar produtos
  static async fetchProdutos(setProdutos) {
    try {
      const produtos = await ProdutoModel.getAllProdutos();
      setProdutos(produtos);
    } catch (err) {
      console.error(err.message);
    }
  }

  // Salvar novo produto
  static async salvarProduto(produto, onSuccess, onError = (msg) => console.error("Erro:", msg)) {
    try {
      const novoProduto = await ProdutoModel.salvarProduto(produto);
      onSuccess(novoProduto); // Retorna o produto salvo
    } catch (err) {
      const errorMessage = err.response?.data?.mensagem || "Erro ao salvar produto.";
      onError(errorMessage); // Chama o onError ou usa o padrão
    }
  }
}

export default CadastrarProdutoController;
