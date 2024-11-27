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
      />
    </main>
  );
};

export default CountryPage;