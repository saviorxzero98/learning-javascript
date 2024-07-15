import './style.scss';

const GridLayout = () => {
    return (
        <>
            <div className='flex flex-col'>
                <h1>Grid Template</h1>
                <div className='grid-template-container'>
                    <div className='box'>Menu Button</div>
                    <div className='box'>Headerbar</div>
                    <div className='box'>Menu Content</div>
                    <div className='box'>Body Content</div>
                </div>

                <h1>Grid Auto (grid-flow: row)</h1>
                <div className='grid-auto-row-container'>
                    <div className='box'>Menu Button</div>
                    <div className='box'>Headerbar</div>
                    <div className='box'>Menu Content</div>
                    <div className='box'>Body Content</div>
                </div>

                <h1>Grid Auto (grid-flow: column)</h1>
                <div className='grid-auto-column-container'>
                    <div className='box'>Menu Button</div>
                    <div className='box'>Headerbar</div>
                    <div className='box'>Menu Content</div>
                    <div className='box'>Body Content</div>
                </div>


                <h1>Grid Template Areas</h1>
                <div className='grid-template-areas-container'>
                    <div className='box header'>Headerbar</div>
                    <div className='box menu'>Menu Button</div>
                    <div className='box content1'>Menu Content</div>
                    <div className='box content2'>Body Content</div>
                </div>
            </div>
        </>
    );
}


export default GridLayout;