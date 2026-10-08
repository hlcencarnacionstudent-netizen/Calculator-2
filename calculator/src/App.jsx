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
    if (value === 'C') {
      setDisplay('0');
      setFirstNumber(null);
      setOperator(null);
      setWaitingForSecondNumber(false);
      return;
    }

    // SURNAME BUTTON
    if (value === 'ENCARNACION') {
      setDisplay('Hurley Lawreese C. Encarnacion');
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
    if (['+', '-', '*', '÷'].includes(value)) {
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

        case '*':
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

      result = Number(result.toFixed(8));

      setDisplay(String(result));
      setFirstNumber(null);
      setOperator(null);
      setWaitingForSecondNumber(true);
    }
  };

  return (
    <div className="App">

      {/* HEADER */}
      <div className="Header">
        Calculator of Hurley Lawreese C. Encarnacion - WMD3A
      </div>

      {/* CALCULATOR */}
      <div className="Calculator">

        {/* DISPLAY */}
        <CalcDisplay dispValue={display} />

        {/* KEYPAD */}
        <div className="Keypad">

          {/* ROW 1 */}
          <CalcButton buttonLabel={7} onClick={buttonClickHandler} />
          <CalcButton buttonLabel={8} onClick={buttonClickHandler} />
          <CalcButton buttonLabel={9} onClick={buttonClickHandler} />

          <CalcButton
            buttonLabel="÷"
            onClick={buttonClickHandler}
            className="Operator"
          />

          {/* ROW 2 */}
          <CalcButton buttonLabel={4} onClick={buttonClickHandler} />
          <CalcButton buttonLabel={5} onClick={buttonClickHandler} />
          <CalcButton buttonLabel={6} onClick={buttonClickHandler} />

          <CalcButton
            buttonLabel="*"
            onClick={buttonClickHandler}
            className="Operator"
          />

          {/* ROW 3 */}
          <CalcButton buttonLabel={1} onClick={buttonClickHandler} />
          <CalcButton buttonLabel={2} onClick={buttonClickHandler} />
          <CalcButton buttonLabel={3} onClick={buttonClickHandler} />

          <CalcButton
            buttonLabel="-"
            onClick={buttonClickHandler}
            className="Operator"
          />

          {/* ROW 4 */}
          <CalcButton
            buttonLabel="C"
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

        {/* SURNAME BUTTON */}
        <button
          className="SurnameButton"
          onClick={() => buttonClickHandler('ENCARNACION')}
        >
          ENCARNACION
        </button>

      </div>
    </div>
  );
}

export default App;