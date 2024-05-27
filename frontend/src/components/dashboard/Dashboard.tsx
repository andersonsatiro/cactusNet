import { ChartPieSlice, City, GithubLogo, LinkedinLogo } from "@phosphor-icons/react";
import { GeneralDataCard } from "./components/GeneralDataCard";
import { Divide } from "lucide-react";
import { ChartTabs } from "./components/ChartTabs";



export function Dashboard(){
  return(
    <>
      <header className="flex items-center justify-end w-full h-16 px-10 border-b-[1px] border-b-border">

        <nav className="flex gap-3">
          <a href="https://www.linkedin.com/in/anderson-paiva-97a607235/" target="_blank">
            <div className="bg-blue-600 rounded-full p-2 hover:bg-blue-500">
              <LinkedinLogo weight="fill" className="text-xl text-white" />
            </div>
          </a>

          <a href="https://github.com/andersonsatiro/cactusNet" target="_blank">
            <div className="bg-black rounded-full p-2 hover:bg-slate-800">
              <GithubLogo weight="fill" className="text-xl text-white" />
            </div>
          </a>
        </nav>

      </header>
      
      <div className="flex justify-center w-full mt-20">
        <ChartTabs />
      </div>

      <div className='flex justify-center gap-5 mt-16'>
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