import React from 'react';
import Image from 'next/image';
import logo from '../../assets/greylogo.png';

interface FooterTwoLink {
  href: string;
  text: string;
}

const FooterTwoLinks: FooterTwoLink[] = [
  {
    href: 'https://www.testamento.mx/terminos',
    text: 'Términos'
  },
  {
    href: 'https://www.testamento.mx/privacidad',
    text: 'Privacidad'
  },
  {
    href: 'https://www.testamento.mx/arco',
    text: 'Arco'
  }
];

const FooterTwo: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="bg-background">
      <div className='container w-3/4 mx-auto flex border-t py-4 items-center justify-between'>
        <div className="flex gap-4 items-center">

          <p className='text-[14px] text-[#1F202780] font-[300]'>
            © {currentYear} Testamento.mx
          </p>
        </div>
        {/* <div className="flex items-center gap-4">
          {FooterTwoLinks.map((link) => (
            <a
              key={link.text}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className='text-[14px] text-[#1F202780] border-b border-transparent hover:border-b hover:border-[#1F202780]'
            >
              {link.text}
            </a>
          ))}
        </div> */}
      </div>
    </div>
  );
};

export default FooterTwo;