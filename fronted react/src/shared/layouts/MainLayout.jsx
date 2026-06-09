import Header from "../components/header/Header"

export const MainLayout = ({
        isLoged,
        currentPage,
        onChangePage,
        children
    }) => {
    return<>

        <Header
            isLoged={isLoged}
            currentPage={currentPage}
            onChangePage={onChangePage}
        />    

        <main>
            {children}
        </main>

        <footer>

        </footer>
    </>
}