'use client';

import React, { Fragment } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import Link from 'next/link';
import Image from 'next/image';
import blacklogo from '../../assets/blacklogo.png';
import CustomerSupport from '../../assets/CustomerSupport.png';
import mapfreLogo from '@/assets/mapfre.png';
import { signOut } from 'aws-amplify/auth';
import { Amplify } from 'aws-amplify';
import awsConfig from "@/aws-exports";
import { useRouter } from 'next/navigation';
import { useUser } from "@/context/UserContext";
import { motion, AnimatePresence } from 'framer-motion';
import {
  Gear,
  Envelope,
  Share,
  Clock,
  SignOut,
  List,
  X
} from "phosphor-react";
import logo from '@/public/Bricko.png';

Amplify.configure(awsConfig);

const Navbar: React.FC = () => {
  const router = useRouter();
  const { user } = useUser();

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

  interface AccountItem {
    name: string;
    href: string;
    icon: React.ReactNode;
    onClick?: () => void;
  }

  const navigation: NavigationItem[] = [
    { name: 'Dashboard', href: '/dashboard', current: false },
    { name: 'Mi perfil', href: '/profile', current: false },
  ];

  const accountItems: AccountItem[] = [
    { 
      name: 'Configuración', 
      href: '/account', 
      icon: <Gear className="w-5 h-5" weight="regular" />
    },
    { 
      name: 'Mensajes', 
      href: '/messages', 
      icon: <Envelope className="w-5 h-5" weight="regular" />
    },
    { 
      name: 'Compartir', 
      href: '/invite', 
      icon: <Share className="w-5 h-5" weight="regular" />
    },
    { 
      name: 'Versiones anteriores', 
      href: '', 
      icon: <Clock className="w-5 h-5" weight="regular" />
    },
    { 
      name: 'Salir', 
      href: '', 
      icon: <SignOut className="w-5 h-5" weight="regular" />,
      onClick: handleLogout 
    },
  ];

  return (
    <Disclosure as="nav" className="bg-white border-b border-gray-100">
      {({ open }) => (
        <>
          <div className="max-w-6xl mx-auto px-4 sm:px-5">
            <div className="relative flex h-16 items-center justify-between">
              {/* Logo */}
              <div className="flex items-center">
                <Link href="/" className="flex items-center">
                  <Image
                    src={logo}
                    width={150}
                    height={150}
                    alt="Logo"
                    className="h-8 w-auto"
                  />
                </Link>
                
                {/* Desktop Navigation - only visible on desktop */}
                <div className="hidden sm:ml-8 sm:block">
                  <div className="flex items-center space-x-8">
                    {navigation.map((item) => (
                      <Link
                        href={item.href}
                        key={item.name}
                        className="text-[14px] font-[400] text-[#1d1d1f] hover:text-[#f95940] transition-colors duration-200"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right side - Mobile menu button + Profile */}
              <div className="flex items-center">
                {/* Mobile menu button */}
                <div className="sm:hidden">
                  <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500">
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <X className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <List className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>

                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  {({ open: menuOpen }) => (
                    <>
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                      >
                        <Menu.Button className="relative flex rounded-full bg-white text-sm focus:outline-none">
                          <Image
                            src={CustomerSupport}
                            alt="Profile"
                            width={32}
                            height={32}
                            className="rounded-full object-cover"
                          />
                        </Menu.Button>
                      </motion.div>
                      <AnimatePresence>
                        {menuOpen && (
                          <>
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              className="fixed inset-0 bg-black/20 z-10"
                              aria-hidden="true"
                            />
                            <Menu.Items
                              as={motion.div}
                              static
                              initial={{ opacity: 0, y: -20 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -20 }}
                              transition={{ duration: 0.2 }}
                              className="absolute right-0 z-20 mt-2 w-72 origin-top-right rounded-xl bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                            >
                              {/* User Profile Section */}
                              <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="px-4 py-3 border-b border-gray-100"
                              >
                                <div className="flex flex-col items-center text-center">
                                  <p className="text-sm text-gray-500 mb-3">
                                    {user?.email || 'usuario@example.com'}
                                  </p>
                                  <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ duration: 0.3, ease: "easeOut" }}
                                    className="mb-2"
                                  >
                                    <Image
                                      src={CustomerSupport}
                                      alt="Profile"
                                      width={64}
                                      height={64}
                                      className="rounded-full object-cover"
                                    />
                                  </motion.div>
                                  <p className="text-lg font-medium text-gray-900">
                                    ¡Hola, {user?.name || 'Usuario'}!
                                  </p>
                                </div>
                                <div className="mt-3 pt-3 border-t border-gray-100">
                                  <div className="flex items-center gap-2">
                                    <Image
                                      src={mapfreLogo}
                                      width={100}
                                      height={24}
                                      alt="MAPFRE Logo"
                                      className="h-6 w-auto"
                                    />
                                    <span className="text-sm text-gray-600">Seguro MAPFRE</span>
                                  </div>
                                </div>
                              </motion.div>

                              {/* Menu Items */}
                              <div className="py-1">
                                {accountItems.map((item, index) => (
                                  <Menu.Item key={item.name}>
                                    {({ active }) => {
                                      return (
                                        <motion.div
                                          initial={{ opacity: 0, x: -10 }}
                                          animate={{ opacity: 1, x: 0 }}
                                          transition={{ delay: 0.1 + (index * 0.05) }}
                                          whileHover={{ scale: 1.02, x: 5 }}
                                        >
                                          {item.onClick ? (
                                            <div
                                              onClick={item.onClick}
                                              className={`
                                                flex items-center gap-3 px-4 py-2 text-[14px] font-[400] cursor-pointer
                                                ${active
                                                  ? 'bg-gradient-to-r from-blue-50 to-blue-100 text-[#f95940]'
                                                  : 'text-[#1d1d1f]'
                                                }
                                              `}
                                            >
                                              {item.icon}
                                              {item.name}
                                            </div>
                                          ) : (
                                            <Link
                                              href={item.href}
                                              className={`
                                                flex items-center gap-3 px-4 py-2 text-[14px] font-[400] cursor-pointer
                                                ${active
                                                  ? 'bg-gradient-to-r from-blue-50 to-blue-100 text-[#f95940]'
                                                  : 'text-[#1d1d1f]'
                                                }
                                              `}
                                            >
                                              {item.icon}
                                              {item.name}
                                            </Link>
                                          )}
                                        </motion.div>
                                      );
                                    }}
                                  </Menu.Item>
                                ))}
                              </div>
                            </Menu.Items>
                          </>
                        )}
                      </AnimatePresence>
                    </>
                  )}
                </Menu>
              </div>
            </div>
          </div>

          {/* Mobile menu panel - shows navigation items on mobile */}
          <Disclosure.Panel className="sm:hidden">
            {({ close }) => (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="bg-white border-t border-gray-100"
              >
                <div className="space-y-1 px-2 pb-3 pt-2">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => close()}
                      className="block rounded-md px-3 py-2 text-base font-medium text-[#1d1d1f] hover:bg-gray-50 hover:text-[#f95940] transition-colors duration-200"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </motion.div>
            )}
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default Navbar;