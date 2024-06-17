

interface PageType {
    path: string,
    title: string
};

const pages: PageType[] = [
    {
        path: 'lesson1',
        title: '基本的元件 ender'
    },
    {
        path: 'lesson2',
        title: '使用 useState'
    },
    {
        path: 'lesson3',
        title: '使用 useEffect'
    },
    {
        path: 'lesson4',
        title: '使用 useContext'
    }
];

const LessonIndex = () => {

    return (
        <>
            <ul>
                {
                    pages.map((item, index) => (
                        <li>
                            <a href={`sample/${item.path}`}>{item.title}</a>
                        </li>
                    ))
                }
            </ul>
        </>
    );
}

export default LessonIndex;
