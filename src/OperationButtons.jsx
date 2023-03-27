import { Actions } from "./App";
export default function OperationButtons({ dispatch, Operation }) {
  return (
    <button
      onClick={() => dispatch({ type: Actions.choose, payload: { Operation } })}
    >
      {Operation}
    </button>
  );
}
