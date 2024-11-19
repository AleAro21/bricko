import { FC } from 'react';
import Start from "@/components/common/Start";

const ChildrenPage: FC = () => {
  return (
    <main className='container w-3/4 mx-auto flex flex-col min-h-screen'>
      <Start 
        heading={'¿Tienes hijos?'} 
        linkNo={'/start/property'} 
        linkyes={'/start/property'} 
        titleNo={'Esto también incluye tener solo hijos adoptivos'} 
        titleYes={'Selecciona esto si tienes hijos biológicos'} 
      />
    </main>
  );
};

export default ChildrenPage;