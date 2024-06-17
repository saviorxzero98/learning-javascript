'use client'
import { useEffect, useState } from 'react';
import './style.css';

const Lesson3 = () => {
    const [ count, setCount ] = useState<number>(0);
    
    
    useEffect(() => {
        setTimeout(() => {
            setCount((count) => count + 1);
        }, 1000); 
    });

    return (
        <>
            <Container style={{ display: 'flex', margin: 16 }}>
                <div>
                    <h1>自動計數器</h1>
                    <h2>次數 {count}</h2>
                    <DoubleCount count={count} />
                </div>
            </Container>
        </>
    );
}

export default Lesson3;



interface ContainerProps {
    style ?: React.CSSProperties;
    children: React.ReactNode;
}
const Container = (props: ContainerProps) => {
    const { style, children } = props;

    return (
        <div style={style}>
            {children}
        </div>
    );
}

interface DoubleCountProps {
    count: number;
}
const DoubleCount = (props: DoubleCountProps) => {
    const { count } = props;
    const [ calcCount, setCalcCount ] = useState<number>(0);

    useEffect(() => {
        setCalcCount(count * 2);
    }, [count]);

    return (
        <h2>雙倍次數 {calcCount}</h2>
    );
}