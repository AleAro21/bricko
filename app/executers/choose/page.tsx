// app/people/page.server.tsx
export const dynamic = "force-dynamic";
import { getUserAction } from '@/app/actions/userActions';
import { getContactsAction } from '@/app/actions/contactActions';
import { getAllWillsAction } from '@/app/actions/willActions';
import { getAllExecutorsAction } from '@/app/actions/executorActions'; 
import ChooseExecutorsPageClient from '@/components/executors/ChooseExecutorsPageClient';
import RedirectLoader from '@/components/reusables/RedirectLoader'; // adjust the import path as needed



export default async function ChooseExecutorsPageServer() {
  const userResult = await getUserAction();
  if (!userResult.success || !userResult.user) {
    return <RedirectLoader />;
  }
  const user = userResult.user;
  const contacts = await getContactsAction(user.id);
  const wills = await getAllWillsAction(user.id);
  const testament = wills.length > 0 ? wills[0] : null;
  const executorsResult = await getAllExecutorsAction(user.id);
  const executors = executorsResult.success && executorsResult.executors ? executorsResult.executors : [];
  
  return (
    <ChooseExecutorsPageClient
      user={user}
      contacts={contacts}
      testament={testament}
      executors={executors}
    />
  );
}
