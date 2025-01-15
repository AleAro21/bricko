import React, { useEffect, useState } from 'react';
import { useLoadScript } from '@react-google-maps/api';
import styled from 'styled-components';

const libraries: ("places")[] = ["places"];

interface AddressAutocompleteProps {
  onAddressSelect: (address: AddressData) => void;
  defaultValue?: string;
  className?: string;
  required?: boolean;
}

export interface AddressData {
  streetAddress: string;
  streetAddress2: string;
  city: string;
  postalCode: string;
  country: string;
}

const StyledWrapper = styled.div`
  position: relative;
  width: 100%;

  .autocomplete-input {
    width: 100%;
    padding: 0px 16px;
     min-height: 50px;
    font-size: 16px;
    border: 1px solid #e4e4e4;
    border-radius: 12px;
    background-color: #ffffff;
    color: #1d1d1f;
    transition: all 0.2s ease;
    outline: none;
    -webkit-appearance: none;

    &:hover {
      border-color: #b8b8b8;
    }

    &:focus {
      border-color: #0071e3;
      box-shadow: 0 0 0 4px rgba(0, 113, 227, 0.1);
    }
  }

  .suggestions-container {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: white;
    border-radius: 12px;
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.1);
    margin-top: 4px;
    z-index: 1000;
    max-height: 200px;
    overflow-y: auto;

    &::-webkit-scrollbar {
      width: 8px;
    }

    &::-webkit-scrollbar-track {
      background: #f5f5f7;
      border-radius: 4px;
    }

    &::-webkit-scrollbar-thumb {
      background: #86868b;
      border-radius: 4px;
    }
  }

  .suggestion-item {
    padding: 12px 24px;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      background-color: #f5f5f7;
    }
  }
`;

const AddressAutocomplete: React.FC<AddressAutocompleteProps> = ({
  onAddressSelect,
  defaultValue = '',
  className = '',
  required = false,
}) => {
  const [inputValue, setInputValue] = useState(defaultValue);
  const [autocomplete, setAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
    libraries,
  });

  useEffect(() => {
    if (!isLoaded || !document.getElementById('address-input')) return;

    const autocompleteInstance = new google.maps.places.Autocomplete(
      document.getElementById('address-input') as HTMLInputElement,
      {
        types: ['address'],
        componentRestrictions: { country: 'MX' }, // Restrict to Spain
      }
    );

    autocompleteInstance.addListener('place_changed', () => {
      const place = autocompleteInstance.getPlace();
      
      if (!place.geometry) return;

      const addressComponents = place.address_components || [];
      const addressData: AddressData = {
        streetAddress: '',
        streetAddress2: '',
        city: '',
        postalCode: '',
        country: '',
      };

      // Extract address components
      addressComponents.forEach(component => {
        const types = component.types;

        if (types.includes('street_number')) {
          addressData.streetAddress = `${addressData.streetAddress} ${component.long_name}`.trim();
        }
        if (types.includes('route')) {
          addressData.streetAddress = `${component.long_name} ${addressData.streetAddress}`.trim();
        }
        if (types.includes('locality')) {
          addressData.city = component.long_name;
        }
        if (types.includes('postal_code')) {
          addressData.postalCode = component.long_name;
        }
        if (types.includes('country')) {
          addressData.country = component.long_name;
        }
      });

      onAddressSelect(addressData);
      setInputValue(place.formatted_address || '');
    });

    setAutocomplete(autocompleteInstance);
  }, [isLoaded, onAddressSelect]);

  if (loadError) {
    return <div>Error loading Google Maps</div>;
  }

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <StyledWrapper className={className}>
      <input
        id="address-input"
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className="autocomplete-input"
        placeholder="Introduce tu dirección"
        required={required}
      />
    </StyledWrapper>
  );
};

export default AddressAutocomplete;