import { ErrorMessage, Field } from 'formik';
import { useEffect, useState } from 'react';

function LocationInput({name, initialValues, setInitialValues, cities }) {
    const [query, setQuery] = useState([]);
    const [apiQuery, setApiQuery] = useState([]);

    //filtering the cities based on user input
    useEffect(() => {
        const timeOutId = setTimeout(() => {
            let filteredData = cities.filter((city) => {
                return (
                    (query === "" || city.city_name.toLowerCase().includes(query.toLowerCase()))
                )
            })
            setApiQuery(filteredData.slice(0, 20))
        }, 500);

        return () => clearTimeout(timeOutId);
    }, [query])


    //updating the query and formik initialValues
    const handleOnChange = (event) => {
        setQuery(event.target.value);
        if (name =='sourceCity'){
            setInitialValues({ ...initialValues, sourceCity: event.target.value })
        }else{
            setInitialValues({ ...initialValues, destinationCity: event.target.value })
        }
    }


    return (
        <div className='relative' >
            
            <Field type="text" name={name} id={name}
                onChange={handleOnChange}
                autoComplete="off"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " placeholder="From" />
                
            <div className='absolute grid grid-cols-1 w-full shadow-2xl bg-white rounded-sm max-h-80 overflow-y-auto'>
                {
                    apiQuery.map((city, index) => {
                        return (
                            <div className='mx-2 my-1 cursor-pointer' key={index}>
                                <a onClick={() => {
                                    if (name == 'sourceCity') {
                                        setInitialValues({ ...initialValues, sourceCity: city.city_name })
                                    } else {
                                        setInitialValues({ ...initialValues, destinationCity: city.city_name })
                                    }
                                    setApiQuery([])
                                }}>{city.city_name}</a>
                            </div>
                        )
                    })
                }
            </div>
            <ErrorMessage name="sourceCity" >
                {(error) => <div className="text-red-600 text-xs mt-2">{error}</div>}
            </ErrorMessage>
        </div>
    )
}

export default LocationInput