import { useFetcher } from "react-router-dom";
import Button from "../../ui/Button";
import { updateOrder } from "../../services/apiRestaurant";

function UpdateOrder({ order }) {
  const fetcher = useFetcher();

  return (
    <fetcher.Form method="patch" className="text-right">
      <Button type="primary" disabled={fetcher.state !== "idle"}>
        {fetcher.state === "idle" ? "Make Priority" : "loading..."}
      </Button>
    </fetcher.Form>
  );
}

export default UpdateOrder;

export async function action({ request, params }) {
  //   console.log("update");

  const data = { priority: true };

  //We are just updating the api info since the form will make the page to reernder and so the new info will be displayed as soon as the form is submitted

  await updateOrder(params.orderId, data);

  return null;
}
