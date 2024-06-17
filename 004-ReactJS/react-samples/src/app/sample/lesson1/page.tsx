'use client'
const Lesson1 = () => {
    return (
        <>
            <Container style={{ display: 'flex', margin: 16 }}>
                <div>
                    <h1>Hello World</h1>
                    <button>點擊</button>
                </div>
            </Container>
        </>
    );
}

export default Lesson1;



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
