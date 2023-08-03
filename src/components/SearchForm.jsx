import { ErrorMessage, Formik, Form, Field } from 'formik';
import { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { getCityList, searchBus } from '../services/userApi';
import LocationInput from './LocationInput';

function SearchForm() {
    const [cities, setCities] = useState([]);

    const [initialValues, setInitialValues] = useState({
        sourceCity: '',
        destinationCity: '',
        doj: '',
    })

    function setFormikValues(data) {
        setInitialValues(data)
    }


    useEffect(() => {
        getCityList()
            .then((response) => {
                console.log(response);
                setCities(response.data)
            })
            .catch((error) => {
                console.log(error);
            })
    }, [])

    //Yup form validation
    const validate = Yup.object({
        sourceCity: Yup
            .string()
            .required('From field is required'),
        destinationCity: Yup
            .string()
            .required('To field is required'),
        doj: Yup
            .date()
            .required('Date field is required')
            .test('is-future-date', 'Date should be greater than today', function (value) {
                if (!value) return false; // If date is not set, consider it invalid
                const today = new Date();
                today.setHours(0, 0, 0, 0); // Set time to midnight for comparison
                return value > today;
            }),

    });



    //submiting the form data
    const onSubmit = (values) => {
        console.log(values);

        searchBus(values)
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            })
        // userSignup(values).then((response) => {
        //     console.log(response);
        // })
    }



    return (
        <div className="container mx-auto p-4 px-12 lg:flex lg:justify-center lg:items-center mt-10">

            <Formik initialValues={initialValues}
                validationSchema={validate}
                enableReinitialize={true}
                onSubmit={onSubmit}>

                <Form className="grid grid-cols-1 gap-4 md:grid-cols-4 md:gap-8 lg:gap-3 lg:max-w-4xl max-w lg:shadow-2xl p-6 rounded-md border-spacing-2" >

                    <div>
                        <label htmlFor='from' className="block mb-2 text-sm font-medium text-gray-900 ">From</label>

                        <LocationInput name={'sourceCity'} initialValues={initialValues} setInitialValues={setFormikValues} cities={cities} />
                    </div>

                    <div>
                        <label htmlFor='to' className="block mb-2 text-sm font-medium text-gray-900 ">To</label>
                        <LocationInput name={'destinationCity'} initialValues={initialValues} setInitialValues={setFormikValues} cities={cities} />
                    </div>

                    <div>
                        <label htmlFor="doj" className="block mb-2 text-sm font-medium text-gray-900">Date</label>
                        <Field type="date" name="doj" id="doj" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " />
                        <ErrorMessage name="doj" >
                            {(error) => <div className="text-red-600 text-xs mt-2">{error}</div>}
                        </ErrorMessage>
                    </div>

                    <button type="submit" className=" bg-primary-600 bg-blue-600  font-medium rounded-lg text-sm px-5 py-2.5 text-center text-white ">Search</button>
                </Form>
            </Formik>
        </div>
    )
}

export default SearchForm