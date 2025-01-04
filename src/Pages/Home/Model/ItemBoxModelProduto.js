const ItemBoxModelProduto = {
  produtos: [],


  addProduto(produto) {
    this.produtos.push(produto);
  },

  async getProdutos() {
    return [...this.produtos];
  },


};

export default ItemBoxModelProduto;
