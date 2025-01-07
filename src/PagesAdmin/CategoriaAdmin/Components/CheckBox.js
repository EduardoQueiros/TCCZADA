import axios from "axios";
import Swal from "sweetalert2";

function CheckBox({ categorias, onDelete }) {
  if (!categorias || categorias.length === 0) {
    return (
      <div className="text-center text-lg text-gray-600">
        Nenhuma categoria encontrada.
      </div>
    );
  }

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Tem certeza?",
      text: `Você deseja excluir a categoria com ID ${id}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sim, excluir!",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete("http://localhost:9091/api/v1/tipo-produto", {
            headers: {
              "Content-Type": "application/json",
            },
            data: [id],
          });
          Swal.fire("Excluído!", "A categoria foi excluída com sucesso.", "success");
          onDelete(id);
        } catch (error) {
          if (error.response?.status === 400 || error.response?.status === 409) {
            Swal.fire(
              "Erro",
              error.response.data.message || "Não é possível excluir a categoria vinculada a produtos.",
              "error"
            );
          } else {
            Swal.fire("Erro", "Erro ao excluir a categoria.", "error");
          }
        }
      }
    });
  };

  return (
    <div>
      {categorias.map((categoria) => (
        <div
          className="flex items-center p-4 border border-gray-300 rounded-md shadow-sm hover:shadow-md transition-shadow"
          key={categoria.id}
        >
          <div className="flex-grow">
            <h2 className="text-lg font-semibold text-blue-700">
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
