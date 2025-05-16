import { IoSearch } from "react-icons/io5";
import debounce from "lodash.debounce";
import { useMemo } from "react";

const SearchBar = ({
  searchString,
  setSearchString,

  setDebouncedSearchString,
}: {
  searchString: string;
  setSearchString: (e: string) => void;
  setDebouncedSearchString: (e: string) => void;
}) => {
  //Creating a debounced function to delay the search input
  const debouncedValue = useMemo(
    () => debounce((value: string) => setDebouncedSearchString(value), 500),
    [],
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchString(value);
    debouncedValue(value);
  };

  return (
    <form className="relative">
      <IoSearch className="absolute top-2 left-2 h-6 w-6 text-green-800" />
      <input
        type="search"
        placeholder="Search player"
        value={searchString}
        onChange={handleSearch}
        className="h-10 w-60 cursor-pointer rounded-[5px] bg-white pl-10 focus:outline-0"
      />
    </form>
  );
};

export default SearchBar;
