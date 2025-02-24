// app/start/otp/page.tsx (Server Component)
import MotionWrapper from '@/components/reusables/MotionWapper';
import OTPInput from '@/components/common/OtpInput';

export default function OtpPage() {
  return (
    <MotionWrapper>
      <OTPInput />
    </MotionWrapper>
  );
}
