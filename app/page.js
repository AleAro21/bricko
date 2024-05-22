import Start from "@/components/common/Start";

export default function Home() {
  return (
    <main className='container w-3/4 mx-auto flex flex-col min-h-screen'>
    <Start heading={'¿Estás en una relación de pareja?'} linkNo={'/start/childern'} linkyes={'/start/childern'} titleNo={'Ya sea que estés soltero, separado, divorciado o viudo.'} titleYes={'Incluye compromiso, en unión libre o viviendo con tu pareja.'} />
    </main>
  );
}
