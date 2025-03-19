'use client';

import { FC, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X } from 'phosphor-react';
import { Contact } from '@/types';
import { createContactAction } from '@/app/actions/contactActions';

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

interface AddProps {
  showModal: boolean;
  setShowModal: (show: boolean) => void;
  setPartner: (partner: Contact | null) => void;
  isEditing: boolean;
  existingPartner: Contact | null;
  partnerType?: string;
  userId: string;
}

const Add: FC<AddProps> = ({
  showModal,
  setShowModal,
  setPartner,
  isEditing,
  existingPartner,
  partnerType,
  userId,
}) => {
  const [name, setName] = useState<string>('');
  const [middleName, setMiddleName] = useState<string>('');
  const [fatherLastName, setFatherLastName] = useState<string>('');
  const [motherLastName, setMotherLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [relationship, setRelationship] = useState<string>('none');
  const [loading, setLoading] = useState(false);
  const [gender, setGender] = useState<string>('none');
  const [birthDate, setBirthDate] = useState<string>(''); // New birthdate state
  const [country, setCountry] = useState<string>('MX');
  const [governmentId, setGovernmentId] = useState<string>('');

  useEffect(() => {
    if (isEditing && existingPartner) {
      setName(existingPartner.name || '');
      setFatherLastName(existingPartner.fatherLastName || '');
      setMotherLastName(existingPartner.motherLastName || '');
      setEmail(existingPartner.email || '');
      setRelationship(existingPartner.relationToUser || 'none');
      setGender(existingPartner.gender || 'none');
      setBirthDate(
        existingPartner.birthDate
          ? new Date(existingPartner.birthDate).toISOString().split('T')[0]
          : ''
      );
      setCountry(existingPartner.country || 'MX');
      setGovernmentId(existingPartner.governmentId || '');
    } else {
      setName('');
      setMiddleName('');
      setFatherLastName('');
      setMotherLastName('');
      setEmail('');
      setRelationship('none');
      setGender('none');
      setBirthDate('');
      setCountry('MX');
      setGovernmentId('');
    }
  }, [isEditing, existingPartner, showModal]);

  const modalTitle = isEditing
    ? partnerType === 'Casado'
      ? 'Editar Cónyuge'
      : 'Editar Pareja'
    : partnerType === 'Casado'
      ? 'Agregar Cónyuge'
      : 'Agregar Pareja';

  const buttonText =
    isEditing
      ? 'Guardar'
      : partnerType === 'Casado'
        ? 'Agregar Cónyuge'
        : 'Agregar Pareja';

  const handleSubmit = async () => {
    if (
      !name ||
      !fatherLastName ||
      !motherLastName ||
      !email ||
      relationship === 'none' ||
      !birthDate ||
      !country
    ) {
      alert('Por favor, complete todos los campos obligatorios.');
      return;
    }

    const partnerData: Contact = {
      name,
      fatherLastName,
      motherLastName,
      email,
      relationToUser: relationship,
      trustedContact: false,
      countryPhoneCode: '',
      phoneNumber: '',
      country,
      notes: '',
      governmentId,
      gender,
      birthDate: new Date(birthDate).toISOString(),
    };

    try {
      setLoading(true);
      const createdPartner = await createContactAction(userId, partnerData);
      console.log('Partner created:', createdPartner);
      setPartner(createdPartner);
      setShowModal(false);
    } catch (error) {
      console.error('Error creating partner:', error);
      alert('Ocurrió un error al guardar el contacto.');
    } finally {
      setLoading(false);
    }
  };

  if (!showModal) return null;

  return (
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
          className="absolute top-4 right-4 w-8 h-8 bg-[#e8e8ed] rounded-full flex items-center justify-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text[#6e6e73]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <h2 className="text-xl font-semibold mb-6 text-[#1d1d1f]">
          {modalTitle}
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#6e6e73] mb-1">
              Nombre <span className="text-[#047aff]">*</span>
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
              Apellido Paterno <span className="text-[#047aff]">*</span>
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
              Apellido Materno <span className="text-[#047aff]">*</span>
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
              Relación <span className="text-[#047aff]">*</span>
            </label>
            <select
              value={relationship}
              onChange={(e) => setRelationship(e.target.value)}
              className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:border-[#047aff]"
            >
              <option value="none">Seleccione una relación</option>
              <option value="sibling">Hermano/a</option>
              <option value="child">Hijo/a</option>
              <option value="spouse">Cónyuge</option>
              <option value="friend">Amigo/a</option>
              <option value="parent">Padre/Madre</option>
              <option value="albacea">Albacea</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end gap-4 mt-6">
          <button
            onClick={handleSubmit}
            className="px-6 py-2 bg-[#047aff] text-white rounded-lg hover:bg-[#0456b0] transition-colors disabled:opacity-50"
            disabled={loading}
          >
            {loading ? 'Guardando...' : buttonText}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default Add;
