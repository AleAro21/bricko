// app/people/page.tsx
export const dynamic = "force-dynamic";
import { getUserAction } from '@/app/actions/userActions';
import { getContactsAction } from '@/app/actions/contactActions';
import { getPetsAction } from '@/app/actions/petActions'; // Create this similar to getContactsAction
import PeoplePageClient from '@/components/people/PeoplePage';
import type { Contact, Pet } from '@/types';
import RedirectLoader from '@/components/reusables/RedirectLoader'; // adjust the import path as needed

export default async function PeoplePage() {
  const userResult = await getUserAction();
  if (!userResult.success || !userResult.user) {
    return <RedirectLoader />;
  }
  const user = userResult.user;
  const userId = userResult.user.id;
  const contacts = await getContactsAction(userId);
  let pets: Pet[] = [];
  try {
    pets = await getPetsAction(userId);
  } catch (err: any) {
    pets = [];
  }

  // Filter contacts into children and trusted contacts
  const childrenContacts = contacts.filter(c => c.relationToUser === 'child');
  const trustedContacts = contacts.filter(c =>
    ['sibling', 'spouse', 'parent', 'albacea', 'friend'].includes(c.relationToUser)
  );

  // Build categories (the icons here are identified by string keys, which will be mapped on the client)
  const categories = [
    {
      id: 'children' as const,
      title: "Hijos",
      description: "Agrega información sobre tus hijos o menores a cargo para asegurar su futuro y bienestar",
      icon: 'Baby',
      count: childrenContacts.length,
    },
    {
      id: 'trusted' as const,
      title: "Persona de confianza",
      description: "Designa a las personas que confías para manejar aspectos importantes de tu testamento",
      icon: 'Users',
      count: trustedContacts.length,
    },
    {
      id: 'pets' as const,
      title: "Mascota",
      description: "Asegura el cuidado futuro de tus mascotas designando guardianes y recursos",
      icon: 'Dog',
      count: pets.length,
    },
    {
      id: 'charity' as const,
      title: "Caridad",
      description: "Contribuye a causas importantes incluyendo organizaciones benéficas en tu testamento",
      icon: 'Heart',
      count: 0,
    },
  ];

  return (
    <PeoplePageClient 
      user={user}
      contacts={contacts}
      pets={pets}
      categories={categories}
    />
  );
}
