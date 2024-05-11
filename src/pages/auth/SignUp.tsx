import React, { useState } from 'react';
import { ScaleLoader } from 'react-spinners';
import AuthService from '../../services/auth.service';
import UserService from '../../services/user.service';
import { toast } from 'react-toastify';

const styles = {
    container: 'py-4 px-[10px]',
    grid: 'grid mb-4',
    label: 'text-[13px] font-[400] tracking-wide',
    input: 'border py-2 px-2 rounded-[3px] mt-1.5 text-[14px] outline-0',
    btn: 'py-2 text-[15px]  font-[400] text-center w-full rounded-[4px] border border-emc-primary text-emc-primary hover:text-white bg-white hover:bg-emc-primary mt-2'
}

const initialData = {
    username: '',
    password: ''
}

type Props = {
    setUserInfo: (data: { username: string, _id: string}) => void, 
    setTotalUnread:(data: number) => void, 
    setTotalMsgs: (data: number) => void
}

export default function SignUp({ setUserInfo, setTotalUnread, setTotalMsgs }: Props) {
    const [formData, setFormData] = useState(initialData);
    const [loading, setLoading] = useState(false);
    const authService = new AuthService();
    const userService = new UserService();

    const handleSubmit = async(e: any) =>  {
        e.preventDefault();

        setLoading(true);
        try{
            const response = await authService.signUp(formData);
            setLoading(false);
            if(!response?.success){
                toast.error(response?.error);
                return;
            }
            localStorage.setItem('emc-token', response?.token);
            setUserInfo({ _id: response?.user?._id, username: response?.user?.username});
            toast.success('Account created successfully!');

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
            toast.error('SignUp failed, try again!');
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
            <button className={`${styles.btn} ${loading && 'bg-emc-primary'}`} type="submit">{loading ? <ScaleLoader height={12} width={3} color='white' /> : 'Sign Up'}</button>
        </form>
    )
}