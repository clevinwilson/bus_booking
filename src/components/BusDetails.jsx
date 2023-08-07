import { useContext, useEffect, useState } from 'react'
import { RootContext } from '../store/RootContext';
import { blockSeat, getSeatLayout } from '../services/userApi';
import ListSeats from './ListSeats';
import { useLocation,useParams } from 'react-router-dom';

function BusDetails() {
  const { rootDetails } = useContext(RootContext);
  const [seats, setSeat] = useState(null);
  const [blockedSeats, setblockedSeats] = useState([]);

  //all params
  const { id } = useParams();
  
  const location =useLocation();
  const params = new URLSearchParams(location.search);
  const inventoryType = params.get('inventoryType');
  const sourceCity = params.get('sourceCity');
  const destinationCity = params.get('destinationCity');
  const doj = params.get('doj');
  const operatorName = params.get('operatorName');


  //updating the state with seat details
  const updateBlockedSeats=({ checked, id, fare, totalFareWithTaxes, primary, ac, sleeper })=> {

    //updating the seat status
    setSeat(seats.filter((seat) => {
      if (seat.id == id) {
        seat.checked = !seat.checked
      }
      return seat
    }))

    //updating the blocked seats
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

  //fetching the seatlayout details
  useEffect(() => {
    getSeatLayout({ sourceCity, destinationCity, doj, inventoryType,routeScheduleId: id})
      .then((response) => {
        console.log(response.data);
        setSeat(response.data.seats)
      })
      .catch((err) => {
        console.log(err);
      })
  }, [id,destinationCity,inventoryType,sourceCity,doj])

  //filtering the lower berth upper berth seats
  const lowerBerthSeats = seats && seats.filter(seat => seat.zIndex === 0);
  const upperBerthSeats = seats && seats.filter(seat => seat.zIndex === 1);


  //block seat
  const handleSubmit = (e) => {
    e.preventDefault();
    blockSeat({ sourceCity, destinationCity, doj, inventoryType, routeScheduleId: id }, blockedSeats)
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
        <div>
          <h1 className='font-bold text-center text-lg mt-8'>{operatorName}</h1>
        </div>
        <div className='flex justify-center p-10'>
          <h1 className='mr-5 text-lg font-semibold'>{sourceCity} </h1> To <h1 className='ml-5 text-lg font-semibold'>{destinationCity}</h1>
        </div>
        <div className='text-center'>
          <p>{doj}</p>
        </div>

        {lowerBerthSeats?.length ?
          <div className='mt-4'>
            <h1>Lower Deck</h1>
            <ListSeats type={"lowerdeck"} seats={lowerBerthSeats} updateBlockedSeats={updateBlockedSeats}/>
          </div>
          :""}
        

        {upperBerthSeats?.length ?
          <div className='mt-4'>
            <h1>Upper Deck</h1>
            <ListSeats type={"upperdeck"} seats={upperBerthSeats} updateBlockedSeats={updateBlockedSeats} />
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