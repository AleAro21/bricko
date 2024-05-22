'use client';
import React, { useEffect } from 'react';

export default function Modal({children, setShowModal, showModal }) {
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showModal && !(event.target).closest('.modal-content')) {
        setShowModal(false);
      }
    };
    document.body.addEventListener('click', handleClickOutside);
    return () => {
      document.body.removeEventListener('click', handleClickOutside);
    };
  }, [showModal, setShowModal]);

  return (
    <>
      {showModal ? (
        <>
          <div className='justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none'>
            <div className='relative w-auto my-6 mx-auto max-w-3x1'>
              {/*content*/}
              <div className='modal-content border-0 px-12 py-4 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none'>
                <button
                  className='absolute z-50 right-[10px] top-[10px] p-1 ml-auto border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none'
                  onClick={() => setShowModal(false)}
                >
                  <span className='text-black text-2xl block outline-none focus:outline-none'>
                    ×
                  </span>
                </button>
                {children}
              </div>
            </div>
          </div>
          <div className='opacity-75 fixed inset-0 z-40 bg-black'></div>
        </>
      ) : null}
    </>
  );
}
