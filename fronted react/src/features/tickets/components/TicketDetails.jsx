import "./TicketDetails.css";

export const TicketDetails = ({ ticket }) => {
    console.log('ticket details_',ticket)

    const formatDate = (date) => {
        if (!date) return "No disponible";

        return new Date(date).toLocaleString("es-CO", {
            dateStyle: "long",
            timeStyle: "short"
        });
    };

    return (
        <div className="ticket-detail-card">

            <div className="ticket-header">

                <h1>
                    🎟️ Ticket #{ticket.codigo}
                </h1>

                <span className={`status ${ticket.estado}`}>
                    {ticket.estado}
                </span>

            </div>

            <section className="detail-section">

                <h2>Información del Evento</h2>

                <div className="detail-grid">

                    <div>
                        <label>Evento</label>
                        <p>{ticket.evento.nombre}</p>
                    </div>

                    <div>
                        <label>Categoría</label>
                        <p>{ticket.evento.categoria}</p>
                    </div>

                    <div>
                        <label>Lugar</label>
                        <p>{ticket.evento.lugar}</p>
                    </div>

                    <div>
                        <label>Fecha del Evento</label>
                        <p>{formatDate(ticket.evento.fechaEvento)}</p>
                    </div>

                </div>

            </section>

            <section className="detail-section">

                <h2>Información del Ticket</h2>

                <div className="detail-grid">

                    <div>
                        <label>Código</label>
                        <p>{ticket.codigo}</p>
                    </div>

                    <div>
                        <label>Estado</label>
                        <p>{ticket.estado}</p>
                    </div>

                    <div>
                        <label>Tipo</label>
                        <p>{ticket.tipo || "General"}</p>
                    </div>

                    <div>
                        <label>Precio</label>
                        <p>
                            ${ticket.precio.toLocaleString("es-CO")}
                        </p>
                    </div>

                    <div>
                        <label>Fecha Compra</label>
                        <p>{formatDate(ticket.fechaCompra)}</p>
                    </div>

                    <div>
                        <label>Fecha Uso</label>
                        <p>{formatDate(ticket.fechaUso)}</p>
                    </div>

                </div>

            </section>

            <section className="detail-section">

                <h2>Comprador</h2>

                <div className="detail-grid">

                    <div>
                        <label>Nombre</label>
                        <p>
                            {ticket.usuario.nombre} {ticket.usuario.apellido}
                        </p>
                    </div>

                    <div>
                        <label>Email</label>
                        <p>{ticket.usuario.email}</p>
                    </div>

                    <div>
                        <label>ID Usuario</label>
                        <p>{ticket.usuario.id}</p>
                    </div>

                </div>

            </section>

        </div>
    );
};