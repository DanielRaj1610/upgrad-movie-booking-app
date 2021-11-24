import { Button, FormControl, FormHelperText, IconButton, Input, InputLabel } from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import InputAdornment from '@material-ui/core/InputAdornment';
import React from 'react';
import './LoginForm.css';
import { useFormik } from 'formik';
import * as yup from 'yup';

const validationSchema = yup.object({
    userName: yup
        .string('Enter your username')
        .required('Username is required'),
    password: yup
        .string('Enter your password')
        .min(8, 'Password should be of minimum 8 characters length')
        .required('Password is required'),
});


const LoginForm = () => {

    const [values, setValues] = React.useState({
        showPassword: false,
    });

    const formik = useFormik({
        initialValues: {
            userName: '',
            password: '',
        },
        validationSchema: validationSchema,
        onSubmit: values => {
            alert(JSON.stringify(values, null, 2));
        },
    });


    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };




    return (
        <form className='loginForm' autoComplete='off' onSubmit={(e) => {
            e.preventDefault();
            formik.handleSubmit();
        }}>
            <FormControl fullWidth required error={formik.touched.userName && Boolean(formik.errors.userName)}>
                <InputLabel htmlFor="userName">Name</InputLabel>
                <Input
                    id="userName"
                    placeholder='Username'
                    name='userName'
                    value={formik.values.userName}
                    onChange={formik.handleChange}
                    aria-describedby="username"
                />
                <FormHelperText id="userName-error-text">{formik.touched.userName && formik.errors.userName}</FormHelperText>
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
            <Button type='submit' variant='contained' color='primary'>Submit</Button>
        </form>
    );
}

export default LoginForm;