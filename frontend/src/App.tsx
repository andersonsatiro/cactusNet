import { Aside } from './components/Aside';
import { Dashboard } from './components/dashboard/Dashboard';
export function App() {
  return (
    <div className="flex w-full h-full min-h-screen">
      <Aside />

      <main className='flex flex-col gap-10 w-full p-10'>
        <Dashboard />
      </main>
    </div>
  )
}
