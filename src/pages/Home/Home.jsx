import { useState } from 'react'
import SearchForm from '../../components/SearchForm'
import { searchBus } from '../../services/userApi';
import Card from '../../components/card';

function Home() {
  const [busList, setBusList] = useState([]);


  const getBusList = (values) => {
    //fetching the bus list
    searchBus(values)
      .then((response) => {
        response.data.rootDetails = values
        console.log(response.data);
        setBusList(response.data.apiAvailableBuses)
      })
      .catch((error) => {
        console.log(error);
      })
  }

  return (
    <>
      <SearchForm getBusList={getBusList} />
      {busList ? <div className='grid gap-4 grid-cols-1 lg:grid-cols-3 p-10'>
        {
          busList && busList.map((bus, index) => {
            return (
              <Card key={index} bus={bus} />
            )
          })
        }
      </div>
        :
        <div className='flex justify-center items-center mt-12'>
          <h4>No Buses found to match request</h4>
        </div>
      }
    </>
  )
}

export default Home