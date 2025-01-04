import axios from "axios";

function CheckBox({ categorias, onDelete }) {
  if (!categorias || categorias.length === 0) {
    return (
      <div className="text-center text-lg text-gray-600">
        Nenhuma categoria encontrada.
      </div>
    );
  }

  const handleDelete = async (id) => {
    const confirm = window.confirm(`Tem certeza que deseja excluir a categoria com ID ${id}?`);
    if (!confirm) return;

    try {
      // Envia o ID no corpo como uma lista
      await axios.delete("http://localhost:9091/api/v1/tipo-produto", {
        headers: {
          "Content-Type": "application/json",
        },
        data: [id], // Lista com o ID para exclusão
      });

      alert("Categoria excluída com sucesso!");
      onDelete(id); // Atualiza o estado no componente pai
    } catch (error) {
      if (error.response && error.response.status === 400) {
        // Erro de validação ao excluir (mensagem genérica ou personalizada do backend)
        alert(error.response.data.message || "Erro ao excluir: categoria vinculada a produtos.");
      } else if (error.response && error.response.status === 409) {
        // Erro de conflito (caso o backend envie 409 para associações)
        alert("Não é possível excluir esta categoria. Existem produtos vinculados.");
      } else {
        // Outros erros
        console.error("Erro ao excluir a categoria:", error);
        alert("Não foi possível excluir a categoria.");
      }
    }
  };

  return (
    <div>
      {categorias.map((categoria) => (
        <div
          className="flex items-center p-4 border border-gray-300 rounded-md shadow-sm hover:shadow-md transition-shadow"
          key={categoria.id}
        >
          <div className="flex-grow">
            <h2 className="text-lg font-semibold">
              {categoria.descricao} [{categoria.id}]
            </h2>
          </div>
          <button
            onClick={() => handleDelete(categoria.id)}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded-lg shadow transition-all text-sm"
          >
            Excluir
          </button>
        </div>
      ))}
    </div>
  );
}

export default CheckBox;
