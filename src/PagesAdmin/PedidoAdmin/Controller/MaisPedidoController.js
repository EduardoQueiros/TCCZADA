import axios from "axios";

async function fetchMaisPedidos() {
  try {
    const response = await axios.get(
      "http://44.200.213.219:9091/api/v1/cliente-preferencia/custom/mais-pedidos"
    );

    const produtosMapeados = response.data.map((item) => ({
      id: item.produto.id,
      descricao: item.produto.descricao,
      quantidade: item.quantidadePedidos || 0,
      imagem: item.produto.imagem
        ? `data:image/jpeg;base64,${item.produto.imagem}`
        : null,
    }));

    const totalPedidos = produtosMapeados.reduce(
      (sum, produto) => sum + produto.quantidade,
      0
    );

    return { produtos: produtosMapeados, total: totalPedidos };
  } catch (err) {
    console.error("Erro ao buscar dados:", err);
    throw err;
  }
}

export default fetchMaisPedidos;
