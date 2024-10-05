import * as Yup from 'yup';

export const SingUpValidation = Yup.object({
    email: Yup.string()
        .email('Please enter a valid email address')
        .required('Email is required'),

    mobile: Yup.string()
        .matches(/^[0-9]{10}$/, 'Mobile number must be exactly 10 digits')
        .required('Mobile number is required'),

    password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .max(15, 'Password cannot be longer than 15 characters')
        .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
        .matches(/[0-9]/, 'Password must contain at least one number')
        .required('Password is required'),

    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Passwords must match')
        .required('Please confirm your password'),

    terms: Yup.bool()
        .oneOf([true], 'You must accept the terms and conditions')
        .required('You must accept the terms and conditions'),
});

export const LoginvalidationSchema = Yup.object().shape({
    email: Yup.string()
        .email('Please enter a valid email address')
        .required('Email is required'),

    password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .max(15, 'Password cannot be longer than 15 characters')
        .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
        .matches(/[0-9]/, 'Password must contain at least one number')
        .required('Password is required'),
});

export const BlogCreateSchema = Yup.object().shape({
    title: Yup.string()
      .required('Title is required')
      .min(5, 'Title should be at least 5 characters long'),
    content: Yup.string()
      .required('Content is required')
      .min(15, 'Content should be at least 15 characters long')
      .max(500,'Content cannot be longer than 500 characters')
  })