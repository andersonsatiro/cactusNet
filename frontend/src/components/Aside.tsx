import { House, Users, CurrencyCircleDollar, Database  } from "@phosphor-icons/react";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";

export function Aside() {
  return(
    <aside className='w-[12%] border-r-solid border-r-[1px] border-r-border'>
      <h1 className='w-full text-center py-3 text-lg'>
        cactus<strong>NET</strong>
      </h1>

      <Separator />

      <nav className='flex flex-col p-3 gap-2 mt-5'>
        <Button variant={'outline'} className='flex gap-1'>
          <House size={16} />
          Home
        </Button>

        <Button variant={'ghost'} className='flex gap-1'>
          <Users size={16} />
          Clientes
        </Button>

        <Button variant={'ghost'} className='flex gap-1'>
          <CurrencyCircleDollar  size={16} />
          Financeiro
        </Button>

        <Button variant={'ghost'} className='flex gap-1'>
          <Database  size={16} />
          Consumo
        </Button>
      </nav>
    </aside>
  )
}