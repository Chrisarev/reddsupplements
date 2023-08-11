
import Navbar from './Navbar';
import { useParams } from 'react-router-dom';
import styles from './stylesheets/ProductsGrid.module.css';
import Productdisplay from './Productdisplay';

const ProductsGrid = () => {
    const {category} = useParams();
    console.log(category);

    return (
        <>
            <Navbar />
            <div className={styles.optionsSelector}></div>
            <Productdisplay key={category} tag={category} />
        </>
    )
}

export default ProductsGrid;