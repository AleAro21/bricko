import React from 'react';
import Image from 'next/image';
import logo from '@/public/Bricko.png'; // Changed from .svg to .png

interface FooterLink {
  href: string;
  text: string;
}

const footerLinks: FooterLink[] = [
  {
    href: 'https://testador.mx/terminos-y-condiciones/',
    text: 'Términos'
  },
  {
    href: 'https://testador.mx/privacidad/',
    text: 'Privacidad'
  },
  {
    href: 'https://testador.mx/derechos-arco/',
    text: 'Arco'
  }
];

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="bg-background">
      <div className='container w-3/4 mx-auto flex border-t py-8 items-center justify-between'>
        <div className="flex gap-4 items-center">
          <Image 
            src={logo} 
            alt="Testador Logo" 
            width={150} 
            height={100} 
            className='max-w-[100px] max-h-[50px] my-auto' 
          />
          <p className='text-[14px] text-[#1F202780] font-[300]'>
            © {currentYear} Bricko
          </p>
        </div>
        <div className="flex items-center gap-4">
          {footerLinks.map((link) => (
            <a
              key={link.text}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className='text-[14px] font-[300] text-[#1F202780] border-b border-transparent hover:border-b hover:border-[#1F202780]'
            >
              {link.text}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Footer;