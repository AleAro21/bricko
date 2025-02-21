// app/page.tsx (or wherever appropriate)
import StartLayout from '@/app/start/StartLayout';


export default function ChildrenPage() {
  return (
    <StartLayout
      heading="¿Tienes hijos?"
      linkNo="/start/property"
      linkyes="/start/property"
      titleNo="Sin hijos"
      titleYes="Biológicos y Adoptivos"
      box="Tu situación actual nos ayuda a personalizar tu testamento de acuerdo a tus necesidades específicas. Al comprender mejor tu situación familiar, podemos asegurarnos de que tu testamento cubra todas las necesidades y consideraciones importantes para ti y tus seres queridos."
    />
  );
}
