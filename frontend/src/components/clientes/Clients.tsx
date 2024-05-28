import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

import { CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Input } from "../ui/input"
import { useContext, useState } from "react"
import { GlobalContext } from "@/context/GlobalContext"

interface Clients {
  id: string,
  statusCliente: boolean,
  ipConcentrador: string,
  nomeConcentrador: string,
  latitudeCliente: string,
  longitudeCliente: string,
  conexaoInicial: string,
  conexaoFinal: string,
  tempoConectado: number,
  consumoDownload: number,
  consumoUpload: number,
  motivoDesconexao: string,
  popCliente: string,
  nomeCliente: string,
  enderecoCliente: string,
  bairroCliente: string,
  cidadeCliente: string,
  planoContrato: string,
  statusInternet: number,
  valorPlano: number,
}

export function Clients() {

  const {clients} = useContext(GlobalContext)

  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 50
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = clients.slice(indexOfFirstItem, indexOfLastItem)

  return (
    <div className="flex flex-col gap-4 w-full">

      <CardHeader className="pl-[5%]">
        <CardTitle>Clientes da cactus<span className="font-bold">NET</span></CardTitle>
        <CardDescription className="max-w-[40%]">
          a tabela abaixo possibilita a listagem dos clientes da nossa empresa. Além disso, 
          contém filtros que permitem que você encontre exatamente os clientes que busca.
        </CardDescription>
      </CardHeader>

      <form action="" className="pl-[5%] w-[95%]">
        <Input name="name" placeholder="Nome" className="w-fit"/>
      </form>

      <Table className="w-[95%] pl-9 border-2 border-border">

        <TableHeader>
          <TableRow>
            <TableHead className="w-[250px]">Nome</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Plano</TableHead>
            <TableHead>Valor do plano</TableHead>
            <TableHead>Cidade</TableHead>
            <TableHead>Situação da internet</TableHead>
            <TableHead>Tempo conectado</TableHead>
            <TableHead className="text-right">Concentrador</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {currentItems.map((client) => (
            <TableRow key={client.id}>
              <TableCell className="font-medium">{client.nomeCliente}</TableCell>

              <TableCell>
                <span className="relative flex h-3 w-3">
                  <span
                    className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75
                    ${client.statusCliente ? 'bg-green-400' : 'bg-red-400'}`}
                  >
                  </span>

                  <span
                    className={`relative inline-flex rounded-full h-3 w-3
                    ${client.statusCliente ? 'bg-green-400' : 'bg-red-400'}`}
                  >
                  </span>
                </span>
              </TableCell>

              <TableCell>{client.planoContrato}</TableCell>

              <TableCell>{client.valorPlano.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</TableCell>

              <TableCell>{client.cidadeCliente}</TableCell>

              <TableCell>{client.statusInternet}</TableCell>

              <TableCell>{(client.tempoConectado/60).toFixed(2)} minutos</TableCell>

              <TableCell className="text-right">{client.nomeConcentrador}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Pagination className="mt-4 mb-10">
      <PaginationContent>

        <PaginationItem className="hover:cursor-pointer">
          <PaginationPrevious onClick={
            () => {
              if(currentPage > 1){
                setCurrentPage(currentPage-1)
              }
            } 
            }
          />
        </PaginationItem>

        <PaginationItem className={`hover:cursor-pointer ${currentPage === 1 && 'hidden'}`}>
          <PaginationLink>{currentPage - 1}</PaginationLink>
        </PaginationItem>

        <PaginationItem className="hover:cursor-pointer">
          <PaginationLink isActive>
            {currentPage}
          </PaginationLink>
        </PaginationItem>

        <PaginationItem className={`hover:cursor-pointer ${currentPage >= clients.length/itemsPerPage && 'hidden'}`}>
          <PaginationLink>
            {currentPage + 1}
          </PaginationLink>
        </PaginationItem>

        <PaginationItem className="hover:cursor-pointer">
          <PaginationNext onClick={
            () => {
              if(currentPage < clients.length/itemsPerPage){
                setCurrentPage(currentPage+1)
              }
            }}
          />
        </PaginationItem>

      </PaginationContent>
    </Pagination>
    </div>
  )
}


/*
X bairroCliente: "CANAA"
✅ cidadeCliente: "SOORETAMA"
X conexaoFinal: null
X conexaoInicial: "2024-05-07T21:19:57.000Z"
X consumoDownload: "18315384028"
X consumoUpload: "1329340078"
X enderecoCliente: ""
X id: "ee62b9b4-f407-4e81-b997-85f14d83dc53"
X ipConcentrador: "10.10.0.11"
X latitudeCliente: "-191.934.682"
X longitudeCliente: "-400.982.687"
X motivoDesconexao: ""
✅ nomeCliente: "KELLIE ROHAN-MCCLURE SR."
✅ nomeConcentrador: "Concentrador_Core"
✅ planoContrato: "20 MB Internet Fibra"
X popCliente: "SOORETAMA C"
✅ statusCliente: true
✅ statusInternet: 1
✅ tempoConectado: 66493
X valorPlano: 59.9
*/