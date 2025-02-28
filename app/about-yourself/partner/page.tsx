// app/about-yourself/partner/page.tsx
export const dynamic = "force-dynamic";
import { getUserAction } from "@/app/actions/userActions";
import { getContactsAction } from "@/app/actions/contactActions";
import PartnerForm from "@/components/user/PartnerForm";
import type { Contact } from "@/types";



export default async function PartnerPage() {
  const userResult = await getUserAction();
  if (!userResult.success || !userResult.user) {
    return <div>Error: Usuario no encontrado</div>;
  }
  const userId = userResult.user.id;
  const maritalStatus = userResult.user.maritalstatus || null;

  // Fetch all contacts for the user.
  const contacts = await getContactsAction(userId);
  // Filter for allowed partner relations.
  const partner = contacts.find(
    (contact: Contact) =>
      contact.relationToUser === "spouse" || contact.relationToUser === "albacea"
  ) || null;

  return (
    <PartnerForm
      userId={userId}
      initialMaritalStatus={maritalStatus}
      initialPartner={partner}
    />
  );
}
