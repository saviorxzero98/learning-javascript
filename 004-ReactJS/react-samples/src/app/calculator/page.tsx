'use client'
import { useState } from 'react';
import './style.scss';

type InputKeyValue = {
    title: string,
    value?: number
}
interface InputKeyProps {
    title: string,
    value?: number,
    onClick ?: (event: InputKeyValue) => void
}
const InputKey = ({ title, value, onClick }: InputKeyProps) => {
    const clickKey = (e: InputKeyValue) => {
        if (onClick) {
            onClick(e);
        }
    }

    return (
        <button className='calcKey'
            value={value}
            onClick={() => clickKey({ title, value })}>
            {title}
        </button>
    );
}

interface OutputViewProps {
    value: string | number
}
const OutputView = ({ value }: OutputViewProps) => {
    return (
      <input type='text' className='calOutput' value={value} />
    )
}

const Calculator = () => {
    const [outValue, setOutValue] = useState(0);
    const [isFloat, setIsFloat] = useState(false);
    const [isNewValue, setIsNewValue] = useState(true);
    const [lastOp, setLastOp] = useState('');
    const [tempValue, setTempValue] = useState(0);

    const calcEvents = {
        clickNumber: (event: InputKeyValue) => {
            let { value } = event;
            if (value && !isNaN(value)) {
                if (isNewValue) {
                    setOutValue(value);
                    setIsNewValue(false);
                    return;
                }

                var floatValue = String(outValue);
                if (isFloat) {
                    if (floatValue.includes('.')) {
                        setOutValue(Number(`${floatValue}${value}`));
                    }
                    else {
                        setOutValue(Number(`${floatValue}.${value}`));
                    }
                }
                else {
                    if (floatValue.includes('.')) {
                        setOutValue(Number(`${floatValue}${value}`));
                    }
                    else {
                        setOutValue(outValue * 10 + value);
                    }
                }
            }
        },

        clickClear: (event: InputKeyValue, isClearAll = false) => {
            setOutValue(0);
            setIsFloat(false);
            setIsNewValue(true);

            if (isClearAll) {
                setLastOp('');
                setTempValue(0);
            }
        },

        clickPercent: (event: InputKeyValue) => {
            setOutValue(outValue / 100);
        },

        clickNegative: (event: InputKeyValue) => {
            setOutValue(outValue * -1);
        },

        clickPower: (event: InputKeyValue) => {
            setOutValue(Math.pow(outValue, 2));
        },

        clickSqrt: (event: InputKeyValue) => {
            setOutValue(Math.pow(outValue, 2));
        },

        clickReciprocal: (event: InputKeyValue) => {
            setOutValue( 1 / outValue);
        },

        clickBackspace: (event: InputKeyValue) => {
            let value = String(outValue).slice(0, -1);

            if (!isNaN(value as any)) {
                setOutValue(Number(value));
            }
            else {
                setOutValue(0);
            }    
        },

        clickFloat: (event: InputKeyValue) => {
            setIsFloat(true);
        },

        clickOperator: (event: InputKeyValue) => {
            let { title: op } = event;

            switch (op) {
                case '+':
                case '-':
                case '×':
                case '÷':
                    if (lastOp) {
                        let currentValue = calcEvents.runCalc(tempValue, outValue, lastOp);
                        setOutValue(currentValue);
                        setLastOp(op);
                        setTempValue(currentValue);
                        setIsNewValue(true);
                    }
                    else {
                        setTempValue(outValue);
                        setLastOp(op);
                        setIsNewValue(true);
                    }
                    break;
                case '=':
                    if (lastOp) {
                        setOutValue(calcEvents.runCalc(tempValue, outValue, lastOp));
                        setLastOp('');
                        setTempValue(0);
                        setIsNewValue(true);
                    }
                    break;
            }
        },

        runCalc: (num1: number, num2: number, op: string) => {
            switch (op) {
                case '+':
                    return (num1 + num2);
                case '-':
                    return (num1 - num2);
                case '×':
                    return (num1 * num2);
                case '÷':
                    return (num1 / num2);
            }
            return num1;
        }
    }



    return (
        <>
            <OutputView value={outValue} />
            <div className='calcKey-row'>
                <InputKey title='%' onClick={calcEvents.clickPercent} />
                <InputKey title='CE' onClick={(e) => calcEvents.clickClear(e, false)} />
                <InputKey title='C' onClick={(e) => calcEvents.clickClear(e, true)} />
                <InputKey title='←' onClick={calcEvents.clickBackspace} />
            </div>
            <div className='calcKey-row'>
                <InputKey title='¹⁄ₓ' onClick={calcEvents.clickReciprocal} />
                <InputKey title='x²' onClick={calcEvents.clickPower} />
                <InputKey title='√' onClick={calcEvents.clickSqrt} />
                <InputKey title='÷' onClick={calcEvents.clickOperator} />
            </div>
            <div className='calcKey-row'>
                <InputKey title='7' value={7} onClick={calcEvents.clickNumber} />
                <InputKey title='8' value={8} onClick={calcEvents.clickNumber} />
                <InputKey title='9' value={9} onClick={calcEvents.clickNumber} />
                <InputKey title='×' onClick={calcEvents.clickOperator} />
            </div>
            <div className='calcKey-row'>
                <InputKey title='4' value={4} onClick={calcEvents.clickNumber} />
                <InputKey title='5' value={5} onClick={calcEvents.clickNumber} />
                <InputKey title='6' value={6} onClick={calcEvents.clickNumber} />
                <InputKey title='-' onClick={calcEvents.clickOperator} />
            </div>
            <div className='calcKey-row'>
                <InputKey title='1' value={1} onClick={calcEvents.clickNumber} />
                <InputKey title='2' value={2} onClick={calcEvents.clickNumber} />
                <InputKey title='3' value={3} onClick={calcEvents.clickNumber} />
                <InputKey title='+' onClick={calcEvents.clickOperator} />
            </div>
            <div className='calcKey-row'>
                <InputKey title='⁺⁄₋' onClick={calcEvents.clickNegative} />
                <InputKey title='0' value={0} onClick={calcEvents.clickNumber} />
                <InputKey title='.' onClick={calcEvents.clickFloat} />
                <InputKey title='=' onClick={calcEvents.clickOperator} />
            </div>
        </>
    );
}

export default Calculator;