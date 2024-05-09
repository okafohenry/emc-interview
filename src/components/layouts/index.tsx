import React, { ReactNode, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/icons/logo.svg';
import { CustomModal } from '../ui';
import UserService from '../../services/user.service';
import { toast } from 'react-toastify';
import { ScaleLoader } from 'react-spinners';


const styles = {
    container: '',
    nav: 'flex justify-between w-full h-[80px] items-center bg-emc-primary px-[50px]',
    rightPane: 'flex items-center gap-x-10',
    logo: 'h-[25px] w-[25px]',
    logoText: 'text-white text-[24px] font-[600] lg:block hidden',
    main: 'lg:w-[70%] w-[95%] mx-auto',
    p: 'hover:cursor-pointer text-white',
    modal: 'w-fit lg:mt-[16%] mt-[40%] mx-auto bg-white rounded-[5px] py-[25px] px-[35px]',
    newPostModal: 'lg:w-[30%] w-[90%] lg:mt-[16%] mt-[40%] mx-auto bg-white rounded-[5px] py-[25px] px-[35px]',
    logoutBtn: 'px-[20px] py-2 rounded-[5px] text-white text-[14px] font-[500]',
    input: 'p-3 w-full border outline-0 rounded-[5px] text-[13px]',
    label: 'text-[14px]'
}



type Props = {
    children: ReactNode
}

export default function AppLayout({ children }: Props) {
    const [formData, setFormData] = useState({ username: '', subject: '', context: ''})
    const navigate = useNavigate();
    const [toggle, setToggle] = useState(false);
    const [newPost, setNewPost] = useState(false);
    const [loading, setLoading] = useState(false);
    const userService = new UserService();


    const handleLogout = () => {
        localStorage.clear();
        navigate('/');
    };

    const handleSubmit = async(e: any) => {
        e.preventDefault();
        setLoading(true)
        try{
            const response = await userService.newMessage(formData);
            if(!response?.success){
                toast.error(response?.error);
                return;
            }
            toast.success('Message sent!');
            setNewPost(false);
        }catch(err: any){
            toast.error(err?.message);
            return;
        }

        return false;
    };

    return (
        <div className={styles.container}>
            <nav className={styles.nav}>
                <div className='flex items-center gap-x-3.5'>
                    <Link to="/"><img src={logo} alt="logo" className={styles.logo} /></Link>
                    <p className={styles.logoText}>Mafinzo</p>
                </div>
                <div className={styles.rightPane}>
                    <p className={` font-[600] text-[13px] px-[10px] py-2 rounded-[5px] bg-white text-emc-primary hover:cursor-pointer`} onClick={() => setNewPost(true)}>
                        <span>Compose &#43;</span>
                    </p> 
                    <p className={styles.p} onClick={() => setToggle(true)}>Log Out</p> 
                </div>
            </nav>
            <main className={styles.main}>{children}</main>

            {toggle &&
            <CustomModal
            modalStyle={styles.modal}
            >
                <p className='text-center mb-5 font-[500]'>Do you wish to logout?</p>
                <div className='flex items-center justify-center gap-x-5'>
                    <button 
                        className={`${styles.logoutBtn} bg-emc-primary`}
                        onClick={handleLogout}
                        >Yes, Continue</button>
                    <button 
                        className={`${styles.logoutBtn} bg-gray-200 text-black`}
                        onClick={() => setToggle(false)}
                        >No, Cancel</button>
                </div>
            </CustomModal>
            }

            {newPost &&
            <CustomModal
            modalStyle={styles.newPostModal}
            >
                <h2 className='text-center mb-5 font-[600]'>Send Message</h2>
                <form className='grid gap-y-3' onSubmit={handleSubmit}>
                    <div className='grid'>
                        <label className={styles.label}>To</label>
                        <input 
                            type="text" 
                            placeholder="Recipient's username" 
                            className={styles.input}
                            onChange={(e: any) => setFormData({...formData, username: e.target.value})} 
                            required 
                            />
                    </div>
                    <div className='grid'>
                        <label className={styles.label}>Subject</label>
                        <input 
                            type="text" 
                            placeholder="New subject" 
                            className={styles.input}
                            onChange={(e: any) => setFormData({...formData, subject: e.target.value})} 
                            required 
                            />
                    </div>
                    <div className='grid'>
                        <label className={styles.label}>Message</label>
                        <textarea 
                            className={`resize-none ${styles.input}`} 
                            rows={4}
                            placeholder="Message goes here..." 
                            onChange={(e: any) => setFormData({...formData, context: e.target.value})}  
                            required
                            >
                                {formData.context}
                        </textarea>
                    </div>

                    <div className='w-full mt-3 flex items-center justify-between'>
                        <button className={`${styles.logoutBtn} bg-green-600`}>{loading? <ScaleLoader height={12} width={3} color='white'/> : 'Submit'}</button>
                        <button className={`${styles.logoutBtn} bg-gray-200 text-black`} onClick={() => setNewPost(false)}>Cancel</button>
                    </div>
                </form>
            </CustomModal>
            }
        </div>
    )
}