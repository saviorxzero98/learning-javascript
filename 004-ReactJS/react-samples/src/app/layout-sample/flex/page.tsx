import './style.css';

const FlexLayout = () => {
    return (
        <>
            <div className='flex flex-col'>
                <h1>Flex justify-content: start; item-align: start</h1>
                <div className='flex justify-start items-start'>
                    <div className='box h-32'>Box 1</div>
                    <div className='box h-16'>Box 2</div>
                    <div className='box h-8'>Box 3</div>
                    <div className='box h-8'>Box 4</div>
                </div>
                <h1>Flex justify-content: center; item-align: center</h1>
                <div className='flex justify-center items-center'>
                    <div className='box h-32'>Box 1</div>
                    <div className='box h-16'>Box 2</div>
                    <div className='box h-8'>Box 3</div>
                    <div className='box h-8'>Box 4</div>
                </div>
                <h1>Flex justify-content: end; item-align: end</h1>
                <div className='flex justify-end items-end'>
                    <div className='box h-32'>Box 1</div>
                    <div className='box h-16'>Box 2</div>
                    <div className='box h-8'>Box 3</div>
                    <div className='box h-8'>Box 4</div>
                </div>
                <h1>Flex justify-content: space-between; item-align: baseline</h1>
                <div className='flex justify-between items-baseline'>
                    <div className='box h-32'>Box 1</div>
                    <div className='box h-16'>Box 2</div>
                    <div className='box h-8'>Box 3</div>
                    <div className='box h-8'>Box 4</div>
                </div>
                <h1>Flex justify-content: space-around; item-align: stretch</h1>
                <div className='flex justify-around items-stretch'>
                    <div className='box h-32'>Box 1</div>
                    <div className='box'>Box 2</div>
                    <div className='box'>Box 3</div>
                    <div className='box'>Box 4</div>
                </div>
            </div>
        </>
    );
}


export default FlexLayout;