import { useState } from "react";

export default function App() {
  const [expression, setExpression] = useState("");
  const [current, setCurrent] = useState("0");

  const isOperator = (operator: string) => {
    return /[-+/*]/.test(operator);
  };

  const display = (symbol: string) => {
    if (symbol === "clear") {
      reset();
    } else if (symbol === "=") {
      calculate();
    } else if (isOperator(symbol)) {
      handleOperator(symbol);
    } else if (symbol === ".") {
      handleDecimal(symbol);
    } else if (symbol === "0") {
      handleZeroes(symbol);
    } else {
      setCurrent(expression + symbol);
      setExpression((prev) => prev + symbol);
    }
  };

  const reset = () => {
    setExpression("");
    setCurrent("0");
  };

  const handleOperator = (operator: string) => {
    setCurrent(expression + operator);
    setExpression((prev) => prev + operator);
  };

  const handleDecimal = (decimal: string) => {
    // Split the current expression by operators to get the last number
    const lastNumber = expression.split(/[-+*/]/).pop();
    // Check if the last number already contains a decimal point
    if (!lastNumber?.includes(".")) {
      // If not, add the decimal point to the last number
      setExpression((prev) => prev + decimal);
      setCurrent((prev) => prev + decimal);
    }
  };

  const handleZeroes = (zero: string) => {
    if (expression === "0") return;
    else if (expression === "") {
      // If expression is empty, set it to "0"
      setExpression("0");
    } else if (expression === "0.") {
      // Allow "0." to represent a decimal number
      setExpression((prev) => prev + zero);
      setCurrent((prev) => prev + zero);
    } else if (!expression.startsWith("0")) {
      // If expression doesn't start with "0", add "0"
      setExpression((prev) => prev + zero);
      setCurrent((prev) => prev + zero);
    } else if (expression.includes(".")) {
      setExpression((prev) => prev + zero);
      setCurrent((prev) => prev + zero);
    }
  };

  const calculate = () => {
    if (isOperator(expression.charAt(expression.length - 1))) return;
    // If last char of expression is an operator, do nothing
    const answer: string = eval(expression.toString());
    setExpression(answer);
    setCurrent(answer);
  };

  return (
    <div
      id="app"
      className=" h-screen flex justify-center items-center text-slate-200"
    >
      <div className=" calc-wrap bg-slate-950 p-[2px] max-w-[350px]">
        <div className="display-wrap m-[2px] break-words">
          <div
            id="display"
            className="bg-transparent mt-1 text-right pr-[2px] text-slate-200 text-lg min-h-[30px]"
          >
            {current}
          </div>
          <div
            id="expression-display"
            className=" bg-transparent text-right pr-1 text-slate-400 text-base min-h-[30px]"
          >
            {expression}
          </div>
        </div>
        <div className="grid-wrap grid grid-cols-4 gap-[2px] m-1 min-h-[350px] min-w-[339px]">
          <button
            onClick={() => display("clear")}
            id="clear"
            className=" bg-red-900 col-start-1 col-end-3 hover:brightness-110 active:shadow-inner active:shadow-slate-950"
          >
            AC
          </button>
          <button
            onClick={() => display("/")}
            id="divide"
            className=" bg-slate-600 hover:brightness-110 active:shadow-inner active:shadow-slate-950"
          >
            /
          </button>
          <button
            onClick={() => display("*")}
            id="multiply"
            className=" bg-slate-600 hover:brightness-110 active:shadow-inner active:shadow-slate-950"
          >
            *
          </button>
          <button
            onClick={() => display("7")}
            id="seven"
            className=" bg-slate-500 hover:brightness-110 active:shadow-inner active:shadow-slate-950"
          >
            7
          </button>
          <button
            onClick={() => display("8")}
            id="eight"
            className=" bg-slate-500 hover:brightness-110 active:shadow-inner active:shadow-slate-950"
          >
            8
          </button>
          <button
            onClick={() => display("9")}
            id="nine"
            className=" bg-slate-500 hover:brightness-110 active:shadow-inner active:shadow-slate-950"
          >
            9
          </button>
          <button
            onClick={() => display("-")}
            id="subtract"
            className=" bg-slate-600 hover:brightness-110 active:shadow-inner active:shadow-slate-950"
          >
            -
          </button>
          <button
            onClick={() => display("4")}
            id="four"
            className=" bg-slate-500 hover:brightness-110 active:shadow-inner active:shadow-slate-950"
          >
            4
          </button>
          <button
            onClick={() => display("5")}
            id="five"
            className=" bg-slate-500 hover:brightness-110 active:shadow-inner active:shadow-slate-950"
          >
            5
          </button>
          <button
            onClick={() => display("6")}
            id="six"
            className=" bg-slate-500 hover:brightness-110 active:shadow-inner active:shadow-slate-950"
          >
            6
          </button>
          <button
            onClick={() => display("+")}
            id="add"
            className=" bg-slate-600 hover:brightness-110 active:shadow-inner active:shadow-slate-950"
          >
            +
          </button>
          <button
            onClick={() => display("1")}
            id="one"
            className=" bg-slate-500 hover:brightness-110 active:shadow-inner active:shadow-slate-950"
          >
            1
          </button>
          <button
            onClick={() => display("2")}
            id="two"
            className=" bg-slate-500 hover:brightness-110 active:shadow-inner active:shadow-slate-950"
          >
            2
          </button>
          <button
            onClick={() => display("3")}
            id="three"
            className=" bg-slate-500 hover:brightness-110 active:shadow-inner active:shadow-slate-950"
          >
            3
          </button>
          <button
            onClick={() => display("0")}
            id="zero"
            className=" bg-slate-500 col-start-1 col-end-3 hover:brightness-110 active:shadow-inner active:shadow-slate-950"
          >
            0
          </button>
          <button
            onClick={() => display(".")}
            id="decimal"
            className=" bg-slate-500 hover:brightness-110 active:shadow-inner active:shadow-slate-950"
          >
            .
          </button>
          <button
            onClick={() => display("=")}
            id="equals"
            className=" bg-blue-900 row-start-4 col-start-4 row-end-6 hover:brightness-110 active:shadow-inner active:shadow-slate-950"
          >
            =
          </button>
        </div>
      </div>
    </div>
  );
}
