import Start from "@/components/common/Start";

export default function Home() {
  return (
    <main className='container w-3/4 mx-auto flex flex-col min-h-screen'>
    <Start heading={'¿Tienes hijos?'} linkNo={'/start/property'} linkyes={'/start/property'} titleNo={'Esto también incluye tener solo hijos adoptivos'} titleYes={'Selecciona esto si tienes hijos biológicos'} />
    </main>
  );
}
