"use client";
import { FC, useState, useEffect, ChangeEvent } from 'react';
import Modal from '@/components/common/Modal';
import PrimaryButton from "@/components/reusables/PrimaryButton";
import { UserAsset } from '@/types';

export interface AssetOption {
  id: string; // This is the categoryId to send
  key: string;
  label: string;
  description: string;
  subcategories: string[];
}

export interface AddAssetProps {
  setShowModal: (show: boolean) => void;
  showModal: boolean;
  onAddAsset: (asset: UserAsset) => void;
  assetOptions: AssetOption[];
}

const AddAsset: FC<AddAssetProps> = ({ setShowModal, showModal, onAddAsset, assetOptions }) => {
  // Local state for the selected category and subcategory
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("");
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>("");

  // When a new category is selected, update the subcategory.
  const handleCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const catId = e.target.value;
    setSelectedCategoryId(catId);
    // Find the asset option for this id
    const option = assetOptions.find(opt => opt.id === catId);
    if (option && option.subcategories.length > 0) {
      // If "Plataforma" exists in subcategories, default to it.
      const defaultSub = option.subcategories.find(sub => sub.toLowerCase() === "plataforma") || option.subcategories[0];
      setSelectedSubcategory(defaultSub);
    } else {
      setSelectedSubcategory("");
    }
  };

  // Handle changes to the subcategory dropdown.
  const handleSubcategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedSubcategory(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    // Build a new UserAsset object.
    // Here we send the selectedCategoryId from state,
    // and add the chosen subcategory into metadata.
    const newAsset: UserAsset = {
      categoryId: selectedCategoryId,
      name: formData.get('name') as string,
      value: Number(formData.get('value')),
      description: formData.get('description') as string,
      currency: 'MXN', // Default currency
      metadata: {
        location: formData.get('location') as string,
        subcategory: selectedSubcategory
      }
    };

    onAddAsset(newAsset);
    setShowModal(false);
  };

  return (
    <Modal setShowModal={setShowModal} showModal={showModal}>
      <div className="w-full min-w-[400px] max-w-2xl mx-auto relative">
        <button
          onClick={() => setShowModal(false)}
          className="absolute top-4 right-4 w-8 h-8 bg-[#e8e8ed] rounded-full flex items-center justify-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text[#6e6e73]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="inline-flex items-center h-[32px] bg-[#047aff] bg-opacity-10 px-[12px] py-[6px] rounded-md mb-2.5">
          <span className="text-[#047aff] text-[14px] font-normal">NUEVO REGISTRO</span>
        </div>

        <h2 className="text-[22px] font-medium text-[#1d1d1f] mb-6">
          Agregar activo
        </h2>

        <div className="w-full">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Asset Category Dropdown */}
            <div>
              <label htmlFor="assetType" className="block text-[17px] font-normal text-[#1d1d1f] mb-2.5">
                Tipo de activo <span className="text-[#047aff]">*</span>
              </label>
              <select
                id="assetType"
                name="assetType"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:border-[#047aff] transition-all text-[16px]"
                required
                value={selectedCategoryId}
                onChange={handleCategoryChange}
              >
                <option value="" disabled>Seleccionar</option>
                {assetOptions.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.label}
                     {/* – {option.description} */}
                  </option>
                ))}
              </select>
            </div>

            {/* Subcategory Dropdown */}
            {selectedCategoryId && (
              <div>
                <label htmlFor="subcategory" className="block text-[17px] font-normal text-[#1d1d1f] mb-2.5">
                  Subcategoría <span className="text-[#047aff]">*</span>
                </label>
                <select
                  id="subcategory"
                  name="subcategory"
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:border-[#047aff] transition-all text-[16px]"
                  required
                  value={selectedSubcategory}
                  onChange={handleSubcategoryChange}
                >
                  {assetOptions
                    .find(opt => opt.id === selectedCategoryId)
                    ?.subcategories.map((sub, idx) => (
                      <option key={idx} value={sub}>{sub}</option>
                    ))
                  }
                </select>
              </div>
            )}

            <div>
              <label htmlFor="name" className="block text-[17px] font-normal text-[#1d1d1f] mb-2.5">
                Nombre del activo <span className="text-[#047aff]">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:border-[#047aff] transition-all text-[16px]"
                placeholder="Ej: Casa Principal, Cuenta BBVA"
              />
            </div>

            <div>
              <label htmlFor="value" className="block text-[17px] font-normal text-[#1d1d1f] mb-2.5">
                Valor estimado (MXN) <span className="text-[#047aff]">*</span>
              </label>
              <input
                type="number"
                id="value"
                name="value"
                required
                min="0"
                step="0.01"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:border-[#047aff] transition-all text-[16px]"
                placeholder="0.00"
              />
            </div>

            <div>
              <label htmlFor="location" className="block text-[17px] font-normal text-[#1d1d1f] mb-2.5">
                Ubicación o Institución
              </label>
              <input
                type="text"
                id="location"
                name="location"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:border-[#047aff] transition-all text-[16px]"
                placeholder="Ej: BBVA, Av. Reforma 123"
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-[17px] font-normal text-[#1d1d1f] mb-2.5">
                Descripción o notas adicionales
              </label>
              <textarea
                id="description"
                name="description"
                rows={3}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:border-[#047aff] transition-all text-[16px] resize-none"
                placeholder="Información adicional relevante"
              />
            </div>

            <div className="pt-2">
              <PrimaryButton type="submit" className="w-full">
                Agregar
              </PrimaryButton>
            </div>
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default AddAsset;