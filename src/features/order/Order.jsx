// Test ID: IIDSAT

import { useLoaderData } from "react-router-dom";
import { getOrder } from "../../services/apiRestaurant";
import {
	calcMinutesLeft,
	formatCurrency,
	formatDate,
} from "../../utils/helpers";

function Order() {
	//using the loader data to show the order detalis on loading
	const order = useLoaderData();

	// Everyone can search for all orders, so for privacy reasons we're gonna gonna exclude names or address, these are only for the restaurant staff
	const {
		id,
		status,
		priority,
		priorityPrice,
		orderPrice,
		estimatedDelivery,
		cart,
	} = order;
	const deliveryIn = calcMinutesLeft(estimatedDelivery);

	return (
		<div>
			<div>
				<h2>Status</h2>

				<div>
					{priority && <span>Priority</span>}
					<span>{status} order</span>
				</div>
			</div>

			<div>
				<p>
					{deliveryIn >= 0
						? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😃`
						: "Order should have arrived"}
				</p>
				<p>(Estimated delivery: {formatDate(estimatedDelivery)})</p>
			</div>

			<div>
				<p>Price pizza: {formatCurrency(orderPrice)}</p>
				{priority && <p>Price priority: {formatCurrency(priorityPrice)}</p>}
				<p>To pay on delivery: {formatCurrency(orderPrice + priorityPrice)}</p>
			</div>
		</div>
	);
}

//We cannnot get the params using the useParams hook, but this only works inside components
export async function loader({ params }) {
	//But react-router gives us the object with the params in it
	const order = await getOrder(params.orderId);

	//We also need to return some content
	return order;
}

export default Order;
