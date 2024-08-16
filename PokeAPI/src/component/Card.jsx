import PropTypes from "prop-types";
import axios from "axios";
import { useEffect, useState } from "react";
import { GrFormNext } from "react-icons/gr";
import { GrFormPrevious } from "react-icons/gr";

const Card = ({ onData }) => {
  const [pokemon, setPokemon] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [isLastPage, setIsLastPage] = useState(false);
  const [detailPokemon, setDetailPokemon] = useState(null);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); // State untuk error
  const itemsPerPage = 6;

  const fetchApi = async (offset = 0) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `http://localhost:3000/pokemon?limit=${itemsPerPage}&offset=${offset}`
      );

      const pokemonData = await Promise.all(
        response.data.results.map(async (item) => {
          const detailsResponse = await axios.get(item.url);
          return { ...item, details: detailsResponse.data };
        })
      );

      setPokemon(pokemonData);
      setIsLastPage(response.data.results.length < itemsPerPage);
    } catch (error) {
      console.log(error);
      setError("Gagal mengambil data dari API. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  const detail = async (pokemonName) => {
    try {
      if (selectedPokemon === pokemonName) {
        clearDetail();
      } else {
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
        );

        setDetailPokemon(response.data);
        setSelectedPokemon(pokemonName);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const clearDetail = () => {
    setDetailPokemon(null);
    setSelectedPokemon(null);
  };

  useEffect(() => {
    fetchApi(currentPage * itemsPerPage);
  }, [currentPage]);

  const handleNext = () => {
    setCurrentPage((prevPage) => prevPage + 1);
    clearDetail(); // Bersihkan detail saat pindah halaman
  };

  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage((prevPage) => prevPage - 1);
      clearDetail();
    }
  };

  const filteredPokemon = pokemon.filter((data) =>
    data.name.toLowerCase().includes(onData)
  );

  return (
    <>
      <h1 className="text-center mt-3 text-2xl font-medium text-white font-mono">
        Pilih salah satu pokemon untuk detail
      </h1>
      {/* Card */}
      <div className="flex flex-row">
        <div className="w-[940px] flex flex-wrap ml-5 mt-4">
          {loading ? (
            <div className="w-full text-center mt-4 text-white bg-blue-500 h-6">
              Loading...
            </div>
          ) : error ? ( // Tampilkan pesan error jika terjadi error
            <div className="w-full text-center mt-4 text-white bg-red-900 h-6">
              {error}
            </div>
          ) : filteredPokemon.length > 0 ? (
            filteredPokemon.map((data, index) => (
              <div
                className={`rounded-lg shadow-lg bg-white mt-6 w-72 p-4 ml-5 cursor-pointer ${
                  selectedPokemon === data.name
                    ? "border-4 border-orange-400"
                    : ""
                }`}
                key={index}
                onClick={() => detail(data.name)}
              >
                <img
                  className="w-36 object-cover mx-auto"
                  src={data.details.sprites.front_default}
                  alt={data.name}
                />
                <div className="font-bold text-xl mb-2 text-center bg-orange-400 rounded-md mt-5 text-black">
                  {data.name}
                </div>
              </div>
            ))
          ) : (
            <div className="w-full text-center mt-4 text-white bg-red-900 h-6">
              Pokémon yang dicari tidak ada
            </div>
          )}
        </div>
        {/* Detail Pokemon */}
        {detailPokemon && (
          <div className="bg-white w-[320px] ml-5 mt-10 rounded-xl shadow-lg items-center">
            <h1 className="text-black text-center mt-4 font-bold text-3xl">
              {detailPokemon.name}
            </h1>
            <img
              className="w-52 object-cover mx-auto mt-3"
              src={detailPokemon.sprites.front_default}
              alt={detailPokemon.name}
            />
            <div className="flex flex-row gap-3 mt-5">
              <div className="mx-auto flex flex-row gap-4">
                {detailPokemon.types.map((typeInfo, index) => (
                  <h1
                    key={index}
                    className="bg-orange-400 p-2 rounded-md text-center font-bold"
                  >
                    {typeInfo.type.name}
                  </h1>
                ))}
              </div>
            </div>
            {detailPokemon.abilities.map((item, index) => (
              <div className="mt-3 ml-5" key={index}>
                <h1 className="font-bold text-lg">{item.ability.name}</h1>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mt-2 w-8/12 flex flex-row justify-end ml-8 mb-3 gap-3">
        {currentPage > 0 && (
          <button
            className="text-4xl text-white bg-red-900"
            onClick={handlePrevious}
          >
            <GrFormPrevious />
          </button>
        )}
        {!isLastPage && (
          <button
            className="text-4xl text-white bg-red-900"
            onClick={handleNext}
          >
            <GrFormNext />
          </button>
        )}
      </div>
    </>
  );
};

Card.propTypes = {
  onData: PropTypes.any.isRequired,
};

export default Card;
