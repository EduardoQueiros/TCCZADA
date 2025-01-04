function Box({ image, iconName, name, linkPage }) {
    return (
      <div className="flex flex-col items-center">
        <a href={linkPage}>
          <button
            className="
              w-24 h-24 
              bg-white 
              rounded-lg 
              shadow-lg 
              hover:shadow-xl 
              hover:bg-gray-100 
              transition-shadow 
              duration-300 
              ease-in-out 
              focus:outline-none 
              focus:ring-2 
              focus:ring-indigo-500  
              flex 
              justify-center 
              items-center                                     
            "
          >
            <img src={image} alt={iconName} width={60} />
          </button>
        </a>
        <p className="text-center font-bold text-gray-700 mt-2">{name}</p>
      </div>
    );
  }
  
  export default Box;
  