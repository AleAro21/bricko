'use client';
import { FC } from 'react';
import Start from "@/components/common/Start";
import { motion } from 'framer-motion';

const PropertyPage: FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.2 }}
    >
      <Start
        heading={'¿Eres propietario/a de tu vivienda?'}
        linkNo={'/start/location'}
        linkyes={'/start/location'}
        titleNo={'No poseo una vivienda propia.'}
        titleYes={'Incluso si está hipotecada o es propiedad compartida.'}
        box={'Tu situación actual nos ayuda a personalizar tu testamento de acuerdo a tus necesidades específicas. Al comprender mejor tu situación familiar, podemos asegurarnos de que tu testamento cubra todas las necesidades y consideraciones importantes para ti y tus seres queridos.'}
      />
    </motion.div>
  );
};

export default PropertyPage;