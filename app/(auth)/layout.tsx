import Image from 'next/image'
import React, { ReactNode } from 'react'

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex min-h-screen  ">
      <section className="bg-brand p-10 hidden w-1/2  justify-center lg:flex xl:w-2/5">
        <div className='flex max-h-[800px] text-white max-w-[430px] flex-col gap-2 space-y-12 justify-center'>
            <Image 
          src="/assets/icons/logo-full.svg"
          alt="logo"
          width={224}
          height={82}
          className="h-auto"
        />
        <div>
          <h1 className="h1"> Manage your files The best way</h1>
          <p className="body-1">Store it is the play where you can store you all doc</p>
        </div>
        <Image
          src="/assets/images/files.png"
          alt="logo"
          width={224}
          height={82}
          className="transition-all hover:rotate-2 hover:scale-105"
        />
        </div>
      </section>
      {children}
    </div>
  )
}

export default layout
