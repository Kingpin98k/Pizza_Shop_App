import { useLoaderData } from "react-router-dom";
import { getMenu } from "../../services/apiRestaurant";
import MenuItem from "./MenuItem";

//This is the loader function for the component
export async function loader() {
  //fetching the menu using the service
  const menu = await getMenu();

  //now we will import this in the App
  return menu;
}

function Menu() {
  //now using the fetched data
  //this thing can replace useEffect()
  const menu = useLoaderData();
  return (
    <ul className="divide-y divide-stone-200 px-2">
      {menu.map((pizza) => (
        <MenuItem pizza={pizza} key={pizza.id} />
      ))}
    </ul>
  );
}

export default Menu;
