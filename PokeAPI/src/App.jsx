import { useState } from "react";
import Card from "./component/Card";
import Navbar from "./component/Navbar";

function App() {
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (term) => {
    setSearchResults(term);
  };

  // console.log(searchResults);
  return (
    <>
      <Navbar onSearch={handleSearch} />
      <Card onData={searchResults} />
    </>
  );
}

export default App;
