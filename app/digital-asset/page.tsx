export const dynamic = "force-dynamic";
import { getUserAction } from '@/app/actions/userActions';
import { getUserAssetsAction } from '@/app/actions/assetActions';
import { getAllWillsAction} from '@/app/actions/willActions';
import { getAssetsCategoriesAction } from '@/app/actions/assetCategoryActions';
import DigitalAssetsPageClient from '@/components/digital-assets/DigitalAssetsPageClient';
import type { UserAsset, Will, AssetOption } from '@/types';
import { WillStatus } from '@/types';
import RedirectLoader from '@/components/reusables/RedirectLoader'; // adjust the import path as needed

export default async function DigitalAssetsPage() {
  const userResult = await getUserAction();
  if (!userResult.success || !userResult.user) {
    return <RedirectLoader />;
  }
  const user = userResult.user;

  // Get user's assets
  const assets: UserAsset[] = await getUserAssetsAction(user.id);

  // Load or create the user's will
  const wills = await getAllWillsAction(user.id);
  let testament: Will | null = null;
  if (wills.length > 0) {
    testament = wills[0];
    console.log("Testament already exists:", testament);
  } else {
    const newWillData = { legalAdvisor: "", notes: "", terms: "" };
    const updateData = { status: WillStatus.Active } as const;
    console.log("Updated will to active:", testament);
  }

  // Load asset categories
  const categoriesResponse = await getAssetsCategoriesAction();

  // Mapping from raw API category names to pretty Spanish labels
  const prettyNames: Record<string, string> = {
    "cloud_storage": "Almacenamiento en la nube",
    "cryptocurrencies": "Criptomonedas",
    "domain_names": "Nombres de dominio",
    "email_accounts": "Cuentas de correo",
    "gaming_accounts": "Cuentas de juegos",
    "other_digital_assets": "Otros activos digitales"
  };

  // Mapping for subcategories
  const prettySubcategories: Record<string, string> = {
    // Cloud Storage
    "dropbox": "Dropbox",
    "google_drive": "Google Drive",
    "onedrive": "OneDrive",
    "icloud": "iCloud",

    // Cryptocurrencies
    "bitcoin": "Bitcoin",
    "ethereum": "Ethereum",
    "litecoin": "Litecoin",

    // Domain Names
    "godaddy": "GoDaddy",
    "namecheap": "Namecheap",
    "google_domains": "Google Domains",

    // Email Accounts
    "gmail": "Gmail",
    "outlook": "Outlook",
    "yahoo": "Yahoo",
    "protonmail": "ProtonMail",

    // Gaming Accounts
    "steam": "Steam",
    "xbox": "Xbox",
    "playstation": "PlayStation",
    "nintendo": "Nintendo",

    // Other Digital Assets
    "ebooks": "Libros electrónicos",
    "online_courses": "Cursos en línea",
    "digital_art": "Arte digital"
  };

  // Map categories to digital asset options (filter only for digital)
  const assetOptions = categoriesResponse.categories
    .filter((cat) => cat.type === 'physical')
    .map((cat) => ({
      id: cat.id,
      key: cat.name.toLowerCase().replace(/\s+/g, '_'),
      label: prettyNames[cat.name] || cat.name,
      description: cat.description,
      subcategories: Array.isArray(cat.metadata)
        ? cat.metadata.map((sub: string) => prettySubcategories[sub] || sub)
        : [],
      type: cat.type || ''
    }));


  // Filter user's assets to only include digital assets
  const digitalAssets = assets.filter(asset =>
    assetOptions.some(option => option.id === asset.categoryId)
  );

  return (
    <DigitalAssetsPageClient
      user={user}
      assets={digitalAssets}
      testament={testament}
      assetOptions={assetOptions}
    />
  );
}
