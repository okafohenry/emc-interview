import React, { useEffect, useState } from 'react';
import { ScaleLoader } from 'react-spinners';
import { toast } from 'react-toastify';
import AuthService from '../../services/auth.service';
import UserService from '../../services/user.service';
import { Action, Dispatch } from '@reduxjs/toolkit';

const styles = {
    container: 'py-4 px-[10px]',
    grid: 'grid mb-4',
    label: 'text-[13px] font-[400] tracking-wide',
    input: 'border py-2 px-2 rounded-[3px] mt-1.5 text-[14px] outline-0',
    btn: 'py-2 text-[15px] font-[400] text-center w-full rounded-[4px] border border-emc-primary text-emc-primary hover:text-white bg-white hover:bg-emc-primary mt-2'
}

const initialData = {
    username: '',
    password: ''
}

type Props = {
    setTotalUnread: (data: number) => void, 
    setTotalMsgs:  (data: number) => void,
    setUserInfo:(data: { username: string, _id: string}) => void, 
}

export default function SignIn({ setTotalUnread, setTotalMsgs, setUserInfo }: Props) {
    const [formData, setFormData] = useState(initialData);
    const [loading, setLoading] = useState(false);
    const authService = new AuthService();
    const userService = new UserService();


    const handleSubmit = async(e: any) =>  {
        e.preventDefault();

        setLoading(true);
        try{
            const response = await authService.signIn(formData);
            setLoading(false);
            if(!response.success){
                toast.error(response.error || 'Login failed, try again!');
                return;
            }
            localStorage.setItem('emc-token', response?.token);
            setUserInfo({ _id: response?.user?._id, username: response?.user?.username});
            toast.success('Login successful!');

            let config = {
                headers: {
                    'Authorization': `Bearer ${response.token}`
                }
            }
           const res = await fetch('https://emc-interview-be.onrender.com/v1/overview', config);
           if(Number(res?.status) === 200){
                const data = await res.json();
                if(data?.success){
                    setTotalUnread(data?.data?.unread);
                    setTotalMsgs(data?.data?.total)
                }
           }

        }catch(err){
            setLoading(false);
            toast.error('Login failed, try again!');
            return;
        }

        return false;
    }

    return (
        <form onSubmit={handleSubmit} className={styles.container}>
            <div className={styles.grid}>
                <label className={styles.label}>Username</label>
                <input
                    className={styles.input}
                    placeholder='john doe'
                    type="text"
                    required
                    onChange={(e: any) => setFormData({...formData, username: e.target.value})}
                    />
            </div>
            <div className={styles.grid}>
                <label className={styles.label}>Password</label>
                <input
                    className={styles.input}
                    placeholder='********'
                    type="password"
                    required
                    onChange={(e: any) => setFormData({...formData, password: e.target.value})}
                    />
            </div>
            <button className={`${styles.btn} ${loading && 'bg-emc-primary'}`}>{loading ? <ScaleLoader height={12} width={3} color='white' /> : 'Log In'}</button>
        </form>
    )
}