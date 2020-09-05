import React from 'react'
import { createTasksStore, TasksStoreType } from './tasksStore'
import { useLocalStore } from 'mobx-react-lite'

type AppStateContextValue = {
  tasksStore: TasksStoreType
}

const AppStateContext =
  React.createContext<AppStateContextValue>( {} as AppStateContextValue )

export const AppStateProvider: React.FC<React.PropsWithChildren<{}>> = (
  {children}
) => {

  const tasksStore = useLocalStore( createTasksStore )

  return (
    <AppStateContext.Provider
      value={{
        tasksStore
      }}
    >
      {children}
    </AppStateContext.Provider>
  )
}

export const useAppStore = () => React.useContext( AppStateContext )
