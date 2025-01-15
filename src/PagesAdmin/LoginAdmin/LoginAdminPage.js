function LoginAdminPage() {

    return (
        <div>
            <div className="bg-gray-200 min-h-screen">
                <section className="flex justify-center align-center">
                    <div className=" p-2 mt-36 ">
                        <div>
                            <img src="https://centralinaaging.org/wp-content/uploads/2021/03/Your-Logo-here.png" alt="Logo" />
                        </div>
                    </div>
                </section>

                <section className="flex justify-center items-center mt-36">
                    <div className="flex flex-col items-center space-y-4">
                        <div >
                            <input
                                type="text"
                                placeholder="User"
                                className="text-center border border-gray-950 rounded-full p-3 w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />

                        </div>
                        <div >
                            <input
                                type="password"
                                placeholder="Password"
                                className="text-center border border-gray-950 rounded-full p-3 w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />

                        </div>
                    </div>
                </section>

                <section className="flex justify-center items-center mt-10">
                    <div className="flex flex-col items-center space-y-4">
                        <a href="/admin/home" className="bg-slate-500 p-2 w-20 rounded-lg text-center">
                            Login
                        </a>
                    </div>
                </section>

            </div>
        </div>
    )
}

export default LoginAdminPage