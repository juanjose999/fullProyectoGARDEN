import { useState } from 'react'
import './Signup.css'

const SingUpFormulario = ({ onSignupSuccess }) => {

    const [statusSignUp,setStatusSignUp] = useState('')
    const [isSendSignUp, setIsSendSignUp] = useState(false)

    async function handleRequestToApi(data) {
        event.preventDefault()
        try {
            setIsSendSignUp(true)
            const response = await fetch('http://127.0.0.1:8080/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            const status = await response.status
            const result = await response.json()


            if(status === 200){
                
                console.log('inicio de session existos')
                setStatusSignUp('Usuario creado correctamente')

                setTimeout(() => {
                    setIsSendSignUp(false)
                    onSignupSuccess(result.data.token, 'dashboard', true, result.user)
                },3000)

            }else{
                console.log('fallo iniciar seccion')
                setStatusSignUp('Error en la creación del usuario')
                
                setTimeout(() => {
                    setIsSendSignUp(false)
                    onSignupSuccess(null, 'signup', false)
                },3000)
            }
           
        } catch (error) {
            setStatusSignUp('Error en la creación del usuario')
            onSignupSuccess(null, 'signup', false)
            
            console.log('error', error)
            setIsSendSignUp(false)
        }
    }



    function handleSendForm(event) {

        event.preventDefault()

        const nombre = document.getElementById('signup-name').value
        const apellido = document.getElementById('signup-lastname').value
        const email = document.getElementById('signup-email').value
        const password = document.getElementById('signup-password').value
        const telefono = document.getElementById('signup-phone').value
        const documento = document.getElementById('signup-document').value

        const dataToSend = {
            nombre,
            apellido,
            email,
            password,
            telefono,
            documento
        }

        console.log('data to send:', dataToSend)

        handleRequestToApi(dataToSend)
    }

    return <>

         {isSendSignUp && 
         <section className='statedSignup' >
            <span id='success'>{statusSignUp}</span>
        </section>}

        <section className="signup-card">

            <header className="signup-header">

                <h1 className="signup-title">
                    Crear cuenta
                </h1>
            </header>

            <form
                className="signup-form"
                onSubmit={handleSendForm}
            >

                <div className="form-group">

                    <label htmlFor="signup-name">
                        Nombre
                    </label>

                    <input
                        type="text"
                        id="signup-name"
                        placeholder="Ingresa tu nombre"
                        required
                    />

                </div>

                <div className="form-group">

                    <label htmlFor="signup-lastname">
                        Apellido
                    </label>

                    <input
                        type="text"
                        id="signup-lastname"
                        placeholder="Ingresa tu apellido"
                        required
                    />

                </div>

                <div className="form-group">

                    <label htmlFor="signup-email">
                        Correo electrónico
                    </label>

                    <input
                        type="email"
                        id="signup-email"
                        placeholder="correo@ejemplo.com"
                        required
                    />

                </div>

                <div className="form-group">

                    <label htmlFor="signup-password">
                        Contraseña
                    </label>

                    <input
                        type="password"
                        id="signup-password"
                        placeholder="********"
                        required
                    />

                </div>

                <div className="form-group">

                    <label htmlFor="signup-phone">
                        Teléfono
                    </label>

                    <input
                        type="text"
                        id="signup-phone"
                        placeholder="Tu número"
                        required
                    />

                </div>

                <div className="form-group">

                    <label htmlFor="signup-document">
                        Documento
                    </label>

                    <input
                        type="text"
                        id="signup-document"
                        placeholder="Número de documento"
                        required
                    />

                </div>

                <button
                    type="submit"
                    className="signup-button"
                >
                    Registrar usuario
                </button>

            </form>

        </section>
    </>
}

export default SingUpFormulario