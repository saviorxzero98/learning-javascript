'use client'
import { useRef, useState } from 'react';
import './style.css';


// 使用
const Lesson5 = () => {
    const button1Ref = useRef<HTMLButtonElement>(null);
    const button2Ref = useRef<HTMLButtonElement>(null);
    const button3Ref = useRef<HTMLButtonElement>(null);

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
                    <button ref={button1Ref} className='button' onClick={countUp}>+1</button>
                    <button ref={button2Ref} className='button' onClick={countDown}>-1</button>
                    <button ref={button3Ref} className='button' onClick={resetCount}>歸零</button>
                </div>
            </Container>
            <Container style={{ display: 'flex', margin: 16 }}>
                <div>
                    <button className='button' onClick={() => button1Ref.current?.click()}>+1</button>
                    <button className='button' onClick={() => button2Ref.current?.click()}>-1</button>
                    <button className='button' onClick={() => button3Ref.current?.click()}>歸零</button>
                </div>
            </Container>
        </>
    );
}

export default Lesson5;



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