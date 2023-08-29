import styles from './stylesheets/Checkout.module.css';
import { useState, useEffect } from 'react';
import Navbar from './Navbar'
import goldProtein from './stylesheets/images/goldProtein.jpg'

const Checkout = () => {
    const [cart, setCart] = useState([])
    const [subtotal, setSubtotal] = useState(0);
    const [tax, setTax] = useState(0);
    const [shipping, setShipping] = useState(5);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        fetch('/api/getCart', {
            method: 'GET',
            headers: { "Content-Type": "application/json" }
        }).then((response) => {
            if (response.status == 401) {
                setIsLoggedIn(false);
                setCart('');
                return response;
            } else {
                return response.json()
            }
        }).then((data) => {
            let arr = data[0].products;
            setCart(prev => arr)
            let sub = 0;
            for (let i = 0; i < data[0].products.length; i++) {
                sub = sub + (parseFloat(data[0].products[i].productPrice.$numberDecimal) * data[0].products[i].quantity)
                console.log(sub);
            }
            setSubtotal(sub);
            setTax(sub * 0.08)
            setTotal(sub + parseFloat(sub * 0.08) + 5)
        })
    }, [])

    const handleRemove = () => {
        console.log('remove')
    }

    const handleFormSubmit = (prodID) => {
        const data = { prodID }
        console.log(data);
        fetch('/api/removeProduct', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        }).then((response) => {
            if (response.status == 204) {
                console.log('removed product')
                 setCart(prev => {
                    return prev.filter(product => product._id !== prodID)
                 })
                return response;
            }
            if (response.status == 500) {
                console.log('Failed to remove product from cart.')
                return response;
            }
            return response;
        })
    }

    return (
        <div className={styles.panel}>
            <Navbar />
            <div className={styles.flexContainer}>
                <div className={styles.productsPanel}>
                    <h1>Checkout</h1>
                    <h2 className={styles.subHeader}>Items</h2>
                    {cart.length > 0 && cart.map((product) => (
                        <div className={styles.product} key={product._id}>
                            <div className={styles.imgHolder}>
                                <img className={styles.productIMG} src={product.productIMG} alt="" />
                            </div>
                            <div className={styles.productInfo}>
                                <div className={styles.productTitle}>{product.productTitle}</div>
                                <div className={styles.productQuantity}>Qty x{product.quantity}</div>
                            </div>
                            <div className={styles.totalProductPrice}>${product.productPrice.$numberDecimal}</div>
                            <button onClick={() => handleFormSubmit(product._id)} className={styles.removeProduct}>X</button>
                        </div>
                    ))}
                    <div className={styles.product}>
                        <div className={styles.imgHolder}>
                            <img className={styles.productIMG} src={goldProtein} alt="" />
                        </div>
                        <div className={styles.productInfo}>
                            <div className={styles.productTitle}>Thavage (Green Crush) Cbum Preworkout for Working Out, Hydration, Mental Focus & Energy - 40 Servings</div>
                            <div className={styles.productQuantity}>Qty x3</div>
                        </div>
                        <div className={styles.totalProductPrice}>$35.00</div>
                        <button className={styles.removeProduct}>X</button>
                    </div>
                </div>
                <div className={styles.orderSummary}>
                    <h2>Summary</h2>
                    <div className={styles.orderInfo}>
                        <div className={styles.subHeader}>Order subtotal: ${subtotal}</div>
                        <div className={styles.subHeader}>Tax: ${tax}</div>
                        <div className={styles.subHeader}>Shipping: ${shipping}</div>
                        <div className={styles.total}>Order Total: ${total}</div>
                    </div>
                </div>
            </div>
            <div className={styles.payPrompt}>
                <button className={styles.payButton}>Complete purchase</button>
            </div>
        </div>
    )
}

export default Checkout;

