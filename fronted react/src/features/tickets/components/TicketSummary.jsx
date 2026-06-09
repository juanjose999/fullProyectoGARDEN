
export const TicketSummary = ({ticket, onHandleViewDetails }) => {
    console.log('tikect:',ticket.data)

    const handleViewDetailsTicket = (ticket) => {
        onHandleViewDetails(ticket)
    }

    return<>
        <div 
        className="ticket-card" 
        key={ticket.data.id}
        onClick={() => {
            handleViewDetailsTicket(ticket.data)
        }}
        >
                        
            <div className="ticket-header">
                <span className="ticket-code">
                    #{ticket.data.codigo}
                </span>

                <span className={`ticket-status ${ticket.data.estado}`}>
                    {ticket.data.estado}
                </span>
            </div>

            <div className="ticket-body">

                <p>
                    <strong>Tipo:</strong> {ticket.data.tipo}
                </p>

                <p>
                    <strong>Precio:</strong> ${ticket.data.precio}
                </p>
            </div>

        </div>
    </>
}