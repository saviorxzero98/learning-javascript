'use client'
import { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';
import './style.scss';


// Context
type CounterContextType = {
    /** 計數 */
    count: number

    /** 設定計數器 */
    setCount: (count: number) => void
}
const CounterContext = createContext<CounterContextType>({} as CounterContextType);
const useCounterContext = () => useContext(CounterContext);

// Context Provider
interface CounterContextProviderProps extends PropsWithChildren {
    /** 計數 */
    initValue: number
}
const CounterContextProvider = (props: CounterContextProviderProps) => {
    const { initValue, children } = props;
    const [ count, setCount ] = useState(initValue);

    return (
        <CounterContext.Provider value={{ 
            count: count,
            setCount: (count: number) => setCount(count)
        }}>
            {children}
        </CounterContext.Provider>
    );
}

// 使用
const Lesson4 = () => {
    return (
        <>
            <CounterContextProvider initValue={0}>
                <Container style={{ display: 'flex', margin: 16 }}>
                    <div>
                        <h1>計數器</h1>
                        <Counter />
                        <CountUpButton />
                        <CountDownButton />
                        <ResetCountButton />
                    </div>
                </Container>
            </CounterContextProvider>
        </>
    );
}

export default Lesson4;



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

const Counter = () => {
    const { count } = useCounterContext();
    return (
        <h2>次數 {count}</h2>
    );
}

const CountUpButton = () => {
    const { count, setCount } = useCounterContext();
    return (
        <button className='button' onClick={() => setCount(count + 1)}>+1</button>
    );
}
const CountDownButton = () => {
    const { count, setCount } = useCounterContext();
    return (
        <button className='button' onClick={() => setCount(count - 1)}>-1</button>
    );
}
const ResetCountButton = () => {
    const { count, setCount } = useCounterContext();
    return (
        <button className='button' onClick={() => setCount(0)}>歸零</button>
    );
}