import { Search } from "@mui/icons-material";
import { CircularProgress } from "@mui/material";
import { useState } from "react";
import _ from "lodash";

const SearchInput = ({ qs, onSearch, disabled = false }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = _.debounce((value) => {
    onSearch(value || "");
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, 400);

  return (
    <div className="mx-auto w-full text-black relative">
      <input
        type="text"
        name="search"
        placeholder="Search..."
        disabled={disabled}
        onKeyUp={(e) => {
          setIsLoading(true);
          handleSearch(e.target.value);
        }}
        className="w-full h-10 px-4 text-sm border rounded-md focus:outline-none focus:border-royalBlue-700"
      />
      <div className="absolute top-0 right-0 my-2 mr-3 cursor-pointer">
        {isLoading ? (
          <CircularProgress size={20} color="inherit" />
        ) : (
          <Search className="text-royalBlue-700" />
        )}
      </div>
    </div>
  );
};

export default SearchInput;
