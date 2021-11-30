import React, {useState} from 'react';
import './RegisterForm.css';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Button, FormControl, FormHelperText, IconButton, Input, InputAdornment, InputLabel, Typography } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import {useGlobals} from "../../store";


const digitsOnly = /[0-9]/g;

const validationSchema = yup.object({
    firstName: yup
        .string('Enter your FirstName')
        .required('required'),
    lastName: yup
        .string('Enter your LastName')
        .required('required'),
    email: yup
        .string('Enter your Email')
        .email('Enter a valid email')
        .required('required'),
    password: yup
        .string('Enter your Password')
        .min(8, 'Password should be of minimum 8 characters length')
        .required('required'),
    contactNumber: yup
        .string('Enter your Contact Number')
        .min(10, 'Enter 10 digit number')
        .matches(digitsOnly, 'Zipcode is not valid')
        .required('required'),
});



const RegisterForm = () => {

    const [values, setValues] = React.useState({
        showPassword: false,
        isRegisterSuccess: false
    });

    const {isRegistered,callSignUp }=useGlobals();

    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            contactNumber: ''
        },
        validationSchema: validationSchema,
        onSubmit: values => {
            callSignUp(values);
            setValues({ ...values, isRegisterSuccess: true });
        },
    });


    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };


    return (
        <form className='registerForm' autoComplete='off' onSubmit={(e) => {
            e.preventDefault();
            formik.handleSubmit();
        }}>
            <FormControl fullWidth required error={formik.touched.firstName && Boolean(formik.errors.firstName)}>
                <InputLabel htmlFor="firstName">First Name</InputLabel>
                <Input
                    id="firstName"
                    placeholder='First Name'
                    name='firstName'
                    value={formik.values.firstName}
                    onChange={formik.handleChange}
                    aria-describedby="firstName"
                />
                <FormHelperText id="firstName-error-text">{formik.touched.firstName && formik.errors.firstName}</FormHelperText>
            </FormControl>

            <FormControl fullWidth required error={formik.touched.lastName && Boolean(formik.errors.lastName)}>
                <InputLabel htmlFor="lastName">Last Name</InputLabel>
                <Input
                    id="lastName"
                    placeholder='Last Name'
                    name='lastName'
                    value={formik.values.lastName}
                    onChange={formik.handleChange}
                    aria-describedby="lastName"
                />
                <FormHelperText id="lastName-error-text">{formik.touched.lastName && formik.errors.lastName}</FormHelperText>
            </FormControl>

            <FormControl fullWidth required error={formik.touched.email && Boolean(formik.errors.email)}>
                <InputLabel htmlFor="email">Email</InputLabel>
                <Input
                    id="email"
                    placeholder='Email'
                    name='email'
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    aria-describedby="email"
                />
                <FormHelperText id="email-error-text">{formik.touched.email && formik.errors.email}</FormHelperText>
            </FormControl>

            <FormControl fullWidth required error={formik.touched.password && Boolean(formik.errors.password)}>
                <InputLabel htmlFor="password">Password</InputLabel>
                <Input
                    id="password"
                    name="password"
                    type={values.showPassword ? 'text' : 'password'}
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    placeholder='Password'
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                            >
                                {values.showPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                        </InputAdornment>
                    }
                />
                <FormHelperText id="password-error-text">{formik.touched.password && formik.errors.password}</FormHelperText>
            </FormControl>

            <FormControl fullWidth required error={formik.touched.contactNumber && Boolean(formik.errors.contactNumber)}>
                <InputLabel htmlFor="contactNumber">Contact Number</InputLabel>
                <Input
                    id="contactNumber"
                    placeholder='Contact Number'
                    name='contactNumber'
                    value={formik.values.contactNumber}
                    onChange={formik.handleChange}
                    aria-describedby="contactNumber"
                />
                <FormHelperText id="contactNumber-error-text">{formik.touched.contactNumber && formik.errors.contactNumber}</FormHelperText>
            </FormControl>
            <Typography>{isRegistered ? "Registration Successful. Please Login!" : ''}</Typography>
            <Button type='submit' variant='contained' color='primary'>REGISTER</Button>
        </form>
    );
}

export default RegisterForm;