import React from 'react'
import {
  RoughProvider, Circle
} from 'react-roughjs'

import PartyLegend from './party-legend'
import { styles } from '../utils'
import { getOverhangCoordinates } from '../utils/get-coordinates'

export const Parliament = ({ coordinates, seats, year }) => {
  let seatCoordinates = coordinates.map((circle, coordinatesIndex) => {
    if (!seats) return circle
    let totalAllocated = 0
    for (let i = 0; i < seats.length; i++) {
      totalAllocated += seats[i].allocated
      if (coordinatesIndex < totalAllocated) {
        circle.options = styles[seats[i].party]
        return circle
      }
    }
    return null
  })
  if (seats) {
    let overhangCoordinates = getOverhangCoordinates()
    for (let party in seats) {
      if (seats[party].overhang) {
        let { overhang } = seats[party]
        while (overhang > 0) {
          seatCoordinates.push({
            ...overhangCoordinates[0],
            options: styles[seats[party].party]
          })
          overhangCoordinates.shift()
          overhang--
        }
      }
    }
  }
  return (
    <svg viewBox="0 0 360 500">
    <RoughProvider>
      {seatCoordinates.map((seat, i) => (
        <Circle
          x={seat.x}
          y={seat.y}
          diameter={seat.diameter}
          options={seat.options}
          key={i}
        />
      ))}
      <PartyLegend seats={seats} />
      {(year !== '2020') && <text
        x={150}
        y={(seats.length * 22) + 220}
      >
        {year}
      </text>}
    </RoughProvider>
  </svg>
  )
}
