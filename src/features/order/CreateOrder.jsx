import { useState } from "react";
import {
  Form,
  redirect,
  useActionData,
  useNavigate,
  useNavigation,
} from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import Button from "../../ui/Button";
import { useSelector } from "react-redux";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

const fakeCart = [
  {
    pizzaId: 12,
    name: "Mediterranean",
    quantity: 2,
    unitPrice: 16,
    totalPrice: 32,
  },
  {
    pizzaId: 6,
    name: "Vegetale",
    quantity: 1,
    unitPrice: 13,
    totalPrice: 13,
  },
  {
    pizzaId: 11,
    name: "Spinach and Mushroom",
    quantity: 1,
    unitPrice: 15,
    totalPrice: 15,
  },
];

function CreateOrder() {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const username = useSelector((store) => store.user.username);

  //Getting the Form submission data checking if some error is returned
  const formErrors = useActionData();

  // const [withPriority, setWithPriority] = useState(false);
  const cart = fakeCart;

  return (
    <div className="px-4 py-6">
      <h2 className="mb-8 text-xl font-semibold">
        Ready to order? Let&apos;s go!
      </h2>
      {/* This is the form component which React-Router Provides us */}
      <Form method="POST">
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">First Name</label>
          <div className="grow">
            <input
              defaultValue={username}
              className="input w-full"
              type="text"
              name="customer"
              required
            />
          </div>
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Phone number</label>
          <div className="grow">
            <input className="input w-full" type="tel" name="phone" required />
            {formErrors?.phone && (
              <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">
                {formErrors.phone}
              </p>
            )}
          </div>
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Address</label>
          <div className="grow">
            <input
              className="input w-full"
              type="text"
              name="address"
              required
            />
          </div>
        </div>

        <div className="mb-12 flex items-center gap-5">
          <input
            className="focus:ouline-none h-6 w-6 font-medium accent-yellow-300 transition-all duration-300 focus:ring focus:ring-yellow-300 focus:ring-offset-2"
            type="checkbox"
            name="priority"
            id="priority"
            // value={withPriority}
            // onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority">Want to yo give your order priority?</label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)}></input>
          <Button type="primary">
            {isSubmitting ? "Placing Order..." : "Order now"}
          </Button>
        </div>
      </Form>
    </div>
  );
}

//-----The Action-----//

//This will intercept the request after form subission after we connect it to the form
//The request object is provided by react only, on connecting this function to the page's action
export async function action({ request }) {
  //request.formData is a regular web api provided by the router
  const formData = await request.formData();

  //Converting to Object
  const data = Object.fromEntries(formData);

  console.log(data);

  //Creating a new order object
  const order = {
    ...data,
    //This is a fake cart coming from our hidden input with predefined value
    cart: JSON.parse(data.cart),
    priority: data.priority === "on",
  };
  //Handling Errors

  //Creating an empty error object to start with
  const errors = {};

  //Filling in the errors by checking
  if (!isValidPhone(order.phone)) {
    errors.phone =
      "Please give us your correct phone number we might need it to contact you";
  }

  //If there is even one single error we will pass the data to the component without creating the order
  if (Object.keys(errors).length > 0) {
    return errors;
  }

  //Creating a new order if everything is Correct
  const newOrder = await createOrder(order);

  //now we will import this in app to link it to the order component
  //Also we will go to the order url as soon as the order is created
  //We cannot use navigate here as this is not a component ans hooks can only be called inside components
  //So we use a new function called redirect provided by react-router
  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
