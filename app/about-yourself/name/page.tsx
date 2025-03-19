// app/about-yourself/name/page.tsx
export const dynamic = "force-dynamic";
import { getUserAction } from '@/app/actions/userActions';
import RedirectLoader from '@/components/reusables/RedirectLoader';
import NameForm from '@/components/user/NameForm';





export default async function NamePage() {
  // Call a server action to get the user data from cookies, etc.
  const userResponse = await getUserAction();
  
  if (!userResponse.success || !userResponse.user) {
    // Optionally, redirect or render an error message.
    return <RedirectLoader />;
    
  }

  return <NameForm initialUser={userResponse.user} />;
}
