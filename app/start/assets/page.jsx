import Start from "@/components/common/Start";

export default function page() {
  return (
    <main className='container w-3/4 mx-auto flex flex-col min-h-screen'>
    <Start heading={'¿Todo tu patrimonio está ubicado en México?'} linkNo={'/start/benefits?recommendation=telephonic'} linkyes={'/start/benefits?recommendation=online'} titleNo={'Esto incluye cuentas bancarias, propiedades, acciones y participaciones fuera de México.'} titleYes={'Todo mi patrimonio se encuentra en México.'} />
    </main>
  );
}
