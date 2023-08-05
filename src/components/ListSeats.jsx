import React from 'react'
import Seat from './Seat';

function ListSeats({ seats, updateBlockedSeats }) {
    let seatLayout = [];
    let rowSeatLayout = [];
    // Find the maximum row and column values
    const maxRow = seats && Math.max(...seats.map(item => item.row));
    const maxColumn = seats && Math.max(...seats.map(item => item.column));
    console.log(maxRow, maxColumn);

    for (let i = 0; i <= maxRow; i++) {
        for (let j = 0; j <= maxColumn; j++) {
            rowSeatLayout.push(<Seat row={i} column={j} seats={seats} updateBlockedSeats={updateBlockedSeats} />)
        }
        seatLayout.push(<div className='flex'>
            {rowSeatLayout}
        </div>)
        rowSeatLayout=[];
    }
    return (
        <div className={` mt-10 max-w-2xl overflow-x-scroll gap-4 justify-center items-center`}>
            {seatLayout}
        </div>

    )
}

export default ListSeats