'use client';

import React, { FormEvent, useState } from 'react';
import Image from 'next/image';
import graylogo from '../../assets/greylogo.png';

interface FormData {
  country: string;
  email: string;
}

const WaitingList: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    country: '',
    email: '',
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted:', formData);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  return (
    <>
      <div className='py-4'>
        <Image 
          src={graylogo} 
          width={100} 
          height={100} 
          alt="Testador Logo" 
        />
      </div>
      <div className='flex flex-col md:w-[50%] max-w-[500px] mx-auto items-center justify-center h-[80vh]'>
        <div>
          <p className='title py-6'>
            Una disculpa, en este momento solo estamos disponibles en México,
          </p>
          <p className='text-style py-4'>
            Si deseas saber cuándo estaremos disponibles en tu país, por favor,
            déjanos tu dirección de correo electrónico y el país donde vives.
          </p>
          <div className='py-6'>
            <form onSubmit={handleSubmit}>
              <div className='mb-6'>
                <div className='py-3'>
                  <label htmlFor='country' className='text-style'>
                    País de Residencia
                  </label>
                  <input
                    type='text'
                    id='country'
                    value={formData.country}
                    onChange={handleInputChange}
                    className='bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-6'
                    required
                  />
                </div>
                <div className='py-3'>
                  <label htmlFor='email' className='text-style'>
                    Email
                  </label>
                  <input
                    type='email'
                    id='email'
                    value={formData.email}
                    onChange={handleInputChange}
                    className='bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-6'
                    required
                  />
                </div>
              </div>
              <div className='w-full flex items-end justify-end'>
                <button 
                  type="submit"
                  className='text-[14px] text-[#FFFFFF] font-[600] bg-[#0171e3] px-4 py-2 rounded-[100px] uppercase'
                >
                  Enviar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default WaitingList;