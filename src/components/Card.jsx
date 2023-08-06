import { useContext } from "react";
import { RootContext } from "../store/RootContext";
import { useNavigate } from "react-router-dom";

function Card({ bus }) {
    const { rootDetails, setRootDetails } = useContext(RootContext);
    const navigate = useNavigate();

    return (
        <div onClick={() => {
            setRootDetails({ ...rootDetails, inventoryType: bus.inventoryType, routeScheduleId: bus.routeScheduleId, operatorName: bus.operatorName })
            navigate(`/details/${bus.routeScheduleId}?inventoryType=${bus.inventoryType}&sourceCity=${rootDetails.sourceCity}&destinationCity=${rootDetails.destinationCity}&doj=${rootDetails.doj}&operatorName=${bus.operatorName}`)
        }} className="max-w-sm rounded overflow-hidden shadow-lg cursor-pointer">
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{bus.operatorName}</div>
                <p>Arrival Time: {bus.arrivalTime}</p>
                <p>Available Seats: {bus.availableSeats}</p>
                <p>Departure Time: {bus.departureTime}</p>
            </div>

            <div className="grid grid-cols-2 px-6 pt-4 pb-2">
                {
                    bus.boardingPoints.map((point, index) => {
                        return (
                            <span key={index} className="inline-block bg-gray-200 rounded-full px-3 py-1  text-xs font-semibold text-gray-700 mr-2 mb-2">{point.location}-{point.time}</span>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Card