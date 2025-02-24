// app/country/page.tsx
import StartLayout from '@/app/start/StartLayout';

export default function CountryPage() {
  return (
    <StartLayout
      heading="¿Vives en México?"
      linkNo="/start/waiting-list"
      linkyes="/start/benefits?recommendation=telephonic"
      titleNo=""
      titleYes=""
      box="Tu situación actual nos ayuda a personalizar tu testamento de acuerdo a tus necesidades específicas. Al comprender mejor tu situación familiar, podemos asegurarnos de que tu testamento cubra todas las necesidades y consideraciones importantes para ti y tus seres queridos."
    />
  );
}
