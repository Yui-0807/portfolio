import PetManager from "./PetManager";
import { motion } from "framer-motion";
const SidebarRight = () => {

    return (
        <section className="sidebar-right">
            <motion.div initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
                className='nav-pet-btn desktop'><PetManager /></motion.div>
        </section>
    )
}

export default SidebarRight;