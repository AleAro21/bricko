import Link from "next/link"

const Card = ({linkNo,linkyes,titleNo,titleYes}) => {
  return (
    <div className='flex justify-center gap-3 w-full text-center '>
      <Link
        href={linkNo}
        className='bg-white border border-white w-full max-w-[220px] py-4 px-4 rounded-[20px]  hover:border-gray-200 cursor-pointer card-box-shadow transition ease-in-out delay-150 hover:translate-y hover:scale-105 duration-300'
      >
        <p className='text-[30px] font-[500]'>No</p>
        <p className='text-[16px] text-[#4a4a4a] font-[400]'>{titleNo}</p>
      </Link>
      <Link
        href={linkyes}
        className='bg-white border border-white w-full max-w-[220px] py-4 px-4 rounded-[20px] hover:border-gray-200 cursor-pointer card-box-shadow transition ease-in-out delay-150 hover:translate-y hover:scale-105 duration-300'
      >
        <p className='text-[30px] font-[500]'>Sí</p>
        <p className='text-[16px] text-[#4a4a4a] font-[400]'>{titleYes}</p>
      </Link>
    </div>
  );
};

export default Card;
