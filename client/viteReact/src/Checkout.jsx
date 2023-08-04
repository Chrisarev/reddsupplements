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
            console.log(data[0].products)
            setCart(prev => arr)
            console.log(data.length)
            let sub = 0; 
            for(let i=0; i < data[0].products.length; i++ ){
                sub = sub + parseFloat(data[0].products[i].productPrice.$numberDecimal)
                console.log(sub); 
            }
            setSubtotal(sub); 
            console.log("subtotal:" + subtotal)
        })
    }, [])

    
    return (
        <div className={styles.panel}>
            <Navbar />
            <div className={styles.flexContainer}>
                <div className={styles.productsPanel}>
                    <h1>Checkout</h1>
                    <h2 className={styles.subHeader}>Items</h2>
                    {cart.length > 0 && cart.map((product) => (
                        <div className={styles.product}>
                            <img className={styles.productIMG} src={product.productIMG} alt="" />
                            <div className={styles.productInfo}>
                                <div className={styles.productTitle}>{product.productTitle}</div>
                                <div className={styles.productQuantity}>Qty x{product.quantity}</div>
                            </div>
                            <div className={styles.totalProductPrice}>${product.productPrice.$numberDecimal}</div>
                        </div>
                    ))}
                    <div className={styles.product}>
                        <img className={styles.productIMG} src={goldProtein} alt="" />
                        <div className={styles.productInfo}>
                            <div className={styles.productTitle}>Gold Whey Protein</div>
                            <div className={styles.productQuantity}>Qty x3</div>
                        </div>
                        <div className={styles.totalProductPrice}>$35.00</div>
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

