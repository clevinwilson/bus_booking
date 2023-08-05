import React from 'react'

function Seat({ seat, updateBlockedSeats}) {
    return (
        <div onClick={(e) => {
            updateBlockedSeats({ checked: e.target.checked, id: seat.id, fare: seat.fare, totalFareWithTaxes: seat.totalFareWithTaxes, primary: seat.primary, ac: seat.ac, sleeper: seat.sleeper })
        }} className="flex items-center mb-4">
            <input id="default-checkbox" type="checkbox" defaultValue className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
            <label htmlFor="default-checkbox" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">{seat.id} : {`₹ ${seat.fare}`} :{seat.width == 1 && seat.length == 2 ? "Horizontal " : seat.width == 2 && seat.length == 1 ? "Vertical " : ""}</label>
        </div>
    )
}

export default Seat