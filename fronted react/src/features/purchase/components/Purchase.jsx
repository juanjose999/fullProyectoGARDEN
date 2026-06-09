import { useEffect, useState } from "react";
import {CreateTicket} from "../../../services/Ticket";
import './Purchase.css'

export const Purchase = ({ evento, dataUser }) => {
    console.log('evento:',evento)
    const [msg, setMsg] = useState('')
    const [isCreateTicket, setIsCreatedTicket] = useState(false)
    const [success, setSuccess] = useState(null)
    const [quantity, setQuantity] = useState(1);
    const [total, setTotal] = useState(evento.data.precioBase)

    const handleChangeQuantity = (event) => {
        const valueInput =  Number(event.target.value);
        console.log('cantidad:', valueInput)
        setQuantity(valueInput)
        const totalSum = valueInput * evento.data.precioBase;
        console.log('total_',totalSum)
        setTotal(totalSum)
    }

    const handleConfirPurchase = async (event) => {
        setIsCreatedTicket(true)
        event.preventDefault()
        console.log('crear compra')
        console.log('evento:',evento)
        console.log('total:',total)
        
        console.log('loader:',isCreateTicket)

        let body = {
            eventoId: evento.data.id,
            codigo:"123",
            precio: total,
            estado:'NO CONSUMIDO'
        }

        const resultService = await CreateTicket(body, setMsg)

        setTimeout(() => {
            setIsCreatedTicket(false)
            setMsg(resultService.message)
            console.log('loader:',isCreateTicket)
            setSuccess(resultService.success)
        },3000)

    }

    useEffect(() => {
        console.log('iscreated:',isCreateTicket)
        setIsCreatedTicket(isCreateTicket)
    }, [isCreateTicket])

    if (!evento || Object.keys(evento).length === 0) {
        return <h2>...Cargando información...</h2>;
    }

    return (

        <>            
            {success && 
                <section>
                    <span>{msg}</span>
                </section>
            }
            
            {!isCreateTicket && 
                <section className="confirm-container">
                    <div className="purchase-card">

                        <div className="purchase-header">

                            <span hidden className="id-event" data-id={evento.data.id}></span>

                            <span className="purchase-category">
                                {evento.data.categoria}
                            </span>

                            <h1>
                                Confirmar Compra
                            </h1>

                            <p>
                                Revisa la información de tu evento antes de continuar.
                            </p>

                        </div>

                        <div className="event-preview">

                            <div className="event-info">

                                <h2>
                                    {evento.data.nombre}
                                </h2>

                                <p className="event-description">
                                    {evento.data.descripcion}
                                </p>

                                <div className="event-details">

                                    <div>
                                        <span>Lugar</span>
                                        <p>{evento.data.lugar}</p>
                                    </div>

                                    <div>
                                        <span>Dirección</span>
                                        <p>{evento.data.direccion}</p>
                                    </div>

                                    <div>
                                        <span>Capacidad</span>
                                        <p>{evento.data.capacidad} personas</p>
                                    </div>

                                    <div>
                                        <span>Estado</span>
                                        <p>{evento.data.estado}</p>
                                    </div>

                                </div>

                            </div>

                        </div>

                        <div className="purchase-summary">

                            <h3>Resumen de Compra</h3>

                            <div className="summary-row">
                                <span>Cantidad</span>
                                <input 
                                    type="number" 
                                    name="quantity" 
                                    id="quantity" 
                                    value={quantity}
                                    min={1}
                                    onChange={(e) => handleChangeQuantity(e)}
                                />
                                
                            </div>

                            <div className="summary-row">
                                <span>Precio Base</span>
                                <p>${evento.data.precioBase}</p>
                            </div>


                            <div className="summary-total">
                                <span>Total</span>
                                <h2 id="valueTotal">
                                    ${total}
                                </h2>
                            </div>

                        </div>

        

                        <button className="confirm-button"
                            onClick={handleConfirPurchase}>
                            Confirmar Compra
                        </button>

                    </div>
                </section>    
            }
            {isCreateTicket && 
                 <section className="purchase-loading">
                    <div className="loading-card">

                        <div className="esperando">
                            <div className="loader"></div>

                            <h1>
                                Realizando compra...
                            </h1>

                            <p>
                                Por favor espere mientras procesamos su ticket.
                            </p>
                        </div>

                        <div
                        className="resultPurchase">
                            <p>{msg}</p>
                        </div>

                    </div>
                </section>
            }
           
        </>

        
    )
}