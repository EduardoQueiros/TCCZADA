import { Routes, Route } from "react-router-dom";
import './App.css';
import Preferencias from "./Pages/Home/View/Preferencias";
import LoginPage from "./Pages/Login/View/LoginPage";
import SaboresPage from "./Pages/Sabores/View/SaboresPage";
import LoginAdminPage from "./PagesAdmin/LoginAdmin/LoginAdminPage";
import HomeAdmin from "./PagesAdmin/HomeAdmin/HomeAdmin";
import PedidoPageAdminView from "./PagesAdmin/PedidoAdmin/View/PedidoPageAdminView";
import MaisPedidoView from "./PagesAdmin/PedidoAdmin/View/MaisPedidoView";
import CategoriaAdminPage from "./PagesAdmin/CategoriaAdmin/View/CategoriaAdminPageView";
import CadastroCategoria from "./PagesAdmin/CategoriaAdmin/View/CadastroCategoriaView";
import ProdutoAdminPage from "./PagesAdmin/ProdutoAdmin/View/ProdutoAdminPageView";
import CadastrarProduto from "./PagesAdmin/ProdutoAdmin/View/CadastrarProdutoView";
import EditarProduto from "./PagesAdmin/ProdutoAdmin/View/EditarProdutoView";
import RelatorioAdminPage from "./PagesAdmin/RelatorioAdmin/View/RelatorioAdminPage";
import DashPage from "./PagesAdmin/DashAdmin/View/DashPage";
import AdcionaisPage from "./Pages/Adicionais/View/AdicionaisPage";
import MesaAdminPage from "./PagesAdmin/MesaAdmin/View/MesaAdminPageView";
import CadastrarMesa from "./PagesAdmin/MesaAdmin/View/CadastrarMesaView";
import FinalizacaoPage from "./Pages/Home/View/FinalizacaoPage";

function App() {
  return (
    <div>
      <Routes>
        {/* Rotas do Cliente */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/Preferencias" element={<Preferencias />} />
        <Route path="/Preferencias/Sabores" element={<SaboresPage />} />
        <Route path="/Preferencias/Adicionais" element={<AdcionaisPage />} />
        <Route path="/Preferencias/Finalizacao" element={<FinalizacaoPage/>}/>

        {/* Rotas do Admin */}
        <Route path="/admin" element={<LoginAdminPage />} />
        <Route path="/admin/home" element={<HomeAdmin />} />
        <Route path="/admin/home/pedido" element={<PedidoPageAdminView />} />
        <Route path="/admin/home/pedido/maispedido" element={<MaisPedidoView />} />
        <Route path="/admin/home/categoria" element={<CategoriaAdminPage />} />
        <Route path="/admin/home/categoria/cadastro" element={<CadastroCategoria />} />
        <Route path="/admin/home/produto" element={<ProdutoAdminPage />} />
        <Route path="/admin/home/produto/cadastrar" element={<CadastrarProduto />} />
        <Route path="/admin/home/produto/editar/:id" element={<EditarProduto />} /> {/* Rota ajustada */}
        <Route path="/admin/home/relatorio" element={<RelatorioAdminPage />} />
        <Route path="/admin/home/dashboard" element={<DashPage />} />
        <Route path="/admin/home/mesa" element={<MesaAdminPage />} />
        <Route path="/admin/home/mesa/cadastro" element={<CadastrarMesa />} />
      </Routes>
    </div>
  );
}

export default App;
