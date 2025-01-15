import { FC } from 'react';
import Start from "@/components/common/Start";

const PropertyPage: FC = () => {
  return (
    <main className='container w-3/4 mx-auto flex flex-col min-h-screen'>
      <Start 
        heading={'¿Eres propietario/a de tu vivienda?'} 
        linkNo={'/start/location'} 
        linkyes={'/start/location'} 
        titleNo={'No poseo una vivienda propia.'} 
        titleYes={'Incluso si está hipotecada o es propiedad compartida.'} 
        box={'Tu situación actual nos ayuda a personalizar tu testamento de acuerdo a tus necesidades específicas. Al comprender mejor tu situación familiar, podemos asegurarnos de que tu testamento cubra todas las necesidades y consideraciones importantes para ti y tus seres queridos.'}
      />
    </main>
  );
};

export default PropertyPage;