import { use, useState } from 'react'
import './App.css'
import logo from './assets/logo.png'
import SingUpFormulario from './pages/signup/SingUpFormulario'
import { Home } from './pages/home/Home'
import { Login } from './pages/login/Login'
import { Dashboard } from './pages/dashboard/Dashboard'
import { EventDetail } from './pages/event/EventDetail'
import { ConfirmPurchase } from './pages/purchase/ConfirmPurchase'
import { Tickets } from './pages/tickets/Tickets'
import { EventForm } from './pages/formEventeNew/EventForm'


function App() {
  
  const [currentPage, setCurrentPage] = useState('home')
  const [token, setToken] = useState('')
  const [isLoged, setIsLoged] = useState(false)
  const [user, setUser] = useState({})
  const [msg,setMsg] = useState('')
  const [event, setEvent] = useState({})



  const handleSetEventData = (data) => {
    setEvent(data)
    console.log('data in padre:', data)
  }

  const handleChangePage = (pageName) => {
    console.log('val-',pageName)
    setCurrentPage(pageName)
  }



  const handleAuthentication = (token, page, isLoged, user) => {
    console.log('data app authentication:',token, user, page, isLoged)
    localStorage.setItem('token',token)
   
    setToken(token)
    setUser(user)
    console.log('user',user)
    setCurrentPage(page)
    setIsLoged(isLoged)
  }


  return (
    <>
      <header>

        <div className='container-logo'>
          <img src={logo} alt="" id='logo' className='logo'/>
        </div>

        <div className='container-buttons'>

          {!isLoged ? (
              <>

              <button id='signup' 
                className={currentPage === 'home' ? 'active' : ''}
                onClick={() => {handleChangePage('home')}}>
                  eventos
              </button>
              
              <button id='login' 
                onClick={() => {handleChangePage('login')}}
                className={currentPage === 'login' ? 'active':''}
                >
                  Iniciar sessión
              </button>

              <button id='signup' 
                className={currentPage === 'signup' ? 'active' : ''}
                onClick={() => {handleChangePage('signup')}}>
                  Crear cuenta
              </button>



              </>
              ) : 

              (
                <>
                <button
                  id='eventos'
                  className={currentPage === 'eventos' ? 'active': currentPage === 'dashboard' ? 'active' : ''}
                  onClick={() => {handleChangePage('dashboard')}}
                  >
                  Ver eventos
                </button>

                <button
                 id='tickets'
                  className={currentPage === 'tickets' ? 'active':''}
                  onClick={() => {handleChangePage('tickets')}}
                  >
                    Ver mis tickets
                </button>

                <button
                 id='cuenta'
                  className={currentPage === 'cuenta' ? 'active':''}
                  onClick={() => {handleChangePage('cuenta')}}>
                    Mi cuenta</button>
                </>
              )            
          }
          
        </div>

        
      </header>

      <main>

        <section id='statedSignup' >
            <p id='success'>{msg}</p>
        </section>
        {
          currentPage != 'dashboard' && currentPage != 'event' && currentPage != 'tickets' && currentPage != 'purchase' && currentPage != 'eventForm' ? 
          ( <>
            {currentPage === 'home' ? 
              <Dashboard 
                isLoged={isLoged}
                onChangePage={handleChangePage}
                onSetEventData={handleSetEventData}
              /> : 
              currentPage === 'login' ? 
              <Login
              onSignupSuccess={handleAuthentication} 
              /> : 
              currentPage === 'signup' ? 
              <SingUpFormulario
                onSignupSuccess={handleAuthentication}
              /> : 
              <Home/>
            }
          </> ) 
          : 
          (
          <> 
            {
              currentPage === 'dashboard' ? (
                <Dashboard
                isLoged={isLoged}
                onChangePage={handleChangePage}
                onSetEventData={handleSetEventData}/>
              ) : (
                currentPage === 'event' ? (
                  <EventDetail 
                  event={event}
                  onChangePage={handleChangePage}
                  isLogged={isLoged}/>
                ) : (
                  currentPage === 'purchase' ? (
                    <ConfirmPurchase event={event} dataUser={user} />
                  ) : (
                  currentPage === 'tickets' ? (
                    <Tickets dataUser={user}/>
                  ) :
                   currentPage === 'eventForm' ?  (<EventForm></EventForm>) :
                  (
                    <Dashboard 
                    isLoged={isLoged}
                    onChangePage={handleChangePage}
                    onSetEventData={handleSetEventData}/>)
                   
                  )
                )
              )
            }
          </>
          ) 
        }
       
      </main>
      
    </>
  )
}

export default App
