import { FC } from 'react';
import OTP from '@/components/common/OtpInput';

const OtpPage: FC = () => {
  return (
    <main className='container w-3/4 mx-auto flex flex-col min-h-screen'>
      <OTP />
    </main>
  );
};

export default OtpPage;