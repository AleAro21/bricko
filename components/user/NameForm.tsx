'use client';

import { FC, FormEvent, useState } from 'react';
import { motion } from 'framer-motion';
import DashboardLayout from "@/components/common/DashboardLayout";
import { useRouter } from "next/navigation";
import PrimaryButton from "@/components/reusables/PrimaryButton";
import Calendar from "@/components/common/calendar/Calendar";
import { validateAge } from "@/components/common/calendar/dateValidation";
import ProgressIndicator from "@/components/reusables/ProgressIndicator";
import Link from "next/link";
import { Autocomplete, TextField, Radio, RadioGroup, FormControlLabel, FormControl } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import type { E164Number } from 'libphonenumber-js/core';
import Spinner from "@/components/reusables/Spinner";
import { updateUserAction } from '@/app/actions/userActions';
import { flushSync } from 'react-dom';

interface FormValues {
  name: string;
  middleName: string;
  fatherLastName: string;
  motherLastName: string;
  governmentId: string;
  birthDate: Date | null;
  nationality: string;
  gender: "male" | "female";
  phoneNumber: string;
  countryPhoneCode: string;
}

interface NameFormProps {
  initialUser: {
    id: string;
    name: string;
    middleName: string;
    fatherLastName: string;
    motherLastName: string;
    governmentId: string;
    birthDate: string;
    nationality: string;
    gender: string;
    phoneNumber: string;
    countryPhoneCode: string;
  };
}

const COUNTRIES = [
  { code: 'MX', label: 'México', phone: '52' },
  { code: 'US', label: 'Estados Unidos', phone: '1' },
  { code: 'ES', label: 'España', phone: '34' },
  { code: 'AR', label: 'Argentina', phone: '54' },
  { code: 'BO', label: 'Bolivia', phone: '591' },
  { code: 'CL', label: 'Chile', phone: '56' },
  { code: 'CO', label: 'Colombia', phone: '57' },
  { code: 'CR', label: 'Costa Rica', phone: '506' },
  { code: 'CU', label: 'Cuba', phone: '53' },
  { code: 'EC', label: 'Ecuador', phone: '593' },
  { code: 'SV', label: 'El Salvador', phone: '503' },
  { code: 'GT', label: 'Guatemala', phone: '502' },
  { code: 'HN', label: 'Honduras', phone: '504' },
  { code: 'NI', label: 'Nicaragua', phone: '505' },
  { code: 'PA', label: 'Panamá', phone: '507' },
  { code: 'PY', label: 'Paraguay', phone: '595' },
  { code: 'PE', label: 'Perú', phone: '51' },
  { code: 'DO', label: 'República Dominicana', phone: '1' },
  { code: 'UY', label: 'Uruguay', phone: '598' },
  { code: 'VE', label: 'Venezuela', phone: '58' },
] as const;

const theme = createTheme({
  components: {
    MuiAutocomplete: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            padding: '0px',
            height: '46px',
            borderRadius: '0.5rem',
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: '#f95940',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#f95940',
            },
          },
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: '#D1D5DB',
          },
          '& .MuiAutocomplete-input': {
            padding: '0.625rem 1rem !important',
          },
          '& .MuiAutocomplete-endAdornment': {
            right: '0.5rem',
          },
        },
        option: {
          '&[aria-selected="true"]': {
            backgroundColor: '#f95940 !important',
            color: 'white',
          },
          '&:hover': {
            backgroundColor: '#F3F4F6 !important',
          },
        },
        paper: {
          marginTop: '4px',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: '#f95940',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#f95940',
            },
          },
        },
      },
    },
    MuiRadio: {
      styleOverrides: {
        root: {
          color: '#D1D5DB',
          '&.Mui-checked': {
            color: '#f95940',
          },
        },
      },
    },
    MuiFormControlLabel: {
      styleOverrides: {
        label: {
          fontSize: '1rem',
          color: '#1d1d1f',
        },
      },
    },
  },
});

const NameForm: FC<NameFormProps> = ({ initialUser }) => {
  const router = useRouter();
  const [formValues, setFormValues] = useState<FormValues>({
    name: initialUser.name,
    middleName: initialUser.middleName,
    fatherLastName: initialUser.fatherLastName,
    motherLastName: initialUser.motherLastName,
    governmentId: initialUser.governmentId,
    birthDate: initialUser.birthDate ? new Date(initialUser.birthDate) : null,
    nationality: initialUser.nationality,
    gender:
      (initialUser.gender === "male" || initialUser.gender === "female")
        ? (initialUser.gender as "male" | "female")
        : "male",
    phoneNumber: initialUser.phoneNumber,
    countryPhoneCode: initialUser.countryPhoneCode ? initialUser.countryPhoneCode.replace(/^\+/, '') : "",
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    flushSync(() => {
      setIsSubmitting(true);
    });
    
    const {
      name,
      fatherLastName,
      motherLastName,
      middleName,
      governmentId,
      birthDate,
      nationality,
      gender,
      phoneNumber,
      countryPhoneCode,
    } = formValues;

    if (!name || !fatherLastName || !motherLastName || !governmentId || !nationality || !gender) {
      setErrorMessage("Por favor, complete todos los campos obligatorios");
      setIsSubmitting(false);
      return;
    }
    const ageError = validateAge(birthDate);
    if (ageError) {
      setErrorMessage(ageError);
      setIsSubmitting(false);
      return;
    }
    if (governmentId.length !== 13) {
      setErrorMessage("El RFC debe tener 13 dígitos");
      setIsSubmitting(false);
      return;
    }

    const hasDataChanged =
      initialUser.name !== name ||
      initialUser.middleName !== middleName ||
      initialUser.fatherLastName !== fatherLastName ||
      initialUser.motherLastName !== motherLastName ||
      initialUser.governmentId !== governmentId ||
      (initialUser.birthDate ? new Date(initialUser.birthDate).toISOString() : null) !== (birthDate ? birthDate.toISOString() : null) ||
      initialUser.nationality !== nationality ||
      initialUser.gender !== gender ||
      initialUser.phoneNumber !== phoneNumber ||
      initialUser.countryPhoneCode !== (countryPhoneCode ? `+${countryPhoneCode}` : undefined);

    let didNavigate = false;
    try {
      if (hasDataChanged && initialUser.id) {
        const formattedBirthDate = birthDate ? birthDate.toISOString() : undefined;
        const updateResult = await updateUserAction({
          id: initialUser.id,
          name,
          middleName: middleName || undefined,
          fatherLastName,
          motherLastName,
          governmentId: governmentId || undefined,
          birthDate: formattedBirthDate,
          nationality,
          gender,
          phoneNumber: phoneNumber || undefined,
          countryPhoneCode: countryPhoneCode ? `+${countryPhoneCode}` : undefined,
        });
        if (!updateResult.success) {
          throw new Error(updateResult.error || "Error updating user");
        }
      }
      
      router.push("/about-yourself/basic");
      didNavigate = true;
    } catch (error: any) {
      console.error('Error updating user:', error);
      setErrorMessage("Error al guardar la información. Por favor, intente nuevamente.");
    } finally {
      if (!didNavigate) {
        setIsSubmitting(false);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormValues(prev => ({ ...prev, [id]: value }));
    setErrorMessage(null);
  };

  const handleGenderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues(prev => ({ ...prev, gender: e.target.value as "male" | "female" }));
    setErrorMessage(null);
  };

  const handleCountryChange = (_: any, newValue: typeof COUNTRIES[number] | null) => {
    setFormValues(prev => ({
      ...prev,
      nationality: newValue?.code || '',
      countryPhoneCode: newValue ? newValue.phone : '',
    }));
    setErrorMessage(null);
  };

  const handleDateChange = (date: Date | null) => {
    setFormValues(prev => ({ ...prev, birthDate: date }));
    setErrorMessage(null);
  };

  const handlePhoneChange = (value: E164Number | undefined) => {
    if (!value) {
      setFormValues(prev => ({ ...prev, phoneNumber: "", countryPhoneCode: "" }));
      return;
    }
    const phoneString = value.toString();
    const country = COUNTRIES.find(c => phoneString.startsWith(`+${c.phone}`));
    if (country) {
      const countryCode = country.phone;
      const number = phoneString.slice(countryCode.length + 1);
      setFormValues(prev => ({
        ...prev,
        phoneNumber: number,
        countryPhoneCode: countryCode,
      }));
    }
    setErrorMessage(null);
  };

  return (
    <DashboardLayout>
      <ThemeProvider theme={theme}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="container mx-auto flex flex-col flex-grow bg-[#f5f5f7] overflow-hidden"
        >
          <div className="w-full max-w-6xl mx-auto flex flex-col min-h-[75vh] mb-4 px-4 sm:px-5">
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-24 h-full py-12">
              <div className="lg:w-1/3">
                <div className="flex items-center justify-between mb-2.5">
                  <div className="inline-flex items-center h-[32px] bg-[#f95940] bg-opacity-10 px-[12px] py-[6px] rounded-md">
                    <span className="text-[#f95940] text-[14px] font-[400]">DATOS PERSONALES</span>
                  </div>
                </div>
                <h1 className="text-[32px] sm:text-[38px] font-[500] tracking-[-1.5px] leading-[1.2] sm:leading-[52px] mb-[15px]">
                  <span className="text-[#1d1d1f]">Primero, vamos a </span>
                  <span
                    style={{
                      backgroundImage:
                        "linear-gradient(to left, #f95940 30%, #f95940 100%)",
                    }}
                    className="inline-block text-transparent bg-clip-text"
                  >
                    conocerte
                  </span>
                </h1>
                <p className="text-[16px] text-[#1d1d1f] leading-6 mb-5">
                  Necesitamos algunos datos personales para comenzar con tu testamento.
                </p>
                <div className="flex justify-end items-center gap-2 mb-5">
                  <Link href="#" className="inline-flex items-center h-[32px] text-[#f95940] hover:text-[#0456b0]">
                    <span className="w-5 h-5 inline-flex items-center justify-center rounded-full border border-[#f95940] text-sm">?</span>
                  </Link>
                  <p className="text-[14px] text-[#000000]">Articulo relacionado</p>
                </div>
              </div>
              <div className="w-full lg:w-3/5">
                <div className="bg-white rounded-2xl px-4 sm:px-8 md:px-12 py-10 shadow-lg relative">
                  <div className="mb-8">
                    <ProgressIndicator currentSection={1} totalSections={4} title="Progreso de la sección" />
                  </div>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-4">
                      <div>
                        <h2 className="text-[20px] font-[500] text-[#1d1d1f] mb-2">
                          ¿Cuál es tu nombre legal completo?
                        </h2>
                        <p className="text-[14px] text-[#6e6e73] mb-5">
                          Este es el nombre que figura en tu pasaporte o permiso de conducir.
                        </p>
                        <div className="space-y-4">
                          <div>
                            <label htmlFor="name" className="block text-[17px] font-[400] text-[#1d1d1f] mb-2.5">
                              Nombre <span className="text-[#f95940]">*</span>
                            </label>
                            <input
                              type="text"
                              id="name"
                              value={formValues.name}
                              onChange={handleChange}
                              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:border-[#f95940] transition-all"
                              required
                            />
                          </div>
                          <div>
                            <label htmlFor="middleName" className="block text-[17px] font-[400] text-[#1d1d1f] mb-2.5">
                              Segundo Nombre
                            </label>
                            <input
                              type="text"
                              id="middleName"
                              value={formValues.middleName}
                              onChange={handleChange}
                              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:border-[#f95940] transition-all"
                            />
                          </div>
                          <div>
                            <label htmlFor="fatherLastName" className="block text-[17px] font-[400] text-[#1d1d1f] mb-2.5">
                              Apellido Paterno <span className="text-[#f95940]">*</span>
                            </label>
                            <input
                              type="text"
                              id="fatherLastName"
                              value={formValues.fatherLastName}
                              onChange={handleChange}
                              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:border-[#f95940] transition-all"
                              required
                            />
                          </div>
                          <div>
                            <label htmlFor="motherLastName" className="block text-[17px] font-[400] text-[#1d1d1f] mb-2.5">
                              Apellido Materno <span className="text-[#f95940]">*</span>
                            </label>
                            <input
                              type="text"
                              id="motherLastName"
                              value={formValues.motherLastName}
                              onChange={handleChange}
                              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:border-[#f95940] transition-all"
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-[17px] font-[400] text-[#1d1d1f] mb-2.5">
                              Género <span className="text-[#f95940]">*</span>
                            </label>
                            <FormControl component="fieldset">
                              <RadioGroup row value={formValues.gender} onChange={handleGenderChange}>
                                <FormControlLabel value="male" control={<Radio />} label="Hombre" className="mr-8" />
                                <FormControlLabel value="female" control={<Radio />} label="Mujer" />
                              </RadioGroup>
                            </FormControl>
                          </div>
                          <div>
                            <label htmlFor="country" className="block text-[17px] font-[400] text-[#1d1d1f] mb-2.5">
                              País de Nacimiento <span className="text-[#f95940]">*</span>
                            </label>
                            <Autocomplete
                              options={COUNTRIES}
                              value={COUNTRIES.find(country => country.code === formValues.nationality) || null}
                              onChange={handleCountryChange}
                              getOptionLabel={(option) => option.label}
                              renderInput={(params) => (
                                <TextField {...params} placeholder="Selecciona tu país" fullWidth />
                              )}
                            />
                          </div>
                          <div>
                            <label htmlFor="birthDate" className="block text-[17px] font-[400] text-[#1d1d1f] mb-2.5">
                              Fecha de nacimiento <span className="text-[#f95940]">*</span>
                            </label>
                            <Calendar
                              selectedDate={formValues.birthDate}
                              onChange={handleDateChange}
                              minDate={new Date(1923, 0, 1)}
                              maxDate={new Date()}
                              placeholderText="Seleccionar fecha de nacimiento"
                              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:border-[#f95940] transition-all"
                            />
                          </div>
                          <div>
                            <label htmlFor="governmentId" className="block text-[17px] font-[400] text-[#1d1d1f] mb-2.5">
                              RFC <span className="text-[#f95940]">*</span>
                            </label>
                            <input
                              type="text"
                              id="governmentId"
                              value={formValues.governmentId}
                              onChange={handleChange}
                              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:border-[#f95940] transition-all"
                              required
                            />
                            <p className="text-[12px] text-gray-500 mt-1">El RFC debe tener 13 dígitos.</p>
                          </div>
                          <div>
                            <label htmlFor="phone" className="block text-[17px] font-[400] text-[#1d1d1f] mb-2.5">
                              Número de Teléfono
                            </label>
                            <p className="text-[14px] text-[#6e6e73] mb-5">
                              Sólo te llamaremos si necesitamos ayudarte con tu testamento.
                            </p>
                            <PhoneInput
                              international
                              defaultCountry="MX"
                              value={
                                formValues.phoneNumber && formValues.countryPhoneCode
                                  ? `+${formValues.countryPhoneCode}${formValues.phoneNumber}`
                                  : undefined
                              }
                              onChange={handlePhoneChange}
                              placeholder="Opcional"
                              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:border-[#f95940] transition-all"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    {errorMessage && <p className="text-red-500 text-[14px] text-center mt-0">{errorMessage}</p>}
                    <div className="flex justify-end pt-6">
                      <PrimaryButton type="submit" disabled={isSubmitting}>
                        {isSubmitting ? <Spinner size={24} /> : "Guardar y continuar"}
                      </PrimaryButton>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </ThemeProvider>
    </DashboardLayout>
  );
};

export default NameForm;