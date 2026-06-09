import logo from '../../../assets/logo.png'
import './Header.css'

const Header = ({isLoged, currentPage, onChangePage}) => {

    const guesUser = [
        {
            page:"dashboard",
            label:"Eventos"
        },
        {
            page:"login",
            label:"Iniciar sessión"
        },
        {
            page:"signup",
            label:"Crear cuenta"
        }
    ]


    const userMenu = [
        {
            page: "dashboard",
            label: "Ver eventos"
        },
        {
            page: "tickets",
            label: "Mis tickets"
        },
        {
            page: "cuenta",
            label: "Mi cuenta"
        }
    ];

    const currentMenu = isLoged ? userMenu : guesUser;
    console.log('current btn:', currentMenu)
    console.log('isloged:',isLoged)

    return<>

        <header>

        <div className='container-logo'>
          <img src={logo} 
          alt="" 
          id='logo' 
          className='logo'
        />
        </div>

        <div className='container-buttons'>

            {
                currentMenu.map( btn => (
                    <button
                        key={btn.page}
                        className={
                            currentPage === btn.page ? 'active' : ''
                        }
                        onClick={() => onChangePage(btn.page)}
                    >
                        {btn.label}
                    </button>
                ))
            }

        </div>


      </header>
    </>
}

export default Header;