import { useContext, useEffect } from 'react';
import { Aside } from './components/Aside';
import { GlobalContext } from './context/GlobalContext';
import { ChartBar } from '@phosphor-icons/react';
import { Clients } from './components/clientes/Clients';
import { Dashboard } from './components/dashboard/components/Dashboard';
export function App() {

  const {makeAllAPICalls, mainContent} = useContext(GlobalContext)

  useEffect(() => {
    makeAllAPICalls()
  }, [])
  return (
    <div className="flex w-full h-full min-h-screen">
      <Aside />

      <main className='flex flex-col items-center gap-12 mt-8 w-full'>

        <header className='flex items-end gap-1'>
          <ChartBar size={30} className='text-rose-500'/>
          <h1 className="text-3xl font-bold">{mainContent}</h1>
        </header>

        {
          mainContent === "dashboard"
            ? <Dashboard />
            :
          mainContent === "clientes"
            ? <Clients />
            : ''
        }

      </main>
    </div>
  )
}
