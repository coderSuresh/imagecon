import NavBar from "./nav"

const Header = () => {
    return (
        <header className="container-padding bg-white flex items-center justify-between py-4">
            <p className="sm:text-3xl text-2xl font-bold">
                <span className="text-primary">Image</span><span>Con</span>
            </p>

            <NavBar />

        </header>
    )
}

export default Header
