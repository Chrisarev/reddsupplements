import styles from './stylesheets/Navbar.module.css'
import { Link } from 'react-router-dom'
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';
import { useContext } from 'react';
import { CartContext } from './CartContext';

const Navbar = () => {
    const [username1, setUsername1] = useState('username');
    /*const [logoutString, setlogoutString] = useState('')*/
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [cart, setCart] = useState([]);
    const {cart2, setCart2} = useContext(CartContext); 
    ///sets username inside of navbar and logout if user has logged in
    useEffect(() => {
        let varr = localStorage.getItem('username');
        if (varr === null) {
        } else {
            setUsername1(prev => varr)
        }
        fetch('/api/getCart', {
            method: 'GET',
            headers: { "Content-Type": "application/json" }
        }).then((response) => {
            if (response.status == 401) {
                setIsLoggedIn(false);
                setCart2('');
                return response;
            } else {
                setIsLoggedIn(true)
                return response.json()
            }
        }).then((data) => {
            let arr = data[0].products;
            setCart2(prev => arr)
            console.log(cart2)
        })
    }, [])
    
    const logOutFunction = () => {
        localStorage.removeItem('username')
        fetch('/api/logout', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: ''
        }).then((response) => {
            if (response.status == 200) {
                setIsLoggedIn(false);
                navigate('/login')
            }
            return response;
        })
    }


    return (
        <div className={styles.navbar}>
            <Link to="/" className={styles.icon}>
                <svg width="50px" height="50px" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"
                    xmlns: xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img"
                    class="iconify iconify--emojione-monotone" preserveAspectRatio="xMidYMid meet">
                    <path d="M36.604 23.043c-.623-.342-1.559-.512-2.805-.512h-6.693v7.795h6.525c1.295 0 2.268-.156 2.916-.473c1.146-.551 1.721-1.639 1.721-3.268c0-1.757-.555-2.939-1.664-3.542"
                        fill="#FF0000"></path><path d="M32.002 2C15.434 2 2 15.432 2 32s13.434 30 30.002 30s30-13.432 30-30s-13.432-30-30-30m12.82 44.508h-6.693a20.582 20.582 0 0 1-.393-1.555a14.126 14.126 0 0 1-.256-2.5l-.041-2.697c-.023-1.85-.344-3.084-.959-3.701c-.613-.615-1.766-.924-3.453-.924h-5.922v11.377H21.18V17.492h13.879c1.984.039 3.51.289 4.578.748s1.975 1.135 2.717 2.027a9.07 9.07 0 0 1 1.459 2.441c.357.893.537 1.908.537 3.051c0 1.379-.348 2.732-1.043 4.064s-1.844 2.273-3.445 2.826c1.338.537 2.287 1.303 2.844 2.293c.559.99.838 2.504.838 4.537v1.949c0 1.324.053 2.225.16 2.697c.16.748.533 1.299 1.119 1.652v.731z"
                            fill="#FF0000">
                    </path>
                </svg>
            </Link>
            <div className={styles.links}>
                <Link to='/category/protein'>Protein</Link>
                <Link to='/category/preworkout'>Preworkout</Link>
                <Link to='/category/supplement'>Supplements</Link>
            </div>
            <div className={styles.userSection}>
                <div className={styles.userIcon} id="userIcon">
                    <svg width="35px" height="35px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <title />
                        <g id="Complete"><g id="user"><g>
                            <path d="M20,21V19a4,4,0,0,0-4-4H8a4,4,0,0,0-4,4v2" fill="none" stroke="#FFFFFF" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" />
                            <circle cx="12" cy="7" fill="none" r="4" stroke="#FFFFFF" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" /></g>
                        </g></g>
                    </svg>
                </div>
                <div className={`${styles.dropDown} ${styles.userDropDown}`} id="userDropDown">
                    {isLoggedIn &&
                        <>
                            <Link to="/">{username1}</Link>
                            <button onClick={logOutFunction}>Log Out</button>
                        </>
                    }
                    {!(isLoggedIn) &&
                        <>
                            <Link to="/signup">Register</Link>
                            <Link to="/login">Log In</Link>
                        </>
                    }
                </div>
                {isLoggedIn &&
                    <div className={styles.cart}>
                        <svg width="35px" height="35px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M2 2C1.44772 2 1 2.44772 1 3C1 3.55228 1.44772 4 2 4H2.47241C2.92336 4 3.31852 4.30182 3.43717 4.73688L3.85342 6.26312L6 14.1339V16C6 16.6935 6.23533 17.3321 6.63048 17.8402C6.23824 18.2816 6 18.863 6 19.5C6 20.8807 7.11929 22 8.5 22C9.88071 22 11 20.8807 11 19.5C11 19.3288 10.9828 19.1616 10.95 19H14.05C14.0172 19.1616 14 19.3288 14 19.5C14 20.8807 15.1193 22 16.5 22C17.8807 22 19 20.8807 19 19.5C19 19.1715 18.9366 18.8578 18.8215 18.5704C18.934 18.4086 19 18.212 19 18C19 17.4477 18.5523 17 18 17H16.5H9C8.44772 17 8 16.5523 8 16V15H18.236C19.1381 15 19.9285 14.3962 20.1657 13.5258L21.8007 7.52583C22.1473 6.25364 21.1896 5 19.871 5H5.58198L5.3667 4.21065C5.01074 2.90547 3.82526 2 2.47241 2H2ZM16.5 19C16.2239 19 16 19.2239 16 19.5C16 19.7761 16.2239 20 16.5 20C16.7761 20 17 19.7761 17 19.5C17 19.2239 16.7761 19 16.5 19ZM18.236 13H7.7638L6.12743 7H19.871L18.236 13ZM8.5 19C8.22386 19 8 19.2239 8 19.5C8 19.7761 8.22386 20 8.5 20C8.77614 20 9 19.7761 9 19.5C9 19.2239 8.77614 19 8.5 19Z" fill="#FFF" />
                        </svg>
                    </div>
                }
                {cart2.length > 0 &&
                    <div className={`${styles.dropDown} ${styles.cartDropDown}`}>
                        {cart2.map((product) => (
                            <div className={styles.cartProduct}>
                                <Link to="/">{product.productTitle}</Link>
                                <div className={styles.productQuantity}>Qty x{product.quantity}</div>
                            </div>
                        ))}
                        <Link to="/checkout" className={styles.checkOutButton}>Checkout</Link>
                    </div>
                }
                {/*
                <div className={`${styles.dropDown} ${styles.cartDropDown}`}>
                    <div className={styles.cartProduct}>
                        <Link to="/">Dymatize Protein Powder - Rich Chocolate Flavor</Link>
                        <div className={styles.productQuantity}>Qty x3</div>
                    </div>
                    <div className={styles.cartProduct}>
                        <Link to="/">Dymatize Protein Powder - Rich Chocolate Flavor</Link>
                        <div className={styles.productQuantity}>Qty x3</div>
                    </div>
                    <Link to="/checkout" className={styles.checkOutButton}>Checkout</Link>
                </div>
                */}
            </div>
        </div>
    )
}

export default Navbar;

