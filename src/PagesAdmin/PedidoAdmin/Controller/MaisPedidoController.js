import { useState, useEffect, useRef } from "react";
import axios from "axios";

function MaisPedidoController(onTotalChange) {
  const [produtosMaisVendidos, setProdutosMaisVendidos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Usar um ref para evitar dependências desnecessárias no useEffect
  const onTotalChangeRef = useRef(onTotalChange);

  useEffect(() => {
    onTotalChangeRef.current = onTotalChange;
  }, [onTotalChange]);

  useEffect(() => {
    const fetchMaisPedidos = async () => {
      try {
        const response = await axios.get(
          "http://localhost:9091/api/v1/cliente-preferencia/custom/mais-pedidos"
        );

        // Mapeando os produtos para incluir apenas os dados relevantes
        const produtosMapeados = response.data.map((item) => ({
          id: item.produto.id,
          descricao: item.produto.descricao,
          quantidade: item.quantidadePedidos || 0, // Usar diretamente o campo `quantidadePedidos`
          imagem: item.produto.imagem
            ? `data:image/jpeg;base64,${item.produto.imagem}`
            : null, // Capturar imagem Base64
        }));

        setProdutosMaisVendidos(produtosMapeados);

        // Calcular o total de pedidos
        const totalPedidos = produtosMapeados.reduce(
          (sum, produto) => sum + produto.quantidade,
          0
        );

        if (onTotalChangeRef.current) {
          onTotalChangeRef.current(totalPedidos);
        }
      } catch (err) {
        setError(err);
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMaisPedidos();
  }, []); // Removido `onTotalChange` da lista de dependências

  return { produtosMaisVendidos, isLoading, error };
}

export default MaisPedidoController;
