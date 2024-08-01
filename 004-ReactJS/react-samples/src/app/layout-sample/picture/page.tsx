import './style.scss';

const PictureLayout = () => {
    const image = 'https://www.bing.com/th?id=OHR.PontNeuf_ROW2869844925_1920x1080.jpg&qlt=50';
    //const image = 'https://images.unsplash.com/photo-1501436513145-30f24e19fcc8?q=80&w=1588&auto=format&fit=crop&ixlib=rb-4.0.3';
    

    return (
        <>
            <div className='body'>
                <h1>原圖片</h1>
                <img src={image} width='300px' />
                
                <h1>跑版圖片</h1>
                <img src={image} width='200px' height='300px' />

                <h1>使用容器+Padding</h1>
                <div className='photo-frame'>
                    <img src={image} className='photo-sample-1' />
                </div>

                <h1>aspect-ratio: 1:1; object-fit: cover; object-position: right;</h1>
                <img src={image} className='image-sample-1' />

                <h1>aspect-ratio: 4:3; object-fit: cover; object-position: left;</h1>
                <img src={image} className='image-sample-2' />

                <h1>aspect-ratio: 9:16; object-fit: cover; object-position: center;</h1>
                <img src={image} className='image-sample-3' />

                <h1>aspect-ratio: 4:3; object-fit: cover; object-position: 80% 0%;</h1>
                <img src={image} className='image-sample-4' />

                <h1>object-fit: contain;</h1>
                <img src={image} className='image-sample-5' />

                <h1>aspect-ratio: 4:3; object-fit: none; object-position: 86% 95%;</h1>
                <img src={image} className='image-sample-6' />

                <h1>object-fit: fill;</h1>
                <img src={image} className='image-sample-7' />

                <h1>object-fit: scale-down;</h1>
                <img src={image} className='image-sample-8' />
            </div>
        </>
    );
}


export default PictureLayout;