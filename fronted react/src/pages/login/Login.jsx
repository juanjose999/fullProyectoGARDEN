import { useState } from 'react';
import './Login.css'
import { AuthLogin } from '../../api/Auth'

export const Login = ({ onSignupSuccess }) =>{

    const [loading, setIsLoading] = useState(false)
    const [status, setStatus] = useState('')

    async function handleLogin (event) {
        event.preventDefault()
        setStatus('Iniciando sesión...')
        setIsLoading(true)

        try{
            let email = document.getElementById('login-email').value;
            let password = document.getElementById('login-password').value

            const bodyToSend = { email, password }

            let loginResponse = await AuthLogin(bodyToSend)
            console.log('resultado',loginResponse)

            if(loginResponse.success) {
                setStatus('inicio de sesión existoso')

                setTimeout(() => {
                    onSignupSuccess(
                        loginResponse.token, 
                        loginResponse.success ? 'dashboard' : 'login', 
                        loginResponse.success, 
                        loginResponse.user
                    )
                },2000)
            }else {
                setStatus('❌ Usuario o contraseña incorrectos');
                setTimeout(() => {
                    setIsLoading(false)
                },1000)
            }


        }catch(error){
            console.log(error)
            setStatus('Error al iniciar sección')
            setTimeout(() => {
                    setIsLoading(false)
                },1000)
        }
    
    }

   
    return<>

         {loading && 
         <section className='containerStatusOperation'>
                <p>{status}</p>
        </section>
        }

         <section className="login-card">

            
            <header className="login-header">

                <h1 className="login-title">
                    Iniciar sesión
                </h1>

            </header>

            <form
                className="login-form"
                onSubmit={handleLogin}
            >

                <div className="form-group">
                    <label htmlFor="login-email">
                        Correo electrónico
                    </label>

                    <input
                        type="email"
                        id="login-email"
                        placeholder="correo@ejemplo.com"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="login-password">
                        Contraseña
                    </label>

                    <input
                        type="password"
                        id="login-password"
                        placeholder="********"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="login-button"
                >
                    {
                        loading ? '...Cargando...':'Iniciar sesión'
                    }
                </button>

                <button
                    className="signup-button"
                    onClick={() => {
                        onSignupSuccess(
                        '', 
                        'signup', 
                        '', 
                         ''
                    )
                    }}
                >
                Crear Cuenta
                </button>

            </form>
        </section>
    </>
}