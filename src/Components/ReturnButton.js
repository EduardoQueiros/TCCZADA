function ReturnButton({linkPage}){
    return(
        <div>
            <a href={`${linkPage}`}>
                <button className="bg-gray-200 rounded-full">
                    <img src="https://img.icons8.com/?size=100&id=89208&format=png&color=000000" 
                    alt="returnIcon"
                    width={40}
                    />

                </button>
            </a>
        </div>
    )
}

export default ReturnButton