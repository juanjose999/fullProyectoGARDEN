import { useEffect, useState } from "react";
import "./Dashboard.css";
import { findAllEvents, findEventById } from '../../services/Event'


export const Dashboard = ({isLoged, onChangePage, onSetEventData }) => {

    const [dataEvents, setDataEvents] = useState([])

    const findEvents = async () => {
        let resultAllEvents = await findAllEvents()
        console.log(('resulAllEvents:',resultAllEvents))
        setDataEvents(resultAllEvents)
    }

    const handleFindEvent = async (eventFull) => {

       console.log('event:',eventFull)
        onSetEventData(eventFull)
       onChangePage('event')
    }

    const handleViewFormNewEvent = () => {
        console.log('cambie a evento')
        onChangePage('eventForm')
    }

    console.log('hola desde harboard _', isLoged)
    useEffect(() => {
        findEvents()
    }, [])

    return (
        <section className="dashboard">

            <h1 className="title">
                Eventos Disponibles
            </h1>
            
            {isLoged && <button
                onClick={handleViewFormNewEvent}
                >Crear nuevo evento
                </button>}

            <section className="cards-container">

                
                {
                    dataEvents.map(event => (

                        <article
                            className="event-card"
                            key={event.data.id}
                        >

                            <div className="linkPhoto">
                                {event.data.linkPhoto ? (
                                    <img src={event.data.linkPhoto} alt="" srcset="" />
                                ) : (<div className="image-placeholder"></div>)}
                                
                            </div>


                            <div className="card-top">

                                <span className="category">
                                    {event.data.categoria}
                                </span>

                                <span className="status">
                                    {event.data.estado}
                                </span>

                            </div>

                            <h2>
                                {event.data.nombre}
                            </h2>

                            <p className="description">
                                {event.descripcion}
                            </p>

                            <div className="info">

                                <p>
                                    📍 {event.data.lugar}
                                </p>

                                <p>
                                    🛣️ {event.data.direccion}
                                </p>

                                <p>
                                    👥 {event.data.capacidad} personas
                                </p>

                            </div>

                            <div className="card-footer">

                                <span className="price">
                                    ${event.data.precioBase}
                                </span>

                                <button
                                onClick={() => { console.log("EVENTO COMPLETO", event);
        console.log("ID", event.data.id);
        handleFindEvent(event)}}
                                data-id={event.data.id}>
                                    Ver Evento
                                </button>

                            </div>

                        </article>

                    ))
                }

            </section>

        </section>
    )
}