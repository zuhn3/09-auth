'use client'
import css from './sign-in.module.css'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { LoginRequest } from '@/lib/api/api'
import { login } from '@/lib/api/clientApi'
import { ApiError } from 'next/dist/server/api-utils'
import { useUserData } from "@/lib/store/authStore";
const SignIn = () =>{
    const router = useRouter()
    const [error, setError] = useState('')
    const {setData} = useUserData()

    const handleLogin = async (formData: FormData) =>{
        try{
            const data = Object.fromEntries(formData) as LoginRequest
            const response = await login(data);

            if(response){
                setData({username: response.email, email: response.email, avatar: response.avatar})
                router.push(`/profile`)
            }
            else{
                setError('You are not authorized')
            }
        }catch (error){
            setError((error as ApiError).message)
        }
    }




    return (
        <main className={css.mainContent}>
            <form className={css.form} action={handleLogin}>
                <h1 className={css.formTitle}>Sign in</h1>

                <div className={css.formGroup}>
                    <label htmlFor="email">Email</label>
                    <input id="email" type="email" name="email" className={css.input} required />
                </div>

                <div className={css.formGroup}>
                    <label htmlFor="password">Password</label>
                    <input id="password" type="password" name="password" className={css.input} required />
                </div>

                <div className={css.actions}>
                    <button type="submit" className={css.submitButton}>
                        Log in
                    </button>
                </div>

                <p className={css.error}>{error}</p>
            </form>
        </main>

    )
}


export default SignIn;