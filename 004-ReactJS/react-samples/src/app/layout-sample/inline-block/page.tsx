import './style.scss';

const InlineBlockLayout = () => {
    return (
        <>
            <span>
                Cascading Style Sheets (CSS) is a style sheet language used for specifying the presentation and styling of a document written in a markup language such as HTML or XML (including XML dialects such as SVG, MathML or XHTML). 
                
                <div className='inline-block-box'>Box 1</div>
                <div className='inline-block-box'>Box 2</div>
                <div className='inline-block-box inline-block-box-w-32'>Box 3</div>

                CSS is a cornerstone technology of the World Wide Web, alongside HTML and JavaScript.
            </span>
        </>
    );
}


export default InlineBlockLayout;