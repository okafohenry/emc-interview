import React from 'react'
import { Link } from 'react-router-dom'
import { TimestampFormat, TruncateText } from '../custom-hooks'

type Props = {
    message: {
        _id: string,
        _user: string,
        subject: string,
        context: string,
        isRead: boolean,
        createdAt: string,
        updatedAt: string,
        __v: number
    }
}

export default function MessageItem({ message }: Props) {
  return (
    <Link to={`/message/${message?._id}`} className={`w-full py-2 px-5 rounded-[5px] flex justify-between gap-x-5 items-center hover:bg-gray-100 border-b border-x border-b-gray-200 ${message?.isRead ? 'bg-white' : 'bg-gray-50'}`}>
        <div>
            <h3 className='font-[600] text-[16px] tracking-wide'>{message?.subject}</h3>
            <p className='text-[14px] font-[400] py-1 tracking-wide'>{TruncateText(message?.context, 50)}</p>
        </div>
        <p className='font-[600] text-[13px] tracking-wide'>{TimestampFormat(message?.createdAt)}</p>
    </Link>
  )
}