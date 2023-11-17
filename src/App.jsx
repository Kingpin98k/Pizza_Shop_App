import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./ui/Home";
//This is a way of importing default and named imports from the same file
import Menu, { loader as menuLoader } from "./features/menu/Menu";
import Cart from "./features/cart/Cart";
import Order, { loader as orderloader } from "./features/order/Order";
import CreateOrder, {
	action as createOrderAction,
} from "./features/order/CreateOrder";
import AppLayout from "./ui/AppLayout";
import Error from "./ui/Error";

//The new way of creating a router in React
//this also fetches the data while loading
const router = createBrowserRouter([
	{
		element: <AppLayout />,
		errorElement: <Error />,
		children: [
			{
				path: "/",
				element: <Home />,
			},
			{
				path: "/menu",
				element: <Menu />,
				loader: menuLoader,
			},
			{
				path: "/cart",
				element: <Cart />,
			},
			{
				path: "/order/:orderId",
				element: <Order />,
				//placing the loader for the order
				loader: orderloader,
				errorElement: <Error />,
			},
			{
				path: "/order/new",
				element: <CreateOrder />,
				//whenever there will be a new '<Form/>' submission on this route the specified action function will be called
				action: createOrderAction,
			},
		],
	},
]);

function App() {
	return <RouterProvider router={router} />;
}

export default App;
