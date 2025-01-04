import ReturnButton from "../../Components/ReturnButton";
import FiltrosRelatorio from "../RelatorioAdmin/Components/FiltrosRelatorio";
import Grafico from "./Components/Grafico";

function Dash() {
  return (
    <div className="bg-orange-200 min-h-screen">
            <div className="p-2"></div>
            
            <div className="flex">
                <div className="ml-3">
                <ReturnButton linkPage={"/admin/home"}/>
                </div>   
                <div className="ml-16 text-center">
                <h1 className="font-bold text-4xl text-white">DashBoard</h1>
                </div>
            </div>

            <section>
                <div className="bg-gray-200 mt-6 p-2 ml-2 me-2 rounded-t-xl bg-opacity-45
                ">
                <FiltrosRelatorio/>
                </div>
            </section>

            <section className="bg-gray-200 p-2 bg-opacity-45 ml-2 me-2">
                <div className="flex justify-center mt-24 bg=">
                    <Grafico/>
                    
                </div>
            </section>
            
            <div className="bg-gray-200 p-4 bg-opacity-45 ml-2 me-2 rounded-b-xl"></div>


    </div>
  );
}
export default Dash;