'use client';
import { useRouter } from 'next/navigation';
import graylogo from '../../../assets/greylogo.png';
import Image from 'next/image';
const page = () => {
  const router = useRouter();
  return (
    <>
      <main className='container w-3/4 mx-auto flex flex-col h-full min-h-screen'>
        <div className='py-4 '>
          <Image src={graylogo} width={100} />
        </div>
        <div className='flex flex-col md:w-[50%] max-w-[500px] mx-auto items-center justify-center h-full min-h-[80vh]'>
          <div className=''>
            <p className='title py-2 text-center'>Request a callback</p>
            <p className='text-style py-4 text-center'>
              We’ll phone you to talk about your situation. We’ll explain how
              things work and set up your appointment with a will specialist.
              This call usually takes around 15 minutes.
            </p>
            <div className='py-4'>
              <form>
                <div class='mb-6'>
                  <div className='py-3'>
                    <label for='country' class='text-style'>
                      Your Name
                    </label>
                    <input
                      type='text'
                      id='country'
                      class='bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-6'
                      required
                    />
                  </div>
                  <div className='py-3'>
                    <label for='country' class='text-style'>
                      Phone Number
                    </label>
                    <input
                      type='text'
                      id='country'
                      class='bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-6'
                      required
                    />
                  </div>
                  <div className='py-3'>
                    <label for='email' class='text-style'>
                      Email Address
                    </label>
                    <input
                      type='email'
                      id='email'
                      class='bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-6'
                      required
                    />
                  </div>
                  <button className='w-full text-[14px] text-[#4a4a4a] font-[600] bg-[#FFDF4E] px-4 py-4 rounded-[5px] uppercase'>
                    Request a callback
                  </button>
                  <p className='text-style py-4'>
                    By submitting this form, you agree to be contacted by
                    Farewill and accept our Terms and Privacy Policy.
                  </p>
                </div>
              </form>
            </div>
            <div className='border rounded-[5px] p-4 '>
              <div className=''>
                <p className='sm-title text-center flex items-center gap-2 justify-center py-2'>
                  Or call us now{' '}
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 512 512'
                    className='w-[24px] h-[24px]'
                  >
                    <path d='M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z' />
                  </svg>{' '}
                  020 8154 5692
                </p>
                <p className='text-style text-center py-2'>
                  We’re open 9am to 6pm, Monday to Friday.
                </p>
              </div>
            </div>
          </div>
          <div className='w-full flex items-center justify-between'>
            <div
              onClick={() => router.back()}
              className='flex items-center text-[14px] font-[500] gap-2  pt-1 text-[#9999] cursor-pointer border-b border-transparent hover:border-[#9999] transiton-all delay-150'
            >
              <svg
                height={'14px'}
                width={'14px'}
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 320 512'
              >
                <path
                  fill='#0000FF'
                  d='M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z'
                />
              </svg>
              Back
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default page;
