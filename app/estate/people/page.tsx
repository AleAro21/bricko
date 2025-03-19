// app/people/page.tsx
export const dynamic = "force-dynamic";
import { getUserAction } from '@/app/actions/userActions';
import { getContactsAction } from '@/app/actions/contactActions';
import { getUserAssetsAction } from '@/app/actions/assetActions';
import { getAllWillsAction } from '@/app/actions/willActions'; // assume this is defined similarly
import { getAssetsCategoriesAction } from '@/app/actions/assetActions'; // for asset categories
import PeoplePageClient from '@/components/heirs/PeoplePageClient';
import type { User, Contact, UserAsset, Will, AssetCategory, AssetOption } from '@/types';
import RedirectLoader from '@/components/reusables/RedirectLoader'; // adjust the import path as needed



// This is your server component which uses your server actions
export default async function PeoplePage() {
  const userResult = await getUserAction();
  if (!userResult.success || !userResult.user) {
    return <RedirectLoader />;
  }
  const user: User = userResult.user;

  const contacts: Contact[] = await getContactsAction(user.id);
  const assets: UserAsset[] = await getUserAssetsAction(user.id);
  const willsArray: Will[] = await getAllWillsAction(user.id);
  const testament: Will | null = willsArray.length > 0 ? willsArray[0] : null;

  const categoriesResponse = await getAssetsCategoriesAction();
  // Map raw categories into AssetOption objects (apply your mapping as needed)
  const assetOptions: AssetOption[] = categoriesResponse.categories
  .filter((cat: AssetCategory) => cat.type === 'physical')
  .map((cat: AssetCategory) => ({
    id: cat.id,
    key: cat.name.toLowerCase().replace(/\s+/g, '_'),
    label: cat.name,
    description: cat.description,
    subcategories: Array.isArray(cat.metadata) ? cat.metadata : [],
    type: cat.type || ''
  }));
  console.log('assets prop:', assets);
  console.log("category metadata", categoriesResponse.categories[0].metadata); // Logs the array

  return (
    <PeoplePageClient 
      user={user}
      contacts={contacts}
      assets={assets}
      testament={testament}
      assetOptions={assetOptions}
    />
  );
}
