import Benefit from '@/components/common/Benefits'
import React, { Suspense } from 'react'

const page = () => {
  return (
    <main className='container w-3/4 mx-auto flex flex-col min-h-screen'>
      <Suspense fallback={"Cargando"}>
    <Benefit />
      </Suspense>
    </main>
  )
}

export default page