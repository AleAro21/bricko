'use client';

import React, { Fragment } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import Link from 'next/link';
import Image from 'next/image';
import blacklogo from '../../assets/blacklogo.png';
import CustomerSupport from '../../assets/CustomerSupport.png';
import { signOut } from 'aws-amplify/auth';
import { Amplify } from 'aws-amplify';
import awsConfig from "@/aws-exports";
import { useRouter } from 'next/navigation';

Amplify.configure(awsConfig);

const Navbar: React.FC = () => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut();
      sessionStorage.clear();
      localStorage.clear();
      router.push("/start/login");
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
    items: AccountItem[];
  }

  const navigation: NavigationItem[] = [
    { name: 'Testamento', href: '/summary', current: false },
    { name: 'Personas', href: '/people', current: false },
  ];

  const accountData: AccountData = {
    items: [
      { name: 'Configuración', href: '/account', current: false },
      { name: 'Mensajes', href: '/messages', current: false },
      { name: 'Compartir', href: '/invite', current: false },
      { name: 'Versiones anteriores', href: '', current: false },
      {
        name: 'Salir', onClick: handleLogout, current: false,
        href: ''
      },
    ],
  };

  return (
    <Disclosure as="nav" className="bg-white border-b border-gray-100">
      {({ open }) => (
        <>
          <div className="max-w-6xl mx-auto px-4 sm:px-5">
            <div className="relative flex h-16 items-center justify-between">
              <div className="flex items-center justify-between sm:items-stretch sm:justify-start">
                <div className="hidden sm:block">
                  <div className="flex items-center space-x-8">
                    <Link href="/" className="flex items-center">
                      <Image
                        src={blacklogo}
                        width={150}
                        height={150}
                        alt="Logo"
                        className="h-8 w-auto"
                      />
                    </Link>
                    {navigation.map((item) => (
                      <Link
                        href={item.href}
                        key={item.name}
                        className="text-[14px] font-[400] text-[#1d1d1f] hover:text-[#047aff] transition-colors duration-200"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-end gap-2">
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="relative flex rounded-full bg-white text-sm focus:outline-none">
                      <Image
                        src={CustomerSupport}
                        alt="Profile"
                        width={32}
                        height={32}
                        className="rounded-full object-cover"
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-150"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-xl bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      {accountData.items.map((subItem) => (
                        <Menu.Item key={subItem.name}>
                          {({ active }) => (
                            subItem.onClick ? (
                              <div
                                onClick={subItem.onClick}
                                className={`
                                  block px-4 py-2 text-[14px] font-[400] cursor-pointer
                                  ${active
                                    ? 'bg-gradient-to-r from-blue-50 to-blue-100 text-[#047aff]'
                                    : 'text-[#1d1d1f]'
                                  }
                                `}
                              >
                                {subItem.name}
                              </div>
                            ) : (
                              <Link
                                href={subItem.href}
                                className={`
                                  block px-4 py-2 text-[14px] font-[400] cursor-pointer
                                  ${active
                                    ? 'bg-gradient-to-r from-blue-50 to-blue-100 text-[#047aff]'
                                    : 'text-[#1d1d1f]'
                                  }
                                `}
                              >
                                {subItem.name}
                              </Link>
                            )
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