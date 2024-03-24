import PetManager from "./PetManager";
const SidebarRight = () => {
    return (
        <section className="sidebar-right">
            <div className='nav-pet-btn desktop'><PetManager /><span className="icon-label">Pet</span></div>
        </section>
    )
}

export default SidebarRight;