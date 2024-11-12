'use client';
import DashboardLayout from '@/components/common/DashboardLayout';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { isValid, parse, differenceInYears } from 'date-fns';

const Page = () => {
  const router = useRouter();
  const [formValues, setFormValues] = useState({
    fullName: '',
    secondName: '',
    fatherLastName: '',
    motherLastName: '',
    day: '',
    month: '',
    year: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const { fullName, day, month, year } = formValues;

    // Check if all required fields are filled
    if (!fullName || !day || !month || !year) {
      alert('Por favor, complete todos los campos obligatorios');
      return;
    }

    // Validate date format
    const dateString = `${year}-${month}-${day}`;
    const parsedDate = parse(dateString, 'yyyy-MM-dd', new Date());
    if (!isValid(parsedDate)) {
      alert('Por favor, introduzca una fecha válida');
      return;
    }

    // Check age range (18 to 100 years)
    const age = differenceInYears(new Date(), parsedDate);
    if (age < 18 || age > 100) {
      alert('La edad debe ser mayor a 18 y menor a 100 años');
      return;
    }

    router.push('/about-yourself/basic');
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormValues({ ...formValues, [id]: value });
  };

  return (
    <DashboardLayout>
      <div className='container w-3/4 mx-auto flex flex-col h-full min-h-screen'>
        <div className='w-full flex flex-col py-12'>
          <p className='title'>Primero, vamos a conocerte</p>
          <div className='w-full flex'>
            <form onSubmit={handleSubmit} className='w-[50%] flex flex-col'>
              <div className='w-full'>
                <p className='sm-title pt-6'>¿Cuál es su nombre legal completo?</p>
                <p className='text-style py-4'>
                  Este es el nombre que figura en su pasaporte o permiso de conducir.
                </p>
                <p className='text-style'>Nombre *</p>
                {/* <label htmlFor='fullName' className='text-style'>
                  {` Por ejemplo, Elizabeth Joy Smith.`}
                </label> */}
                <input
                  type='text'
                  id='fullName'
                  value={formValues.fullName}
                  onChange={handleChange}
                  className='bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-6 my-2'
                  required
                />
              </div>
              <div className='w-full'>
               
                <p className='text-style'>Segundo Nombre</p>
                {/* <label htmlFor='fullName' className='text-style'>
                  {` Por ejemplo, Elizabeth Joy Smith.`}
                </label> */}
                <input
                  type='text'
                  id='secondName'
                  value={formValues.secondName}
                  onChange={handleChange}
                  className='bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-6 my-2'
                  required
                />
              </div>
              <div className='w-full'>
            
               
                <p className='text-style'>Apellido Paterno *</p>
                {/* <label htmlFor='fullName' className='text-style'>
                  {` Por ejemplo, Elizabeth Joy Smith.`}
                </label> */}
                <input
                  type='text'
                  id='fatherLastName'
                  value={formValues.fatherLastName}
                  onChange={handleChange}
                  className='bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-6 my-2'
                  required
                />
              </div>
              <div className='w-full'>
                
               
                <p className='text-style'>Apellido Materno *</p>
                {/*  */}
                <input
                  type='text'
                  id='motherLastName'
                  value={formValues.motherLastName}
                  onChange={handleChange}
                  className='bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-6 my-2'
                  required
                />
              </div>
        
              <div className='w-full border-t-2 mt-3'>
                <p className='text-style pt-4'>Tu fecha de nacimiento</p>
                <p className='text-style pb-4 '>dd / mm / aa</p>
                <div className='flex w-full items-center justify-between'>
                  <div className='w-[25%]'>
                    <label htmlFor='day' className='text-style'>
                      {`Día`}
                    </label>
                    <input
                      type='text'
                      id='day'
                      value={formValues.day}
                      onChange={handleChange}
                      className='bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-6 my-2'
                      required
                    />
                  </div>
                  <div className='w-[25%]'>
                    <label htmlFor='month' className='text-style'>
                      {`Mes`}
                    </label>
                    <input
                      type='text'
                      id='month'
                      value={formValues.month}
                      onChange={handleChange}
                      className='bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-6 my-2'
                      required
                    />
                  </div>
                  <div className='w-[40%]'>
                    <label htmlFor='year' className='text-style'>
                      {`Año`}
                    </label>
                    <input
                      type='text'
                      id='year'
                      value={formValues.year}
                      onChange={handleChange}
                      className='bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-6 my-2'
                      required
                    />
                  </div>
                </div>
                <div className='flex justify-end py-4'>
                  <button
                    type='submit'
                    className='text-[14px] text-[#FFFFFF] font-[600] bg-[#0171e3] px-4 py-4 rounded-[100px] uppercase mt-4'
                  >
                    Guardar y continuar
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Page;
