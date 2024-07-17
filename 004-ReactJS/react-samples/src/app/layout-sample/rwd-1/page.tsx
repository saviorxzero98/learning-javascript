import './style.scss';

const RWD2Layout = () => {
    return (
        <>
            <div className='container'>
                <div className='header'>Header</div>
                <div className='sidebar'>Sidebar</div>
                <div className='body'>
                    <div className='body-left'>Body Content 1</div>
                    <div className='body-center'>Body Content 2</div>
                    <div className='body-right'>Body Content 3</div>
                </div>
                <div className='footer'>Foolter</div>
            </div>
        </>
    );
}


export default RWD2Layout;