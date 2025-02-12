"use client";
import { FC } from 'react';
import Modal from '@/components/common/Modal';
import PrimaryButton from "@/components/reusables/PrimaryButton";
import { UserAsset } from '@/types';

export interface AssetOption {
  id: string; // This is the categoryId to send
  key: string;
  label: string;
  description: string;
}

export const assetOptions: AssetOption[] = [
  {
    id: "a19dfcc7-e4c3-11ef-8562-0a4c8cf7c281",
    key: "digital_account",
    label: "Digital Account",
    description: "Digital accounts (e.g., PayPal, Stripe, neobanks)"
  },
  {
    id: "a19e0657-e4c3-11ef-8562-0a4c8cf7c281",
    key: "crypto",
    label: "Cryptocurrency",
    description: "Cryptocurrencies (Bitcoin, Ethereum, etc.)"
  },
  {
    id: "a19e0978-e4c3-11ef-8562-0a4c8cf7c281",
    key: "nft",
    label: "NFT",
    description: "Non-fungible tokens (NFTs)"
  },
  {
    id: "a19e0aae-e4c3-11ef-8562-0a4c8cf7c281",
    key: "domain",
    label: "Domain",
    description: "Domain names (e.g., example.com)"
  },
  {
    id: "a19e0b98-e4c3-11ef-8562-0a4c8cf7c281",
    key: "software_license",
    label: "Software License",
    description: "Software licenses or access tokens"
  },
  {
    id: "a19e0c91-e4c3-11ef-8562-0a4c8cf7c281",
    key: "real_estate",
    label: "Real Estate",
    description: "Real estate (houses, land, commercial properties)"
  },
  {
    id: "a19e0d79-e4c3-11ef-8562-0a4c8cf7c281",
    key: "vehicle",
    label: "Vehicle",
    description: "Vehicles (cars, motorcycles, boats, planes)"
  },
  {
    id: "a19e0e83-e4c3-11ef-8562-0a4c8cf7c281",
    key: "jewelry",
    label: "Jewelry",
    description: "Jewelry (watches, rings, necklaces)"
  },
  {
    id: "a19e0f6f-e4c3-11ef-8562-0a4c8cf7c281",
    key: "art",
    label: "Art",
    description: "Artworks (paintings, sculptures, collectibles)"
  },
  {
    id: "a19e1079-e4c3-11ef-8562-0a4c8cf7c281",
    key: "machinery",
    label: "Machinery",
    description: "Industrial machinery and equipment"
  },
  {
    id: "a19e1188-e4c3-11ef-8562-0a4c8cf7c281",
    key: "cash",
    label: "Cash",
    description: "Physical cash or currency"
  },
  {
    id: "a19e128f-e4c3-11ef-8562-0a4c8cf7c281",
    key: "stocks",
    label: "Stocks",
    description: "Stocks or shares in publicly traded companies"
  },
  {
    id: "a19e13a0-e4c3-11ef-8562-0a4c8cf7c281",
    key: "bonds",
    label: "Bonds",
    description: "Bonds or fixed-income securities"
  },
  {
    id: "a19e148a-e4c3-11ef-8562-0a4c8cf7c281",
    key: "investment_fund",
    label: "Investment Fund",
    description: "Mutual funds, ETFs, and investment pools"
  },
  {
    id: "a19e1579-e4c3-11ef-8562-0a4c8cf7c281",
    key: "savings_account",
    label: "Savings Account",
    description: "Savings accounts in banks or credit unions"
  },
  {
    id: "a19e16bc-e4c3-11ef-8562-0a4c8cf7c281",
    key: "pension_fund",
    label: "Pension Fund",
    description: "Retirement or pension funds (e.g., 401k, IRA)"
  },
  {
    id: "a19e17ac-e4c3-11ef-8562-0a4c8cf7c281",
    key: "business_shares",
    label: "Business Shares",
    description: "Ownership in private businesses or corporations"
  },
  {
    id: "a19e18a2-e4c3-11ef-8562-0a4c8cf7c281",
    key: "private_equity",
    label: "Private Equity",
    description: "Private equity stakes, venture capital interests"
  },
  {
    id: "a19e199a-e4c3-11ef-8562-0a4c8cf7c281",
    key: "precious_metals",
    label: "Precious Metals",
    description: "Precious metals (gold, silver, platinum)"
  },
  {
    id: "a19e1a6c-e4c3-11ef-8562-0a4c8cf7c281",
    key: "patent",
    label: "Patent",
    description: "Patents or registered inventions"
  },
  {
    id: "a19e1bd7-e4c3-11ef-8562-0a4c8cf7c281",
    key: "trademark",
    label: "Trademark",
    description: "Registered trademarks or service marks"
  },
  {
    id: "a19e1eab-e4c3-11ef-8562-0a4c8cf7c281",
    key: "copyright",
    label: "Copyright",
    description: "Intellectual property rights (e.g., copyrights)"
  },
  {
    id: "a19e1f3d-e4c3-11ef-8562-0a4c8cf7c281",
    key: "royalties",
    label: "Royalties",
    description: "Royalty streams from patents, music, or art"
  },
  {
    id: "a19e1fea-e4c3-11ef-8562-0a4c8cf7c281",
    key: "inherited_real_estate",
    label: "Inherited Real Estate",
    description: "Inherited real estate properties"
  },
  {
    id: "a19e206d-e4c3-11ef-8562-0a4c8cf7c281",
    key: "inherited_art",
    label: "Inherited Art",
    description: "Inherited art pieces"
  },
  {
    id: "a19e2104-e4c3-11ef-8562-0a4c8cf7c281",
    key: "inherited_jewelry",
    label: "Inherited Jewelry",
    description: "Inherited jewelry"
  },
  {
    id: "a19e219b-e4c3-11ef-8562-0a4c8cf7c281",
    key: "collectible",
    label: "Collectible",
    description: "Collectibles (coins, trading cards, toys)"
  },
  {
    id: "a19e2273-e4c3-11ef-8562-0a4c8cf7c281",
    key: "equipment",
    label: "Equipment",
    description: "Specialized equipment (medical, sports, etc.)"
  },
  {
    id: "a19e22b3-e4c3-11ef-8562-0a4c8cf7c281",
    key: "antique",
    label: "Antique",
    description: "Antiques (historical furniture, vintage items)"
  },
  {
    id: "a19e2333-e4c3-11ef-8562-0a4c8cf7c281",
    key: "wine_collection",
    label: "Wine Collection",
    description: "Wine or spirits collection"
  },
  {
    id: "a19e237c-e4c3-11ef-8562-0a4c8cf7c281",
    key: "other",
    label: "Other",
    description: "Other assets not categorized above"
  },
];

interface AddAssetPropsExtended {
  setShowModal: (show: boolean) => void;
  showModal: boolean;
  onAddAsset: (asset: UserAsset) => void;
  assetOptions: AssetOption[];
}

const AddAsset: FC<AddAssetPropsExtended> = ({ setShowModal, showModal, onAddAsset, assetOptions }) => {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    // Get the selected categoryId from the dropdown.
    const selectedCategoryId = formData.get('assetType') as string;
    
    // Build a new UserAsset object.
    const newAsset: UserAsset = {
      categoryId: selectedCategoryId,
      name: formData.get('name') as string,
      value: Number(formData.get('value')),
      description: formData.get('description') as string,
      currency: 'MXN', // Default currency
      metadata: {
        location: formData.get('location') as string,
        // You can optionally include additional metadata here.
      }
    };

    onAddAsset(newAsset);
    setShowModal(false);
  };

  return (
    <Modal setShowModal={setShowModal} showModal={showModal}>
      <div className="w-full min-w-[400px] max-w-2xl mx-auto">
        <div className="inline-flex items-center h-[32px] bg-[#047aff] bg-opacity-10 px-[12px] py-[6px] rounded-md mb-2.5">
          <span className="text-[#047aff] text-[14px] font-normal">NUEVO ACTIVO</span>
        </div>

        <h2 className="text-[22px] font-medium text-[#1d1d1f] mb-6">
          Agregar nueva cuenta o propiedad
        </h2>

        <div className="w-full">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="assetType" className="block text-[17px] font-normal text-[#1d1d1f] mb-2.5">
                Tipo de activo <span className="text-[#047aff]">*</span>
              </label>
              <select
                id="assetType"
                name="assetType"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:border-[#047aff] transition-all text-[16px]"
                required
                defaultValue=""
              >
                <option value="" disabled>Seleccionar</option>
                {assetOptions.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.label} – {option.description}
                  </option>
                ))}
              </select>
            </div>

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
