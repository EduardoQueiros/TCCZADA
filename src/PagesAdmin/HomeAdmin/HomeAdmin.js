import Box from "./ComponentsHomeAdmin/Box";

function HomeAdmin() {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-blue-100 min-h-screen flex flex-col items-center">
      {/* Cabeçalho */}
      <header className="w-full py-6 bg-blue-600 text-white shadow-lg">
        <h1 className="text-4xl font-bold text-center">Painel Administrativo</h1>
      </header>

      {/* Seção Principal */}
      <main className="flex-grow w-full max-w-7xl p-6">
        {/* Subtítulo */}
        <h2 className="text-2xl font-semibold text-blue-700 text-center mb-8">
          Gerencie todas as operações do sistema
        </h2>

        {/* Container Grid com 2 Linhas e 3 Colunas */}
        <div className="grid grid-rows-2 grid-cols-3 gap-8">
          <Box
            image={"https://img.icons8.com/?size=100&id=47820&format=png&color=000000"}
            name={"Pedidos"}
            linkPage={"/admin/home/pedido"}
            iconName={"pedidoIcon"}
          />
          <Box
            image={"https://img.icons8.com/?size=100&id=56793&format=png&color=000000"}
            name={"Relatórios"}
            linkPage={"/admin/home/relatorio"}
            iconName={"relatorioIcon"}
          />
          <Box
            image={"https://img.icons8.com/?size=100&id=7EcFNZ193FeV&format=png&color=000000"}
            name={"Produtos"}
            linkPage={"/admin/home/produto"}
            iconName={"produtoIcon"}
          />
          <Box
            image={"https://img.icons8.com/?size=100&id=25109&format=png&color=000000"}
            name={"Categoria"}
            linkPage={"/admin/home/categoria"}
            iconName={"categoriaIcon"}
          />
          <Box
            image={"https://img.icons8.com/?size=100&id=vFqlDrzMYOT0&format=png&color=000000"}
            name={"Dashboard"}
            linkPage={"/admin/home/dashboard"}
            iconName={"dashIcon"}
          />
          <Box
            image={"https://img.icons8.com/?size=100&id=543&format=png&color=000000"}
            name={"Mesas"}
            linkPage={"/admin/home/mesa"}
            iconName={"mesaIcon"}
          />
        </div>
      </main>

      {/* Rodapé */}
      <footer className="w-full py-4 bg-blue-600 text-center text-white text-sm shadow-md">
        © 2024 - Sistema Administrativo
      </footer>
    </div>
  );
}

export default HomeAdmin;
