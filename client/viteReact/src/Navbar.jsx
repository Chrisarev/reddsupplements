import styles from './stylesheets/Navbar.module.css'
import {Link} from 'react-router-dom'
const Navbar = () => {
    return (
        <div className={styles.navbar}>
            <div className={styles.icon}>
                <svg width="50px" height="50px" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"
                    xmlns: xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img"
                    class="iconify iconify--emojione-monotone" preserveAspectRatio="xMidYMid meet">
                    <path d="M36.604 23.043c-.623-.342-1.559-.512-2.805-.512h-6.693v7.795h6.525c1.295 0 2.268-.156 2.916-.473c1.146-.551 1.721-1.639 1.721-3.268c0-1.757-.555-2.939-1.664-3.542" 
                    fill="#FF0000"></path><path d="M32.002 2C15.434 2 2 15.432 2 32s13.434 30 30.002 30s30-13.432 30-30s-13.432-30-30-30m12.82 44.508h-6.693a20.582 20.582 0 0 1-.393-1.555a14.126 14.126 0 0 1-.256-2.5l-.041-2.697c-.023-1.85-.344-3.084-.959-3.701c-.613-.615-1.766-.924-3.453-.924h-5.922v11.377H21.18V17.492h13.879c1.984.039 3.51.289 4.578.748s1.975 1.135 2.717 2.027a9.07 9.07 0 0 1 1.459 2.441c.357.893.537 1.908.537 3.051c0 1.379-.348 2.732-1.043 4.064s-1.844 2.273-3.445 2.826c1.338.537 2.287 1.303 2.844 2.293c.559.99.838 2.504.838 4.537v1.949c0 1.324.053 2.225.16 2.697c.16.748.533 1.299 1.119 1.652v.731z"
                        fill="#FF0000">
                        </path>
                </svg>
            </div>
        <div className={styles.links}>
            <Link to='/category/protein'>Protein</Link>
            <Link to='/category/preworkout'>Preworkout</Link>
            <Link to='/category/supplements'>Supplements</Link>
        </div>
        <div className={styles.cartSection}>
            
        </div>
        </div>
    )
}

export default Navbar;

