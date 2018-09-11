export const calculateRisk = (
  ticketPrice,
  authorTicketsNum,
  averageTicketPrice,
  timeOfCreation,
  commentsNum
) => {
  let risk = 0

  if (authorTicketsNum === 1) {
    risk += 4
  }

  if (ticketPrice < averageTicketPrice) {
    const riskToAdd = 100 - ticketPrice * (100 / averageTicketPrice)
    risk += riskToAdd
  }

  if (ticketPrice > averageTicketPrice) {
    const riskToDeduct = (ticketPrice * 100) / averageTicketPrice - 100
    if (riskToDeduct > 15) {
      risk -= 15
    } else {
      risk -= riskToDeduct
    }
  }

  const hoursOfCreation = new Date(timeOfCreation)
  if (
    hoursOfCreation.getUTCHours() >= 9 &&
    hoursOfCreation.getUTCHours() <= 17
  ) {
    risk -= 13
  } else {
    risk += 13
  }

  if (commentsNum > 3) {
    risk += 6
  }

  if (risk < 2) {
    risk = 2
  }
  if (risk > 98) {
    risk = 98
  }

  return Math.round(risk)
}
