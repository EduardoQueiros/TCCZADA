function BotaoDashPedidos({ name, linkPage }) {
    return (
        <div>
            <a href={`${linkPage}`}>
                <button className="
                bg-gray-200
                w-32
                h-10
                rounded-lg
                font-bold
                hover:bg-blue-500
                hover:text-white
                
                
                ">
                    {`${name}`}
                </button>
            </a>
        </div>
    )
}

export default BotaoDashPedidos