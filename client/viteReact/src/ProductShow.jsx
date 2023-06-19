import styles from './stylesheets/ProductShow.module.css'
import Navbar from './Navbar';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
const ProductShow = () =>{
    const routeParams = useParams(); 
    const [product, setProduct] = useState();

    useEffect(() => {
        fetch(`category/${routeParams.prodID}`,{
            method:'GET',
            headers: {"Content-Type":"application/json"}
        }).then((response) =>{
            return response.json()
        }).then((data) =>{
            setProduct(prev => data); 
        })
    }, [])

    
    return(
        <div className={styles.panel}>
            <div className={styles.productInfo}>
                {product.productTitle}
            </div>
        </div>
    )
}

export default ProductShow;