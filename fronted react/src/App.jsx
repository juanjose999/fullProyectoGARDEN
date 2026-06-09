import { use, useState } from 'react'
import './App.css'
import logo from './assets/logo.png'
import SingUp from './features/auth/signup/SingUp'
import { Login } from './features/auth/login/Login'
import { Dashboard } from './features/dashboard/Dashboard'
import { EventDetail } from './features/events/components/EventDetail'
import { Purchase } from './features/purchase/components/Purchase'
import { Tickets } from './features/tickets/pages/Tickets'
import { EventForm } from './features/events/pages/EventForm'
import { MainLayout } from './shared/layouts/MainLayout'
import AccountSetting from './features/account/page/AccountSetting'


function App() {
  
  const [currentPage, setCurrentPage] = useState('dashboard')
  const [token, setToken] = useState('')
  const [isLoged, setIsLoged] = useState(false)
  const [user, setUser] = useState({})
  const [msg,setMsg] = useState('')
  const [event, setEvent] = useState({})


  const handleSetEventData = (data) => {
    setEvent(data)
  }

  const handleChangePage = (pageName) => {
    console.log('changeToPage:',pageName)
    setCurrentPage(pageName)
  }

  const handleAuthentication = (token, page, isLoged, user) => {
    console.log('data app authentication:',token, user, page, isLoged)

    localStorage.setItem('token',token)
   
    setToken(token)
    setUser(user)
    setCurrentPage(page)
    setIsLoged(isLoged)
  }

  console.log('page:',currentPage)


  return (
    <>

      <MainLayout
        isLoged={isLoged}
        currentPage={currentPage}
        onChangePage={handleChangePage}
      >

        {currentPage === 'login' && 
          <Login 
          onSignupSuccess={handleAuthentication}
          />
        }

        {currentPage === 'signup' && 
          <SingUp
          />
        }

        {currentPage === 'dashboard' && 
          <Dashboard
            isLoged={isLoged}
            onChangePage={handleChangePage}
            onSetEventData={handleSetEventData}
          />
        }

        {currentPage === 'event' && 
          <EventDetail 
            event={event}
            onChangePage={handleChangePage}
            isLogged={isLoged}
          />
        }

        {currentPage === 'eventForm' && 
          (<EventForm/>) 
        }

        {currentPage === 'purchase' && 
          <Purchase 
            evento={event} 
            dataUser={user} 
          />
        }

        {currentPage === 'tickets' && 
         <Tickets dataUser={user}
          />
        }

        {currentPage === 'cuenta' && 
          <AccountSetting></AccountSetting>
        }
      </MainLayout>
      
    </>
  )
}

export default App
