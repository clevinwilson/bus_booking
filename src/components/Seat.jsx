
function Seat({ row, column, seats, updateBlockedSeats }) {
    // onClick = {(e) => {
    //     updateBlockedSeats({ checked: e.target.checked, id: seat.id, fare: seat.fare, totalFareWithTaxes: seat.totalFareWithTaxes, primary: seat.primary, ac: seat.ac, sleeper: seat.sleeper })
    // }
    // }
    const filteredSeats = seats.filter(
        seat =>
            seat.row === row &&
            seat.column === column
    );
    console.log(filteredSeats, row, column);
    return (
        <>
            {filteredSeats.length ?
                <>

                    {filteredSeats.map((seat, index) => {
                        return (
                            <div key={index} className="flex items-center mb-4 max-w-[100px] min-w-[100px]">
                                <input id="default-checkbox" type="checkbox" defaultValue className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                <label htmlFor="default-checkbox" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">{seat.id} : {`₹ ${seat.fare}`} :{seat.width == 1 && seat.length == 2 ? "Horizontal " : seat.width == 1 && seat.length == 1 ? "Vertical " : ""}</label>
                            </div>
                        )
                    })}
                </> 
                : 
                <div className="flex items-center mb-4">
                    <div className="max-w-[100px] min-w-[100px]"> </div>
                </div>}
        </>
    )
}

export default Seat