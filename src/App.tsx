import './App.css'
import AppRouter from "./components/AppRouter.tsx";
import Navbar from "./components/Navbar.tsx";


function App() {
    const tg = window.Telegram.WebApp
    const tgName = tg?.initDataUnsafe?.user?.first_name
    return (
        <>
            <div>
                <Navbar firstName={tgName || ''}/>
                <AppRouter/>
            </div>

        </>
    )
}

export default App
