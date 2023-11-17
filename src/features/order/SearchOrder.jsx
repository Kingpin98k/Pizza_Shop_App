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
