'use client';

import React, { Fragment } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import Link from 'next/link';
import Image from 'next/image';
import blacklogo from '../../assets/blacklogo.png';

interface NavigationItem {
  name: string;
  href: string;
  current: boolean;
}

interface AccountItem extends NavigationItem {}

interface AccountData {
  name: string;
  items: AccountItem[];
}

const navigation: NavigationItem[] = [
  { name: 'Tu Progreso', href: '/wills', current: true },
  { name: 'Testamento', href: '/summary', current: false },
  { name: 'Personas', href: '/people', current: false },
];

const accountData: AccountData = {
  name: 'Cuenta',
  items: [
    { name: 'Configuración', href: '/account', current: false },
    { name: 'Mensajes', href: '/messages', current: false },
    { name: 'Compartir', href: '/invite', current: false },
    { name: 'Salir', href: '/', current: false },
  ],
};

const MenuIcon: React.FC<{ width?: number; height?: number }> = ({ width = 40, height = 40 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 448 512"
    width={width}
    height={height}
  >
    <path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" />
  </svg>
);

const CloseIcon: React.FC<{ width?: number; height?: number }> = ({ width = 40, height = 40 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 384 512"
    width={width}
    height={height}
  >
    <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
  </svg>
);

const ChevronDownIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className={className || 'w-4 h-4'}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m19.5 8.25-7.5 7.5-7.5-7.5"
    />
  </svg>
);

const LogoutIcon: React.FC<{ width?: string; height?: string }> = ({ width = "14px", height = "14px" }) => (
  <svg 
    width={width} 
    height={height} 
    viewBox="0 0 15 15" 
    fill="#000000" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path 
      fillRule="evenodd" 
      clipRule="evenodd" 
      d="M1 1L8 1V2L2 2L2 13H8V14H1L1 1ZM10.8536 4.14645L14.1932 7.48614L10.8674 11.0891L10.1326 10.4109L12.358 8L4 8V7L12.2929 7L10.1464 4.85355L10.8536 4.14645Z" 
      fill="#000000"
    />
  </svg>
);

function classNames(...classes: string[]): string {
  return classes.filter(Boolean).join(' ');
}

const Navbar: React.FC = () => {
  return (
    <Disclosure as="nav" className="bg-white border-b">
      {({ open }) => (
        <>
          <div className="container w-3/4 mx-auto">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? <CloseIcon /> : <MenuIcon />}
                </Disclosure.Button>
              </div>
              <div className="flex items-center justify-between sm:items-stretch sm:justify-start">
                <div className="hidden sm:block">
                  <div className="flex items-center space-x-4">
                    <div className="flex font-bold text-lg mx-auto items-center justify-center">
                      <Image src={blacklogo} width={30} height={30} alt="Logo" />
                    </div>
                    {navigation.map((item) => (
                      <Link href={item.href} key={item.name}>
                        <span
                          className={classNames(
                            'bg-white px-3 py-2 font-medium border-b border-transparent hover:border-[#000000]'
                          )}
                          aria-current={item.current ? 'page' : undefined}
                        >
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
                        <div className="px-2 pt-1">
                          <ChevronDownIcon />
                        </div>
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
                            <Link href={subItem.href}>
                              <span
                                className={classNames(
                                  active ? 'bg-gray-100' : '',
                                  'block px-4 py-2 text-gray-700',
                                  subItem.name === 'Salir' ? 'border-t flex items-center justify-between' : ''
                                )}
                              >
                                {subItem.name}
                                {subItem.name === 'Salir' && <LogoutIcon />}
                              </span>
                            </Link>
                          )}
                        </Menu.Item>
                      ))}
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>
          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              <div className="flex font-bold text-lg mx-auto items-center justify-center">
                <Image src={blacklogo} width={30} height={30} alt="Logo" />
              </div>
              <Menu as="div" className="relative">
                <div>
                  <Menu.Button className="relative flex items-center">
                    <span className="rounded-md px-3 py-2 font-medium flex items-center">
                      {accountData.name}
                      <div className="px-2 pt-1">
                        <ChevronDownIcon />
                      </div>
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
                  <Menu.Items className="absolute left-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    {accountData.items.map((subItem) => (
                      <Menu.Item key={subItem.name}>
                        {({ active }) => (
                          <Link href={subItem.href}>
                            <span
                              className={classNames(
                                active ? 'bg-gray-100' : '',
                                'block px-4 py-2 text-gray-700'
                              )}
                            >
                              {subItem.name}
                            </span>
                          </Link>
                        )}
                      </Menu.Item>
                    ))}
                  </Menu.Items>
                </Transition>
              </Menu>
              {navigation.map((item) => (
                <Link href={item.href} key={item.name}>
                  <span
                    className={classNames(
                      item.current
                        ? 'bg-white hover:bg-black'
                        : 'hover:bg-black hover:text-white',
                      'block rounded-md px-3 py-2 text-base font-medium'
                    )}
                    aria-current={item.current ? 'page' : undefined}
                  >
                    {item.name}
                  </span>
                </Link>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default Navbar;