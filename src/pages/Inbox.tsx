import React, { useEffect, useState } from 'react';
import AppLayout from '../components/layouts';
import { Empty, MessageItem } from '../components/ui';
import UserService from '../services/user.service';
import { toast } from 'react-toastify';

const styles = {
    tabBtns: 'w-full flex gap-x-2 border-y border-gray-100 text-[14px]',
    h2: 'mt-[2rem] mb-[1.5rem] lg:text-[30px] text-[20px] font-[600]'
}

type Props = {}

export default function Inbox({}: Props) {
    const [tab, setTab] = useState(0);
    const [allMessages, setAllMessages] = useState([]);
    const [unreadMessages, setUnreadMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const userService = new UserService();

    const getMessages = async() => {
        setLoading(false);
        try{
            const response = await userService.getMessages();
            setLoading(false);
            if(!response.success){
                toast.error('Something went wrong: unable to get messages.');
                return;
            }
            setAllMessages(response?.data);
            const allUnread = response?.data?.filter((item: any) => item?.isRead === false);
            setUnreadMessages(allUnread);
        }catch(err){
            setLoading(false);
            toast.error('Something went wrong: unable to get messages.');
            return;
        }
    }

    useEffect(() => {
        getMessages();
    }, [])


    return (
        <AppLayout>
            <h2 className={styles.h2}>Inbox</h2>
            <div className={styles.tabBtns}>
                <button 
                className={`${tab === 0 ? 'border-b-2 border-red-600' : ''} px-[50px] py-3`}
                onClick={() => setTab(0)}>All Messages ({allMessages?.length})</button>

                <button 
                className={`${tab === 1 ? 'border-b-2 border-red-600' : ''} px-[50px] py-3`}
                onClick={() => setTab(1)}>Unread Messages ({unreadMessages?.length})</button>
            </div>
            {tab === 0 &&
                <>{allMessages?.length > 0 ?
                    <>{allMessages?.map((message: any, i: number) => (
                        <MessageItem 
                            key={i} 
                            message={message} 
                        />
                    ))}</> :
                    <Empty />
                }</>
            }

            {tab === 1 &&
                <>{unreadMessages?.length > 0 ?
                    <>{unreadMessages?.map((message: any, i: number) => (
                        <MessageItem 
                            key={i} 
                            message={message} 
                        />
                    ))}</> :
                    <Empty />
                }</>
            }
        </AppLayout>
    )
}