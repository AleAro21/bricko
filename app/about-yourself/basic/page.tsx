// app/about-yourself/basic/page.tsx
import { getUserAction } from '@/app/actions/userActions';
import { getAddressFromServer } from '@/app/actions/addressActions';
import BasicAddressForm from '@/components/user/BasicAddressForm';

export default async function BasicAddressPage() {
  const userResult = await getUserAction();
  if (!userResult.success || !userResult.user) {
    return <div>Error: Usuario no encontrado</div>;
  }
  const userId = userResult.user.id;
  const address = await getAddressFromServer(userId);

  return <BasicAddressForm initialAddress={address} userId={userId} />;
}
