'use client';

import { FC, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X } from 'phosphor-react';
import { Contact } from '@/types';
import { createContactAction } from '@/app/actions/contactActions';
import Add from './Add';

const COUNTRIES = [
  { code: 'MX', label: 'México' },
  { code: 'US', label: 'Estados Unidos' },
  { code: 'ES', label: 'España' },
  { code: 'AR', label: 'Argentina' },
  { code: 'BO', label: 'Bolivia' },
  { code: 'CL', label: 'Chile' },
  { code: 'CO', label: 'Colombia' },
  { code: 'CR', label: 'Costa Rica' },
  { code: 'CU', label: 'Cuba' },
  { code: 'EC', label: 'Ecuador' },
  { code: 'SV', label: 'El Salvador' },
  { code: 'GT', label: 'Guatemala' },
  { code: 'HN', label: 'Honduras' },
  { code: 'NI', label: 'Nicaragua' },
  { code: 'PA', label: 'Panamá' },
  { code: 'PY', label: 'Paraguay' },
  { code: 'PE', label: 'Perú' },
  { code: 'DO', label: 'República Dominicana' },
  { code: 'UY', label: 'Uruguay' },
  { code: 'VE', label: 'Venezuela' },
];

interface AddChildProps {
  showModal: boolean;
  setShowModal: (show: boolean) => void;
  onAddChild: (child: Contact) => void;
  userId: string;
  isEditing: boolean;
  existingChild: (Contact & { parentInfo?: { id: string; name: string } }) | null;
  contacts?: Contact[];
}

const AddChild: FC<AddChildProps> = ({
  showModal,
  setShowModal,
  onAddChild,
  userId,
  isEditing,
  existingChild,
  contacts = [],
}) => {
  // Child’s fields
  const [name, setName] = useState<string>('');
  const [fatherLastName, setFatherLastName] = useState<string>('');
  const [motherLastName, setMotherLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [gender, setGender] = useState<string>('none');
  const [birthDate, setBirthDate] = useState<string>('');
  const [country, setCountry] = useState<string>('MX');
  const [governmentId, setGovernmentId] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  // Parent selection state
  const [showAddParentModal, setShowAddParentModal] = useState<boolean>(false);
  const [selectedParentId, setSelectedParentId] = useState<string>('');
  const [parentType, setParentType] = useState<'existing' | 'new'>('existing');
  const [selectedParent, setSelectedParent] = useState<Contact | null>(null);

  useEffect(() => {
    if (isEditing && existingChild) {
      setName(existingChild.name || '');
      setFatherLastName(existingChild.fatherLastName || '');
      setMotherLastName(existingChild.motherLastName || '');
      setEmail(existingChild.email || '');
      setGender(existingChild.gender || 'none');
      setBirthDate(
        existingChild.birthDate
          ? new Date(existingChild.birthDate).toISOString().split('T')[0]
          : ''
      );
      setCountry(existingChild.country || 'MX');
      setGovernmentId(existingChild.governmentId || '');
      if (existingChild.parentInfo) {
        setSelectedParentId(existingChild.parentInfo.id);
        const parent = contacts.find((c) => c.id === existingChild.parentInfo?.id);
        if (parent) {
          setSelectedParent(parent);
          setParentType('existing');
        }
      }
    } else {
      resetForm();
    }
  }, [isEditing, existingChild, showModal]);

  const resetForm = () => {
    setName('');
    setFatherLastName('');
    setMotherLastName('');
    setEmail('');
    setGender('none');
    setBirthDate('');
    setCountry('MX');
    setGovernmentId('');
    setSelectedParentId('');
    setSelectedParent(null);
    setParentType('existing');
  };

  const handleSubmit = async () => {
    if (
      !name ||
      !fatherLastName ||
      !motherLastName ||
      gender === 'none' ||
      !birthDate ||
      !country ||
      !email
    ) {
      alert(
        'Por favor, complete todos los campos obligatorios (Nombre, apellidos, género, fecha de nacimiento y país).'
      );
      return;
    }
    if (country === 'MX' && !governmentId) {
      alert('Por favor, ingrese el ID de Gobierno.');
      return;
    }
    if (!selectedParent) {
      alert('Por favor, seleccione o agregue un padre/madre.');
      return;
    }

    const isoBirthDate = new Date(birthDate).toISOString();

    const childData = {
      name,
      fatherLastName,
      motherLastName,
      email,
      relationToUser: 'child',
      trustedContact: false,
      countryPhoneCode: '',
      phoneNumber: '',
      country,
      notes: '',
      governmentId,
      gender,
      birthDate: isoBirthDate,
      // Reference to the parent contact:
      otherParentId: selectedParent.id,
    };

    try {
      setLoading(true);
      const createdChild = await createContactAction(userId, childData);
      console.log('Child created:', createdChild);
      onAddChild(createdChild);
      setShowModal(false);
    } catch (error) {
      console.error('Error creating child contact:', error);
      alert('Ocurrió un error al guardar el hijo.');
    } finally {
      setLoading(false);
    }
  };

  const handleParentSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value === 'new') {
      setParentType('new');
      setShowAddParentModal(true);
    } else {
      setParentType('existing');
      setSelectedParentId(value);
      const parent = contacts.find((c) => c.id === value);
      if (parent) {
        setSelectedParent(parent);
      }
    }
  };

  const handleAddNewParent = (partner: Contact | null) => {
    setSelectedParent(partner);
    setShowAddParentModal(false);
  };

  if (!showModal) return null;

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      >
        <div className="bg-white rounded-2xl p-8 w-full max-w-md relative max-h-[90vh] overflow-y-auto">
          <button
            onClick={() => setShowModal(false)}
            className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={24} weight="bold" />
          </button>

          <h2 className="text-xl font-semibold mb-6 text-[#1d1d1f]">
            {isEditing ? 'Editar Hijo' : 'Agregar Hijo'}
          </h2>

          <div className="space-y-4">
            {/* Parent Selection */}
            <div>
              <label className="block text-sm font-medium text-[#6e6e73] mb-1">
                Padre/Madre <span className="text-[#047aff]">*</span>
              </label>
              <select
                value={parentType === 'new' ? 'new' : selectedParentId}
                onChange={handleParentSelect}
                className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#047aff]"
              >
                <option value="">Seleccione un padre/madre</option>
                {contacts.map((contact) => (
                  <option key={contact.id} value={contact.id}>
                    {contact.name} {contact.fatherLastName} {contact.motherLastName}
                  </option>
                ))}
                <option value="new">+ Agregar nuevo padre/madre</option>
              </select>
            </div>

            {/* Child Fields */}
            <div>
              <label className="block text-sm font-medium text-[#6e6e73] mb-1">
                Nombre
              </label>
              <input
                type="text"
                placeholder="Nombre"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#047aff]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#6e6e73] mb-1">
                Apellido Paterno
              </label>
              <input
                type="text"
                placeholder="Apellido Paterno"
                value={fatherLastName}
                onChange={(e) => setFatherLastName(e.target.value)}
                className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#047aff]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#6e6e73] mb-1">
                Apellido Materno
              </label>
              <input
                type="text"
                placeholder="Apellido Materno"
                value={motherLastName}
                onChange={(e) => setMotherLastName(e.target.value)}
                className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#047aff]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#6e6e73] mb-1">
                Género <span className="text-[#047aff]">*</span>
              </label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#047aff]"
              >
                <option value="none">Seleccione un género</option>
                <option value="male">Masculino</option>
                <option value="female">Femenino</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#6e6e73] mb-1">
                Fecha de Nacimiento <span className="text-[#047aff]">*</span>
              </label>
              <input
                type="date"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#047aff]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#6e6e73] mb-1">
                País de Nacimiento <span className="text-[#047aff]">*</span>
              </label>
              <select
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#047aff]"
              >
                {COUNTRIES.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.label}
                  </option>
                ))}
              </select>
            </div>

            {country === 'MX' && (
              <div>
                <label className="block text-sm font-medium text-[#6e6e73] mb-1">
                  ID de Gobierno <span className="text-[#047aff]">*</span>
                </label>
                <input
                  type="text"
                  placeholder="ID de Gobierno"
                  value={governmentId}
                  onChange={(e) => setGovernmentId(e.target.value)}
                  className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#047aff]"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-[#6e6e73] mb-1">
              Correo Electrónico <span className="text-[#047aff]">*</span>
              </label>
              <input
                type="email"
                placeholder="Correo Electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#047aff]"
              />
            </div>

          </div>

          <div className="flex justify-end gap-4 mt-6">

            <button
              onClick={handleSubmit}
              className="px-6 py-2 bg-[#047aff] text-white rounded-lg hover:bg-[#0456b0] transition-colors disabled:opacity-50"
              disabled={loading}
            >
              {loading ? 'Guardando...' : isEditing ? 'Guardar' : 'Agregar'}
            </button>
          </div>
        </div>
      </motion.div>

      {showAddParentModal && (
        <Add
          showModal={showAddParentModal}
          setShowModal={setShowAddParentModal}
          setPartner={handleAddNewParent}
          isEditing={false}
          existingPartner={null}
          userId={userId}
        />
      )}
    </>
  );
};

export default AddChild;
