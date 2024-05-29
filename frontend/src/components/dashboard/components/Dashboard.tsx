import { ChartPieSlice, City } from "@phosphor-icons/react";
import { Divide } from "lucide-react";
import { ChartTabs } from "./ChartTabs";
import { GeneralDataCard } from "./GeneralDataCard";
import { useContext } from "react";
import { GlobalContext } from "@/context/GlobalContext";

interface CommonPlan {
  plano: string,
  amount: number
}

interface CommonCity {
  city: string,
  amount: number
}


export function Dashboard(){

  const { mostCommonPlan, clients, mostCommonCity, averageTimeConnected, totalRevenuePerMonth } = useContext(GlobalContext)
  
  const commonPlan:CommonPlan = mostCommonPlan
  const commonCity:CommonCity = mostCommonCity

  return(
    <>
      <div className="flex justify-center w-full">
        <ChartTabs />
      </div>

      <div className='flex justify-center gap-5'>
        <GeneralDataCard
          title='plano mais comum'
          icon={ChartPieSlice}
          text={`${(commonPlan.amount/clients.length * 100).toFixed(2)}%`}
          paragraph={`dos nossos clientes utilizam o plano ${commonPlan.plano}.`}
        />
        <GeneralDataCard
          title='cidade com mais clientes'
          icon={City}
          text={`${commonCity.city}`}
          paragraph={`possui ${commonCity.amount} clientes, que representam ${(commonCity.amount / clients.length * 100).toFixed(2)}% do nosso total.`}
        />
        <GeneralDataCard
          title='média de tempo conectado'
          icon={Divide}
          text={`${averageTimeConnected}min`}
          paragraph="é o período média que clientes ficaram conectados em sua última conexão."
        />
        <GeneralDataCard
          title='receita total deste mês'
          icon={Divide}
          text={`${new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalRevenuePerMonth)}`}
          paragraph="é o valor que a cactusNET faturou com as mensalidades deste mês."
        />
      </div>
    </>
  )
}