import React, { useEffect, useState } from 'react'
import AppLayout from '../components/layouts';
import { useParams, useNavigate } from 'react-router-dom';
import UserService from '../services/user.service';
import { toast } from 'react-toastify';
import { formatDate } from '../components/custom-hooks';

const styles = {
    dateSection: 'border-y border-gray-100 text-[14px] py-3 flex justify-between items-center',
    h2: 'mt-[1.5rem] mb-[1.5rem] lg:text-[30px] text-[20px] font-[600]'
}

type Props = {}

export default function Message({}: Props) {
    const navigate = useNavigate();
    const userService = new UserService();
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [details, setDetails] = useState<any>({});
    const [user, setUser] = useState<any>({});

    const getUserProfile = async(_arg: string) => {
        try{
            const response = await userService.getUser(_arg);
            setLoading(false);
            if(!response.success){
                return;
            }
            setUser(response?.data);
        }catch(err: any){
            setLoading(false);
            return;
        }
    }

    const getMessageDetails = async(_arg: string) => {
        setLoading(true);
        try{
            const response = await userService.getMessageDetails(_arg);
            setLoading(false);
            if(!response.success){
                toast.error(response?.error);
                return;
            }
            setDetails(response?.data);
            getUserProfile(response?.data?._user);
        }catch(err: any){
            setLoading(false)
            toast.error(err?.message);
            return;
        }
    };

    useEffect(() => {
        if(id){
            getMessageDetails(id);
        }
    }, [])


    return (
        <AppLayout> 
            <p className='text-[13px] mt-7 text-gray-500 hover:cursor-pointer' onClick={() => navigate(-1)}>&larr; Back</p>
            <h2 className={styles.h2}>{details.subject}</h2>
            <div className={styles.dateSection}>
                {/* {Object.entries(user).length > 0 && <p className='capitalize'>From: {user?.username}</p>} */}
               <p>Date: <span>{formatDate(details?.createdAt)}</span></p> 
            </div>
            <p className='py-5 font-[16px] leading-[32px]'>{details?.context}</p>
        </AppLayout>
    )
}