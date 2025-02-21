// app/location/page.tsx
import StartLayout from '@/app/start/StartLayout';

export default function LocationPage() {
  return (
    <StartLayout
      heading="¿Vives en Latinoamérica?"
      linkNo="/start/country"
      linkyes="/start/assets"
      titleNo=""
      titleYes=""
      box="Tu situación actual nos ayuda a personalizar tu testamento de acuerdo a tus necesidades específicas. Al comprender mejor tu situación familiar, podemos asegurarnos de que tu testamento cubra todas las necesidades y consideraciones importantes para ti y tus seres queridos."
    />
  );
}
