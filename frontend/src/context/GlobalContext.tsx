import { api } from '@/lib/axios';
import { createContext, useState} from 'react'

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

interface Names {
  [index: string]: string,
}

interface StatusData {
  [index: number]: number,
}

interface CommonPlan {
  plano: string,
  amount: number
}

interface CommonCity {
  city: string,
  amount: number
}

export const GlobalContext = createContext<{
  mainContent: string,
  setMainContent: (value: string) => void,
  makeAllAPICalls: () => void,
  clients: Clients[],
  cities: Names[],
  generalInternetStatus: StatusData[],
  hubs: Names[],
  popClientes: Names[],
  getInternetStatus: (type: string) => Promise<StatusData[] | []>,
  mostCommonPlan: CommonPlan,
  mostCommonCity: CommonCity,
  averageTimeConnected: number,
  totalRevenuePerMonth: number,
}>({
  mainContent: "",
  setMainContent: () => {},
  makeAllAPICalls: () => {},
  clients: [],
  cities: [],
  generalInternetStatus: [],
  hubs: [],
  popClientes: [],
  getInternetStatus: async () => [],
  mostCommonPlan: {plano: "", amount:0},
  mostCommonCity: {city: "", amount:0},
  averageTimeConnected: 0,
  totalRevenuePerMonth: 0,
});

export function GlobalContextProvider({ children }: { children: React.ReactNode }) {

  const [mainContent, setMainContent] = useState<string>("dashboard")
  const [clients, setClients] = useState<Clients[]>([])
  const [cities, setCities] = useState<Names[]>([])
  const [generalInternetStatus, setGeneralInternetStatus] = useState<StatusData[]>([])
  const [hubs, setHubs] = useState<Names[]>([])
  const [popClientes, setPopClientes] = useState<Names[]>([])
  const [mostCommonPlan, setMostCommonPlan] = useState<CommonPlan>({plano: "", amount:0})
  const [mostCommonCity, setMostCommonCity] = useState<CommonCity>({city: "", amount:0})
  const [averageTimeConnected, setAverageTimeConnected] = useState<number>(0)
  const [totalRevenuePerMonth, setTotalRevenuePerMonth] = useState<number>(0)

  const apiCall = async (endpoint:string) => {
    try {
      const response = await api.get(endpoint)
      if(response) return JSON.parse(response.data)
    } catch(error) {
      console.error("Erro ao buscar os dados: ", error)
    }
  }

  const makeAllAPICalls = async () => {
    const [clients, cities, generalInternetStatus, hubs, popClientes, mostCommonPlan,
      mostCommonCity, averageTimeConnected, totalRevenuePerMonth] = await Promise.all([
      apiCall('/findManyCliente'),
      apiCall('/searchAllCities'),
      apiCall('/generalInternetStatus'),
      apiCall('/searchAllHubs'),
      apiCall('/searchAllPopClientes'),
      apiCall('/mostCommonPlan'),
      apiCall('/mostCommonCity'),
      apiCall('/averageTimeConnected'),
      apiCall('/totalRevenuePerMonth'),
    ]);

    setClients(clients)
    setCities(cities)
    setGeneralInternetStatus(generalInternetStatus)
    setHubs(hubs)
    setPopClientes(popClientes)
    setMostCommonPlan(mostCommonPlan)
    setMostCommonCity(mostCommonCity)
    setAverageTimeConnected(averageTimeConnected)
    setTotalRevenuePerMonth(totalRevenuePerMonth)
  }

  const getInternetStatus = async (type: string) => {

    const responses = await Promise.all(
      type === "city"
        ? cities.map(city => apiCall(`/cityInternetStatus/${city}`))
        :
      type === "hub"
        ? hubs.map(hub => apiCall(`/internetStatusByHub/${hub}`))
        :
      type === "general"
        ? [apiCall('/generalInternetStatus')]
        :
      type === "popClientes"
      ? popClientes.map(popCliente => apiCall(`/internetStatusByPopCliente/${popCliente}`))
      : ''
    )

    return !responses ? [] : responses
  }

  getInternetStatus("city")

  return (
    <GlobalContext.Provider value={{
      mainContent,
      setMainContent,
      makeAllAPICalls,
      clients,
      cities,
      generalInternetStatus,
      hubs,
      popClientes,
      getInternetStatus,
      mostCommonPlan,
      mostCommonCity,
      averageTimeConnected,
      totalRevenuePerMonth,
    }}>
      {children}
    </GlobalContext.Provider>
  );
}