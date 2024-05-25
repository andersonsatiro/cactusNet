import { Aside } from './components/home/Aside'
import { GeneralDataCard } from './components/home/GeneralDataCard'
import { ChartPieSlice, City, Divide } from "@phosphor-icons/react";

export function App() {
  return (
    <div className="flex w-full h-full min-h-screen">
      <Aside />

      <main className='flex flex-col gap-10 w-full p-10'>

        <h1 className='text-3xl font-bold leading-none tracking-tight'>Dashboard</h1>

        <div>
          <h1>jkasjs</h1>
        </div>

        <div className='flex items-center justify-between'>
          <GeneralDataCard
            title='plano mais comum'
            icon={ChartPieSlice}
            text="30%"
            paragraph="dos nossos clientes utilizam o plano Internet Fibra de R$59,99"
          />
          <GeneralDataCard
            title='cidade com mais clientes'
            icon={City}
            text="Sooretama"
            paragraph="possui 300 clientes, que representam 30% do nosso total"
          />
          <GeneralDataCard
            title='média de tempo conectado'
            icon={Divide}
            text="5937seg"
            paragraph="é o período média que clientes ficaram conectados em sua última conexão"
          />
          <GeneralDataCard
            title='média de tempo conectado'
            icon={Divide}
            text="30%"
            paragraph="é o período média que clientes ficaram conectados em sua última conexão"
          />
          <GeneralDataCard
            title='média de tempo conectado'
            icon={Divide}
            text="30%"
            paragraph="é o período média que clientes ficaram conectados em sua última conexão"
          />
        </div>
      </main>

    </div>
  )
}
