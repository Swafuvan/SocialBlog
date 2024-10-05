import { useNavigate } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { UserLogin } from '@/lib/routes/userRoutes';
import { LoginvalidationSchema } from '@/lib/validation/validation';
import { useContext, useEffect, useLayoutEffect } from 'react';
import { userContext } from './Provider';

const Loginpage = () => {

    const Navigate = useNavigate();
    const {UserData,user} = useContext<any>(userContext);

    useEffect(()=>{
        if(user){
            Navigate('/')
        }
    },[user]);

    
    const SignupUser = () => {
        Navigate('/signup');
    };

    // Initial form values
    const initialValues = {
        email: '',
        password: '',
    };

    // Form submit handler
    const handleSubmit = async (values:any) => {
        console.log('Form values:', values);
        const LoginData = await UserLogin(values);
        console.log(LoginData.User);
        if(LoginData){
            UserData(LoginData);
            localStorage.setItem('userToken',LoginData.JWTToken);
            Navigate('/');
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex justify-center items-center">
            <div className="bg-white shadow-lg rounded-lg flex max-w-5xl w-full overflow-hidden">

                {/* Left side (Image or Illustration) */}
                <div className="w-1/2 bg-blue-50 p-10 flex justify-center items-center">
                    <img
                        src='./LoginImg.svg'
                        alt="Illustration"
                        className="object-cover"
                    />
                </div>

                {/* Right side (Form) */}
                <div className="w-1/2 p-10">
                    <h2 className="text-3xl font-bold text-blue-600 text-center mb-6">Login to Your Account</h2>

                    {/* Formik Form */}
                    <Formik
                        initialValues={initialValues}
                        validationSchema={LoginvalidationSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ isSubmitting }) => (
                            <Form className="space-y-4">
                                <div className="flex flex-col">
                                    <Field
                                        type="email"
                                        name="email"
                                        placeholder="Enter your email"
                                        className="mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
                                </div>

                                <div className="flex flex-col">
                                    <Field
                                        type="password"
                                        name="password"
                                        placeholder="Enter your password"
                                        className="mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
                                </div>

                                {/* Buttons */}
                                <div className="flex space-x-4 mt-6">
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition"
                                    >
                                        {isSubmitting ? 'Logging in...' : 'Login'}
                                    </button>
                                    <button
                                        type="button"
                                        className="w-full border border-blue-600 text-blue-600 py-3 rounded-md hover:bg-blue-50 transition"
                                        onClick={SignupUser}
                                    >
                                        Sign Up
                                    </button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    );
};

export default Loginpage;
