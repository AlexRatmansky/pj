import { CoordinatesBox } from 'components/CoordinatesBox'
import { ElementHighlighter } from 'components/ElementHighlighter'
import { Legend } from 'components/Legend'
import { PointerGuide } from 'components/PointerGuide'
import React, { FC } from 'react'
import { useSelector } from 'react-redux'
import { Store } from 'store'
import { HorizontalGuides } from './HorizontalGuides'
import style from './style.scss'
import { VerticalGuides } from './VerticalGuides'

export { SnapGuide }

const SnapGuide: FC = () => {
  const { elem, legendVisible, showApp } = useSelector((store: Store) => store)

  return (
    showApp && (
      <div className={style.snapGuide}>
        <PointerGuide />

        <VerticalGuides />

        <HorizontalGuides />

        <CoordinatesBox />

        <ElementHighlighter elementProps={elem} />

        {legendVisible && <Legend />}

        {/* <DebugDot /> */}
      </div>
    )
  )
}
