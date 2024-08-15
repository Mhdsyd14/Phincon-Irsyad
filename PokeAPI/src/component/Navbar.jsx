import { useState } from "react";
import PropTypes from "prop-types";

const Navbar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <div className="w-full h-[110px] bg-red-600 flex items-center">
      <div className="mx-auto flex flex-row items-center w-10/12 justify-center">
        <div className="flex items-center">
          <img src="/pokemon.png" alt="Pokemon" className="h-20 object-cover" />
          <input
            type="text"
            placeholder="Search Pokémon..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400 ml-5 w-96"
          />
          <h2 className="font-bold text-4xl text-white ml-10">PokeApi</h2>
        </div>
      </div>
    </div>
  );
};
Navbar.propTypes = {
  onSearch: PropTypes.func.isRequired, // Ensure onSearch is a function and required
};

export default Navbar;
