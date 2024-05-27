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

  const { getInternetStatusOfCities } = useContext(GlobalContext)
  const [citiesData, setCitiesData] = useState<CityInternetStatus[] | undefined>([])


  return (
    <Tabs defaultValue="geral" className="w-[85%]">
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
            <CardTitle>Account</CardTitle>
            <CardDescription>
              Make changes to your account here. Click save when you're done.
            </CardDescription>
          </CardHeader>
          <CardContent className="w-full h-80 space-y-2">
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="cidade">
        <Card>
          <CardHeader>
            <CardTitle>status de internet das cidades</CardTitle>
            <CardDescription>
              com o gráfico abaixo podemos detalhar a situação do
              status de internet para todas as cidades que possuímos clientes.
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