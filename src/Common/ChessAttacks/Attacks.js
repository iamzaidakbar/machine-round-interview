export function PawnAttack(setChessLayout, row, col) {
    markDirection(setChessLayout, row, col, 'top', 1);
}

export function KingAttack(setChessLayout, row, col) {
    markDirection(setChessLayout, row, col, 'top', 1);
    markDirection(setChessLayout, row, col, 'bottom', 1);
    markDirection(setChessLayout, row, col, 'left', 1);
    markDirection(setChessLayout, row, col, 'right', 1);
    markDirection(setChessLayout, row, col, 'upperLeft', 1);
    markDirection(setChessLayout, row, col, 'upperRight', 1);
    markDirection(setChessLayout, row, col, 'lowerLeft', 1);
    markDirection(setChessLayout, row, col, 'lowerRight', 1);
}


export function QueenAttack(setChessLayout, row, col) {
    markDirection(setChessLayout, row, col, 'top', 9);
    markDirection(setChessLayout, row, col, 'bottom', 9);
    markDirection(setChessLayout, row, col, 'left', 9);
    markDirection(setChessLayout, row, col, 'right', 9);
    markDirection(setChessLayout, row, col, 'upperLeft', 9);
    markDirection(setChessLayout, row, col, 'upperRight', 9);
    markDirection(setChessLayout, row, col, 'lowerLeft', 9);
    markDirection(setChessLayout, row, col, 'lowerRight', 9);
}

export function BishopAttack(setChessLayout, row, col) {
    markDirection(setChessLayout, row, col, 'upperLeft', 9);
    markDirection(setChessLayout, row, col, 'upperRight', 9);
    markDirection(setChessLayout, row, col, 'lowerLeft', 9);
    markDirection(setChessLayout, row, col, 'lowerRight', 9);
}

export function KnightAttack(setChessLayout, row, col) {
    const directions = [
        [-2, -1], [-2, 1], [-1, -2], [-1, 2],
        [1, -2], [1, 2], [2, -1], [2, 1]
    ];

    directions.forEach(([rowDelta, colDelta]) => {
        const newRow = row + rowDelta;
        const newCol = col + colDelta;

        if (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8) {
            setChessLayout(prevLayout =>
                prevLayout.map((rowArr, rowIndex) =>
                    rowArr.map((block, colIndex) =>
                        (rowIndex === newRow && colIndex === newCol) ? { ...block, isSelected: true } : block
                    )
                )
            );
        }
    });
}


export function RookAttack(setChessLayout, row, col) {
    markDirection(setChessLayout, row, col, 'top', 9);
    markDirection(setChessLayout, row, col, 'bottom', 9);
    markDirection(setChessLayout, row, col, 'left', 9);
    markDirection(setChessLayout, row, col, 'right', 9);
}


export function markDirection(setChessLayout, row, col, direction, limit) {
    const directions = {
        top: [-1, 0],
        bottom: [1, 0],
        left: [0, -1],
        right: [0, 1],
        upperLeft: [-1, -1],
        upperRight: [-1, 1],
        lowerLeft: [1, -1],
        lowerRight: [1, 1]
    };

    const [rowDelta, colDelta] = directions[direction];

    const mark = (r, c, steps) => {
        if (r < 0 || r >= 8 || c < 0 || c >= 8 || steps === 0) {
            return;
        }

        setChessLayout(prevLayout =>
            prevLayout.map((rowArr, rowIndex) =>
                rowArr.map((block, colIndex) =>
                    (rowIndex === r && colIndex === c) ? { ...block, isSelected: true } : block
                )
            )
        );

        mark(r + rowDelta, c + colDelta, steps - 1);
    };

    mark(row + rowDelta, col + colDelta, limit);
}
