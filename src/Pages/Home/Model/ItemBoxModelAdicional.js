const ItemBoxModelAdicional = {
  adicionais: [],

  addAdicional(adicional) {
    this.adicionais.push(adicional);
  },

  removeAdicional(id) {
    this.adicionais = this.adicionais.filter((adicional) => adicional.id !== id);
  },

  async getAdicionais() {
    return [...this.adicionais];
  },
};

export default ItemBoxModelAdicional;
