import React from "react";
import { increment, decrement, reset } from "../features/counterSlice";
import { useSelector, useDispatch } from "react-redux";

function Counter() {
  const dispatch = useDispatch();
  const value = useSelector((state) => state.counter);
  const handleIncrment = () => {
    dispatch(increment());
  };

  const handleDecrement = () => {
    dispatch(decrement());
  };

  const handleReset = () => {
    dispatch(reset());
  };
  return (
    <>
      <strong>Counter:</strong>
      {value}
      <br />
      <br />
      <button onClick={handleIncrment}>Increment</button>
      <button onClick={handleDecrement}>Decrement</button>
      <button onClick={handleReset}>Reset</button>
    </>
  );
}

export default Counter;
