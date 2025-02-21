// app/property/page.tsx
import StartLayout from '@/app/start/StartLayout';

export default function PropertyPage() {
  return (
    <StartLayout
      heading="¿Eres propietario/a de tu vivienda?"
      linkNo="/start/location"
      linkyes="/start/location"
      titleNo="No poseo una vivienda propia."
      titleYes="Incluso si está hipotecada o es propiedad compartida."
      box="Tu situación actual nos ayuda a personalizar tu testamento de acuerdo a tus necesidades específicas. Al comprender mejor tu situación familiar, podemos asegurarnos de que tu testamento cubra todas las necesidades y consideraciones importantes para ti y tus seres queridos."
    />
  );
}
