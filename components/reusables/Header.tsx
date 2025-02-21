import Image from 'next/image';
import graylogo from '@/assets/greylogo.png';

export default function Header() {
  return (
    <div className="w-full py-5 pl-5">
      <a href="https://testador.mx">
        <Image src={graylogo} width={150} height={150} alt="Testador Logo" />
      </a>
    </div>
  );
}
