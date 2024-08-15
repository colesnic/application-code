import { createContext, useContext } from "react"

type AppContextProps = {
  setError: (error: string) => void
  cache?: React.MutableRefObject<Map<string, string>>
  useCache: boolean
  setUseCache: (value: boolean) => void
}

const defaultContext: AppContextProps = {
  setError: () => {},
  useCache: true,
  setUseCache: () => {}
}

export const AppContext = createContext<AppContextProps>(defaultContext)

export function useAppContext() {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider')
  }
  return context
}