import React, { useContext, useEffect, useState } from 'react'
import { RootContext } from '../store/RootContext';
import { blockSeat, getSeatLayout } from '../services/userApi';
import ListSeats from './ListSeats';

function BusDetails() {
  const { rootDetails } = useContext(RootContext);
  const [busDetails, setBusDetails] = useState([]);
  const [blockedSeats, setblockedSeats] = useState([]);

  function updateBlockedSeats({ checked, id, fare, totalFareWithTaxes, primary, ac, sleeper }) {
    if (checked) {
      setblockedSeats([...blockedSeats, {
        age: "26",
        name: "Arti",
        seatNbr: id,
        sex: "F",
        fare: fare,
        totalFareWithTaxes: totalFareWithTaxes,
        ladiesSeat: false,
        lastName: "Kumari",
        mobile: "7777777777",
        title: "Ms",
        email: "testing@gmail.com",
        idType: "PAN",
        idNumber: "AWk123532",
        nameOnId: "test",
        primary: primary,
        ac: ac,
        sleeper: sleeper
      }])
    } else {
      setblockedSeats(blockedSeats.filter((seat) => {
        if (seat.seatNbr == id) {
          return false
        }
        return true
      }))
    }
  }

  useEffect(() => {
    getSeatLayout(rootDetails)
      .then((response) => {
        console.log(response.data);
        setBusDetails(response.data)
      })
      .catch((err) => {
        console.log(err);
      })
  }, [rootDetails])

  const lowerBerthSeats = busDetails.seats && busDetails.seats.filter(seat => seat.zIndex === 0);
  const upperBerthSeats = busDetails.seats && busDetails.seats.filter(seat => seat.zIndex === 1);


  //block seat
  const handleSubmit = (e) => {
    e.preventDefault();
    blockSeat(rootDetails, blockedSeats)
      .then(() => {
        alert('success')
      })
      .catch((error) => {
        console.log(error);
      })
  }

  return (
    <form onSubmit={handleSubmit} className='flex justify-center items-center'>
      <div>
        <div className='flex justify-center p-10'>
          <h1 className='mr-5 text-lg font-semibold'>{rootDetails.sourceCity} </h1> To <h1 className='ml-5 text-lg font-semibold'>{rootDetails.destinationCity}</h1>
        </div>
        <div className='text-center'>
          <p>{rootDetails.doj}</p>
        </div>

        {lowerBerthSeats?.length ?
          <div className='mt-4'>
            <h1>Lower Deck</h1>
            <ListSeats seats={lowerBerthSeats} updateBlockedSeats={updateBlockedSeats}/>
          </div>
          :""}
        

        {upperBerthSeats?.length ?
          <div className='mt-4'>
            <h1>Upper Deck</h1>
            <ListSeats seats={upperBerthSeats} updateBlockedSeats={updateBlockedSeats} />

          </div> : ""}

        <div onClick={() => {
          console.log(blockedSeats);
        }} className='flex justify-center items-center mt-8'>
          <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>

        </div>
      </div>

    </form>
  )
}

export default BusDetails