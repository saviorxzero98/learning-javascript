'use client'
import { useState } from 'react';
import './style.css';

const Lesson2 = () => {
    const [ count, setCount ] = useState(0);

    const countUp = () => {
        setCount(count + 1);
    }
    const countDown = () => {
        setCount(count - 1);
    }
    const resetCount = () => {
        setCount(0);
    }


    return (
        <>
            <Container style={{ display: 'flex', margin: 16 }}>
                <div>
                    <h1>計數器</h1>
                    <h2>次數 {count}</h2>
                    <button className='button' onClick={countUp}>+1</button>
                    <button className='button' onClick={countDown}>-1</button>
                    <button className='button' onClick={resetCount}>歸零</button>
                </div>
            </Container>
        </>
    );
}

export default Lesson2;



interface ContainerProps {
    style ?: React.CSSProperties,
    children: React.ReactNode
}
const Container = (props: ContainerProps) => {
    const { style, children } = props;

    return (
        <div style={style}>
            {children}
        </div>
    );
}
