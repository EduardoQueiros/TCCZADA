import AdicionalController from "../Controller/AdicionalController";

function AdicionalBox({ searchTerm }) {
  const { adicionais, isLoading, error, adicionarAdicional } = AdicionalController(searchTerm);

  if (isLoading) {
    return <div className="text-center text-lg text-gray-600">Carregando adicionais...</div>;
  }

  if (error) {
    return (
      <p className="text-center text-red-600">
        Ocorreu um erro ao carregar os adicionais: {error.message}
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {adicionais.map((adicional) => (
        <div
          key={adicional.id}
          className="relative group cursor-pointer rounded-lg overflow-hidden shadow-lg"
          onClick={() => adicionarAdicional(adicional)}
        >
          {/* Imagem do Adicional */}
          <img
            src={`data:image/png;base64,${adicional.imagem}`}
            alt={adicional.descricao}
            className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
          />

          {/* Informações do Adicional */}
          <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4">
            <h3 className="text-white text-lg font-bold truncate">{adicional.descricao}</h3>
            <p className="text-orange-400 font-semibold mt-1">R${adicional.valor.toFixed(2)}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default AdicionalBox;
