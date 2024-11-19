import { FC, Suspense } from 'react';
import Benefit from '@/components/common/Benefits';

const BenefitsPage: FC = () => {
  return (
    <main className='container w-3/4 mx-auto flex flex-col min-h-screen'>
      <Suspense fallback="Cargando">
        <Benefit />
      </Suspense>
    </main>
  );
};

export default BenefitsPage;