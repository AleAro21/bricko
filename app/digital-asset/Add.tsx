import { FC, useState, useEffect } from 'react';
import Modal from '@/components/common/Modal';
import PrimaryButton from "@/components/reusables/PrimaryButton";

interface AddProps {
  setShowModal: (show: boolean) => void;
  showModal: boolean;
  onAddAsset: (asset: DigitalAssetData) => void;
}

export interface DigitalAssetData {
  id: string;
  type: string;
  platform: string;
  accountName: string;
  instructions: string;
  hasBackupCodes: boolean;
  backupLocation?: string;
}

const assetTypes = [
  { value: 'social', label: 'Redes Sociales' },
  { value: 'email', label: 'Correo Electrónico' },
  { value: 'crypto', label: 'Criptomonedas' },
  { value: 'cloud', label: 'Almacenamiento en la Nube' },
  { value: 'subscription', label: 'Servicios de Suscripción' },
  { value: 'domain', label: 'Nombres de Dominio' },
  { value: 'gaming', label: 'Cuentas de Juegos' },
  { value: 'other', label: 'Otros Activos Digitales' },
];

const platforms = {
  social: ['Facebook', 'Instagram', 'Twitter', 'LinkedIn', 'TikTok', 'Otro'],
  email: ['Gmail', 'Outlook', 'Yahoo', 'iCloud', 'Otro'],
  crypto: ['Binance', 'Coinbase', 'MetaMask', 'Ledger', 'Otro'],
  cloud: ['Google Drive', 'Dropbox', 'iCloud', 'OneDrive', 'Otro'],
  subscription: ['Netflix', 'Spotify', 'Amazon Prime', 'Disney+', 'Otro'],
  domain: ['GoDaddy', 'Namecheap', 'Google Domains', 'Otro'],
  gaming: ['Steam', 'PlayStation', 'Xbox', 'Nintendo', 'Otro'],
  other: ['Otro'],
};

const Add: FC<AddProps> = ({ setShowModal, showModal, onAddAsset }) => {
  const [selectedType, setSelectedType] = useState<string>('');
  const [selectedPlatform, setSelectedPlatform] = useState<string>('');
  const [customType, setCustomType] = useState<string>('');
  const [customPlatform, setCustomPlatform] = useState<string>('');
  const [availablePlatforms, setAvailablePlatforms] = useState<string[]>([]);

  useEffect(() => {
    if (selectedType && selectedType !== 'other') {
      setAvailablePlatforms(platforms[selectedType as keyof typeof platforms]);
    }
  }, [selectedType]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    
    const newAsset: DigitalAssetData = {
      id: crypto.randomUUID(),
      type: selectedType === 'other' ? customType : selectedType,
      platform: selectedPlatform === 'Otro' ? customPlatform : selectedPlatform,
      accountName: formData.get('accountName') as string,
      instructions: formData.get('instructions') as string,
      hasBackupCodes: formData.get('hasBackupCodes') === 'true',
      backupLocation: formData.get('backupLocation') as string,
    };

    onAddAsset(newAsset);
    setShowModal(false);
  };

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedType(value);
    setSelectedPlatform('');
    setCustomPlatform('');
  };

  const handlePlatformChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedPlatform(value);
    if (value !== 'Otro') {
      setCustomPlatform('');
    }
  };

  return (
    <Modal setShowModal={setShowModal} showModal={showModal}>
      <div className="w-full min-w-[400px] max-w-2xl mx-auto">
        <div className="inline-flex items-center h-[32px] bg-[#047aff] bg-opacity-10 px-[12px] py-[6px] rounded-md mb-2.5">
          <span className="text-[#047aff] text-[14px] font-[400]">NUEVO ACTIVO DIGITAL</span>
        </div>

        <h2 className="text-[22px] font-[500] text-[#1d1d1f] mb-6">
          Agregar nuevo activo digital
        </h2>

        <div className="w-full">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="type" className="block text-[17px] font-[400] text-[#1d1d1f] mb-2.5">
                Tipo de activo <span className="text-[#047aff]">*</span>
              </label>
              <select
                id="type"
                name="type"
                required
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:border-[#047aff] transition-all duration-1000 text-[16px]"
                value={selectedType}
                onChange={handleTypeChange}
              >
                <option value="" disabled>Seleccionar tipo</option>
                {assetTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>

            {selectedType === 'other' && (
              <div>
                <label htmlFor="customType" className="block text-[17px] font-[400] text-[#1d1d1f] mb-2.5">
                  Especificar tipo <span className="text-[#047aff]">*</span>
                </label>
                <input
                  type="text"
                  id="customType"
                  name="customType"
                  required
                  value={customType}
                  onChange={(e) => setCustomType(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:border-[#047aff] transition-all duration-1000 text-[16px]"
                  placeholder="Escriba el tipo de activo"
                />
              </div>
            )}

            {selectedType && selectedType !== 'other' && (
              <div>
                <label htmlFor="platform" className="block text-[17px] font-[400] text-[#1d1d1f] mb-2.5">
                  Plataforma <span className="text-[#047aff]">*</span>
                </label>
                <select
                  id="platform"
                  name="platform"
                  required
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:border-[#047aff] transition-all duration-1000 text-[16px]"
                  value={selectedPlatform}
                  onChange={handlePlatformChange}
                >
                  <option value="" disabled>Seleccionar plataforma</option>
                  {availablePlatforms.map((platform) => (
                    <option key={platform} value={platform}>
                      {platform}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {selectedPlatform === 'Otro' && (
              <div>
                <label htmlFor="customPlatform" className="block text-[17px] font-[400] text-[#1d1d1f] mb-2.5">
                  Especificar plataforma <span className="text-[#047aff]">*</span>
                </label>
                <input
                  type="text"
                  id="customPlatform"
                  name="customPlatform"
                  required
                  value={customPlatform}
                  onChange={(e) => setCustomPlatform(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:border-[#047aff] transition-all duration-1000 text-[16px]"
                  placeholder="Escriba el nombre de la plataforma"
                />
              </div>
            )}

            <div>
              <label htmlFor="accountName" className="block text-[17px] font-[400] text-[#1d1d1f] mb-2.5">
                Nombre de la cuenta o identificador <span className="text-[#047aff]">*</span>
              </label>
              <input
                type="text"
                id="accountName"
                name="accountName"
                required
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:border-[#047aff] transition-all duration-1000 text-[16px]"
                placeholder="@usuario o nombre de cuenta"
              />
            </div>

            <div>
              <label htmlFor="instructions" className="block text-[17px] font-[400] text-[#1d1d1f] mb-2.5">
                Instrucciones para el albacea
              </label>
              <textarea
                id="instructions"
                name="instructions"
                rows={3}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:border-[#047aff] transition-all duration-1000 text-[16px] resize-none"
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
                  className="h-6 w-6 rounded border-gray-300 text-[#047aff] focus:ring-[#047aff] transition-all duration-1000"
                />
                <label htmlFor="hasBackupCodes" className="text-[16px] font-[400] text-[#1d1d1f]">
                  Tengo códigos de respaldo o recuperación
                </label>
              </div>

              <div>
                <label htmlFor="backupLocation" className="block text-[17px] font-[400] text-[#1d1d1f] mb-2.5">
                  Ubicación de los códigos de respaldo
                </label>
                <input
                  type="text"
                  id="backupLocation"
                  name="backupLocation"
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:border-[#047aff] transition-all duration-1000 text-[16px]"
                  placeholder="Ej: Caja fuerte, archivo específico"
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

export default Add;