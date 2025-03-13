'use client';

import { FC, useState } from 'react';
import { motion } from 'framer-motion';
import DashboardLayout from '@/components/common/DashboardLayout';
import { useRouter } from 'next/navigation';
import PrimaryButton from '@/components/reusables/PrimaryButton';
import ProgressIndicator from '@/components/reusables/ProgressIndicator';
import Link from 'next/link';
import Spinner from '@/components/reusables/Spinner';
import { updateUserAction } from '@/app/actions/userActions';
import { createContactAction } from '@/app/actions/contactActions';
import type { Contact } from '@/types';
import AddChild from '@/app/about-yourself/children/AddChild';
import { flushSync } from 'react-dom';
import { PencilSimple, Trash } from 'phosphor-react';

interface ChildOption {
  title: string;
  subTitle: string;
}

interface ChildrenFormProps {
  userId: string;
  initialHasChildren: boolean | null;
  initialChildren: Contact[];
  parentContacts: Contact[];
}

const childOptions: ChildOption[] = [
  {
    title: "Sí",
    subTitle: "Tengo hijos biológicos y/o legalmente adoptados.",
  },
  {
    title: "No",
    subTitle: "No tengo hijos biológicos ni legalmente adoptados.",
  },
];

const ChildrenForm: FC<ChildrenFormProps> = ({
  userId,
  initialHasChildren,
  initialChildren,
  parentContacts,
}) => {
  const router = useRouter();
  const initialActiveIndex = initialHasChildren ? 0 : 1;
  const [activeIndex, setActiveIndex] = useState<number | null>(initialActiveIndex);
  const [children, setChildren] = useState<Contact[]>(initialChildren || []);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [selectedChild, setSelectedChild] = useState<Contact | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleOptionClick = (index: number): void => {
    setActiveIndex(index);
    if (index === 1) {
      setChildren([]);
      sessionStorage.removeItem('userChildren');
    }
    setErrorMessage(null);
  };

  const handleAddChild = (): void => {
    setIsEditing(false);
    setSelectedChild(null);
    setShowModal(true);
  };

  const handleEditChild = (child: Contact): void => {
    setIsEditing(true);
    setSelectedChild(child);
    setShowModal(true);
  };

  const handleDeleteChild = (childToDelete: Contact): void => {
    if (confirm('¿Estás seguro de que deseas eliminar este hijo?')) {
      const updatedChildren = children.filter(child => child !== childToDelete);
      setChildren(updatedChildren);
      sessionStorage.setItem('userChildren', JSON.stringify(updatedChildren));
    }
  };

  const handleSave = async (): Promise<void> => {
    if (activeIndex === null) {
      setErrorMessage("Por favor, seleccione una opción");
      return;
    }
    if (activeIndex === 0 && children.length === 0) {
      setErrorMessage("Por favor, agregue al menos un hijo");
      return;
    }
    
    let didNavigate = false;
    flushSync(() => {
      setLoading(true);
    });

    try {
      const updateResult = await updateUserAction({
        id: userId,
        hasChildren: activeIndex === 0,
      });
      if (!updateResult.success) {
        throw new Error(updateResult.error || "Error updating user");
      }
      if (activeIndex === 0) {
        for (const child of children) {
          if (!child.id) {
            const { id, ...childDataWithoutId } = child;
            const dataToSend = { ...childDataWithoutId, relationToUser: "child" };
            await createContactAction(userId, dataToSend);
          }
        }
        sessionStorage.setItem('userChildren', JSON.stringify(children));
      }
      router.push("/summary");
      didNavigate = true;
    } catch (error: any) {
      console.error('Error saving children:', error);
      setErrorMessage("Error al guardar los cambios. Por favor, intente nuevamente.");
    } finally {
      if (!didNavigate) {
        setLoading(false);
      }
    }
  };

  const setChild = (childData: Contact) => {
    if (isEditing && selectedChild) {
      const updatedChildren = children.map(child =>
        child.id === selectedChild.id ? { ...childData, id: child.id } : child
      );
      setChildren(updatedChildren);
      sessionStorage.setItem('userChildren', JSON.stringify(updatedChildren));
    } else {
      const updatedChildren = [...children, childData];
      setChildren(updatedChildren);
      sessionStorage.setItem('userChildren', JSON.stringify(updatedChildren));
    }
  };

  return (
    <DashboardLayout>
      <AddChild
        showModal={showModal}
        setShowModal={setShowModal}
        setChild={setChild}
        isEditing={isEditing}
        existingChild={isEditing ? selectedChild : null}
        contacts={parentContacts}  
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
        className="container mx-auto flex flex-col flex-grow bg-[#f5f5f7] overflow-hidden"
      >
        <div className="w-full max-w-6xl mx-auto flex flex-col min-h-[100vh] mb-4 px-4 sm:px-5">
          <div className="py-12">
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-24 mb-8">
              <div className="lg:w-1/3">
                <div className="flex items-center gap-2 mb-2.5">
                  <div className="inline-flex items-center h-[32px] bg-[#047aff] bg-opacity-10 px-[12px] py-[6px] rounded-md">
                    <span className="text-[#047aff] text-[14px] font-[400]">HIJOS</span>
                  </div>
                  <Link href="#" className="inline-flex items-center h-[32px] text-[#047aff] hover:text-[#0456b0]">
                    <span className="w-5 h-5 inline-flex items-center justify-center rounded-full border border-[#047aff] text-sm">?</span>
                  </Link>
                </div>

                <h1 className="text-[32px] sm:text-[38px] font-[500] tracking-[-1.5px] leading-[1.2] sm:leading-[52px] mb-[15px]">
                  <span className="text-[#1d1d1f]">¿Tienes </span>
                  <span
                    style={{
                      backgroundImage:
                        "linear-gradient(to left, #047aff 30%, #0d4ba3 100%)",
                    }}
                    className="inline-block text-transparent bg-clip-text"
                  >
                    hijos
                  </span>
                  <span className="text-[#1d1d1f]">?</span>
                </h1>

                <div className="space-y-4 mb-5">
                  <p className="text-[16px] text-[#1d1d1f] leading-6">
                    Si tu primer hijo está en camino, selecciona "No" por ahora.
                    Podrás actualizarlo en el futuro.
                  </p>
                  <p className="text-[16px] text-[#1d1d1f] leading-6">
                    Agrega todos tus hijos biológicos y legalmente adoptados,
                    quieras o no dejarlos en tu testamento.
                  </p>
                  <p className="text-[16px] text-[#1d1d1f] leading-6">
                    No agregues hijastros aquí. Podrás agregarlos más adelante en la sección de legados.
                  </p>
                </div>
              </div>

              <div className="lg:w-3/5">
                <div className="bg-white rounded-2xl px-4 sm:px-8 md:px-12 py-8 shadow-lg relative">
                  <div className="mb-8">
                    <ProgressIndicator currentSection={4} totalSections={4} title="Progreso del formulario" />
                  </div>

                  <div className="space-y-4 mb-8">
                    {childOptions.map((item, index) => (
                      <div
                        key={index}
                        className="cursor-pointer transition-colors"
                        onClick={() => handleOptionClick(index)}
                      >
                        <div
                          className={`px-6 py-4 rounded-xl border ${
                            activeIndex === index
                              ? 'bg-[#e5f1ff] border-[#047aff]'
                              : 'border-gray-200 hover:border-[#047aff]'
                          }`}
                        >
                          <h3 className={`text-[17px] font-[400] ${activeIndex === index ? 'text-[#1d1d1f]' : 'text-[#1d1d1f]'}`}>
                            {item.title}
                          </h3>
                          <p className={`mt-1 text-[14px] ${activeIndex === index ? 'text-[#6e6e73]' : 'text-[#6e6e73]'}`}>
                            {item.subTitle}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {activeIndex === 0 && (
                    <div
                      onClick={handleAddChild}
                      className="bg-white rounded-xl border border-gray-200 hover:border-[#047aff] transition-colors cursor-pointer mb-8"
                    >
                      <div className="flex items-center justify-center gap-2 py-4 text-[#047aff] font-medium">
                        <div className="bg-[#047aff] rounded-full p-1">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="16" height="16" className="fill-white">
                            <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
                          </svg>
                        </div>
                        Agregar Hijo
                      </div>
                    </div>
                  )}

                  {errorMessage && (
                    <p className="text-red-500 text-[14px] text-center mt-4">{errorMessage}</p>
                  )}

                  <div className="flex justify-end pt-4 mt-4">
                    <PrimaryButton onClick={handleSave} disabled={loading}>
                      {loading ? <Spinner size={24} /> : "Guardar y continuar"}
                    </PrimaryButton>
                  </div>
                </div>
              </div>
            </div>

            {children.length > 0 && (
              <div className="mt-8">
                <h3 className="text-lg font-semibold mb-4">Hijos Registrados</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {children.map((child, index) => (
                    <div key={index} className="bg-white rounded-2xl p-6 shadow-lg">
                      <div className="flex justify-between items-start mb-4">
                        <h4 className="font-medium">{child.name}</h4>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEditChild(child)}
                            className="text-blue-600 hover:text-blue-800"
                          >
                            <PencilSimple size={20} weight="regular" />
                          </button>
                          <button
                            onClick={() => handleDeleteChild(child)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <Trash size={20} weight="regular" />
                          </button>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600">
                        <strong>Apellido Paterno:</strong> {child.fatherLastName}<br />
                        <strong>Apellido Materno:</strong> {child.motherLastName}<br />
                        {child.email && (<><strong>Correo:</strong> {child.email}<br /></>)}
                        {child.gender && (<><strong>Género:</strong> {child.gender === 'male' ? 'Masculino' : 'Femenino'}<br /></>)}
                        {child.birthDate && (<><strong>Fecha:</strong> {new Date(child.birthDate).toLocaleDateString()}<br /></>)}
                        {child.governmentId && (<><strong>ID:</strong> {child.governmentId}<br /></>)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </DashboardLayout>
  );
};

export default ChildrenForm;