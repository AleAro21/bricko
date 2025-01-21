import { FC } from 'react';
import Start from "@/components/common/Start";

const AssetsPage: FC = () => {
  return (
      <Start 
        heading={'¿Todo tu patrimonio está ubicado en México?'} 
        linkNo={'/start/benefits?recommendation=telephonic'} 
        linkyes={'/start/basics'} 
        titleNo={'Esto incluye cuentas bancarias, propiedades, acciones y participaciones fuera de México.'} 
        titleYes={'Todo mi patrimonio se encuentra en México.'} 
        box={'Tu situación actual nos ayuda a personalizar tu testamento de acuerdo a tus necesidades específicas. Al comprender mejor tu situación familiar, podemos asegurarnos de que tu testamento cubra todas las necesidades y consideraciones importantes para ti y tus seres queridos.'}
      />
  );
};

export default AssetsPage;