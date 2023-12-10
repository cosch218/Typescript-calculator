import React, { useState } from 'react'

export default function Calculator() {

    // 계산식 상태관리
    const [calc, setCalc] = useState<string>("");

    // 입력한 버튼값 상태관리
    const [btnNum, setBtnNum] = useState<string>("");
    
    const [plusMinus, setPlusMinus] = useState<boolean>(true);

    const handleReset = () => {
        setCalc("");
    }

    const handlePlusMinus = () => {
        setPlusMinus(!plusMinus);
        
        if (plusMinus) {
            // 양수로 전환
            const calcToNum = parseFloat(calc);
            const toPositiveNum = Math.abs(calcToNum);
            setCalc(toPositiveNum.toString());
        } else {
            // 음수로 전환
            setCalc((prev) => "-" + prev)
        }
    }

    const handlePercent = () => {
        const calcToNum = parseFloat(calc);
        const toPercent = calcToNum/100;
        setCalc(toPercent.toString());
    }

    const getButtonValue = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const clickedBtnValue = e.currentTarget.value;
        
        // 만약 소수점을 한 번 클릭했다면 추가로 더 입력할 수 없음
        if ( btnNum.includes(".") && clickedBtnValue === ".") {
            alert(".을 하나의 숫자에 두 번 이상 입력할 수 없습니다!");
        } else {
            setCalc((prev) => prev + clickedBtnValue);
            setBtnNum((prev) => prev + clickedBtnValue);
        }
    };

    const getButtonOper = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const clickedBtnOper = e.currentTarget.value;
        setCalc((prev) => prev + clickedBtnOper);
        setBtnNum("");
    };

    const getResult = () => {
        const replaceOper = calc.replace(/÷/gi, "/").replace(/×/gi, "*");

        const calcResult = eval(replaceOper)

        // 만약 calcResult가 소수점 두 자리 이상이라면
        if (/^\d+\.\d{2,}$/.test(calcResult.toString())) {
            const calcResultToNum = parseFloat(calcResult).toFixed(2)
            setCalc(calcResultToNum.toString())
        } else {
            setCalc(calcResult)
        }
        
        return calc
    }

    const formattedNumberWithCommas = (result: string) => {
        return result.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    };


    return (
        <div>
            <p className='result'>
                {
                    formattedNumberWithCommas(calc).length < 12
                    ? formattedNumberWithCommas(calc)
                    : "--"
                }
            </p>

            <div className='calculator'>
                <div>
                    <button className='lightgray' onClick={handleReset}>AC</button>
                    <button className='lightgray' onClick={handlePlusMinus}>±</button>
                    <button className='lightgray' onClick={handlePercent}>%</button>
                    <button className='orange' value="÷" onClick={getButtonOper}>÷</button>
                </div>

                <div>
                    <button className='gray' value={7} onClick={getButtonValue}>7</button>
                    <button className='gray' value={8} onClick={getButtonValue}>8</button>
                    <button className='gray' value={9} onClick={getButtonValue}>9</button>
                    <button className='orange' value="×" onClick={getButtonOper}>×</button>
                </div>

                <div>
                    <button className='gray' value={4} onClick={getButtonValue}>4</button>
                    <button className='gray' value={5} onClick={getButtonValue}>5</button>
                    <button className='gray' value={6} onClick={getButtonValue}>6</button>
                    <button className='orange' value="-" onClick={getButtonOper}>-</button>
                </div>

                <div>
                    <button className='gray' value={1} onClick={getButtonValue}>1</button>
                    <button className='gray' value={2} onClick={getButtonValue}>2</button>
                    <button className='gray' value={3} onClick={getButtonValue}>3</button>
                    <button className='orange' value="+" onClick={getButtonOper}>+</button>
                </div>

                <div>
                    <button className='gray' value={0} onClick={getButtonValue}>0</button>
                    <button className='gray' value="." onClick={getButtonValue}>.</button>
                    <button className='orange' value="＝" onClick={getResult}>＝</button>
                </div>
            </div>
        </div>
    )
}
