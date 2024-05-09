import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CustomModal } from '../components/ui';
import SignIn from './auth/SignIn';
import SignUp from './auth/SignUp';
import logo from '../assets/icons/logo.svg';
import mockup1 from '../assets/images/mockup1.png';
import mockup2 from '../assets/images/mockup2.png';
import { toast } from 'react-toastify';
import UserService from '../services/user.service';
import AOS from 'aos'
import 'aos/dist/aos.css';

const styles = {
    container: 'w-full h-[100vh] bg-emc-primary grid lg:grid-cols-2 grid-cols-1',
    right: 'lg:col-span-1 lg:flex items-center hidden relative',
    left: 'col-span-1 h-full',
    logo: 'h-[30px] w-[30px]',
    logoText: ' text-white text-[32px] font-[700]',
    h2: 'mt-[25%] mb-5 lg:text-[65px] text-[42px] leading-[82px] font-[700] text-white capitalize',
    p: 'text-[23px] font-[500] leading-[43px] text-white',
    linkBtn: 'relative top-[5rem] text-emc-primary border border-emc-primary bg-white hover:border-white hover:bg-emc-primary hover:text-white font-[600] py-[15px] px-[20px] rounded-[5px]',
    tabBtns: 'flex justify-evenly',
    modal: 'lg:w-[25%] w-[70%] lg:mt-[16%] mt-[40%] mx-auto bg-white rounded-[5px] p-[15px]'
}


type Props = {}

export default function Home({}: Props) {
    const [userInfo, setUserInfo] = useState<any>({ _id: '', username: ''});
    const [tab, setTab] = useState(0);
    const [totalMsgs, setTotalMsgs] = useState(0);
    const [totalUnread, setTotalUnread] = useState(0);
    const userService = new UserService();

    const token = localStorage.getItem('emc-token');


    const getProfile = async() => {
        try{
            const res = await userService.getProfile();
            if(!res?.success){
                toast.error(res?.error);
                return;
            }
            setUserInfo({ _id: res?.data?._id, username: res?.data?.username });
            const response = await userService.getOverview();
            if(response?.success){
                setTotalMsgs(response?.data?.total);
                setTotalUnread(response?.data?.unread)
            }

        }catch(err){
            toast.error('Unable to get user profile');
            return;
        }
    }

    useEffect(() => {
        getProfile();
    }, [])
   

    return (
        <>
            <div className={styles.container}>
                <div data-aos="fade-down" className={styles.left}>
                    <div className='md:w-[70%] w-[80%] mx-auto mt-[11rem]'>
                        <div className='flex items-center gap-x-3.5'>
                            <img src={logo} alt="logo" className={styles.logo} />
                            <p className={styles.logoText}>Mafinzo</p>
                        </div>

                        <h2 className={styles.h2}>Welcome, { userInfo?.username || ''}</h2>
                        <p className={styles.p}>You have {totalUnread} unread messages from {totalMsgs} total messages.</p>
                        {/* <div className='mt-7'> */}
                            <Link to="/inbox" className={styles.linkBtn}>View Messages</Link>
                        {/* </div> */}
                    </div>
                </div>
                <div data-aos="fade-left" className={styles.right}>
                    <img src={mockup1} alt="iphone14 mockup" className='absolute h-[80%] w-[90%} z-10' />
                    <img src={mockup2} alt="iphone14 mockup" className='absolute h-full z-20 right-[9rem]' />
                </div>
            </div>

           {!token && <CustomModal
            modalStyle={styles.modal}
            >
                <div>
                    <div className={styles.tabBtns}>
                        <button 
                        className={`${tab === 0 ? 'border-b-2 border-red-600' : ''} w-full py-2`}
                        onClick={() => {
                            setTab(0); 
                        }}>Log In</button>

                        <button 
                        className={`${tab === 1 ? 'border-b-2 border-red-600' : ''} w-full py-2`}
                        onClick={() => {
                            setTab(1)
                         }}>Sign Up</button>
                    </div>
                    <div>
                        {tab === 0 && 
                        <SignIn 
                            setTotalMsgs={(data: number) => setTotalMsgs(data)}
                            setTotalUnread={(data: number) => setTotalUnread(data)}
                            setUserInfo={(data) => setUserInfo(data)}
                            />
                        }
                        {tab === 1 && 
                        <SignUp 
                            setTotalMsgs={(data: number) => setTotalMsgs(data)}
                            setTotalUnread={(data: number) => setTotalUnread(data)}
                            setUserInfo={(data) => setUserInfo(data)}
                            />
                        }
                    </div>
                </div>
            </CustomModal>}
        </>
    )
}