import { useDispatch } from "react-redux";
import Button from "../../ui/Button";
import { decreaseItemQuantity, increaseItemQuantity } from "./cartSlice";

function UpdateItemQuantity({ pizzaId }) {
  const dispatch = useDispatch();

  return (
    <div className="flex items-center gap-1 md:gap-2">
      <Button
        type="round"
        onClick={() => {
          return dispatch(decreaseItemQuantity(pizzaId));
        }}
      >
        -
      </Button>
      <Button
        type="round"
        onClick={() => {
          return dispatch(increaseItemQuantity(pizzaId));
        }}
      >
        +
      </Button>
    </div>
  );
}

export default UpdateItemQuantity;
