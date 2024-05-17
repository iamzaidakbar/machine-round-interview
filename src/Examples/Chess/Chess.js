import React, { useEffect, useState } from 'react';
import "./Chess.scss";

import bk from "../../images/bk.png";
import wp from "../../images/wp.png";
import bq from "../../images/bq.png";
import wb from "../../images/wb.png";
import wn from "../../images/wn.png";
import wr from "../../images/wr.png";
import { PawnAttack, KnightAttack, QueenAttack, BishopAttack, KingAttack, RookAttack } from '../../Common/ChessAttacks/Attacks';

const Chess = () => {
    const initialLayout = () => {
        const layout = [];
        const modes = ['dark', 'light'];
        for (let row = 0; row < 8; row++) {
            const currentRow = [];
            for (let col = 0; col < 8; col++) {
                const mode = modes[(row + col) % 2];
                currentRow.push({ id: col + 1, mode, isSelected: false });
            }
            layout.push(currentRow);
        }
        return layout;
    };

    const [chessLayout, setChessLayout] = useState(initialLayout);
    const [selectedPiece, setSelectedPiece] = useState(null);
    const [selectedBlock, setSelectedBlock] = useState(null);

    const selectBlock = (rowIndex, colIndex) => {
        if (selectedPiece === null) {
            window.alert('Please select the Chess Piece first.')
            return;
        }
        setSelectedBlock({ row: rowIndex, col: colIndex });
        setChessLayout(prevLayout =>
            prevLayout.map((row, rIdx) =>
                row.map((block, cIdx) => ({
                    ...block,
                    isSelected: rIdx === rowIndex && cIdx === colIndex
                }))
            )
        );
    };

    const ChessBoard = () => {
        return (
            <div className='chess_board_layout'>
                {chessLayout.map((row, rowIndex) => (
                    <div key={rowIndex} className='chess_row'>
                        {row.map((col, colIndex) => (
                            <span
                                key={colIndex}
                                onClick={() => selectBlock(rowIndex, colIndex)}
                                style={{opacity: selectedPiece === null ? '1' : '.3'}}
                                className={`chess_cell ${col.mode} ${col.isSelected ? 'selected' : ''}`}
                            >
                            </span>
                        ))}
                    </div>
                ))}
            </div>
        );
    };

    const ChessPieces = () => {
        const pieces = [
            { imgUrl: wp, piece: 'pawn' },
            { imgUrl: bk, piece: 'king' },
            { imgUrl: bq, piece: 'queen' },
            { imgUrl: wb, piece: 'bishop' },
            { imgUrl: wn, piece: 'knight' },
            { imgUrl: wr, piece: 'rook' },
        ];

        return (
            <div className='chess_pieces'>
                {pieces.map((piece, index) => (
                    <img
                        key={index}
                        src={piece.imgUrl}
                        alt={`piece-${index}`}
                        className={`chess_piece ${selectedPiece === piece.piece ? selectedPiece : ''}`}
                        onClick={() => setSelectedPiece(piece.piece)}
                    />
                ))}
                <p className='selected_piece'>Selected : {selectedPiece ? selectedPiece : 'NONE'}</p>
                <p className='selected_block'>Row: {selectedBlock?.row} Col: {selectedBlock?.col}</p>
                <button onClick={() => {
                    setSelectedBlock(null)
                    setSelectedPiece(null)
                    setChessLayout(initialLayout)
                }} className='reset_chess_board'>Reset</button>
            </div>
        );
    };

    useEffect(() => {
        if (selectedBlock) {
            chessLayout.map((row, rowIndex) =>
                row.map((block, colIndex) => {
                    if (rowIndex === selectedBlock.row && colIndex === selectedBlock.col) {
                        doAttack(selectedPiece, selectedBlock.row, selectedBlock.col)
                    }
                })
            )
        }
    }, [selectedBlock]);

    const doAttack = (attack, row, col) => {
        switch (attack) {
            case 'pawn':
                PawnAttack(setChessLayout, row, col)
                break;
            case 'king':
                KingAttack(setChessLayout, row, col)
                break;
            case 'queen':
                QueenAttack(setChessLayout, row, col)
                break;
            case 'bishop':
                BishopAttack(setChessLayout, row, col)
                break;
            case 'knight':
                KnightAttack(setChessLayout, row, col)
                break;
            case 'rook':
                RookAttack(setChessLayout, row, col)
                break;
            default:
                break;
        }
    }

    return (
        <div className='ChessBoard'>
            <ChessBoard />
            <ChessPieces />

        </div>
    );
}

export default Chess;
