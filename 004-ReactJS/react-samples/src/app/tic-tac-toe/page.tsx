'use client'
import { useEffect, useState } from 'react';

enum SquareType {
    Empty = '　',
    O = "Ｏ",
    X = "Ｘ"
}

interface SquareProps {
    value: any;
    onClick ?: () => void;
}

const Square = ({ value, onClick }: SquareProps) => {
    return (
        <button className='square'
            onClick={onClick}
        >
            {value}
        </button>
    );
}

interface NewGameProps {
    onNewGameClick?:() => void;
}
function NewGame({ onNewGameClick }: NewGameProps) {
    return (
        <button className='new-game' onClick={onNewGameClick}>重新開始</button>
    )
}


const Board = () => {
    const [xIsNext, setXIsNext] = useState(true);
    const [squareCount, setSquareCount] = useState(0);
    const [squares, setSquares] = useState(Array(9).fill(SquareType.Empty));


    let status = `玩家:  ${(xIsNext ? SquareType.X : SquareType.O)}`;
    const winner = calculateWinner(squares);
    if (winner) {
        status = `勝利者: ${winner}`;
    }
    else if (squareCount === squares.length) {
        status = '和局';
    }

    useEffect(() => {
        document.title = status;
    });

    function handleClick(i: number) {
        if (calculateWinner(squares)) {
            return;
        }

        const nextSquares = squares.slice();
        if (squares[i] === SquareType.Empty) {
            if (xIsNext) {
                nextSquares[i] = SquareType.X;

            } else {
                nextSquares[i] = SquareType.O;
            }
            setSquareCount(squareCount + 1);
            setSquares(nextSquares);
            setXIsNext(!xIsNext);
        }
        else {
            alert(`這格已經被玩家"${squares[i]}"下了`);
        }
    }

    function newGameClick() {
        setSquareCount(0);
        setSquares(Array(9).fill(SquareType.Empty));
        setXIsNext(true);
    }

    return <>
        <NewGame onNewGameClick={newGameClick} />
        <div className='status'>{status}</div>
        <div className='board-row'>
            <Square value={squares[0]} onClick={() => handleClick(0)} />
            <Square value={squares[1]} onClick={() => handleClick(1)} />
            <Square value={squares[2]} onClick={() => handleClick(2)} />
        </div>
        <div className='board-row'>
            <Square value={squares[3]} onClick={() => handleClick(3)} />
            <Square value={squares[4]} onClick={() => handleClick(4)} />
            <Square value={squares[5]} onClick={() => handleClick(5)} />
        </div>
        <div className='board-row'>
            <Square value={squares[6]} onClick={() => handleClick(6)} />
            <Square value={squares[7]} onClick={() => handleClick(7)} />
            <Square value={squares[8]} onClick={() => handleClick(8)} />
        </div>
    </>;
}
export default Board;


const calculateWinner = (squares: any) => {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] &&
            squares[a] === squares[b] &&
            squares[a] === squares[c] &&
            squares[a] != SquareType.Empty) {
            return squares[a];
        }
    }
    return null;
}