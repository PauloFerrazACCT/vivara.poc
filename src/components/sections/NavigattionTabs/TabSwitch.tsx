import React from 'react'

export const TabSwitch = ({
  isActive,
  children,
  onClick,
}: {
  isActive: boolean
  children: React.ReactNode
  onClick: () => void
}) => (
  <button
    className={`navigattionTabs-btn ${
      isActive ? 'navigattionTabs-btn-active' : ''
    }`}
    onClick={onClick}
  >
    {children}
  </button>
)
