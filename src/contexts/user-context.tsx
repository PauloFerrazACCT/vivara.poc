import type { FC } from 'react'
import React, { useContext, createContext } from 'react'
import { useSession } from 'src/sdk/session'

const UserContext = createContext<UserContextProps>({} as UserContextProps)

export const UserProvider: FC<React.PropsWithChildren<unknown>> = ({
  children,
}) => {
  const { person: user } = useSession()

  return (
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  )
}

export const useUserContext = () => {
  return useContext(UserContext)
}
