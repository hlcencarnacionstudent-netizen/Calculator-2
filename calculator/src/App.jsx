import { useState } from 'react';
import './App.css';

function CalcDisplay({ dispValue }) {
  return (
    <div className="Display">
      {dispValue}
    </div>
  );
}

function CalcButton({ buttonLabel, onClick, className = '' }) {
  return (
    <button
      className={`Button ${className}`}
      onClick={() => onClick(buttonLabel)}
    >
      {buttonLabel}
    </button>
  );
}

function App() {
  const [display, setDisplay] = useState('0');
  const [firstNumber, setFirstNumber] = useState(null);
  const [operator, setOperator] = useState(null);
  const [waitingForSecondNumber, setWaitingForSecondNumber] = useState(false);

  const buttonClickHandler = (value) => {

    // CLEAR
    if (value === 'CLR') {
      setDisplay('0');
      setFirstNumber(null);
      setOperator(null);
      setWaitingForSecondNumber(false);
      return;
    }

    // NUMBERS
    if (!isNaN(value)) {
      if (display === '0' || waitingForSecondNumber) {
        setDisplay(String(value));
        setWaitingForSecondNumber(false);
      } else {
        setDisplay(display + value);
      }
      return;
    }

    // OPERATORS
    if (['+', '-', 'x', '÷'].includes(value)) {
      setFirstNumber(Number(display));
      setOperator(value);
      setWaitingForSecondNumber(true);
      return;
    }

    // EQUALS
    if (value === '=') {
      if (firstNumber === null || operator === null) {
        return;
      }

      const secondNumber = Number(display);
      let result;

      switch (operator) {
        case '+':
          result = firstNumber + secondNumber;
          break;

        case '-':
          result = firstNumber - secondNumber;
          break;

        case 'x':
          result = firstNumber * secondNumber;
          break;

        case '÷':
          if (secondNumber === 0) {
            setDisplay('Error');
            setFirstNumber(null);
            setOperator(null);
            return;
          }
          result = firstNumber / secondNumber;
          break;

        default:
          return;
      }

      // Remove unnecessary decimal places
      result = Number(result.toFixed(8));

      setDisplay(String(result));
      setFirstNumber(null);
      setOperator(null);
      setWaitingForSecondNumber(true);
    }
  };

  return (
    <div className="App">

      <div className="Header">
        Calculator of Hurley Encarnacion - WMD3A
      </div>

      <div className="Calculator">

        <CalcDisplay dispValue={display} />

        <div className="Keypad">

          <CalcButton buttonLabel={7} onClick={buttonClickHandler} />
          <CalcButton buttonLabel={8} onClick={buttonClickHandler} />
          <CalcButton buttonLabel={9} onClick={buttonClickHandler} />
          <CalcButton
            buttonLabel="÷"
            onClick={buttonClickHandler}
            className="Operator"
          />

          <CalcButton buttonLabel={4} onClick={buttonClickHandler} />
          <CalcButton buttonLabel={5} onClick={buttonClickHandler} />
          <CalcButton buttonLabel={6} onClick={buttonClickHandler} />
          <CalcButton
            buttonLabel="x"
            onClick={buttonClickHandler}
            className="Operator"
          />

          <CalcButton buttonLabel={1} onClick={buttonClickHandler} />
          <CalcButton buttonLabel={2} onClick={buttonClickHandler} />
          <CalcButton buttonLabel={3} onClick={buttonClickHandler} />
          <CalcButton
            buttonLabel="-"
            onClick={buttonClickHandler}
            className="Operator"
          />

          <CalcButton
            buttonLabel="CLR"
            onClick={buttonClickHandler}
            className="Clear"
          />

          <CalcButton buttonLabel={0} onClick={buttonClickHandler} />

          <CalcButton
            buttonLabel="="
            onClick={buttonClickHandler}
            className="Equals"
          />

          <CalcButton
            buttonLabel="+"
            onClick={buttonClickHandler}
            className="Operator"
          />

        </div>

        <div className="NameTag">
          ENCARNACION
        </div>

      </div>

    </div>
  );
}

export default App;