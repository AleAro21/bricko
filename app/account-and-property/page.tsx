export const dynamic = "force-dynamic";
import { getUserAction } from '@/app/actions/userActions';
import { getUserAssetsAction } from '@/app/actions/assetActions';
import { getAllWillsAction, createWillAction, updateWillAction } from '@/app/actions/willActions';
import { getAssetsCategoriesAction } from '@/app/actions/assetCategoryActions';
import { getContactsAction } from '@/app/actions/contactActions';
import AccountAndPropertyPageClient from '@/components/account-and-property/AccountAndPropertyPageClient';
import type { UserAsset, Will, Contact } from '@/types';
import { WillStatus } from '@/types';
import RedirectLoader from '@/components/reusables/RedirectLoader';

export default async function AccountAndPropertyPage() {
  const userResult = await getUserAction();
  if (!userResult.success || !userResult.user) {
    return <RedirectLoader />;
  }
  const user = userResult.user;

  // Get user's assets
  const assets: UserAsset[] = await getUserAssetsAction(user.id);

  // Get user's contacts
  const contacts: Contact[] = await getContactsAction(user.id);

  // Load existing wills; if none, create and then update it to ACTIVE.
  const wills = await getAllWillsAction(user.id);
  let testament: Will | null = null;
  if (wills.length > 0) {
    testament = wills[0];
    console.log("Testament already exists:", testament);
  } else {
    const newWillData = { legalAdvisor: "", notes: "", terms: "" };
    const newWill = await createWillAction(user.id, newWillData);
    console.log("Created new will:", newWill);
    const updateData = { status: WillStatus.Active } as const;
    testament = await updateWillAction(newWill.id as string, updateData);
    console.log("Updated will to active:", testament);
  }

  // Load asset categories
  const categoriesResponse = await getAssetsCategoriesAction();

  // Map categories to AssetOption[]
  const prettyNames: Record<string, string> = {
    "cloud_storage": "Almacenamiento en la nube",
    "cryptocurrencies": "Criptomonedas",
    "domain_names": "Nombres de dominio",
    "email_accounts": "Cuentas de correo",
    "gaming_accounts": "Cuentas de juegos",
    "insurance_policy": "Pólizas de seguros",
    "investment_account": "Cuenta de inversión",
    "other_assets": "Otros activos",
    "other_digital_assets": "Otros activos digitales",
    "real_estate": "Bienes raíces"
  };
  const prettySubcategories: Record<string, string> = {
    "dropbox": "Dropbox",
    "google_drive": "Google Drive",
    "onedrive": "OneDrive",
    "icloud": "iCloud",
    "bitcoin": "Bitcoin",
    "ethereum": "Ethereum",
    "litecoin": "Litecoin",
    "godaddy": "GoDaddy",
    "namecheap": "Namecheap",
    "google_domains": "Google Domains",
    "gmail": "Gmail",
    "outlook": "Outlook",
    "yahoo": "Yahoo",
    "protonmail": "ProtonMail",
    "steam": "Steam",
    "xbox": "Xbox",
    "playstation": "PlayStation",
    "nintendo": "Nintendo",
    "life_insurance": "Seguro de vida",
    "health_insurance": "Seguro de salud",
    "auto_insurance": "Seguro de auto",
    "home_insurance": "Seguro de hogar",
    "brokerage": "Correduría",
    "mutual_funds": "Fondos mutuos",
    "etf": "ETF",
    "miscellaneous": "Misceláneos",
    "ebooks": "Ebooks",
    "online_courses": "Cursos en línea",
    "digital_art": "Arte digital",
    "house": "Casa",
    "apartment": "Apartamento",
    "commercial_property": "Propiedad comercial",
    "land": "Terreno"
  };

  const assetOptions = categoriesResponse.categories
    .filter((cat) => cat.type === 'physical')
    .map((cat) => ({
      id: cat.id,
      key: cat.name.toLowerCase().replace(/\s+/g, '_'),
      label: prettyNames[cat.name] || cat.name,
      description: cat.description,
      subcategories: (cat.metadata?.subcategories || []).map(
        (sub: string) => prettySubcategories[sub] || sub
      ),
      type: cat.type || ''
    }));

  // Pass data to the client component
  return (
    <AccountAndPropertyPageClient
      user={user}
      assets={assets}
      testament={testament}
      assetOptions={assetOptions}
      contacts={contacts}
    />
  );
}
