import './style.scss';

const GridLayout = () => {
    return (
        <>
            <div className='container'>
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
                    <div className='box grid-template-header-area'>Headerbar</div>
                    <div className='box grid-template-menu-button-area'>Menu Button</div>
                    <div className='box grid-template-menu-area'>Menu Content</div>
                    <div className='box grid-template-body-area'><div style={{height: 1000}}>Body Content</div></div>
                    <div className='box grid-template-footer-area '>Footer Content</div>
                </div>

                <h1>Grid Row & Column</h1>
                <div className="grid-row-column-container">
                    <div className="box grid-row-column-header">Headerbar</div>
                    <div className='box grid-row-column-menu-button'>Menu Button</div>
                    <div className="box grid-row-column-menu">Menu Content</div>
                    <div className="box grid-row-column-body">Body Content</div>
                    <div className="box grid-row-column-footer">Footer Content</div>
                </div>
            </div>
        </>
    );
}


export default GridLayout;