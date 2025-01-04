import SaborBoxController from "../Controller/SaborBoxController";

function SaborBox({ searchTerm }) {
  const { produtos, isLoading, error, adicionarProduto } = SaborBoxController(searchTerm);

  if (isLoading) {
    return <div className="text-center text-lg text-gray-600">Carregando produtos...</div>;
  }

  if (error) {
    return (
      <p className="text-center text-red-600">
        Ocorreu um erro ao carregar os produtos: {error.message}
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {produtos.map((produto) => (
        <div
          key={produto.id}
          className="relative group cursor-pointer rounded-lg overflow-hidden shadow-lg"
          onClick={() => adicionarProduto(produto)}
        >
          {/* Imagem do Produto */}
          <img
            src={`data:image/png;base64,${produto.imagem}`}
            alt={produto.descricao}
            className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
          />

          {/* Sobreposição com informações */}
          <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4">
            <h3 className="text-white text-lg font-bold truncate">{produto.descricao}</h3>
            <p className="text-orange-400 font-semibold mt-1">R${produto.valor.toFixed(2)}</p>
            <p className="text-gray-300 text-sm">{produto.tipoProduto.descricao}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default SaborBox;
