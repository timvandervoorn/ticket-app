export const averageTicketPrice = tickets => {
  return (
    tickets.reduce((acc, ticket) => {
      return acc + Number(ticket.price)
    }, 0) / tickets.length
  )
}
