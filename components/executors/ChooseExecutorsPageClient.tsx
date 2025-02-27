'use client';

import { FC, useState } from 'react';
import DashboardLayout from "@/components/common/DashboardLayout";
import { useRouter } from "next/navigation";
import Add, { ExecutorData } from "@/app/executers/choose/Add";
import { motion } from 'framer-motion';
import PrimaryButton from "@/components/reusables/PrimaryButton";
import Link from "next/link";
import Spinner from "@/components/reusables/Spinner";
import { Contact, Will, Executor } from '@/types';
import { useUser } from "@/context/UserContext";
import { createExecutorAction } from '@/app/actions/executorActions';
import { apiService } from '@/app/apiService';

// Helper: Map contact's relation to a valid executor type.
const mapRelationToExecutorType = (relation: string): string => {
  const r = relation.toLowerCase();
  const familyRelations = ["sibling", "child", "spouse", "parent", "albacea"];
  if (familyRelations.includes(r)) return "family";
  if (r === "friend") return "friend";
  if (r === "none") return "other";
  const validExecutorTypes = ["professional", "lawyer", "accountant", "other"];
  if (validExecutorTypes.includes(r)) return r;
  return "other";
};

interface ChooseExecutorsPageClientProps {
  user: any; // Replace with your proper User type
  contacts: Contact[];
  testament: Will | null;
  executors: Executor[];
}

const ChooseExecutorsPageClient: FC<ChooseExecutorsPageClientProps> = ({
  user,
  contacts: initialContacts,
  testament: initialTestament,
  executors: initialExecutors,
}) => {
  const router = useRouter();

  // Initialize state from props.
  const [executors, setExecutors] = useState<Executor[]>(initialExecutors);
  const [contacts, setContacts] = useState<Contact[]>(initialContacts);
  const [testament, setTestament] = useState<Will | null>(initialTestament);
  const [selectedContactIds, setSelectedContactIds] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);

  // Toggle selection for existing contacts.
  const toggleContactSelection = (contactId: string) => {
    setSelectedContactIds((prev) =>
      prev.includes(contactId)
        ? prev.filter((id) => id !== contactId)
        : [...prev, contactId]
    );
  };

  // Compute available contacts: those not already linked as executors.
  const availableContacts = contacts.filter(
    (c) => !executors.some((e) => e.contactId === c.id)
  );

  // Handler for adding a new executor via the Add modal.
  const handleAddExecutor = async (executorData: ExecutorData): Promise<void> => {
    if (!user?.id || !testament) {
      alert("No se encontró el usuario o testamento.");
      return;
    }
    try {
      // Create a new contact.
      const newContact = await apiService.createContact(user.id, {
        name: executorData.name,
        fatherLastName: "",
        motherLastName: "",
        email: executorData.email,
        relationToUser: executorData.relationship,
        countryPhoneCode: "",
        phoneNumber: executorData.phone || "",
        country: "MX",
        trustedContact: false,
        notes: "",
        governmentId: "",
        gender: "",
      });
      console.log("New contact created:", newContact);
      const executorType = mapRelationToExecutorType(newContact.relationToUser);
      // Call the server action to create the executor.
      const executorResult = await createExecutorAction(testament.id!, newContact.id!, executorType);
      if (!executorResult.success || !executorResult.executor) {
        throw new Error(executorResult.error || "Error creating executor");
      }
      const newExecutor = executorResult.executor;
      console.log("New executor created:", newExecutor);
      setExecutors((prev) => [...prev, newExecutor]);
      setContacts((prev) => [...prev, newContact]);
    } catch (error) {
      console.error("Error adding executor:", error);
      alert("Error al agregar albacea");
    }
  };

  // Handler for saving executors based on selected existing contacts.
  const handleSaveExecutors = async (): Promise<void> => {
    if (!user?.id || !testament) {
      alert("No se encontró usuario o testamento.");
      return;
    }
    setLoading(true);
    try {
      for (const contactId of selectedContactIds) {
        if (executors.some((e) => e.contactId === contactId)) continue;
        const contact = contacts.find((c) => c.id === contactId);
        if (!contact) continue;
        const executorType = mapRelationToExecutorType(contact.relationToUser);
        const execResult = await createExecutorAction(testament.id!, contact.id!, executorType);
        if (!execResult.success || !execResult.executor) {
          console.error("Error creating executor for contact:", contact);
          continue; // or alert the user
        }
        console.log("Created executor for contact:", execResult.executor);
        setExecutors((prev) =>
            prev.map((executor) => {
             
              return { ...executor, modified: true } as Executor;
            }).filter((item): item is Executor => Boolean(item))
          );
          
      }
      router.push("/summary?completed=executors");
    } catch (error) {
      console.error("Error saving executors:", error);
      alert("Error al guardar albaceas");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Add 
        setShowModal={setShowModal} 
        showModal={showModal} 
        onAddExecutor={handleAddExecutor} 
      />
      <DashboardLayout>
        <motion.div 
          className="min-h-screen bg-[#f5f5f7]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2 }}
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-5 py-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-24">
              <div className="space-y-8">
                {/* Header */}
                <div>
                  <div className="flex items-center gap-2 mb-2.5">
                    <div className="inline-flex items-center h-[32px] bg-[#047aff] bg-opacity-10 px-[12px] py-[6px] rounded-md">
                      <span className="text-[#047aff] text-[14px] font-[400]">ALBACEAS</span>
                    </div>
                    <Link href="#" className="inline-flex items-center h-[32px] text-[#047aff] hover:text-[#0456b0]">
                      <span className="w-5 h-5 inline-flex items-center justify-center rounded-full border border-[#047aff] text-sm">?</span>
                    </Link>
                  </div>
                  <h1 className="text-[32px] sm:text-[38px] font-[500] tracking-[-1.5px] leading-[1.2] sm:leading-[52px] mb-[15px]">
                    <span className="text-[#1d1d1f]">¿A quién le gustaría elegir como su </span>
                    <span className="bg-gradient-to-r from-[#3d9bff] to-[#047aff] inline-block text-transparent bg-clip-text">
                      albacea?
                    </span>
                  </h1>
                  <p className="text-[16px] text-[#1d1d1f] leading-6 mb-4">
                    Seleccione contactos de confianza para administrar su patrimonio.
                  </p>
                </div>

                {/* Display executors already created */}
                <div>
                  <h2 className="text-[22px] font-[500] text-[#1d1d1f] mb-4">
                    Albaceas agregados
                  </h2>
                  {executors.length > 0 ? (
                    <div className="bg-white rounded-2xl shadow-md p-6 mb-4">
                      <div className="space-y-4">
                        {executors.map((executor) => {
                          const contact = contacts.find(c => c.id === executor.contactId);
                          return (
                            <div key={executor.id} className="border-b border-gray-100 pb-4 last:border-b-0 last:pb-0">
                              <div className="flex justify-between items-center">
                                <div>
                                  <h3 className="text-[17px] font-[500] text-[#1d1d1f]">
                                    {contact ? contact.name : executor.contactId}
                                  </h3>
                                  <p className="text-[14px] text-gray-500">{executor.type}</p>
                                </div>
                                <div>
                                  <input 
                                    type="checkbox" 
                                    checked
                                    className="h-6 w-6 rounded border-gray-300 text-[#047aff] focus:ring-[#047aff]"
                                    aria-label="Seleccionar albacea"
                                    readOnly
                                  />
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ) : (
                    <p className="text-gray-500">No se han agregado albaceas aún.</p>
                  )}
                </div>

                {/* Section to select existing contacts as executors */}
                <div className="bg-white rounded-2xl shadow-md p-6 mb-4">
                  <h2 className="text-[22px] font-[500] text-[#1d1d1f] mb-4">
                    Seleccione contactos para ser albaceas
                  </h2>
                  {availableContacts.length > 0 ? (
                    <div className="space-y-4">
                      {availableContacts.map(contact => (
                        <div key={contact.id} className="flex items-center gap-4">
                          <input
                            type="checkbox"
                            className="h-5 w-5 text-[#047aff] border-gray-300"
                            checked={selectedContactIds.includes(contact.id!)}
                            onChange={() => toggleContactSelection(contact.id!)}
                          />
                          <div>
                            <p className="text-[16px] font-medium text-[#1d1d1f]">{contact.name}</p>
                            <p className="text-[14px] text-gray-500">{contact.email}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500">No hay contactos disponibles para agregar.</p>
                  )}
                </div>

                {/* Button to open the Add modal */}
                <div
                  onClick={() => setShowModal(true)}
                  className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all cursor-pointer overflow-hidden"
                >
                  <div className="flex items-center justify-center gap-2 py-8">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 448 512"
                      width="24"
                      height="24"
                      className="fill-[#047aff]"
                    >
                      <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
                    </svg>
                    <span className="text-[#047aff] font-[500]">Agregar Albacea</span>
                  </div>
                </div>

                {/* Save executors button */}
                <div className="pt-6 flex justify-end">
                  {loading ? (
                    <Spinner size={40} />
                  ) : (
                    <PrimaryButton onClick={handleSaveExecutors}>
                      Guardar y continuar
                    </PrimaryButton>
                  )}
                </div>
              </div>

              {/* Optional summary panel */}
              <div className="bg-white rounded-2xl shadow-md p-6">
                <h2 className="text-[22px] font-[500] text-[#1d1d1f] mb-4">Resumen de Albaceas</h2>
                {executors.length > 0 ? (
                  <div className="space-y-6">
                    {executors.map((executor) => {
                      const contact = contacts.find(c => c.id === executor.contactId);
                      return (
                        <div key={executor.id} className="flex items-center gap-3">
                          <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#047aff] flex items-center justify-center">
                            <svg
                              className="w-3.5 h-3.5 text-white"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <div>
                            <p className="text-[16px] font-[500] text-[#1d1d1f]">
                              {contact ? contact.name : executor.contactId}
                            </p>
                            <p className="text-[14px] text-gray-500">{executor.type}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <p className="text-gray-500">No hay albaceas registrados.</p>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </DashboardLayout>
    </>
  );
};

export default ChooseExecutorsPageClient;
