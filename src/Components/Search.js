import axios from "axios";
import { useEffect, useState } from "react";

function Search({ nome, onSearch }) {

    const [searchTerm, setSearchTerm] = useState('');

    

    const handleSearchChange = (event) => {
        const value = event.target.value;
        setSearchTerm(value);
        onSearch(value); // Passa o valor da pesquisa para o SaborBox
    };

    return (
        <div>
            <div className="w-80 mr-3">
                <div className="relative">
                    <input
                        className="py-3 ps-10 pe-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500"
                        type="text"
                        placeholder={`${nome}`}
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                </div>
            </div>
        </div>
    );
}

export default Search;
