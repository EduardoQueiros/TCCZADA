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
    <div className="bg-gradient-to-b from-blue-50 to-blue-100 min-h-screen flex flex-col">
      {/* Cabeçalho fixo */}
      <div className="sticky top-0 z-20 bg-blue-600 shadow-lg w-full">
        <header className="flex items-center justify-between px-4 py-4 max-w-4xl mx-auto">
          <ReturnButton linkPage={"/Preferencias"} />
          <h1 className="font-bold text-3xl text-white text-center flex-grow">
            Sabores
          </h1>
        </header>
        <div className="bg-white shadow-md">
          <div className="px-4 py-4 max-w-4xl mx-auto">
            <Search nome="Pesquise seu Sabor!" onSearch={handleSearch} />
          </div>
        </div>
      </div>

      {/* Conteúdo */}
      <main className="flex-grow px-4 pb-16 w-full max-w-4xl mt-4">
        <section>
          <SaborBox searchTerm={searchTerm} />
        </section>
      </main>
    </div>
  );
}

export default SaboresPage;
