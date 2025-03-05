// app/about-yourself/children/page.tsx
export const dynamic = "force-dynamic";
import { getUserAction } from '@/app/actions/userActions';
import { getContactsAction } from '@/app/actions/contactActions';
import ChildrenForm from '@/components/user/ChildrenForm';
import type { Contact } from '@/types';
import RedirectLoader from '@/components/reusables/RedirectLoader'; // adjust the import path as needed



export default async function ChildrenPage() {
  const userResult = await getUserAction();
  if (!userResult.success || !userResult.user) {
    return <RedirectLoader />;
  }
  const userId = userResult.user.id;
  const hasChildrenFromUser = userResult.user.hasChildren;

  // Fetch all contacts for the user.
  const contacts = await getContactsAction(userId);
  // Filter out children contacts.
  const childrenContacts: Contact[] = contacts.filter(
    (contact: Contact) => contact.relationToUser === 'child'
  );
  // Parent contacts are those not marked as 'child'
  const parentContacts: Contact[] = contacts.filter(
    (contact: Contact) => contact.relationToUser !== 'child'
  );

  return (
    <ChildrenForm 
      userId={userId}
      initialHasChildren={hasChildrenFromUser}
      initialChildren={childrenContacts}
      parentContacts={parentContacts}
    />
  );
}
