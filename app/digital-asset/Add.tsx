import { FC } from 'react';
import Modal from '@/components/common/Modal';

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
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    
    const newAsset: DigitalAssetData = {
      id: crypto.randomUUID(),
      type: formData.get('type') as string,
      platform: formData.get('platform') as string,
      accountName: formData.get('accountName') as string,
      instructions: formData.get('instructions') as string,
      hasBackupCodes: formData.get('hasBackupCodes') === 'true',
      backupLocation: formData.get('backupLocation') as string,
    };

    onAddAsset(newAsset);
    setShowModal(false);
  };

  return (
    <Modal setShowModal={setShowModal} showModal={showModal}>
      <div className="w-full min-w-[400px]">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Agregar Activo Digital</h2>
        <div className="w-full">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-2">
                Tipo de activo <span className="text-red-500">*</span>
              </label>
              <select
                id="type"
                name="type"
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow text-base"
                defaultValue=""
              >
                <option value="" disabled>Seleccionar tipo</option>
                {assetTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="platform" className="block text-sm font-medium text-gray-700 mb-2">
                Plataforma <span className="text-red-500">*</span>
              </label>
              <select
                id="platform"
                name="platform"
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow text-base"
                defaultValue=""
              >
                <option value="" disabled>Seleccionar plataforma</option>
                {platforms.social.map((platform) => (
                  <option key={platform} value={platform}>
                    {platform}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="accountName" className="block text-sm font-medium text-gray-700 mb-2">
                Nombre de la cuenta o identificador <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="accountName"
                name="accountName"
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow text-base"
                placeholder="@usuario o nombre de cuenta"
              />
            </div>

            <div>
              <label htmlFor="instructions" className="block text-sm font-medium text-gray-700 mb-2">
                Instrucciones para el albacea
              </label>
              <textarea
                id="instructions"
                name="instructions"
                rows={3}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow text-base"
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
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="hasBackupCodes" className="text-sm font-medium text-gray-700">
                  Tengo códigos de respaldo o recuperación
                </label>
              </div>

              <div>
                <label htmlFor="backupLocation" className="block text-sm font-medium text-gray-700 mb-2">
                  Ubicación de los códigos de respaldo
                </label>
                <input
                  type="text"
                  id="backupLocation"
                  name="backupLocation"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow text-base"
                  placeholder="Ej: Caja fuerte, archivo específico"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full inline-flex justify-center px-6 py-3 rounded-xl bg-blue-600 text-white text-base font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              Agregar Activo Digital
            </button>
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default Add;