"use client";
import { FC, useState, useEffect, ChangeEvent } from 'react';
import Modal from '@/components/common/Modal';
import PrimaryButton from "@/components/reusables/PrimaryButton";
import { UserAsset } from '@/types';

export interface AssetOption {
  id: string;
  key: string;
  label: string;
  description: string;
  subcategories: string[];
  type: string;
}

export interface AddAssetProps {
  setShowModal: (show: boolean) => void;
  showModal: boolean;
  onAddAsset: (asset: UserAsset) => void;
  assetOptions: AssetOption[];
}

const AddAsset: FC<AddAssetProps> = ({ setShowModal, showModal, onAddAsset, assetOptions }) => {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("");
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>("");
  const [customPlatform, setCustomPlatform] = useState<string>("");

  const handleCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const catId = e.target.value;
    setSelectedCategoryId(catId);
    const option = assetOptions.find(opt => opt.id === catId);
    if (option && option.subcategories.length > 0) {
      setSelectedSubcategory(option.subcategories[0]);
    } else {
      setSelectedSubcategory("");
    }
    setCustomPlatform("");
  };

  const handleSubcategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedSubcategory(e.target.value);
    if (e.target.value !== "Otro") {
      setCustomPlatform("");
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    const newAsset: UserAsset = {
      categoryId: selectedCategoryId,
      name: formData.get('name') as string,
      description: formData.get('instructions') as string,
      value: 0,
      currency: 'MXN',
      metadata: {
        accountName: formData.get('accountName') as string,
        platform: selectedSubcategory === 'Otro' ? customPlatform : selectedSubcategory,
        hasBackupCodes: formData.get('hasBackupCodes') === 'true',
        backupLocation: formData.get('backupLocation') as string,
        instructions: formData.get('instructions') as string,
        subcategory: selectedSubcategory === 'Otro' ? customPlatform : selectedSubcategory
      }
    };

    onAddAsset(newAsset);
    setShowModal(false);
  };

  return (
    <Modal setShowModal={setShowModal} showModal={showModal}>
      <div className="w-full min-w-[400px] max-w-2xl mx-auto">
        <div className="inline-flex items-center h-[32px] bg-[#047aff] bg-opacity-10 px-[12px] py-[6px] rounded-md mb-2.5">
          <span className="text-[#047aff] text-[14px] font-normal">NUEVO ACTIVO DIGITAL</span>
        </div>

        <h2 className="text-[22px] font-medium text-[#1d1d1f] mb-6">
          Agregar nuevo activo digital
        </h2>

        <div className="w-full">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="assetType" className="block text-[17px] font-normal text-[#1d1d1f] mb-2.5">
                Tipo de activo digital <span className="text-[#047aff]">*</span>
              </label>
              <select
                id="assetType"
                name="assetType"
                required
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:border-[#047aff] transition-all text-[16px]"
                value={selectedCategoryId}
                onChange={handleCategoryChange}
              >
                <option value="" disabled>Seleccionar tipo</option>
                {assetOptions.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {selectedCategoryId && (
              <div>
                <label htmlFor="subcategory" className="block text-[17px] font-normal text-[#1d1d1f] mb-2.5">
                  Plataforma <span className="text-[#047aff]">*</span>
                </label>
                <select
                  id="subcategory"
                  name="subcategory"
                  required
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:border-[#047aff] transition-all text-[16px]"
                  value={selectedSubcategory}
                  onChange={handleSubcategoryChange}
                >
                  <option value="" disabled>Seleccionar plataforma</option>
                  {assetOptions
                    .find(opt => opt.id === selectedCategoryId)
                    ?.subcategories.map((sub, idx) => (
                      <option key={idx} value={sub}>{sub}</option>
                    ))
                  }
                  <option value="Otro">Otro</option>
                </select>
              </div>
            )}

            {selectedSubcategory === 'Otro' && (
              <div>
                <label htmlFor="customPlatform" className="block text-[17px] font-normal text-[#1d1d1f] mb-2.5">
                  Especificar plataforma <span className="text-[#047aff]">*</span>
                </label>
                <input
                  type="text"
                  id="customPlatform"
                  name="customPlatform"
                  required
                  value={customPlatform}
                  onChange={(e) => setCustomPlatform(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:border-[#047aff] transition-all text-[16px]"
                  placeholder="Escriba el nombre de la plataforma"
                />
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
                placeholder="Ej: Cuenta de Facebook, Wallet de Bitcoin"
              />
            </div>

            <div>
              <label htmlFor="accountName" className="block text-[17px] font-normal text-[#1d1d1f] mb-2.5">
                Nombre de la cuenta o identificador <span className="text-[#047aff]">*</span>
              </label>
              <input
                type="text"
                id="accountName"
                name="accountName"
                required
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:border-[#047aff] transition-all text-[16px]"
                placeholder="@usuario o nombre de cuenta"
              />
            </div>

            <div>
              <label htmlFor="instructions" className="block text-[17px] font-normal text-[#1d1d1f] mb-2.5">
                Instrucciones para el albacea
              </label>
              <textarea
                id="instructions"
                name="instructions"
                rows={3}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:border-[#047aff] transition-all text-[16px] resize-none"
                placeholder="Instrucciones sobre qué hacer con esta cuenta"
              />
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="hasBackupCodes"
                  name="hasBackupCodes"
                  value="true"
                  className="h-6 w-6 rounded border-gray-300 text-[#047aff] focus:ring-[#047aff] transition-all"
                />
                <label htmlFor="hasBackupCodes" className="text-[16px] font-normal text-[#1d1d1f]">
                  Tengo códigos de respaldo o recuperación
                </label>
              </div>

              <div>
                <label htmlFor="backupLocation" className="block text-[17px] font-normal text-[#1d1d1f] mb-2.5">
                  Ubicación de los códigos de respaldo
                </label>
                <input
                  type="text"
                  id="backupLocation"
                  name="backupLocation"
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:border-[#047aff] transition-all text-[16px]"
                  placeholder="Ej: Gestor de contraseñas, archivo específico"
                />
              </div>
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