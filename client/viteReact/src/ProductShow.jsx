import Navbar from './Navbar';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import styles from './stylesheets/Productshow.module.css';

const ProductShow = () => {
    const routeParams = useParams();
    const [product, setProduct] = useState();

    useEffect(() => {
        fetch(`product/${routeParams.prodID}`, {
            method: 'GET',
            headers: { "Content-Type": "application/json" }
        }).then((response) => {
            return response.json()
        }).then((data) => {
            console.log(data);
            setProduct(data);
        })
    }, [])


    return (
        <>
            <Navbar />
            <div className={styles.panel}>

            </div>
        </>
    )
}

export default ProductShow;