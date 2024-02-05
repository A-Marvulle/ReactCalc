import { useState } from "react";
import "./App.css";

function App() {
  const [answer, setAnswer] = useState("");
  const [expression, setExpression] = useState("0");
  const et = expression.trim();

  const isOperator = (symbol) => {
    return /[*/+-]/.test(symbol);
  };

  const buttonPress = (symbol) => {
    if (symbol === "clear") {
      setAnswer("");
      setExpression("0");
    } else if (isOperator(symbol)) {
      setExpression(et + " " + symbol + " ");
    } else if (symbol === "=") {
      calculate();
    } else if (symbol === "0") {
      if (expression.charAt(0) !== "0") {
        setExpression(expression + symbol);
      }
    } else if (symbol === ".") {
      const lastNumber = expression.split(/[-+/*]/g).pop();
      if (!lastNumber) return;
      console.log("lastNumber :>> ", lastNumber);
      if (lastNumber?.includes(".")) return;
      setExpression(expression + symbol);
    } else {
      if (expression.charAt(0) === "0") {
        setExpression(expression.slice(1) + symbol);
      } else {
        setExpression(expression + symbol);
      }
    }
  };

  const calculate = () => {
    if (isOperator(et.charAt(et.length - 1))) return;
    const parts = et.split(" ");
    const newParts = [];

    for (let i = parts.length - 1; i >= 0; i--) {
      if (["*", "/", "+"].includes(parts[i]) && isOperator(parts[i - 1])) {
        newParts.unshift(parts[i]);
        let j = 0;
        let k = i - 1;
        while (isOperator(parts[k])) {
          k--;
          j++;
        }
        i -= j;
      } else {
        newParts.unshift(parts[i]);
      }
    }
    const newExpression = newParts.join(" ");
    if (isOperator(newExpression.charAt(0))) {
      setAnswer(eval(answer + newExpression) );
    } else {
      setAnswer(eval(newExpression));
    }
    setExpression("");
  };

  return (
    <div className="App">
      <div className="calculator">
        <div id="display" className="row">
          <div id="answer">{answer}</div>
          <div id="expression">{expression}</div>
        </div>
        <div id="clear" className="row op" onClick={() => buttonPress("clear")}>AC</div>
        <div id="seven" className="btn" onClick={() => buttonPress("7")}>7</div>
        <div id="eight" className="btn" onClick={() => buttonPress("8")}>8</div>
        <div id="nine" className="btn" onClick={() => buttonPress("9")}>9</div>
        <div id="multiply" className="btn op" onClick={() => buttonPress("*")}>*</div>
        <div id="four" className="btn" onClick={() => buttonPress("4")}>4</div>
        <div id="five" className="btn" onClick={() => buttonPress("5")}>5</div>
        <div id="six" className="btn" onClick={() => buttonPress("6")}>6</div>
        <div id="divide" className="btn op" onClick={() => buttonPress("/")}>/</div>
        <div id="one" className="btn" onClick={() => buttonPress("1")}>1</div>
        <div id="two" className="btn" onClick={() => buttonPress("2")}>2</div>
        <div id="three" className="btn" onClick={() => buttonPress("3")}>3</div>
        <div id="add" className="btn op" onClick={() => buttonPress("+")}>+</div>
        <div id="decimal" className="btn op" onClick={() => buttonPress(".")}>.</div>
        <div id="zero" className="btn" onClick={() => buttonPress("0")}>0</div>
        <div id="equals" className="btn conf" onClick={() => buttonPress("=")}>=</div>
        <div id="subtract" className="btn op" onClick={() => buttonPress("-")}>-</div>
      </div>
    </div>
  );
}

export default App;