import Start from "@/components/common/Start";

export default function page() {
  return (
    <main className='container w-3/4 mx-auto flex flex-col min-h-screen'>
    <Start heading={'¿Eres propietario/a de tu vivienda?'} linkNo={'/start/location'} linkyes={'/start/location'} titleNo={'No poseo una vivienda propia.'} titleYes={'Incluso si está hipotecada o es propiedad compartida.'} />
    </main>
  );
}
