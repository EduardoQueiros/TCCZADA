import ReturnButton from "../../../Components/ReturnButton";
import Search from "../../../Components/Search";
import SaborBox from "./SaborBox";
import { useState } from "react";

function SaboresPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  return (
    <div className="bg-orange-100 min-h-screen flex flex-col">
      {/* Cabeçalho */}
      <header className="bg-gradient-to-r from-orange-500 to-orange-400 shadow-md sticky top-0 z-10">
        <div className="flex items-center justify-between px-4 py-3">
          <ReturnButton linkPage={"/Preferencias"} />
          <h1 className="text-white font-bold text-2xl">Sabores</h1>
          <div className="w-10"></div> {/* Placeholder para alinhamento */}
        </div>
      </header>

      {/* Conteúdo */}
      <main className="flex-1 p-4">
        {/* Barra de Pesquisa */}
        <section className="flex justify-center mb-6">
          <Search
            nome={"Pesquise seu Sabor!"}
            onSearch={handleSearch}
            className="w-full max-w-lg"
          />
        </section>

        {/* Lista de Sabores */}
        <section className="mt-4">
          <SaborBox searchTerm={searchTerm} />
        </section>
      </main>
    </div>
  );
}

export default SaboresPage;
