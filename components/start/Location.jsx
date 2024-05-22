'use client';
import Image from 'next/image';
import graylogo from '../../assets/greylogo.png';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Location = () => {
  const router = useRouter();
  return (
    <>
      <div className='py-4 '>
        <Image src={graylogo} width={100} />
      </div>
      <div className='flex flex-col mx-auto items-center justify-center p-24 h-[80vh]'>
        <p className='title py-4'>Do you live in Maxico?</p>
        <div className='flex gap-2'>
          <Link
            href={'/start/country'}
            className='bg-white h-[80px] w-[220px] rounded-[20px] text-center flex flex-col p-4 items-center  hover:border cursor-pointer'
          >
            <p className='title h-[50px]'>NO</p>
            {/* <p className='text-style'></p> */}
          </Link>
          <Link
            href={'/start/country'}
            className='bg-white h-[80px] w-[220px] rounded-[20px] text-center flex flex-col p-4 items-center  hover:border cursor-pointer'
          >
            <p className='title h-[50px]'>Yes</p>
            {/* <p className='text-style'>Including with a mortgage or jointly</p> */}
          </Link>
        </div>
        <div
          onClick={() => router.back()}
          className='flex items-center text-[14px] font-[500] gap-2  pt-1 text-[#9999] cursor-pointer border-b border-transparent hover:border-[#9999] transiton-all delay-150'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 448 512'
            height={'18px'}
            width={'18px'}
          >
            <path
              fill='#9999'
              d='M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z'
            />
          </svg>
          Back
        </div>
      </div>
    </>
  );
};

export default Location;
