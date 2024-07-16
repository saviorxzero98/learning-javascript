import './style.scss';

const FlexLayout = () => {
    return (
        <>
            <div className='container'>
                <h1>Flex justify-content: start; item-align: start</h1>
                <div className='flex-sample-1'>
                    <div className='box box-h-32'>Box 1</div>
                    <div className='box box-h-16'>Box 2</div>
                    <div className='box box-h-8'>Box 3</div>
                    <div className='box box-h-8'>Box 4</div>
                </div>
                <h1>Flex justify-content: center; item-align: center</h1>
                <div className='flex-sample-2'>
                    <div className='box box-h-32'>Box 1</div>
                    <div className='box box-h-16'>Box 2</div>
                    <div className='box box-h-8'>Box 3</div>
                    <div className='box box-h-8'>Box 4</div>
                </div>
                <h1>Flex justify-content: end; item-align: end</h1>
                <div className='flex-sample-3'>
                    <div className='box box-h-32'>Box 1</div>
                    <div className='box box-h-16'>Box 2</div>
                    <div className='box box-h-8'>Box 3</div>
                    <div className='box box-h-8'>Box 4</div>
                </div>
                <h1>Flex justify-content: space-between; item-align: baseline</h1>
                <div className='flex-sample-4 '>
                    <div className='box box-h-32'>Box 1</div>
                    <div className='box box-h-16'>Box 2</div>
                    <div className='box box-h-8'>Box 3</div>
                    <div className='box box-h-8'>Box 4</div>
                </div>
                <h1>Flex justify-content: space-around; item-align: stretch</h1>
                <div className='flex-sample-5'>
                    <div className='box box-h-32'>Box 1</div>
                    <div className='box'>Box 2</div>
                    <div className='box'>Box 3</div>
                    <div className='box'>Box 4</div>
                </div>
            </div>
        </>
    );
}


export default FlexLayout;