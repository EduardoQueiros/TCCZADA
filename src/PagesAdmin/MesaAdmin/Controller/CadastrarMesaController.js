import MesaModel from "../Model/MesaModel"; // Certifique-se do caminho correto

class CadastrarMesaController {
  static async handleSalvar(codigo, mesas) {
    if (!codigo) {
      throw new Error("Por favor, insira um código para a mesa.");
    }

    const mesaExistente = mesas.find((mesa) => mesa.codigoMesa === codigo);
    if (mesaExistente) {
      throw new Error("Código da mesa já existe. Por favor, insira um código diferente.");
    }

    await MesaModel.createMesa(codigo);
    return { codigoMesa: codigo };
  }

  static async handleRemover(codigo, mesas) {
    if (!codigo) {
      throw new Error("Código da mesa não pode estar vazio.");
    }

    const mesaExistente = mesas.find((mesa) => mesa.codigoMesa === codigo);
    if (!mesaExistente) {
      throw new Error("Mesa não encontrada com o código fornecido.");
    }

    await MesaModel.deleteMesa(codigo);
    return mesas.filter((mesa) => mesa.codigoMesa !== codigo);
  }
}

export default CadastrarMesaController;
