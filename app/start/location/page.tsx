import { FC } from 'react';
import Start from "@/components/common/Start";

const LocationPage: FC = () => {
  return (
    <main className='container w-3/4 mx-auto flex flex-col min-h-screen'>
      <Start 
        heading={'¿Vives en Latinoamérica?'} 
        linkNo={'/start/country'} 
        linkyes={'/start/assets'} 
        titleNo={''} 
        titleYes={''} 
      />
    </main>
  );
};

export default LocationPage;