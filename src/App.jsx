import "./index.css";
import { useReducer } from "react";
import DigitButtons from "./DigitButtons.jsx";
import OperationButtons from "./OperationButtons.jsx";
export const Actions = {
  add_digit: "add-digit",
  choose: "choose-operation",
  clear: "clear",
  delete: "delete-digit",
  evaluate: "evaluate",
};
function reducer(state, { type, payload }) {
  switch (type) {
    case Actions.add_digit:
      if (state.overwrite) {
        return {
          ...state,
          currentOperand: payload.digit,
          overwrite: false,
        };
      }
      if (payload.digit === "0" && state.currentOperand === "0") return state;
      if (payload.digit === "." && state.currentOperand.includes("."))
        return state;

      return {
        ...state,
        currentOperand: `${state.currentOperand || ""}${payload.digit}`,
      };
    case Actions.choose:
      if (state.currentOperand == null && state.previousOperand == null) {
        return state;
      }
      if (state.currentOperand == null) {
        return {
          ...state,
          Operation: payload.Operation,
        };
      }
      if (state.previousOperand == null) {
        return {
          ...state,
          Operation: payload.Operation,
          previousOperand: state.currentOperand,
          currentOperand: null,
        };
      }
      return {
        ...state,
        previousOperand: evaluate(state),
        Operation: payload.Operation,
        currentOperand: null,
      };
    case Actions.clear:
      return {};
    case Actions.delete:
      if (state.overwrite) {
        return {
          ...state,
          overwrite: false,
          currentOperand: null,
        };
      }
      if (state.currentOperand == null) return state;
      if (state.currentOperand.length === 1) {
        return { ...state, currentOperand: null };
      }
      return {
        ...state,
        currentOperand: state.currentOperand.slice(0, -1),
      };
    case Actions.evaluate:
      if (
        state.Operation == null ||
        state.currentOperand == null ||
        state.previousOperand == null
      ) {
        return state;
      }
      return {
        ...state,
        overwrite: true,
        previousOperand: null,
        Operation: null,
        currentOperand: evaluate(state),
      };
  }
}
function evaluate({ currentOperand, previousOperand, Operation }) {
  const prev = parseFloat(previousOperand);
  const current = parseFloat(currentOperand);
  if (isNaN(prev) || isNaN(current)) return "";
  let computation = "";
  switch (Operation) {
    case "+":
      computation = prev + current;
      break;
    case "-":
      computation = prev - current;
      break;
    case "/":
      computation = prev / current;
      break;
    case "*":
      computation = prev * current;
      break;
  }
  return computation.toString();
}
function App() {
  const [{ currentOperand, previousOperand, Operation }, dispatch] = useReducer(
    reducer,
    {}
  );

  return (
    <div className="calculator-grid">
      <div className="output">
        <div className="previous-operand">
          {previousOperand}
          {Operation}
        </div>
        <div className="current-operand">{currentOperand}</div>
      </div>
      <button
        className="span-two"
        onClick={() => dispatch({ type: Actions.clear })}
      >
        AC
      </button>
      <button onClick={() => dispatch({ type: Actions.delete })}>DEL</button>
      <OperationButtons Operation="/" dispatch={dispatch} />
      <DigitButtons digit="1" dispatch={dispatch} />
      <DigitButtons digit="2" dispatch={dispatch} />
      <DigitButtons digit="3" dispatch={dispatch} />
      <OperationButtons Operation="*" dispatch={dispatch} />
      <DigitButtons digit="4" dispatch={dispatch} />
      <DigitButtons digit="5" dispatch={dispatch} />
      <DigitButtons digit="6" dispatch={dispatch} />
      <OperationButtons Operation="+" dispatch={dispatch} />
      <DigitButtons digit="7" dispatch={dispatch} />
      <DigitButtons digit="8" dispatch={dispatch} />
      <DigitButtons digit="9" dispatch={dispatch} />
      <OperationButtons Operation="-" dispatch={dispatch} />
      <DigitButtons digit="." dispatch={dispatch} />
      <DigitButtons digit="0" dispatch={dispatch} />
      <button
        className="span-two"
        onClick={() => dispatch({ type: Actions.evaluate })}
      >
        =
      </button>
    </div>
  );
}
export default App;
