import { indexOf } from 'lodash'
export const sortSeats = seats => {
  const partyOrder = ['National', 'ACT', 'UnitedFuture', 'JAProgressive', 'Alliance', 'UnitedNZ', 'Maori', 'Mana', 'TOP', 'Legalise', 'Greens', 'NZFirst', 'Labour']
  let seatsArray = []
  for (let party in seats) {
    seatsArray.push(seats[party])
  }
  return seatsArray.sort((a, b) => {
    if (!a.party || !b.party) return 0
    let partyA = indexOf(partyOrder, a.party)
    let partyB = indexOf(partyOrder, b.party)
    return partyA - partyB
  })
}
