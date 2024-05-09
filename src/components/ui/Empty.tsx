import React from 'react';
import emptyIcon from '../../assets/icons/empty.svg';

type Props = {}

export default function Empty({}: Props) {
  return (
    <div className='w-fit mx-auto lg:mt-[10%] mt-[20%]'>
        <img src={emptyIcon} alt='empty' />
        <p className='text-center'>No Messages</p>
    </div>
  )
}