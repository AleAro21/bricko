'use client';

import { FC, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { SortableExecutor } from './SortableExecutor';
import DashboardLayout from "@/components/common/DashboardLayout";
import Add, { ExecutorData } from "@/app/executers/choose/Add";
import { motion } from 'framer-motion';
import PrimaryButton from "@/components/reusables/PrimaryButton";
import Link from "next/link";
import Spinner from "@/components/reusables/Spinner";
import { Contact, Will, Executor } from '@/types';
import { useUser } from "@/context/UserContext";
import { createExecutorAction, updateExecutorAction } from '@/app/actions/executorActions';
import { apiService } from '@/app/apiService';
import { flushSync } from 'react-dom';

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
    user: any;
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
    const [executors, setExecutors] = useState<Executor[]>(initialExecutors);
    const [contacts, setContacts] = useState<Contact[]>(initialContacts);
    const [testament, setTestament] = useState<Will | null>(initialTestament);
    const [selectedContactIds, setSelectedContactIds] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [showModal, setShowModal] = useState<boolean>(false);

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const toggleContactSelection = (contactId: string) => {
        setSelectedContactIds((prev) =>
            prev.includes(contactId)
                ? prev.filter((id) => id !== contactId)
                : [...prev, contactId]
        );
    };

    const availableContacts = contacts.filter(
        (c) => !executors.some((e) => e.contactId === c.id)
    );

    const handleDragEnd = async (event: DragEndEvent) => {
        const { active, over } = event;
        
        if (!over || active.id === over.id) {
            return;
        }

        const oldIndex = executors.findIndex(exec => exec.id === active.id);
        const newIndex = executors.findIndex(exec => exec.id === over.id);

        const updatedExecutors = arrayMove(executors, oldIndex, newIndex);
        
        // Update priority orders
        const reorderedExecutors = updatedExecutors.map((executor, index) => ({
            ...executor,
            priorityOrder: index + 1
        }));

        setExecutors(reorderedExecutors);

        // Update the priority orders in the backend
        try {
            for (const executor of reorderedExecutors) {
                const result = await updateExecutorAction(executor.id, {
                    contactId: executor.contactId,
                    type: executor.type,
                    priorityOrder: executor.priorityOrder
                });
                
                if (!result.success) {
                    throw new Error(result.error || 'Failed to update executor');
                }
            }
        } catch (error) {
            console.error('Error updating executor priorities:', error);
            alert('Error al actualizar el orden de los albaceas');
            // Revert the state if update fails
            setExecutors(executors);
        }
    };

    const handleAddExecutor = async (executorData: ExecutorData): Promise<void> => {
        if (!user?.id || !testament) {
            alert("No se encontró el usuario o testamento.");
            return;
        }
        try {
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
            
            const executorType = mapRelationToExecutorType(newContact.relationToUser);
            const nextPriority = executors.length + 1;
            
            const executorResult = await createExecutorAction(
                testament.id!, 
                newContact.id!, 
                executorType,
                nextPriority
            );
            
            if (!executorResult.success || !executorResult.executor) {
                throw new Error(executorResult.error || "Error creating executor");
            }
            
            const newExecutor = executorResult.executor;
            setExecutors((prev) => [...prev, newExecutor]);
            setContacts((prev) => [...prev, newContact]);
        } catch (error) {
            console.error("Error adding executor:", error);
            alert("Error al agregar albacea");
        }
    };

    const handleSaveExecutors = async (): Promise<void> => {
        if (!user?.id || !testament) {
            alert("No se encontró usuario o testamento.");
            return;
        }
        flushSync(() => {
            setLoading(true);
        });
        let didNavigate = false;
        try {
            const selectedContactsWithIndices = selectedContactIds.map((id, index) => ({ id, index }));
            
            for (const { id: contactId, index } of selectedContactsWithIndices) {
                if (executors.some((e) => e.contactId === contactId)) continue;
                const contact = contacts.find((c) => c.id === contactId);
                if (!contact) continue;
                
                const executorType = mapRelationToExecutorType(contact.relationToUser);
                const nextPriority = executors.length + index + 1;
                
                const execResult = await createExecutorAction(
                    testament.id!, 
                    contactId,
                    executorType,
                    nextPriority
                );
                
                if (!execResult.success || !execResult.executor) {
                    console.error("Error creating executor for contact:", contact);
                    continue;
                }
                
                setExecutors((prev) => [...prev, execResult.executor!]);
            }
            router.push("/summary?completed=executors");
            didNavigate = true;
        } catch (error) {
            console.error("Error saving executors:", error);
            alert("Error al guardar albaceas");
        } finally {
            if (!didNavigate) {
                setLoading(false);
            }
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
                                {/* Header section */}
                                <div>
                                    <div className="flex items-center gap-2 mb-2.5">
                                        <div className="inline-flex items-center h-[32px] bg-[#f95940] bg-opacity-10 px-[12px] py-[6px] rounded-md">
                                            <span className="text-[#f95940] text-[14px] font-[400]">ALBACEAS</span>
                                        </div>
                                        <Link href="#" className="inline-flex items-center h-[32px] text-[#f95940] hover:text-[#0456b0]">
                                            <span className="w-5 h-5 inline-flex items-center justify-center rounded-full border border-[#f95940] text-sm">?</span>
                                        </Link>
                                    </div>
                                    <h1 className="text-[32px] sm:text-[38px] font-[500] tracking-[-1.5px] leading-[1.2] sm:leading-[52px] mb-[15px]">
                                        <span className="text-[#1d1d1f]">
                                            ¿A quién le gustaría elegir como su </span>
                                        <span
                                            style={{ backgroundImage: "linear-gradient(to left, #f95940 30%, #f95940 100%)" }}
                                            className="inline-block text-transparent bg-clip-text"
                                        >
                                             albacea?
                                        </span>
                                    </h1>
                                    <p className="text-[16px] text-[#1d1d1f] leading-6 mb-4">
                                        Seleccione contactos de confianza para administrar su patrimonio.
                                    </p>
                                    <div className="bg-[#f95940]/20 p-4 rounded-lg mt-4">
                                        <p className="text-sm text-blue-700">
                                            <strong>Nota sobre el orden de prioridad:</strong><br />
                                            El orden de los albaceas determina su prioridad. El primer albacea (Prioridad 1) es el principal,
                                            los siguientes actuarán como suplentes en caso de que el albacea principal no pueda cumplir con sus funciones.
                                            Puede arrastrar y soltar los albaceas para cambiar su orden de prioridad.
                                        </p>
                                    </div>
                                </div>

                                {/* Display executors with drag and drop */}
                                <div>
                                    <h2 className="text-[22px] font-[500] text-[#1d1d1f] mb-4">
                                        Albaceas agregados
                                    </h2>
                                    {executors.length > 0 ? (
                                        <div className="bg-white rounded-2xl shadow-md p-6 mb-4">
                                            <DndContext
                                                sensors={sensors}
                                                collisionDetection={closestCenter}
                                                onDragEnd={handleDragEnd}
                                            >
                                                <SortableContext
                                                    items={executors.map(e => e.id)}
                                                    strategy={verticalListSortingStrategy}
                                                >
                                                    <div className="space-y-4">
                                                        {executors.map((executor, index) => {
                                                            const contact = contacts.find(c => c.id === executor.contactId);
                                                            return (
                                                                <SortableExecutor
                                                                    key={executor.id}
                                                                    executor={executor}
                                                                    contact={contact}
                                                                    index={index}
                                                                />
                                                            );
                                                        })}
                                                    </div>
                                                </SortableContext>
                                            </DndContext>
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
                                                        className="h-5 w-5 text-[#f95940] border-gray-300"
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

                                {/* Save executors button */}
                                <div className="pt-6 flex justify-end">
                                    <PrimaryButton onClick={handleSaveExecutors} disabled={loading}>
                                        {loading ? <Spinner size={24} /> : "Guardar y continuar"}
                                    </PrimaryButton>
                                </div>
                            </div>

                            {/* Summary panel with priority */}
                            <div className="bg-white rounded-2xl shadow-md p-6">
                                <h2 className="text-[22px] font-[500] text-[#1d1d1f] mb-4">Resumen de Albaceas</h2>
                                {executors.length > 0 ? (
                                    <div className="space-y-6">
                                        {executors.map((executor, index) => {
                                            const contact = contacts.find(c => c.id === executor.contactId);
                                            return (
                                                <div key={executor.id} className="flex items-center gap-4">
                                                    <div className="flex-shrink-0 w-8 h-8 bg-[#f95940] rounded-full flex items-center justify-center">
                                                        <span className="text-white font-medium">
                                                            {index + 1}
                                                        </span>
                                                    </div>
                                                    <div>
                                                        <p className="text-[16px] font-[500] text-[#1d1d1f]">
                                                            {contact ? contact.name : executor.contactId}
                                                        </p>
                                                        <p className="text-[14px] text-gray-500">
                                                            {executor.type} • {index === 0 ? 'Albacea Principal' : `Suplente #${index}`}
                                                        </p>
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