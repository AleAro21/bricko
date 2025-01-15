import { FC } from 'react';
import Start from "@/components/common/Start";

const CountryPage: FC = () => {
  return (
    <main className='container w-3/4 mx-auto flex flex-col min-h-screen'>
      <Start 
        heading={'¿Vives en México?'} 
        linkNo={'/start/waiting-list'} 
        linkyes={'/start/benefits?recommendation=telephonic'} 
        titleNo={''} 
        titleYes={''} 
        box={'Tu situación actual nos ayuda a personalizar tu testamento de acuerdo a tus necesidades específicas. Al comprender mejor tu situación familiar, podemos asegurarnos de que tu testamento cubra todas las necesidades y consideraciones importantes para ti y tus seres queridos.'}
      />
    </main>
  );
};

export default CountryPage;