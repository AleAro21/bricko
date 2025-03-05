// app/about-yourself/basic/page.tsx
export const dynamic = "force-dynamic";
import { getUserAction } from '@/app/actions/userActions';
import { getAddressFromServer } from '@/app/actions/addressActions';
import BasicAddressForm from '@/components/user/BasicAddressForm';
import RedirectLoader from '@/components/reusables/RedirectLoader'; // adjust the import path as needed

export default async function BasicAddressPage() {
  const userResult = await getUserAction();
  if (!userResult.success || !userResult.user) {
    // Instead of displaying an error, show the loader which will redirect to login.
    return <RedirectLoader />;
  }
  const userId = userResult.user.id;
  const address = await getAddressFromServer(userId);

  return <BasicAddressForm initialAddress={address} userId={userId} />;
}
