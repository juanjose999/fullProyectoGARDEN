import { useEffect, useState } from "react";
import "./EventDetail.css";

export const EventDetail = ({ event, onChangePage, isLogged }) => {

    

    return (

        <section className="event-detail">

            <div className="event-banner">

                <div className="event-category">
                    {event.data.categoria}
                </div>

                <h1>
                    {event.data.nombre}
                </h1>

                <p>
                    {event.data.descripcion}
                </p>

            </div>

            <section className="event-content">

                <div className="detail-card">

                    <h3>Información General</h3>

                    <div className="detail-grid">

                        <div>
                            <span>Lugar</span>
                            <p>{event.data.lugar}</p>
                        </div>

                        <div>
                            <span>Dirección</span>
                            <p>{event.data.direccion}</p>
                        </div>

                        <div>
                            <span>Capacidad</span>
                            <p>{event.data.capacidad} personas</p>
                        </div>

                        <div>
                            <span>Estado</span>
                            <p>{event.data.estado}</p>
                        </div>

                        <div>
                            <span>Precio Unitario</span>
                            <p>${event.data.precioBase}</p>
                        </div>

                        {
                            isLogged ? (
                                <button 
                                    onClick={() => onChangePage('purchase')}>
                                    Comprar entrada
                                </button>
                            ) : (
                                <button 
                                    onClick={() => onChangePage('login')}>
                                    Iniciar sesión para comprar entrada
                                </button>
                            )
                        }

                    </div>

                </div>
                
                

            </section>

        </section>
    )
}