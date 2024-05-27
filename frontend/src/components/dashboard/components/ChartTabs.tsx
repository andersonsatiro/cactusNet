import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { useContext, useState } from "react"
import { GlobalContext } from "@/context/GlobalContext"
import { StackedBarChart } from "./StackedBarChart"

interface CityInternetStatus {
  name: string,
  desconhecido: number;
  ativo: number;
  desativado: number;
  'bloqueio manual': number;
  'bloqueio automático': number;
  'financeiro em atraso': number;
  'aguardando assinatura': number;
}
 
export function ChartTabs() {

  const { getInternetStatusOfCities, generalInternetStatus } = useContext(GlobalContext)
  const [citiesData, setCitiesData] = useState<CityInternetStatus[] | undefined>(undefined)

  const returnDataForGeneralStatus = (): CityInternetStatus[] => {
    let generalStatus: CityInternetStatus | undefined = undefined;

    if (generalInternetStatus.length === 7) {
      generalStatus = {
        name: "todas as cidades",
        desconhecido: Number(generalInternetStatus[0]),
        ativo: Number(generalInternetStatus[1]),
        desativado: Number(generalInternetStatus[2]),
        "bloqueio manual": Number(generalInternetStatus[3]),
        "bloqueio automático": Number(generalInternetStatus[4]),
        "financeiro em atraso": Number(generalInternetStatus[5]),
        "aguardando assinatura": Number(generalInternetStatus[6]),
      };
    }

    return generalStatus ? [generalStatus] : [];
  }

  return (
    <Tabs defaultValue="geral" className="w-[70%]">
      <TabsList className="grid w-full grid-cols-4">
        
        <TabsTrigger value="geral">Geral</TabsTrigger>

        <TabsTrigger
          onClick={() => getInternetStatusOfCities().then(response =>
            response && setCitiesData(response))}
          value="cidade">
            Cidade
        </TabsTrigger>

        <TabsTrigger value="popCliente">Pop Cliente</TabsTrigger>
        <TabsTrigger value="concentrador">Concentrador</TabsTrigger>
      </TabsList>

      <TabsContent value="geral">
        <Card>
          <CardHeader>
            <CardTitle>status geral da internet</CardTitle>
            <CardDescription>
              o gráfico abaixo permite que tenhamos uma visão geral de com o status da intenet dos nossos clientes se encontra
            </CardDescription>
          </CardHeader>
          <CardContent className="w-full h-80 space-y-2">
            <StackedBarChart data={returnDataForGeneralStatus()} />
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

      <TabsContent value="popCliente">
        <Card>
          <CardHeader>
            <CardTitle>Password</CardTitle>
            <CardDescription>
              Change your password here. After saving, you'll be logged out.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="current">Current password</Label>
              <Input id="current" type="password" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="new">New password</Label>
              <Input id="new" type="password" />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save password</Button>
          </CardFooter>
        </Card>
      </TabsContent>

      <TabsContent value="concentrador">
        <Card>
          <CardHeader>
            <CardTitle>Password</CardTitle>
            <CardDescription>
              Change your password here. After saving, you'll be logged out.
            </CardDescription>
          </CardHeader>

          <CardContent className="w-full h-80 space-y-2">
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}