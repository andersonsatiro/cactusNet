import { ChartPieSlice, City } from "@phosphor-icons/react";
import { ChartBox } from "./components/ChartBox";
import { GeneralDataCard } from "./components/GeneralDataCard";
import { Divide } from "lucide-react";

export function Dashboard(){
  return(
    <>
      <h1 className='text-3xl font-bold leading-none tracking-tight'>Dashboard</h1>

      <div>
        <ChartBox />
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
    </>
  )
}