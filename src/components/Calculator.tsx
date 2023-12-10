import React, { useState } from 'react'

export default function Calculator() {
    const [number, setNumber] = useState<number | null>(999999999);

    const handleButtonNumber = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const buttonValue = e.currentTarget.value;
        if (buttonValue === "null") {
            setNumber(null)
        } else {
            setNumber(parseFloat(buttonValue));
        }
    };

    const formattedNumberWithCommas = (number: number) => {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

    return (
        <div>
            <p className='result'>
                {
                    number !== null && (number.toString().length < 10)
                    ? formattedNumberWithCommas(number) : 0
                }
            </p>

            <div className='calculator'>
                <div>
                    <button className='lightgray' value={"null"} onClick={handleButtonNumber}>AC</button>
                    <button className='lightgray'>±</button>
                    <button className='lightgray'>%</button>
                    <button className='orange'>÷</button>
                </div>

                <div>
                    <button className='gray' value={7} onClick={handleButtonNumber}>7</button>
                    <button className='gray' value={8} onClick={handleButtonNumber}>8</button>
                    <button className='gray' value={9} onClick={handleButtonNumber}>9</button>
                    <button className='orange'>×</button>
                </div>

                <div>
                    <button className='gray' value={4} onClick={handleButtonNumber}>4</button>
                    <button className='gray' value={5} onClick={handleButtonNumber}>5</button>
                    <button className='gray' value={6} onClick={handleButtonNumber}>6</button>
                    <button className='orange'>－</button>
                </div>

                <div>
                    <button className='gray' value={1} onClick={handleButtonNumber}>1</button>
                    <button className='gray' value={2} onClick={handleButtonNumber}>2</button>
                    <button className='gray' value={3} onClick={handleButtonNumber}>3</button>
                    <button className='orange'>＋</button>
                </div>

                <div>
                    <button className='gray' value={0} onClick={handleButtonNumber}>0</button>
                    <button className='gray'>.</button>
                    <button className='orange'>＝</button>
                </div>
            </div>
        </div>
    )
}
