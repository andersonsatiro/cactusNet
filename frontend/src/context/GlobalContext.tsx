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
});

export function GlobalContextProvider({ children }: { children: React.ReactNode }) {

  const [mainContent, setMainContent] = useState<string>("dashboard")
  const [clients, setClients] = useState<Clients[]>([])
  const [cities, setCities] = useState<Names[]>([])
  const [generalInternetStatus, setGeneralInternetStatus] = useState<StatusData[]>([])
  const [hubs, setHubs] = useState<Names[]>([])
  const [popClientes, setPopClientes] = useState<Names[]>([])

  const apiCall = async (endpoint:string) => {
    try {
      const response = await api.get(endpoint)
      if(response) return JSON.parse(response.data)
    } catch(error) {
      console.error("Erro ao buscar os dados: ", error)
    }
  }

  const makeAllAPICalls = async () => {
    const [clients, cities, generalInternetStatus, hubs, popClientes] = await Promise.all([
      apiCall('/findManyCliente'),
      apiCall('/searchAllCities'),
      apiCall('/generalInternetStatus'),
      apiCall('/searchAllHubs'),
      apiCall('/searchAllPopClientes'),
    ]);

    setClients(clients)
    setCities(cities)
    setGeneralInternetStatus(generalInternetStatus)
    setHubs(hubs)
    setPopClientes(popClientes)
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
    }}>
      {children}
    </GlobalContext.Provider>
  );
}