import { House, Users, CurrencyCircleDollar, Database  } from "@phosphor-icons/react";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { useContext } from "react";
import { GlobalContext } from "@/context/GlobalContext";

export function Aside() {
  const {mainContent, setMainContent} = useContext(GlobalContext)

  const avoidMultipleSelectedButtons = (current: string) => {

  }

  return(
    <aside className='w-[12%] border-r-solid border-r-[1px] border-r-border'>
      <h1 className='flex items-center justify-center w-full h-16 text-lg'>
        cactus<strong>NET</strong>
      </h1>

      <Separator />

      <nav className='flex flex-col p-3 gap-2 mt-5'>
        <Button
          variant={mainContent === "dashboard" ? 'outline' : 'ghost'}
          onClick={() => setMainContent("dashboard")}
          className='flex gap-1'
        >
          <House size={16} />
          Home
        </Button>

        <Button
          variant={mainContent === "clients" ? 'outline' : 'ghost'}
          onClick={() => setMainContent("clients")}
          className='flex gap-1'
        >
          <Users size={16} />
          Clientes
        </Button>

        <Button
          variant={mainContent === "financial" ? 'outline' : 'ghost'}
          onClick={() => setMainContent("financial")}
          className='flex gap-1'
        >
          <CurrencyCircleDollar  size={16} />
          Financeiro
        </Button>

        <Button
          variant={mainContent === "consumption" ? 'outline' : 'ghost'}
          onClick={() => setMainContent("consumption")}
          className='flex gap-1'
        >
          <Database  size={16} />
          Consumo
        </Button>
      </nav>
    </aside>
  )
}