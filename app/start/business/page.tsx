import { FC } from 'react';
import Start from "@/components/common/Start";

const BusinessPage: FC = () => {
  return (
      <Start 
        heading={'¿Tienes un negocio en México?'} 
        linkNo={'/start/benefits?recommendation=online'} 
        linkyes={'/start/benefits?recommendation=telephonic'} 
        titleNo={'No tengo un negocio.'} 
        titleYes={'Incluye ser empresario individual, o formar parte de cualquier tipo de sociedad.'} 
        box={'Tu situación actual nos ayuda a personalizar tu testamento de acuerdo a tus necesidades específicas. Al comprender mejor tu situación familiar, podemos asegurarnos de que tu testamento cubra todas las necesidades y consideraciones importantes para ti y tus seres queridos.'}
      />
  );
};

export default BusinessPage;