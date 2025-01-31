'use client';

import React, { Fragment } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import Link from 'next/link';
import Image from 'next/image';
import blacklogo from '../../assets/blacklogo.png';
import { signOut } from 'aws-amplify/auth';
import { Amplify } from 'aws-amplify';
import awsConfig from "@/aws-exports";
import { useRouter } from 'next/navigation'; // ✅ Use useRouter from next/navigation

Amplify.configure(awsConfig);

const Navbar: React.FC = () => {
  const router = useRouter(); // ✅ Use the router hook inside the component

  const handleLogout = async () => {
    try {
      await signOut();
      router.push("/start/login"); // ✅ Navigate correctly
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  interface NavigationItem {
    name: string;
    href: string;
    current: boolean;
  }

  interface AccountItem extends NavigationItem {
    onClick?: () => void;
  }

  interface AccountData {
    name: string;
    items: AccountItem[];
  }

  const navigation: NavigationItem[] = [
    { name: 'Testamento', href: '/summary', current: false },
    { name: 'Personas', href: '/people', current: false },
  ];

  const accountData: AccountData = {
    name: 'Cuenta',
    items: [
      { name: 'Configuración', href: '/account', current: false },
      { name: 'Mensajes', href: '/messages', current: false },
      { name: 'Compartir', href: '/invite', current: false },
      {
        name: 'Salir', onClick: handleLogout, current: false,
        href: ''
      },
    ],
  };

  return (
    <Disclosure as="nav" className="bg-white border-b">
      {({ open }) => (
        <>
          <div className="container w-3/4 mx-auto">
            <div className="relative flex h-16 items-center justify-between">
              <div className="flex items-center justify-between sm:items-stretch sm:justify-start">
                <div className="hidden sm:block">
                  <div className="flex items-center space-x-4">
                    <div className="flex font-bold text-lg mx-auto items-center justify-center">
                      <Image src={blacklogo} width={30} height={30} alt="Logo" />
                    </div>
                    {navigation.map((item) => (
                      <Link href={item.href} key={item.name}>
                        <span className="bg-white px-3 py-2 font-medium border-b border-transparent hover:border-[#000000]">
                          {item.name}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-end gap-2">
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="relative flex items-center">
                      <span className="bg-white rounded-md px-3 py-2 font-medium flex items-center">
                        {accountData.name}
                      </span>
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      {accountData.items.map((subItem) => (
                        <Menu.Item key={subItem.name}>
                          {({ active }) => (
                            <span
                              onClick={subItem.name === 'Salir' ? subItem.onClick : undefined}
                              className={`block px-4 py-2 text-gray-700 cursor-pointer ${active ? 'bg-gray-100' : ''}`}
                            >
                              {subItem.name}
                            </span>
                          )}
                        </Menu.Item>
                      ))}
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>
        </>
      )}
    </Disclosure>
  );
};

export default Navbar;
