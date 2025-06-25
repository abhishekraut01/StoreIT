import React, { ReactNode } from 'react'

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex min-h-screen">
      <section>
        
      </section>
      {children}
    </div>
  )
}

export default layout
