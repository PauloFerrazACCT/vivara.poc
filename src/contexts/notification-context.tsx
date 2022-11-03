import type { FC } from 'react'
import React, { useState, useContext, createContext } from 'react'

interface NotificationProps {
  text: string
  state?: 'sucess' | 'danger'
}

const NotificationContext = createContext<NotificationContextProps>(
  {} as NotificationContextProps
)

export const NotificationProvider: FC<React.PropsWithChildren<unknown>> = ({
  children,
}) => {
  const [isShowing, setIsShowing] = useState(false)
  const [notificationProps, setNotificationProps] = useState<NotificationProps>(
    {} as NotificationProps
  )

  const getNotificationProps = notificationProps

  const showNotificaton = (text: string, state?: 'sucess' | 'danger') => {
    setIsShowing(true)
    setNotificationProps({
      text,
      state,
    })
  }

  const hideNotificaton = () => {
    setIsShowing(false)
    setNotificationProps({} as NotificationProps)
  }

  return (
    <NotificationContext.Provider
      value={{
        isShowing,
        getNotificationProps,
        showNotificaton,
        hideNotificaton,
      }}
    >
      {children}
    </NotificationContext.Provider>
  )
}

export const useNotificationContext = () => {
  return useContext(NotificationContext)
}
