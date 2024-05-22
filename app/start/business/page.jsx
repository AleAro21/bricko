import Start from "@/components/common/Start";

export default function page() {
  return (
    <main className='container w-3/4 mx-auto flex flex-col min-h-screen'>
    <Start heading={'¿Tienes un negocio en México?'} linkNo={'/start/benefits?recommendation=online'} linkyes={'/start/benefits?recommendation=telephonic'} titleNo={'No tengo un negocio.'} titleYes={'Incluye ser empresario individual, o formar parte de cualquier tipo de sociedad.'} />
    </main>
  );
}
