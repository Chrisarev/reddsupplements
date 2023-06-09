import styles from './stylesheets/Protein.module.css'
import Navbar from './Navbar';
import Productdisplay from './Productdisplay';

const Protein = () =>{

    return(
        <>
        <Navbar />
        <Productdisplay tag='protein'/>
        </>
    )
}

export default Protein;