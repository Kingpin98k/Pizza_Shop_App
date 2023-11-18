import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function SearchOrder() {
  const [query, setQuery] = useState("");

  const navigate = useNavigate();

  //On form submission go to the orders and also add the order id to the url
  function handleSubmit(e) {
    e.preventDefault();
    if (!query) return;

    navigate(`/order/${query}`);
    setQuery("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        className="w-28 rounded-full bg-yellow-100 px-4 py-2 text-[9px] transition-all duration-300 placeholder:text-stone-400 focus:outline-none focus:ring focus:ring-yellow-600 focus:ring-opacity-50 sm:w-64 sm:text-sm sm:focus:w-72"
        placeholder="Search Order #"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
        }}
      ></input>
    </form>
  );
}

export default SearchOrder;
