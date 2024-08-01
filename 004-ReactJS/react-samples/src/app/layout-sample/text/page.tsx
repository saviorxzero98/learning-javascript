import './style.scss';


const TextLayout = () => {
    return (
        <>
            <div className='body'>
                <h1>word-break: normal</h1>
                <div className='container word-break-normal'>
                    This is a Looooooooooooooooooooooooooooooooooooog word.<br /><br />
                    This is a Loo-oo-oo-oo-oo-oo-oo-oo-oo-oo-oo-oo-oo-oo-oo-oo-oo-oog word.<br /><br />
                    這是一個長長長長長長長長長長長長長長長長長長長長長長長長長長長長長長長長長的中文字
                </div>
                <h1>word-break: break-all</h1>
                <div className='container word-break-all'>
                    This is a Looooooooooooooooooooooooooooooooooooog word.<br /><br />
                    This is a Loo-oo-oo-oo-oo-oo-oo-oo-oo-oo-oo-oo-oo-oo-oo-oo-oo-oog word.<br /><br />
                    這是一個長長長長長長長長長長長長長長長長長長長長長長長長長長長長長長長長長的中文字
                </div>
                <h1>word-break: break-word</h1>
                <div className='container word-break-word'>
                    This is a Looooooooooooooooooooooooooooooooooooog word.<br /><br />
                    This is a Loo-oo-oo-oo-oo-oo-oo-oo-oo-oo-oo-oo-oo-oo-oo-oo-oo-oog word.<br /><br />
                    這是一個長長長長長長長長長長長長長長長長長長長長長長長長長長長長長長長長長的中文字
                </div>
                <h1>word-break: keep-all</h1>
                <div className='container word-break-keep-all'>
                    This is a Looooooooooooooooooooooooooooooooooooog word.<br /><br />
                    This is a Loo-oo-oo-oo-oo-oo-oo-oo-oo-oo-oo-oo-oo-oo-oo-oo-oo-oog word.<br /><br />
                    這是一個長長長長長長長長長長長長長長長長長長長長長長長長長長長長長長長長長的中文字
                </div>
                <h1>text ellipsis</h1>
                <div className='container text-ellipsis'>
                    This is a Looooooooooooooooooooooooooooooooooooog word.<br /><br />
                    This is a Loo-oo-oo-oo-oo-oo-oo-oo-oo-oo-oo-oo-oo-oo-oo-oo-oo-oog word.<br /><br />
                    這是一個長長長長長長長長長長長長長長長長長長長長長長長長長長長長長長長長長的中文字
                </div>
                <h1>text clip</h1>
                <div className='container text-clip'>
                    This is a Looooooooooooooooooooooooooooooooooooog word.<br /><br />
                    This is a Loo-oo-oo-oo-oo-oo-oo-oo-oo-oo-oo-oo-oo-oo-oo-oo-oo-oog word.<br /><br />
                    這是一個長長長長長長長長長長長長長長長長長長長長長長長長長長長長長長長長長的中文字
                </div>
                <h1>text scroll</h1>
                <div className='container text-scroll'>
                    This is a Looooooooooooooooooooooooooooooooooooog word.<br /><br />
                    This is a Loo-oo-oo-oo-oo-oo-oo-oo-oo-oo-oo-oo-oo-oo-oo-oo-oo-oog word.<br /><br />
                    這是一個長長長長長長長長長長長長長長長長長長長長長長長長長長長長長長長長長的中文字
                </div>
            </div>
        </>
    );
}


export default TextLayout;