import React, { useEffect, useState } from "react";
import ProductDetails from "./Components/ProductDetails";
import IsLoading from "./Components/IsLoading";
import IsError from "./Components/IsError";

const App = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`https://api.sampleapis.com/beers/ale`);
      const finalResponse = await response.json();
      setData(finalResponse);
      setIsLoading(false);
    } catch (error) {
      setIsError(true);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const searchedData = data.filter((item) =>
    item.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  if (isLoading) {
    return <IsLoading />;
  }
  return (
    <>
      <div className="h-10 mt-4">
        <label className="ml-10 font-semibold">
          Search Products:
          <input
            type="search"
            name="searchValue"
            value={searchValue}
            placeholder="search data"
            onChange={(e) => setSearchValue(e.target.value)}
            className="border-2 ml-2 w-[300px] h-full rounded-md"
          />
        </label>
      </div>
      <div className="grid grid-cols-4 items-center gap-4 mt-4">
        {searchedData.map((items) => (
          <ProductDetails key={items.id} {...items} />
        ))}
      </div>
    </>
  );
};

export default App;
