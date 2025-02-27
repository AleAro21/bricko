// app/people/page.server.tsx
import { getUserAction } from '@/app/actions/userActions';
import { getContactsAction } from '@/app/actions/contactActions';
import { getAllWillsAction } from '@/app/actions/willActions';
import { getAllExecutorsAction } from '@/app/actions/executorActions'; // assume this action exists
import ChooseExecutorsPageClient from '@/components/executors/ChooseExecutorsPageClient';

export default async function ChooseExecutorsPageServer() {
  const userResult = await getUserAction();
  if (!userResult.success || !userResult.user) {
    return <div>Error: Usuario no encontrado</div>;
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
