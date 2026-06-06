import { useState } from "react";
import "./ConfirmPurchase.css";

export const ConfirmPurchase = ({ event, dataUser }) => {

    const [msg, setMsg] = useState('')

    if(!event){
        return <h2>Cargando información...</h2>
    }

    const handleConfirPurchase = async () => {
        let allDataUser = console.log(dataUser)
        let url = 'http://localhost:8080/tickets'
        
        let elementData = document.querySelector('.confirm-container')
        elementData.style.display = 'none'
        let elementConfirm = document.querySelector('.purchase-loading')
        elementConfirm.style.display = 'block'

        //ARMAR BODY DEL TICKET CON LA DATA DEL DOCUMENT DE PREICON Y LO DEMAS
        let total = document.querySelector('#valueTotal').value
        
        let bodyToSend = {
            eventoId: event.data.id,
            codigo:"123",
            precio: 200,
            estado:'NO CONSUMIDO'
        }


        console.log('body:',bodyToSend)
        let token = localStorage.getItem('token')
        console.log('token:',token)

        const request = await fetch(url, {
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body : JSON.stringify(bodyToSend)
        })
        if(!request.ok){
            throw new Error('error')
        }
        const result = await request.json()
        const statusResult = await request.status
        console.log('respuesta compra:', result)

        if(statusResult == 201){
            setMsg('✅ Compra realizada correctamente, revisa tus tickest para ver el resultado.')
        }else{
            setMsg('❌ Error al realizar la compra, intente mas tarde')
        }
        console.log('result Confirme:',result)

        setTimeout(() => {
            let resultPur = document.querySelector('.resultPurchase')
            resultPur.style.display = 'block'
            let esperando = document.querySelector('.esperando')
            esperando.style.display = 'none'
        },6000)

    }

    return (

        <>
        
            <section className="confirm-container">

                <div className="purchase-card">

                    <div className="purchase-header">

                        <span hidden className="id-event" data-id={event.data.id}></span>

                        <span className="purchase-category">
                            {event.data.categoria}
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
                                {event.data.nombre}
                            </h2>

                            <p className="event-description">
                                {event.data.descripcion}
                            </p>

                            <div className="event-details">

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

                            </div>

                        </div>

                    </div>

                    <div className="purchase-summary">

                        <h3>Resumen de Compra</h3>

                        <div className="summary-row">
                            <span>Ticket</span>
                            <p>1 x General</p>
                        </div>

                        <div className="summary-row">
                            <span>Precio Base</span>
                            <p>${event.data.precioBase}</p>
                        </div>

                        <div className="summary-row">
                            <span>Servicio</span>
                            <p>$5.000</p>
                        </div>

                        <div className="summary-total">
                            <span>Total</span>
                            <h2 id="valueTotal">
                                ${event.data.precioBase + 5000}
                            </h2>
                        </div>

                    </div>

                    

                    <button className="confirm-button"
                        onClick={handleConfirPurchase}>
                        Confirmar Compra
                    </button>

                </div>

            </section>

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
        </>

        
    )
}