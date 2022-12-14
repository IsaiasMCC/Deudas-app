import React from 'react'
import { Navigate } from 'react-router-dom'
import useAuth from '../auth/useAuth';
import { authProvider } from '../firebase/firebaseAuth';

import { useFormik } from 'formik'
import * as Yup from 'yup'
import TextValidator from '../components/TextValidator';


const LoginPage = () => {
    const UseAuth = useAuth();

    const customForm = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: Yup.object({
            email: Yup.string()
                    .required('correo es obligatorio')
                    .email('correo no es valido'),
            password: Yup.string()
                    .required('contraseña es requerida')
                    .min(8, 'minimo 8 caracteres')
        }),
        onSubmit: (user)=> handleSubmit(user)
    });

    const handleSubmit = (user) => {
        console.log('login..')
        authProvider.login(user, UseAuth.setUser)
    }

  return (
    <>
    {
    UseAuth.isLogged() ?
        <Navigate to='/'/>
    :
    <div className='flex w-3/5 py-10 mt-40 mx-auto bg-white border'>
        <div className='w-1/2'>
            <img alt='font' src={require('../assets/images/login_image.png')} width={500} height={400}/>
        </div>
        <form className='flex flex-col mt-8 w-1/3 mx-auto'
            onSubmit={ customForm.handleSubmit }
        >
            <p className='text-lg font-bold text-black/80 py-2' > Bienvenido Iniciar Sesión </p>
            <input className='my-2 border border-black/80 py-2 px-2 rounded-sm'
                type="text" 
                placeholder='correo'
                name='email'
                value={ customForm.values.email }
                onChange={ customForm.handleChange }
                onBlur={ customForm.handleBlur }
            />
            {
                customForm.touched.email && customForm.errors.email &&
                <TextValidator
                    title={ customForm.errors.email }
                />
            }
            <input className='my-2 border border-black/80 py-2 px-2 rounded-sm'
                type='password'
                placeholder='contraseña'
                name='password'
                value={ customForm.values.password }
                onChange={ customForm.handleChange }
                onBlur={ customForm.handleBlur }
            />
            {
                customForm.touched.password && customForm.errors.password &&
                <TextValidator 
                    title={ customForm.errors.password }
                />
            }
            <button type='submit' className='my-2 font-semibold text-gray-100 bg-blue-600 py-2'> Iniciar Sesión </button>
        </form>
    </div>
    }
    </>
  )
}

export default LoginPage