import "./index.css";
import "./App.css";
import { useState, useEffect } from "react";
export default function App() {
  const [characters, setCharacters] = useState([]);
  const [page, setPage] = useState(1);
  const [pagesCount, setPagesCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [genderFilter, setGenderFilter] = useState("");
  const [speciesFilter, setSpeciesFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const genders = ["", "Male", "Female", "Genderless", "Unknown"];
  const species = [
    "",
    "Human",
    "Humanoid",
    "Alien",
    "Robot",
    "Mythological Creature",
    "Cronenberg",
    "Poopybutthole",
    "Unknown",
  ];
  const status = ["", "Alive", "Dead", "Unknown"];

  useEffect(() => {
    let apiUrl = `https://rickandmortyapi.com/api/character/?page=${page}&name=${searchTerm}`;

    if (genderFilter) {
      apiUrl += `&gender=${genderFilter}`;
    }

    if (speciesFilter) {
      apiUrl += `&species=${speciesFilter}`;
    }

    if (statusFilter) {
      apiUrl += `&status=${statusFilter}`;
    }

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        setCharacters(data.results || []);
        setPagesCount(data.info.pages);
      })
      .catch((error) => {
        console.error("Error fetching characters:", error);
      });
  }, [page, searchTerm, genderFilter, speciesFilter, statusFilter]);

  const nextPage = () => {
    if (page < pagesCount) {
      setPage(page + 1);
    }
  };

  const prevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const firstPage = () => {
    setPage(1);
  };

  const lastPage = () => {
    setPage(pagesCount);
  };

  const changePage = (pageNumber) => {
    setPage(pageNumber);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setPage(1);
  };

  const handleGenderFilterChange = (event) => {
    setGenderFilter(event.target.value);
    setPage(1);
  };

  const handleSpeciesFilterChange = (event) => {
    setSpeciesFilter(event.target.value);
    setPage(1);
  };

  const handleStatusFilterChange = (event) => {
    setStatusFilter(event.target.value);
    setPage(1);
  };

  const resetFilters = () => {
    setSearchTerm("");
    setGenderFilter("");
    setSpeciesFilter("");
    setStatusFilter("");
    setPage(1);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    let maxPageCounter = pagesCount - page > 3 ? 3 : pagesCount - page;
    let minPageCounter = page - 3 > 0 ? 3 : page - 1;
    for (let i = page - minPageCounter; i <= page + maxPageCounter; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => changePage(i)}
          className={i === page ? "active" : ""}
        >
          {i}
        </button>
      );
    }

    return pageNumbers;
  };

  const CharacterList = () => {
    return (
      <div className="gallery">
        {characters.map((character) => (
          <div key={character.id} className="character-card">
            <img src={character.image} alt={character.name} />
            <h2>{character.name}</h2>
            <p>Status: {character.status}</p>
            <p>Species: {character.species} </p>
            <p>Gender: {character.gender}</p>
            <p>Origin: {character.origin.name}</p>
          </div>
        ))}
      </div>
    );
  };

  const Pagination = () => {
    return (
      <div className="pagination">
        <button onClick={firstPage} disabled={page === 1}>
          {" "}
          &#60;&#60;{" "}
        </button>
        <button onClick={prevPage} disabled={page === 1}>
          {" "}
          &#60;{" "}
        </button>
        {renderPageNumbers()}
        <button onClick={nextPage} disabled={page === pagesCount}>
          {" "}
          &#62;{" "}
        </button>
        <button onClick={lastPage} disabled={page === pagesCount}>
          {" "}
          &#62;&#62;{" "}
        </button>
      </div>
    );
  };

  return (
    <div className="App">
      <img
        className="app-logo"
        src="/Rick-and-Morty.png"
        alt="Rick and Morty Logo"
      />

      <div className="search">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search character"
        />
        <select value={statusFilter} onChange={handleStatusFilterChange}>
          {status.map((status, index) => (
            <option key={index} value={status}>
              {status ? status : "All status"}
            </option>
          ))}
        </select>

        <select value={speciesFilter} onChange={handleSpeciesFilterChange}>
          {species.map((species, index) => (
            <option key={index} value={species}>
              {species ? species : "All species"}
            </option>
          ))}
        </select>

        <select value={genderFilter} onChange={handleGenderFilterChange}>
          {genders.map((gender, index) => (
            <option key={index} value={gender}>
              {gender ? gender : "All genders"}
            </option>
          ))}
        </select>

        <button className="reset" onClick={resetFilters}>
          {" "}
          Reset filters{" "}
        </button>
      </div>
      {characters.length > 0 ? (
        <div>
          {" "}
          <CharacterList /> <Pagination />
        </div>
      ) : (
        <p> Character not found. </p>
      )}
    </div>
  );
}
