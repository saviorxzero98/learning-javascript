import React from 'react';
import './style.scss';

const InlineFlexLayout = () => {
    return (
        <>
            <h1>Inline-Flex</h1>
            <div className='inline-flex-sample'>
                <div className='box box-h-32'>Box 1</div>
                <div className='box box-h-16'>Box 2</div>
                <div className='box box-h-8'>Box 3</div>
                <div className='box box-h-8'>Box 4</div>
            </div>
            <h1>Flex</h1>
            <div className='flex-sample'>
                <div className='box box-h-32'>Box 1</div>
                <div className='box box-h-16'>Box 2</div>
                <div className='box box-h-8'>Box 3</div>
                <div className='box box-h-8'>Box 4</div>
            </div>
        </>
    );
}


export default InlineFlexLayout;