import { FC } from 'react';
import Start from "@/components/common/Start";

const AssetsPage: FC = () => {
  return (
    <main className='container w-3/4 mx-auto flex flex-col min-h-screen'>
      <Start 
        heading={'¿Todo tu patrimonio está ubicado en México?'} 
        linkNo={'/start/benefits?recommendation=telephonic'} 
        linkyes={'/start/basics'} 
        titleNo={'Esto incluye cuentas bancarias, propiedades, acciones y participaciones fuera de México.'} 
        titleYes={'Todo mi patrimonio se encuentra en México.'} 
      />
    </main>
  );
};

export default AssetsPage;