import { useEffect, useState } from 'react';
import axios from 'axios';

const MaisPedidoBox = ({ onTotalChange }) => {
  const [produtosMaisVendidos, setProdutosMaisVendidos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchItemPedidos = async () => {
      try {
        const response = await axios.get("http://localhost:9091/api/v1/item-pedido");
        const produtosCount = {};

        // Contando as ocorrências de cada produto
        response.data.forEach(item => {
          const descricao = item.produto.descricao;
          produtosCount[descricao] = (produtosCount[descricao] || 0) + 1;
        });

        // Transformando o objeto em um array e ordenando
        const produtosOrdenados = Object.entries(produtosCount)
          .map(([descricao, quantidade]) => ({ descricao, quantidade }))
          .sort((a, b) => b.quantidade - a.quantidade);

        setProdutosMaisVendidos(produtosOrdenados);

        // Chamando a função de callback para atualizar o total
        const totalPedidos = produtosOrdenados.reduce((sum, produto) => sum + produto.quantidade, 0);
        onTotalChange(totalPedidos); // Passando o total de pedidos
      } catch (err) {
        setError(err);
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchItemPedidos();
  }, [onTotalChange]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading pedidos</div>;

  return (
    <div>
      {produtosMaisVendidos.map((produto, index) => (
        <div key={index} className="cursor-pointer p-4 border rounded-lg shadow-md hover:shadow-lg transition duration-200">
          <div className="flex items-center">
            <img 
              src="https://via.placeholder.com/150" 
              alt="Avatar" 
              className="w-12 h-12 rounded-full mr-4" 
            />
            <div className="flex-1">
              <div className="flex justify-between">
                <span className="font-semibold">{produto.descricao}</span>
                <span className="text-sm text-green-500">{produto.quantidade} pedidos</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MaisPedidoBox;
