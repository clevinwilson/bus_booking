import { MdAirlineSeatIndividualSuite, MdOutlineAirlineSeatIndividualSuite, MdEventSeat, MdOutlineEventSeat } from "react-icons/md";
function Seat({ row, column, seats, updateBlockedSeats }) {



    //fetching the seat based on row and column 
    const filteredSeats = seats.filter((seat) => {
        if (seat.row === row && seat.column === column) {
            return seat
        }
        return false
    });



    return (
        <>
            {filteredSeats.length ?
                <>
                    {filteredSeats.map((seat, index) => (
                        <div 
                            onClick={() => {
                                updateBlockedSeats({ checked: !seat.checked, id: seat.id, fare: seat.fare, totalFareWithTaxes: seat.totalFareWithTaxes, primary: seat.primary, ac: seat.ac, sleeper: seat.sleeper });
                            }}
                            key={index} className="flex items-center mb-4 max-w-[100px] min-w-[100px] cursor-pointer">
                            {seat.checked ?
                                <>
                                    {seat.width == 1 && seat.length == 2 ? <MdAirlineSeatIndividualSuite className="text-[40px]" /> : <MdEventSeat className="text-[40px]" />}
                                </>
                                :
                                <>
                                    {seat.width == 1 && seat.length == 2 ? <MdOutlineAirlineSeatIndividualSuite className="text-[40px]" /> : <MdOutlineEventSeat className="text-[40px]" />}
                                </>}
                            {seat.id}
                        </div>
                    ))}
                </>
                :
                <div className="flex items-center mb-4">
                    <div className="max-w-[100px] min-w-[100px]"> </div>
                </div>}
        </>
    )
}

export default Seat