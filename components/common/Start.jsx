'use client';
import Card from '@/components/common/Card';
import { useRouter } from 'next/navigation';
import graylogo from '../../assets/greylogo.png';
import Image from 'next/image';
const Start = ({ heading, linkNo, linkyes, titleNo, titleYes }) => {
  const router = useRouter();
  return (
    <>
      <div className='py-4 '>
        <a href='https://testador.mx' className='w-full'>
          <Image src={graylogo} width={100} />
        </a>
      </div>
      <div className='flex flex-col md:w-[50%] max-w-[500px] mx-auto items-center justify-center h-[80vh]'>
        <p className='text-[30px] font-[500] py-4 text-center'>{heading}</p>
        <Card
          linkNo={linkNo}
          linkyes={linkyes}
          titleNo={titleNo}
          titleYes={titleYes}
        />
        <div
          onClick={() => router.back()}
          className='flex transition-all delay-150 mr-auto ml-0 justify-start items-center text-[14px] font-[500] gap-2  pt-1 text-[#9999] cursor-pointer border-b border-transparent hover:border-[#9999]'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 448 512'
            height={'14px'}
            width={'14px'}
          >
            <path
              fill='#0000FF'
              d='M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z'
            />
          </svg>
          Regresar
        </div>
      </div>
    </>
  );
};

export default Start;
