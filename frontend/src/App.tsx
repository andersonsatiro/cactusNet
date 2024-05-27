import { useContext, useEffect } from 'react';
import { Aside } from './components/Aside';
import { Dashboard } from './components/dashboard/Dashboard';
import { GlobalContext } from './context/GlobalContext';
export function App() {

  const {makeAllAPICalls} = useContext(GlobalContext)

  useEffect(() => {
    makeAllAPICalls()
  }, [])
  return (
    <div className="flex w-full h-full min-h-screen">
      <Aside />

      <main className='flex flex-col w-full'>
        <Dashboard />
      </main>
    </div>
  )
}
