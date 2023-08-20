import Navbar from './Navbar';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import styles from './stylesheets/Productshow.module.css';
import goldProtein from './stylesheets/images/goldProtein.jpg'
import creatine from './stylesheets/images/optiCreatine.jpg'
import dyma from './stylesheets/images/dymatizeProtein.jpg'
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { CartContext } from './CartContext';


const ProductShow = () => {
    let navigate = useNavigate();
    const { prodID } = useParams();
    const [product, setProduct] = useState();
    const [productQuantity, setProductQuantity] = useState('0');
    const [productVariation, setProductVariation] = useState('');
    const [cartAddStatus, setCartAddStatus] = useState(false);
    const [isPending, setIsPending] = useState(false);
    const { cart2, setCart2 } = useContext(CartContext)

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
        /*const FD = new FormData(); 
        FD.append('productQuantity', productQuantity);
        FD.append('prodID', prodID);
        console.log(FD); */
        const data = { productQuantity, prodID }
        setIsPending(true);

        fetch('/api/addCart', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        }).then((response) => {
            if (response.status == 204) {
                console.log('added to cart')
                let temp = cart2;
                setCart2(prev => temp);
                setIsPending(false);
                setCartAddStatus(true);
                return response;
            }
            if (response.status == 500) {
                navigate('/login')
                return response;
            }
            setIsPending(false);
            setCartAddStatus(false);
            return response;
        })
    }

    return (
        <>
            <Navbar />
            <div className={styles.panel}>
                <div className={styles.productPanel}>
                    <div className={styles.imageHolder}>
                        <img className={styles.productIMG} src={goldProtein}></img>
                    </div>
                    <div className={styles.productInfo}>
                        <h1 className={styles.productTitle}>
                            Test Product to Test
                        </h1>
                        <p className={styles.productPrice}><span>$40.00</span>$35.00</p>
                        <p className={styles.productDesc}>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sit reprehenderit vitae repellat atque similique officiis natus sunt ipsum unde! Esse, porro ducimus totam iste quaerat natus omnis quos eos sequi!
                            Veniam totam laborum architecto quisquam dolorum culpa quod perspiciatis voluptates? Inventore autem reiciendis incidunt deleniti quasi suscipit provident sequi iure, sit fugit error fugiat sapiente, magni dignissimos, doloremque facere illum.
                            Neque nulla ex magnam sed. Sint molestiae vel earum quo totam eligendi numquam est dolores ducimus dolore aliquid nihil nostrum necessitatibus vitae, magnam cupiditate placeat repudiandae ex incidunt. Quasi, molestiae.
                            Harum deleniti molestiae quis est ex alias ad nostrum itaque impedit exercitationem nobis, maiores, architecto quae! Enim similique rerum nam? Quae enim impedit, error non consectetur voluptas quibusdam numquam sapiente?
                            Tenetur recusandae dolor officiis ab dignissimos explicabo iste illum quidem quis culpa perspiciatis aliquid error natus, inventore veniam architecto tempore ad mollitia et? Id illo expedita voluptatem eaque totam atque.</p>
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
                {product &&
                    <div className={styles.productPanel}>
                        <div className={styles.imageHolder}>
                            <img className={styles.productIMG} src={product.image}></img>
                        </div>
                        <div className={styles.productInfo}>
                            <h1 className={styles.productTitle}>
                                {product.productTitle}
                            </h1>
                            <p className={styles.productPrice}><span>${product.productPrevPrice}</span>${product.productPrice.$numberDecimal}</p>
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
            </div>
        </>
    )
}

export default ProductShow;