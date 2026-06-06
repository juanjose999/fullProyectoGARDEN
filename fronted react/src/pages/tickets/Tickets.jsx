import { useEffect, useState } from "react";
import "./Tickets.css";

export const Tickets = ({ dataUser }) => {

    const [tickets, setTickets] = useState([]);

    useEffect(() => {
    if (!dataUser?.id) {
        console.log("esperando user...");
        return;
    }
     const findMyTickets = async () => {
         let token = localStorage.getItem('token')
        console.log('token:', token)
         try {
                const response = await fetch(
                    `http://localhost:8080/tickets/id/${dataUser.id}`, 
                    {
                        headers: {
                             'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        }
                    }
                );

                const result = await response.json();

                console.log("ticketsUser:", result);

                setTickets(Array.isArray(result) ? result : [result]);

            } catch (error) {
                console.log("error:", error);
            }
           
    }

    console.log("ejecutando fetch tickets para:", dataUser.id);

    findMyTickets();
}, [dataUser]);

   

    return (
        <div className="tickets-container">

            <h2 className="tickets-title">
                Mis Tickets
            </h2>

            <div className="tickets-grid">

                {tickets.map((ticket) => (
                    <div className="ticket-card" key={ticket.id}>

                        <div className="ticket-header">
                            <span className="ticket-code">
                                #{ticket.codigo}
                            </span>

                            <span className={`ticket-status ${ticket.estado}`}>
                                {ticket.estado}
                            </span>
                        </div>

                        <div className="ticket-body">

                            <p>
                                <strong>Tipo:</strong> {ticket.tipo}
                            </p>

                            <p>
                                <strong>Precio:</strong> ${ticket.precio}
                            </p>
                        </div>

                    </div>
                ))}

            </div>

        </div>
    );
};