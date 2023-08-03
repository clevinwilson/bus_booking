import { ErrorMessage, Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { userSignup } from '../services/userApi';

function RegisterForm() {
    //Yup form validation
    const validate = Yup.object({
        name: Yup
            .string()
            .trim()
            .required("Please provide fullname")
            .matches(/^[a-zA-Z\s]+$/, "Only alphabets are allowed"),
        email: Yup.string()
            .email('Invalid email address')
            .required('Email is Required'),
        password: Yup.string()
            .min(6, 'Password must be at least 6 charaters')
            .required('Password is Required'),
        role: Yup
            .string()
            .required('role is required')
    });

    //formik state
    const initialValues = {
        name: '',
        email: '',
        password: '',
        role: '',
    }
    //submiting the form data
    const onSubmit = (values) => {
        userSignup(values).then((response)=>{
            console.log(response);
        })
    }

    //dropdown list
    const options = [
        { value: 'admin', label: 'Admin' },
        { value: 'user', label: 'User' },
    ];

    return (
        <section className="bg-gray-50 dark:bg-gray-900">
            <Formik initialValues={initialValues}
                validationSchema={validate}
                onSubmit={onSubmit}>
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-center text-gray-900 md:text-2xl dark:text-white">
                                Sign Up
                            </h1>
                            <Form className="space-y-4 md:space-y-6" >

                                <div>
                                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Name</label>
                                    <Field type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Name" />
                                    <ErrorMessage name="name" >
                                        {(error) => <div className="text-red-600 text-xs mt-2">{error}</div>}
                                    </ErrorMessage>
                                </div>

                                <div>
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                    <Field type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" />
                                    <ErrorMessage name="email" >
                                        {(error) => <div className="text-red-600 text-xs mt-2">{error}</div>}
                                    </ErrorMessage>
                                </div>
                                <div>
                                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                    <Field type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                    <ErrorMessage name="password" >
                                        {(error) => <div className="text-red-600 text-xs mt-2">{error}</div>}
                                    </ErrorMessage>
                                </div>

                                <div>
                                    <label htmlFor="role" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Role</label>
                                    <Field as="select" name="role" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                        <option value="">Select an option</option>
                                        {options.map((option) => (
                                            <option key={option.value} value={option.value}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </Field>
                                    <ErrorMessage name="role" >
                                        {(error) => <div className="text-red-600 text-xs mt-2">{error}</div>}
                                    </ErrorMessage>
                                </div>


                                <button type="submit" className="w-full  bg-primary-600 bg-blue-600  font-medium rounded-lg text-sm px-5 py-2.5 text-center text-white ">Signup</button>
                            </Form>
                        </div>
                    </div>
                </div>
            </Formik>
        </section>
    )
}

export default RegisterForm