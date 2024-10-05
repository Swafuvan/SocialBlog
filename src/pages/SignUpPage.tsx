import { useNavigate } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { SingUpValidation } from '@/lib/validation/validation';
import { UserSignUp } from '@/lib/routes/userRoutes';
import { useContext, useEffect } from 'react';
import { userContext } from './Provider';


const SignUpPage = () => {
    const navigate = useNavigate();
    const {user} = useContext<any>(userContext);
    
    useEffect(()=>{
        if(user){
            navigate('/')
        }
    },[user])

    // Redirect to login
    const loginRedirect = () => {
        navigate('/login');
    };

    // Initial form values
    const initialValues = {
        email: '',
        mobile: '',
        password: '',
        confirmPassword: '',
        terms: false,
    };

    // Form submit handler
    const handleSubmit = async (values: any) => {
        console.log('Form submitted:', values);
        const Signup = await UserSignUp(values);
        console.log(Signup)
        navigate('/login')
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
                    <h2 className="text-3xl font-bold text-blue-600 text-center mb-6">Sign Up Your Account</h2>

                    {/* Formik Form */}
                    <Formik
                        initialValues={initialValues}
                        validationSchema={SingUpValidation}
                        onSubmit={handleSubmit}
                    >
                        {({ isSubmitting }) => (
                            <Form className="space-y-4">

                                {/* Email */}
                                <div className="flex flex-col">
                                    <Field
                                        type="email"
                                        name="email"
                                        placeholder="Enter your email"
                                        className="mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
                                </div>

                                {/* Mobile */}
                                <div className="flex flex-col">
                                    <Field
                                        type="tel"
                                        name="mobile"
                                        placeholder="Enter your mobile number"
                                        className="mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    <ErrorMessage name="mobile" component="div" className="text-red-500 text-sm" />
                                </div>

                                {/* Password */}
                                <div className="flex flex-col">
                                    <Field
                                        type="password"
                                        name="password"
                                        placeholder="Enter your password"
                                        className="mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
                                </div>

                                {/* Confirm Password */}
                                <div className="flex flex-col">
                                    <Field
                                        type="password"
                                        name="confirmPassword"
                                        placeholder="Please confirm your password"
                                        className="mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-sm" />
                                </div>

                                {/* Terms */}
                                <div className="flex items-center space-x-2">
                                    <Field type="checkbox" name="terms" className="h-4 w-4 text-blue-600" />
                                    <label htmlFor="terms" className="text-gray-600">
                                        I agree to the <a href="/terms" className="text-blue-500">Terms</a> and <a href="/privacy" className="text-blue-500">Privacy Policy</a>.
                                    </label>
                                </div>
                                <ErrorMessage name="terms" component="div" className="text-red-500 text-sm" />

                                {/* Buttons */}
                                <div className="flex space-x-4 mt-6">
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition"
                                    >
                                        {isSubmitting ? 'Signing up...' : 'Sign Up'}
                                    </button>
                                    <button
                                        type="button"
                                        className="w-full border border-blue-600 text-blue-600 py-3 rounded-md hover:bg-blue-50 transition"
                                        onClick={loginRedirect}
                                    >
                                        Login
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

export default SignUpPage;