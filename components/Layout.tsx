import clsx from 'clsx'
import Head from 'next/head'
import type { ReactNode } from 'react'
import type { PageMetadata } from 'utils/layout'
import { DefaultAppSeo } from './DefaultAppSeo'
// import { Issuebar } from './Issuebar'
import { Sidebar } from './Sidebar'

export interface LayoutProps {
  metadata?: PageMetadata
  children: ReactNode
}

export const Layout = ({ children, metadata = {} }: LayoutProps) => {
  return (
    <div className="overflow-hidden relative">
      <Head>
        <meta content="minimum-scale=1, initial-scale=1, width=device-width" name="viewport" />
      </Head>

      <DefaultAppSeo />

      {/* plumbus confetti */}
      {/* <div className="fixed inset-0 -z-10 pointer-events-none stargaze-gradient-bg opacity-50">
        <img alt="plumbus carina-nebula" className="fixed top-0 right-0 w-full h-[calc(100vh+180px)]" src="/carina-nebula.png" />
      </div> */}

      {/* actual layout container */}
      <div className="bg-black sm:flex">
        <Sidebar />
        <div className="overflow-auto relative flex-grow h-screen no-scrollbar">
          <main
            className={clsx('mx-auto max-w-7xl', {
              'flex flex-col justify-center items-center':
                typeof metadata.center === 'boolean' ? metadata.center : true,
            })}
          >
            {children}
          </main>
        </div>
        {/* <Issuebar /> */}
      </div>

      <div className="flex flex-col justify-center items-center p-8 space-y-4 h-screen text-center bg-black/50"></div>
    </div>
  )
}
