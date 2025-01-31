'use client';

import { FC } from 'react';
import Start from "@/components/common/Start";
import { motion } from 'framer-motion';

const ChildrenPage: FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.2 }}
    >
      <Start
        heading={'¿Tienes hijos?'}
        linkNo={'/start/property'}
        linkyes={'/start/property'}
        titleNo={'Esto también incluye tener solo hijos adoptivos'}
        titleYes={'Selecciona esto si tienes hijos biológicos'}
        box={'Tu situación actual nos ayuda a personalizar tu testamento de acuerdo a tus necesidades específicas. Al comprender mejor tu situación familiar, podemos asegurarnos de que tu testamento cubra todas las necesidades y consideraciones importantes para ti y tus seres queridos.'}
      />
    </motion.div>
  );
};

export default ChildrenPage;