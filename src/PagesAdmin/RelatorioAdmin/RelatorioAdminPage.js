import RelPedidoPorMesa from "./Components/RelPedidoPorMesa";
import FiltrosRelatorio from "./Components/FiltrosRelatorio";
import ReturnButton from "../../Components/ReturnButton";
import { useState } from "react";

function RelatorioAdminPage() {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');


    return (
        <div className="bg-orange-200 min-h-screen">
            <div className="p-2"></div>

            <div className="flex">
                <div className="ml-3">
                    <ReturnButton linkPage={"/admin/home"} />
                </div>
                <div className="ml-16 text-center">
                    <h1 className="font-bold text-4xl text-white">Relatorios</h1>
                </div>
            </div>

            <section>
                <div className="bg-gray-200 mt-6 p-2 ml-2 me-2 rounded-xl bg-opacity-45">
                    <FiltrosRelatorio setStartDate={setStartDate} setEndDate={setEndDate} />
                    
                </div>
            </section>

            <section>
                <div>
                    <RelPedidoPorMesa startDate={startDate} endDate={endDate}
                    
                    />
                    
                </div>
            </section>
        </div>
    );
}

export default RelatorioAdminPage;
