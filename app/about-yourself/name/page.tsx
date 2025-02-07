'use client';

import { FC, FormEvent, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import DashboardLayout from "@/components/common/DashboardLayout";
import { useRouter } from "next/navigation";
import PrimaryButton from "@/components/reusables/PrimaryButton";
import Calendar from "@/components/common/calendar/Calendar";
import { validateAge } from "@/components/common/calendar/dateValidation";
import ProgressIndicator from "@/components/reusables/ProgressIndicator";
import Link from "next/link";
import { useTestament } from "@/context/TestamentContext";
import { useUser } from "@/context/UserContext";
import Spinner from "@/components/reusables/Spinner";
import { Autocomplete, TextField, Radio, RadioGroup, FormControlLabel, FormControl } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { apiService } from '@/app/apiService';
import { fetchAuthSession } from "aws-amplify/auth";
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import type { E164Number } from 'libphonenumber-js/core';

// List of countries
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

interface FormValues {
  name: string;
  middleName: string;
  fatherLastName: string;
  motherLastName: string;
  governmentId: string;
  birthDate: Date | null;
  nationality: string;
  gender: 'male' | 'female' | '';
  phoneNumber: string;
  countryPhoneCode: string;
}

// Create custom theme to match your design
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
              borderColor: '#047aff',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#047aff',
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
            backgroundColor: '#047aff !important',
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
              borderColor: '#047aff',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#047aff',
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
            color: '#047aff',
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

const NamePage: FC = () => {
  const router = useRouter();
  const { user, refreshUser } = useUser();
  const { personalInfo, savePersonalInfo, loading } = useTestament();
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [formValues, setFormValues] = useState<FormValues>({
    name: "",
    middleName: "",
    fatherLastName: "",
    motherLastName: "",
    governmentId: "",
    birthDate: null,
    nationality: "",
    gender: "",
    phoneNumber: "",
    countryPhoneCode: "",
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const loadInitialData = async () => {
      setIsInitialLoading(true);
      try {
        // First check session storage for user data
        const storedUser = sessionStorage.getItem('userObject');
        const userData = storedUser ? JSON.parse(storedUser) : null;

        // If we don't have data in session storage but have a user ID, refresh the user data
        if (!userData && sessionStorage.getItem('userId')) {
          await refreshUser();
        }

        // Get the latest user data after potential refresh
        const latestStoredUser = sessionStorage.getItem('userObject');
        const latestUserData = latestStoredUser ? JSON.parse(latestStoredUser) : null;

        // Set form values from either personal info or user data
        if (personalInfo) {
          setFormValues(prev => ({
            ...prev,
            ...personalInfo,
            nationality: personalInfo.nationality || "",
            gender: personalInfo.gender as 'male' | 'female' || "",
            phoneNumber: personalInfo.phoneNumber || "",
            countryPhoneCode: personalInfo.countryPhoneCode || "",
            birthDate: personalInfo.birthDate ? new Date(personalInfo.birthDate) : null,
          }));
        } else if (latestUserData) {
          setFormValues(prev => ({
            ...prev,
            name: latestUserData.name || "",
            fatherLastName: latestUserData.fatherLastName || "",
            motherLastName: latestUserData.motherLastName || "",
            middleName: latestUserData.middleName || "",
            governmentId: latestUserData.governmentId || "",
            birthDate: latestUserData.birthDate ? new Date(latestUserData.birthDate) : null,
            nationality: latestUserData.nationality || "",
            gender: latestUserData.gender || "",
            phoneNumber: latestUserData.phoneNumber || "",
            countryPhoneCode: latestUserData.countryPhoneCode || "",
          }));
        }
      } catch (error) {
        console.error('Error loading initial data:', error);
      } finally {
        setIsInitialLoading(false);
      }
    };

    loadInitialData();
  }, [personalInfo, refreshUser]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    const { name, fatherLastName, motherLastName, middleName, governmentId, birthDate, nationality, gender, phoneNumber, countryPhoneCode } = formValues;

    if (!name || !fatherLastName || !motherLastName || !governmentId || !nationality || !gender) {
      setErrorMessage("Por favor, complete todos los campos obligatorios");
      return;
    }

    const ageError = validateAge(birthDate);
    if (ageError) {
      setErrorMessage(ageError);
      return;
    }

    try {
      // Get the current session token
      const { tokens } = await fetchAuthSession();
      if (!tokens?.accessToken) {
        throw new Error("No authentication token available");
      }

      // Set the token in APIService
      apiService.setToken(tokens.accessToken.toString());

      // Format birthDate to ISO string
      const formattedBirthDate = birthDate ? birthDate.toISOString() : null;

      // First update the user
      if (user?.id) {
        const userData = {
          name,
          middleName: middleName || undefined,
          fatherLastName,
          motherLastName,
          birthDate: formattedBirthDate || undefined,
          gender,
          nationality,
          phoneNumber: phoneNumber || undefined,
          countryPhoneCode: countryPhoneCode.startsWith('+') ? countryPhoneCode : `+${countryPhoneCode}`, 
          governmentId: governmentId || undefined,
        };

        const updatedUser = await apiService.updateUser(user.id, userData);
        
        // Update session storage with the new user data
        sessionStorage.setItem('userObject', JSON.stringify(updatedUser));

        // Refresh user context
        await refreshUser();
      }

      // Then save personal info with all form values
      await savePersonalInfo({
        name,
        middleName,
        fatherLastName,
        motherLastName,
        governmentId,
        birthDate: formattedBirthDate,
        nationality,
        gender,
        phoneNumber: phoneNumber || "",
        countryPhoneCode: countryPhoneCode || "",
      });
      
      // Navigate to next page
      router.push("/about-yourself/basic");
    } catch (error) {
      console.error('Error updating user:', error);
      setErrorMessage("Error al guardar la información. Por favor, intente nuevamente.");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { id, value } = e.target;
    console.log('Field changed:', id, value);
    setFormValues((prev) => {
      const newValues = { ...prev, [id]: value };
      console.log('New form values:', newValues);
      return newValues;
    });
    setErrorMessage(null);
  };  

  const handleGenderChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setFormValues((prev) => ({ ...prev, gender: e.target.value as 'male' | 'female' }));
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

  const handleDateChange = (date: Date | null): void => {
    setFormValues((prev) => ({ ...prev, birthDate: date }));
    setErrorMessage(null);
  };

  const handlePhoneChange = (value: E164Number | undefined): void => {
    if (!value) {
      setFormValues(prev => ({
        ...prev,
        phoneNumber: "",
        countryPhoneCode: "",
      }));
      return;
    }

    // Convert to string and handle the parsing
    const phoneString = value.toString();
    
    // Find the matching country code
    const country = COUNTRIES.find(c => phoneString.startsWith(`+${c.phone}`));
    
    if (country) {
      const countryCode = country.phone;
      const number = phoneString.slice(countryCode.length + 1); // +1 for the '+' symbol
      
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
          {isInitialLoading ? (
            <div className="flex items-center justify-center min-h-[75vh]">
              <Spinner size={50} />
            </div>
          ) : (
            <div className="w-full max-w-6xl mx-auto flex flex-col min-h-[75vh] mb-4 px-4 sm:px-5">
              <div className="flex flex-col lg:flex-row gap-8 lg:gap-24 h-full py-12">
                {/* Left column - Title section */}
                <div className="lg:w-1/3">
                  <div className="flex items-center justify-between mb-2.5">
                    <div className="inline-flex items-center h-[32px] bg-[#047aff] bg-opacity-10 px-[12px] py-[6px] rounded-md">
                      <span className="text-[#047aff] text-[14px] font-[400]">DATOS PERSONALES</span>
                    </div>
                  </div>

                  <h1 className='text-[32px] sm:text-[38px] font-[500] tracking-[-1.5px] leading-[1.2] sm:leading-[52px] mb-[15px]'>
                    <span className='text-[#1d1d1f]'>Primero, vamos a </span>
                    <span className='bg-gradient-to-r from-[#3d9bff] to-[#047aff] inline-block text-transparent bg-clip-text'>conocerte</span>
                  </h1>

                  <p className="text-[16px] text-[#1d1d1f] leading-6 mb-5">
                    Necesitamos algunos datos personales para comenzar con tu testamento.
                  </p>

                  <div className="flex justify-end items-center gap-2 mb-5">
                    <Link href="#" className="inline-flex items-center h-[32px] text-[#047aff] hover:text-[#0456b0]">
                      <span className="w-5 h-5 inline-flex items-center justify-center rounded-full border border-[#047aff] text-sm">?</span>
                    </Link>
                    <p className="text-[14px] text-[#000000]">Articulo relacionado</p>
                  </div>
                  <ProgressIndicator
                    currentSection={1}
                    totalSections={5}
                    title="Progreso de la sección"
                  />
                </div>

                {/* Right column - Form in white container */}
                <div className='w-full lg:w-3/5'>
                  <div className="bg-white rounded-2xl px-4 sm:px-8 md:px-12 py-10 shadow-lg relative">
                    {loading && (
                      <div className="absolute inset-0 bg-white bg-opacity-80 flex items-center justify-center z-50 rounded-2xl">
                        <div className="text-center">
                          <Spinner size={50} />
                          <p className="mt-4 text-[#047aff] font-medium">Guardando...</p>
                        </div>
                      </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="space-y-7">
                        <div>
                          <h2 className="text-[20px] font-[500] text-[#1d1d1f] mb-2">
                            ¿Cuál es tu nombre legal completo?
                          </h2>
                          <p className="text-[14px] text-[#6e6e73] mb-5">
                            Este es el nombre que figura en tu pasaporte o permiso de conducir.
                          </p>

                          <div className="space-y-7">
                            <div>
                              <label htmlFor="name" className="block text-[17px] font-[400] text-[#1d1d1f] mb-2.5">
                                Nombre <span className="text-[#047aff]">*</span>
                              </label>
                              <input
                                type="text"
                                id="name"
                                value={formValues.name}
                                onChange={handleChange}
                                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:border-[#047aff] transition-all"
                                required
                              />
                            </div>

                            <div>
                              <label htmlFor="middlename" className="block text-[17px] font-[400] text-[#1d1d1f] mb-2.5">
                                Segundo Nombre
                              </label>
                              <input
                                type="text"
                                id="middleName"
                                value={formValues.middleName}
                                onChange={handleChange}
                                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:border-[#047aff] transition-all"
                              />
                            </div>

                            <div>
                              <label htmlFor="fatherLastName" className="block text-[17px] font-[400] text-[#1d1d1f] mb-2.5">
                                Apellido Paterno <span className="text-[#047aff]">*</span>
                              </label>
                              <input
                                type="text"
                                id="fatherLastName"
                                value={formValues.fatherLastName}
                                onChange={handleChange}
                                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:border-[#047aff] transition-all"
                                required
                              />
                            </div>

                            <div>
                              <label htmlFor="motherLastName" className="block text-[17px] font-[400] text-[#1d1d1f] mb-2.5">
                                Apellido Materno <span className="text-[#047aff]">*</span>
                              </label>
                              <input
                                type="text"
                                id="motherLastName"
                                value={formValues.motherLastName}
                                onChange={handleChange}
                                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:border-[#047aff] transition-all"
                                required
                              />
                            </div>

                            <div>
                              <label className="block text-[17px] font-[400] text-[#1d1d1f] mb-2.5">
                                Género <span className="text-[#047aff]">*</span>
                              </label>
                              <FormControl component="fieldset">
                                <RadioGroup
                                  row
                                  value={formValues.gender}
                                  onChange={handleGenderChange}
                                >
                                  <FormControlLabel
                                    value="male"
                                    control={<Radio />}
                                    label="Hombre"
                                    className="mr-8"
                                  />
                                  <FormControlLabel
                                    value="female"
                                    control={<Radio />}
                                    label="Mujer"
                                  />
                                </RadioGroup>
                              </FormControl>
                            </div>

                            <div>
                              <label htmlFor="country" className="block text-[17px] font-[400] text-[#1d1d1f] mb-2.5">
                                País de Nacimiento <span className="text-[#047aff]">*</span>
                              </label>
                              <Autocomplete
                                options={COUNTRIES}
                                value={COUNTRIES.find(country => country.code === formValues.nationality) || null}
                                onChange={handleCountryChange}
                                getOptionLabel={(option) => option.label}
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    placeholder="Selecciona tu país"
                                    fullWidth
                                  />
                                )}
                              />
                            </div>

                            <div>
                              <label htmlFor="governmentId" className="block text-[17px] font-[400] text-[#1d1d1f] mb-2.5">
                                RFC <span className="text-[#047aff]">*</span>
                              </label>
                              <input
                                type="text"
                                id="governmentId"
                                value={formValues.governmentId}
                                onChange={handleChange}
                                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:border-[#047aff] transition-all"
                                required
                              />
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
                                value={formValues.phoneNumber ? `+${formValues.countryPhoneCode}${formValues.phoneNumber}` : undefined}
                                onChange={handlePhoneChange}
                                placeholder="Opcional"
                                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:border-[#047aff] transition-all"
                              />
                            </div>
                          </div>
                        </div>
                        <div>
                          <label htmlFor="birthDate" className="block text-[17px] font-[400] text-[#1d1d1f] mb-2.5">
                            Fecha de nacimiento <span className="text-[#047aff]">*</span>
                          </label>
                          <Calendar
                            selectedDate={formValues.birthDate}
                            onChange={handleDateChange}
                            minDate={new Date(1923, 0, 1)}
                            maxDate={new Date()}
                            placeholderText="Seleccionar fecha de nacimiento"
                            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:border-[#047aff] transition-all"
                          />
                        </div>
                      </div>

                      {errorMessage && (
                        <p className="text-red-500 text-[14px] text-center mt-0">{errorMessage}</p>
                      )}

                      <div className="flex justify-end pt-6">
                        <PrimaryButton type="submit">
                          Guardar y continuar
                        </PrimaryButton>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </ThemeProvider>
    </DashboardLayout>
  );
};

export default NamePage;