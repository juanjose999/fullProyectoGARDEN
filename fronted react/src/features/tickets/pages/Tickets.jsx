import { useEffect, useState } from "react";
import "./Tickets.css";

import { FindAllTicketsByUser } from "../../../services/Ticket";
import { TicketSummary } from "../components/TicketSummary";
import { TicketDetails } from "../components/TicketDetails";

export const Tickets = ({ dataUser }) => {

    const [tickets, setTickets] = useState([]);
    const [isViewDetails, setIsViewDetails] = useState(false)
    const [detailsTicket, setDetailsTicket] = useState({})

    const handleViewDetailsTicket = (ticket) => {
        console.log('llego ticket:', ticket)
        setIsViewDetails(true)
        setDetailsTicket(ticket)
    }

    useEffect(() => {
        
    if (!dataUser?.id) {
        console.log("...Información del usuario no encontrada...");
        return;
    }

    const findMyTickets = async () => {
        let result = await FindAllTicketsByUser()
        if (!result || result.length === 0) {
            console.log("No hay tickets");
            setTickets([])
            return;
        }
        setTickets(result)
    }

    console.log("ejecutando fetch tickets para:", dataUser.id);

    

    findMyTickets();
    }, [dataUser]);

    return (
        <div className="tickets-container">

            <h2 className="tickets-title">
                Mis Tickets
            </h2>

            {!isViewDetails ? (
                <div className="tickets-grid">

                    {tickets.length === 0 ? (
                        <div className="empty-state">
                            No has creado tickets todavía.
                        </div>
                    )
                    : (
                        tickets.map(ticket => (
                            <TicketSummary
                                key={ticket.data.id}
                                ticket={ticket}
                                onHandleViewDetails={handleViewDetailsTicket}
                            />
                        ))
                    ) 
                    }

                </div>
            ) : (
                <TicketDetails 
                    ticket={detailsTicket}
                />
            )}

        </div>
    );
};