import { FC } from 'react';
import Start from "@/components/common/Start";

const LocationPage: FC = () => {
  return (
      <Start 
        heading={'¿Vives en Latinoamérica?'} 
        linkNo={'/start/country'} 
        linkyes={'/start/assets'} 
        titleNo={''} 
        titleYes={''} 
        box={'Tu situación actual nos ayuda a personalizar tu testamento de acuerdo a tus necesidades específicas. Al comprender mejor tu situación familiar, podemos asegurarnos de que tu testamento cubra todas las necesidades y consideraciones importantes para ti y tus seres queridos.'}
      />
  );
};

export default LocationPage;