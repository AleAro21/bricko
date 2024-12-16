import { differenceInYears, isValid, parse } from 'date-fns';

export const validateAge = (birthDate: Date | null): string | null => {
  if (!birthDate) return "Por favor, seleccione una fecha";
  if (!isValid(birthDate)) return "Fecha inválida";
  
  const age = differenceInYears(new Date(), birthDate);
  
  if (age < 18) return "Debes ser mayor de 18 años";
  if (age > 100) return "La edad debe ser menor a 100 años";
  
  return null;
};

export const formatDate = (date: Date | null): string => {
  if (!date || !isValid(date)) return '';
  return date.toLocaleDateString('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
};