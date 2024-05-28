import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { useContext, useEffect, useState } from "react"
import { GlobalContext } from "@/context/GlobalContext"
import { StackedBarChart } from "./StackedBarChart"

interface InternetStatus {
  name: string,
  desconhecido: number;
  ativo: number;
  desativado: number;
  'bloqueio manual': number;
  'bloqueio automático': number;
  'financeiro em atraso': number;
  'aguardando assinatura': number;
}

interface StatusData {
  [index: number]: number,
}

interface Names {
  [index: string]: string
}
 
export function ChartTabs() {

  const {getInternetStatus, cities, hubs, popClientes } = useContext(GlobalContext)
  const [citiesData, setCitiesData] = useState<InternetStatus[] | []>([])
  const [hubsData, setHubsData] = useState<InternetStatus[] | []>([])
  const [generalData, setGeneralData] = useState<InternetStatus[] | []>([])
  const [popClientesData, setPopClientesData] = useState<InternetStatus[] | []>([])

  const organizeObjectToSendToChart = (dataArray: StatusData[] | [], nameArray: Names[] | string[], type:string) => {
    let data: any = []

    data = nameArray.map((nameArrayItem, index) => {
      if(dataArray !== undefined){
        return {
          name: nameArrayItem,
          desconhecido: dataArray[index][0],
          ativo: dataArray[index][1],
          desativado: dataArray[index][2],
          'bloqueio manual': dataArray[index][3],
          'bloqueio automático': dataArray[index][4],
          'financeiro em atraso': dataArray[index][5],
          'aguardando assinatura': dataArray[index][6],
        }
      } else {
        return []
      }
    })

    type === "city" ? setCitiesData(data)  :
    type === "hub" ? setHubsData(data) :
    type === "general" ? setGeneralData(data) :
    type === "popClientes" ? setPopClientesData(data)
    : ''
  }

  const findDataForInternetStatus = (type: string) => {
    const nameArray = type === "city" ? cities
    : type === "hub" ? hubs
    : type === "general" ? ['todas as cidades']
    : type ==="popClientes" ? popClientes
    : []


    getInternetStatus(type).then((dataArray) => {
      organizeObjectToSendToChart(dataArray, nameArray, type)
    })
  }

  useEffect(() => {
    findDataForInternetStatus("general")
  }, [])

  return (
    <Tabs defaultValue="geral" className="w-[85%]">

      <TabsList className="grid w-full grid-cols-4">

        <TabsTrigger value="geral">Geral</TabsTrigger>

        <TabsTrigger
          value="cidade"
          onClick={() => findDataForInternetStatus("city")}
        >
          Cidade
        </TabsTrigger>

        <TabsTrigger
          value="concentrador"
          onClick={() => findDataForInternetStatus("hub")}
        >
            Concentrador
        </TabsTrigger>

        <TabsTrigger
          value="popCliente"
          onClick={() => findDataForInternetStatus("popClientes")}
        >
          Pop Cliente
        </TabsTrigger>
      </TabsList>

      <TabsContent value="geral">
        <Card>
          <CardHeader>
            <CardTitle>status geral da internet</CardTitle>
            <CardDescription>
              o gráfico abaixo permite que tenhamos uma visão geral de como o status da internet dos nossos clientes se encontra.
            </CardDescription>
          </CardHeader>
          <CardContent className="w-full h-80 space-y-2">
            <StackedBarChart data={generalData} />
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="cidade">
        <Card>
          <CardHeader>
            <CardTitle>status da internet das cidades</CardTitle>
            <CardDescription>
              com o gráfico abaixo podemos detalhar a situação do
              status da internet para todas as cidades que possuímos clientes.
            </CardDescription>
          </CardHeader>

          <CardContent className="w-full h-80 space-y-2">
            <StackedBarChart data={citiesData} />
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="concentrador">
        <Card>
          <CardHeader>
            <CardTitle>status da internet dos concentradores</CardTitle>
            <CardDescription>
              com o gráfico abaixo podemos detalhar a situação do
              status da internet dos clientes de cada concentrador.
            </CardDescription>
          </CardHeader>

          <CardContent className="w-full h-80 space-y-2">
            <StackedBarChart data={hubsData} />
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="popCliente">
        <Card>
          <CardHeader>
            <CardTitle>status da internet dos pop clientes</CardTitle>
            <CardDescription>
              com o gráfico abaixo podemos detalhar a situação do
              status da internet dos clientes de cada pop cliente.
            </CardDescription>
          </CardHeader>

          <CardContent className="w-full h-80 space-y-2">
            <StackedBarChart data={popClientesData} />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}