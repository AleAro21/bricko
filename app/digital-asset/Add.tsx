import { FC } from 'react';
import Modal from '@/components/common/Modal';

interface AddProps {
  setShowModal: (show: boolean) => void;
  showModal: boolean;
}

interface AssetOption {
  value: string;
  label: string;
}

const assetOptions: AssetOption[] = [
  { value: 'account', label: 'Account' },
  { value: 'property', label: 'Property' },
];

const Add: FC<AddProps> = ({ setShowModal, showModal }) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    setShowModal(false);
  };

  return (
    <Modal setShowModal={setShowModal} showModal={showModal}>
      <div className='w-full min-w-[400px]'>
        <p className='sm-title'>Agregar activos digitales</p>
        <div className='w-full'>
          <form className='mx-auto my-4' onSubmit={handleSubmit}>
            <label htmlFor='assetType' className='text-style'>
              Tipo de activo
            </label>
            <select
              id='assetType'
              className='bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-0 focus:border-gray-300 block w-full py-6 px-2 my-2'
              defaultValue=''
            >
              <option value='' disabled>
                Seleccionar
              </option>
              {assetOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <button
              type='submit'
              className='w-full text-[14px] text-[#FFFFFF] font-[600] bg-[#0171e3] px-4 py-4 rounded-[100px] uppercase mt-4'
            >
              Agregar
            </button>
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default Add;