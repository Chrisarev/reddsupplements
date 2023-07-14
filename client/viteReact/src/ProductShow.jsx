import Navbar from './Navbar';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import styles from './stylesheets/Productshow.module.css';
import goldProtein from './stylesheets/images/goldProtein.jpg'
import axios from "axios"; 

const ProductShow = () => {

    const { prodID } = useParams();
    const [product, setProduct] = useState();
    const [productQuantity, setProductQuantity] = useState('0');
    const [productVariation, setProductVariation] = useState('');
    const [cartAddStatus, setCartAddStatus] = useState(false);
    const [isPending, setIsPending] = useState(false);

    useEffect(() => {
        fetch(`/api/product/${prodID}`, {
            method: 'GET',
            headers: { "Content-Type": "application/json" },
        }).then((response) => {
            return response.json()
        }).then((data) => {
            setProduct(data);
        })
    }, [])

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const FD = new FormData(); 
        FD.append('productQuantity', productQuantity);
        FD.append('prodID', prodID);
        console.log(FD); 
        setIsPending(true);

        fetch('/api/addCart', {
            method:"POST", 
            body: FD
        }).then((response) => {
            if (response.status == 204) {
                console.log('added to cart')
                setIsPending(false);
                setCartAddStatus(true);
                return response;
            }
            setIsPending(false);
            setCartAddStatus(false);
            return response;
        })
    }

    const handleFormSubmitNew = (e) => {
        e.preventDefault();
        const FD = new FormData();
        FD.append('productQuantity', productQuantity)
        fetch(`/api/addCart/${prodID}`, {
            method: "POST",
            body: FD
        }).then((response) => {
            console.log(response.status)
            return response;
        })
    }
    return (
        <>
            <Navbar />
            <div className={styles.panel}>
                {product &&
                    <div className={styles.productPanel}>
                        <div className={styles.imageHolder}>
                            <img className={styles.productIMG} src={product.image}></img>
                        </div>
                        <div className={styles.productInfo}>
                            <h1 className={styles.productTitle}>
                                {product.productTitle}
                            </h1>
                            <p className={styles.productPrice}><span>{product.productPrevPrice}</span>{product.productPrice}</p>
                            <p className={styles.productDesc}>{product.productDesc}</p>
                            <form onSubmit={handleFormSubmit}>
                                <label htmlFor="quantity">Quantity</label>
                                <select className={styles.quantitySelect} name="quantity" value={productQuantity}
                                    onChange={(e) => setProductQuantity(e.target.value)}>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                </select>
                                {!cartAddStatus && !isPending &&
                                    <button type="submit">ADD TO CART</button>
                                }
                                {isPending &&
                                    <button disabled >Adding...</button>
                                }
                                {cartAddStatus && !isPending &&
                                    <button disabled className={styles.successButton}>Added to Cart!</button>
                                }
                            </form>
                        </div>
                    </div>
                }
            </div >
        </>
    )
}

export default ProductShow;