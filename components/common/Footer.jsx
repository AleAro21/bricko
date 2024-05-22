import React from 'react'
import logo from '../../assets/greylogo.png'
import Image from 'next/image'

const Footer = () => {
  return (
    <div className="bg-background">
    <div className='container w-3/4 mx-auto flex border-t py-8 items-center justify-between ' >
        <div className="flex gap-4 items-center">
            <Image src={logo} alt="" width={100} height={50} className='max-w-[100px] max-h-[50px] my-auto' />
            <p className='text-[14px] text-[#9999]'>© 2024 Testador.mx</p>
        </div>
        <div className="flex items-center gap-4">
            <a href="https://testador.mx/terminos-y-condiciones/" target="_blank" rel="noopener noreferrer" className='text-[14px] text-[#9999] border-b border-transparent hover:border-b hover:border-[#9999]'>Términos</a>
            <a href="https://testador.mx/privacidad/" target="_blank" rel="noopener noreferrer" className='text-[14px] text-[#9999] border-b border-transparent hover:border-b hover:border-[#9999]'>Privacidad</a>
            <a href="https://testador.mx/derechos-arco/" target="_blank" rel="noopener noreferrer" className='text-[14px] text-[#9999] border-b border-transparent hover:border-b hover:border-[#9999]'>Arco</a>
        </div>
    </div>
    </div>
  )
}

export default Footer