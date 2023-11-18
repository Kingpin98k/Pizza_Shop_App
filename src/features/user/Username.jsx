import { useSelector } from "react-redux";

function Username() {
  //Getting the username from the store
  //useSelector(store=>store.reducer.property)
  const username = useSelector((state) => state.user.username);

  if (!username) return null;

  return (
    <div className="hidden text-sm font-semibold md:block">{username}</div>
  );
}

export default Username;
