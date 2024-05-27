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

interface Cities {
  [index: string]: string,
}

interface GeneralStatus {
  [index: number]: number,
}

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


export const GlobalContext = createContext<{
  mainContent: string,
  setMainContent: (value: string) => void,
  makeAllAPICalls: () => void,
  clients: Clients[],
  cities: Cities[],
  generalInternetStatus: GeneralStatus[],
  getInternetStatusOfCities: () => Promise<CityInternetStatus[] | undefined>
}>({
  mainContent: "",
  setMainContent: () => {},
  makeAllAPICalls: () => {},
  clients: [],
  cities: [],
  generalInternetStatus: [],
  getInternetStatusOfCities: async () => undefined,
});

export function GlobalContextProvider({ children }: { children: React.ReactNode }) {

  const [mainContent, setMainContent] = useState<string>("dashboard")
  const [clients, setClients] = useState<Clients[]>([])
  const [cities, setCities] = useState<Cities[]>([])
  const [generalInternetStatus, setGeneralInternetStatus] = useState<GeneralStatus[]>([])

  const apiCall = async (endpoint:string) => {
    try {
      const response = await api.get(endpoint)
      if(response) return response.data
    } catch(error) {
      console.error("Erro ao buscar os dados: ", error)
    }
  }

  const makeAllAPICalls = async () => {
    const [clients, cities, generalInternetStatus] = await Promise.all([
      apiCall('/findManyCliente'),
      apiCall('/searchAllCities'),
      apiCall('/generalInternetStatus'),
    ]);

    setClients(JSON.parse(clients))
    setCities(JSON.parse(cities))
    setGeneralInternetStatus(JSON.parse(generalInternetStatus))
  }

  const getInternetStatusOfCities = async (): Promise<CityInternetStatus[] | undefined> => {
    const responses = await Promise.all(
      cities.map(city => apiCall(`/cityInternetStatus/${city}`))
    );

    const statusOfCities: CityInternetStatus[] = responses
      .map((response, index) => {
        if (response) {
          const transformIntoArray = JSON.parse(response)
          return {
            name: typeof cities[index] === 'string' ? cities[index] : `Cidade ${index}`,
            desconhecido: transformIntoArray[0],
            ativo: transformIntoArray[1],
            desativado: transformIntoArray[2],
            'bloqueio manual': transformIntoArray[3],
            'bloqueio automático': transformIntoArray[4],
            'financeiro em atraso': transformIntoArray[5],
            'aguardando assinatura': transformIntoArray[6],
          } as CityInternetStatus
        }
        return undefined
      })
      .filter((cityStatus): cityStatus is CityInternetStatus => cityStatus !== undefined)
    
    return statusOfCities;
  };

  return (
    <GlobalContext.Provider value={{
      mainContent,
      setMainContent,
      makeAllAPICalls,
      clients,
      cities,
      generalInternetStatus,
      getInternetStatusOfCities,
    }}>
      {children}
    </GlobalContext.Provider>
  );
}