import React from 'react'

const AuthCarousel = ({img, title, desc }) => {
    return (
        <div className='!flex flex-col items-center justify-center h-full mb-10'>
            <img src={img}
                alt=''
                className='w-[500px] h-[400px]' />
            <h3 className='text-3xl text-white text-center font-bold'>
                {title}
            </h3>
            <p className='mt-5 text-xl text-white text-center'>
                {desc}
            </p>
        </div>
    )
}

export default AuthCarousel