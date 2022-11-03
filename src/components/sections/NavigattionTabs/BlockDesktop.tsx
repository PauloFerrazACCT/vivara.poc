import React, { useState } from 'react'
import { List } from '@faststore/ui'
import { Link } from 'gatsby'
import { Image } from 'src/components/ui/Image'
import { EventPromoClick } from 'src/components/common/EventPromoClick'
import { PromoView } from 'src/components/common/PromoView'

import { TabPanel, useTabs } from './TabRules'
import { TabSwitch } from './TabSwitch'
import type { Props } from './index'

function BlockDesktop({ navigattionTabs }: Props) {
  const allTabs = [
    ...new Set(
      navigattionTabs?.map((item: { tabLabel: string }) => item.tabLabel)
    ),
  ]

  const [tabs] = useState(allTabs)
  const [selectedTab, setSelectedTab] = useTabs(tabs)
  const [altForEvent, setAltForEvent] = useState<string>('')

  const { AddPromoView } = PromoView({
    altForEvent,
    identifier: 'navigation-tabs-home',
  })

  return (
    <div className="navigattionTabs-container">
      <h2 className="navigattionTabs-title">Momentos Inesquecíveis</h2>
      <p className="navigattionTabs-subtitle">
        Joias perfeitas para cada ocasião
      </p>
      <div className="navigattionTabs-subtitle--border" />
      <div className="section-top">
        <div className="navigattionTabs-list">
          <List variant="unordered">
            {tabs.map((tab: string, index: number) => {
              return (
                <li key={index} className="navigattionTabs-tab">
                  <TabSwitch
                    key={index}
                    isActive={selectedTab === tab}
                    onClick={() => setSelectedTab(tab)}
                  >
                    {tab}
                  </TabSwitch>
                </li>
              )
            })}
          </List>
        </div>
      </div>
      <div className="section-center">
        {
          <>
            {AddPromoView()}
            {navigattionTabs?.map((item, index) => (
              <div
                key={index}
                className={
                  selectedTab !== item.tabLabel
                    ? 'block-inactive'
                    : 'block-active'
                }
              >
                <TabPanel hidden={selectedTab !== item.tabLabel}>
                  <article className="block">
                    <div className="block-item">
                      <Image
                        baseUrl={item.src1}
                        alt={`${item.alt}${index}`}
                        aspectRatio={1}
                        layout="constrained"
                        backgroundColor="#F0F0F0"
                        loading="lazy"
                        options={{
                          fitIn: true,
                        }}
                        setAltForEvent={setAltForEvent}
                      />
                      <div className="block-info">
                        <header>
                          <h3 className="block-title">{item.title}</h3>
                        </header>
                        <p className="block-description">{item.description}</p>
                        <a
                          href={item.href}
                          className="block-selection"
                          onClick={() => {
                            EventPromoClick(item.alt, `NavigationTabs-Home`)
                          }}
                        >
                          Ver Seleção
                        </a>
                      </div>
                      <Image
                        baseUrl={item.src2}
                        alt={`${item.alt}${index}`}
                        aspectRatio={1}
                        layout="constrained"
                        backgroundColor="#F0F0F0"
                        loading="lazy"
                        options={{
                          fitIn: true,
                        }}
                        setAltForEvent={setAltForEvent}
                      />
                    </div>
                    <div className="block-gifts">
                      <Link
                        to={item.href}
                        className="block-link"
                        onClick={() => {
                          EventPromoClick(item.alt, `NavigationTabs-Home`)
                        }}
                      >
                        Ver todos os presentes
                      </Link>
                      <div className="block-border" />
                    </div>
                  </article>
                </TabPanel>
              </div>
            ))}
          </>
        }
      </div>
    </div>
  )
}

export default BlockDesktop
