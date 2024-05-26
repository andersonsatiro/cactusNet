import { createContext} from 'react'

export const GlobalContext = createContext<{
  clicando: () => void
}>({
  clicando: () => {}
});

export function GlobalContextProvider({ children }: { children: React.ReactNode }) {

  const clicando = () => {
    console.log("clicou")
  }

  return (
    <GlobalContext.Provider value={{
      clicando
    }}>
      {children}
    </GlobalContext.Provider>
  );
}

