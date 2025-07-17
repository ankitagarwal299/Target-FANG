import React, { useState, useEffect } from 'react';
import './button.css';
import commafy from './commafy';

const buttons = [
    { label: "C", type: "clear", color: "red" },
    { label: "+-", type: "negate", color: "gray" },
    { label: "%", type: "percent", color: "gray" },
    { label: "/", type: "operand", color: "orange", callback: (a, b) => a / b },
    { label: "7", type: "number", color: "black" },
    { label: "8", type: "number", color: "black" },
    { label: "9", type: "number", color: "black" },
    { label: "X", type: "operand", color: "orange", callback: (a, b) => a * b },
    { label: "4", type: "number", color: "black" },
    { label: "5", type: "number", color: "black" },
    { label: "6", type: "number", color: "black" },
    { label: "-", type: "operand", color: "orange", callback: (a, b) => a - b },
    { label: "1", type: "number", color: "black" },
    { label: "2", type: "number", color: "black" },
    { label: "3", type: "number", color: "black" },
    { label: "+", type: "operand", color: "orange", callback: (a, b) => a + b },
    { label: "0", type: "number", color: "black" },
    { label: ".", type: "number", color: "black" },
    { label: "=", type: "equal", color: "orange" },
];

export default function App() {
    const [value, setValue] = useState('0');
    const [memory, setMemory] = useState(null);
    const [operator, setOperator] = useState(null);
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date());
        }, 60000); // 60,000 ms = 1 minute
    
        // Clean up the interval when the component unmounts
        return () => clearInterval(interval);
    }, []);

    const handleClear = () => {
        setValue('0');
        setMemory(null);
        setOperator(null);
    };

    const handleNegate = () => {
        setValue((parseFloat(value) * -1).toString());
    };

    const handlePercent = () => {
        setValue((parseFloat(value) / 100).toString());
        setMemory(null);
    };

    const handleOperand = (op) => {
        if (operator && memory !== null) {
            setMemory(buttons.find(btn => btn.label === operator).callback(memory, parseFloat(value)));
        } else {
            setMemory(parseFloat(value));
        }
        setValue("0");
        setOperator(op);
    };

    const handleEqual = () => {
        if (operator && memory !== null) {
            setValue(buttons.find(btn => btn.label === operator).callback(memory, parseFloat(value)).toString());
            setMemory(null);
            setOperator(null);
        }
    };


    const handleNumber = (num) => {
        // Prevent adding multiple decimal points
        if (num === "." && value.includes(".")) return;
    
        // Update value based on whether it's '0' or not
        setValue(value === "0" && num !== "." ? num : value + num);
    };

    const handleClick = (button) => {
        const handlers = {
            clear: handleClear,
            negate: handleNegate,
            percent: handlePercent,
            operand: () => handleOperand(button.label),
            equal: handleEqual,
            number: () => handleNumber(button.label),
        };
        handlers[button.type]?.();
    };

    return (
        <div className="App">
            <div className="top">
                {time.getHours().toString().padStart(2, "0")}:{time.getMinutes().toString().padStart(2, "0")}
            </div>
            <div className="display">{commafy(value)}</div>
            <div className="buttons">
                {buttons.map((btn, index) => (
                    <Buttons key={index} handleClick={() => handleClick(btn)} button={btn}/>
                ))}
            </div>
        </div>
    );
}


const Buttons = React.memo(({ button, handleClick }) => (
    <button className="btn" onClick={() => handleClick(button)} style={{ backgroundColor: button.color }}>
      {button.label}
    </button>
  ));