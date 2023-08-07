import styles from './stylesheets/Home.module.css'
import Navbar from './Navbar'
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import dynaProtein from './stylesheets/images/dymatizeProtein.jpg'
import optiCreatine from './stylesheets/images/optiCreatine.jpg'
import optiPre from './stylesheets/images/optiPre.webp'
import goldProtein from './stylesheets/images/goldProtein2.jpg'
import premier from './stylesheets/images/premierProtein.jpg'
import bumPre from './stylesheets/images/bumPre.jpg'
import Footer from './Footer'
import cBumBanner from './stylesheets/images/cbumBanner.jpg'
import ghostBanner from './stylesheets/images/ghostBanner.jpg'
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react'
const Home = () => {
    const [slideCount, setSlideCount] = useState(4);

    function getWindowDimensions() {
        const { innerWidth: width, innerHeight: height } = window;
        return {
            width,
            height
        };
    }

    /* windowDimensions state that holds window width and height*/
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

    /* This useEffect activates whenever window is resized */
    useEffect(() => {
        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    function getSlideValue() {
        if (windowDimensions.width < 1200) {
            return 3;
        } else {
            return 4;
        }
    }

    return (
        <div className={styles.panel}>
            <Navbar />
            <div className={styles.promotionSection}>
                <Swiper
                    modules={[Navigation, Pagination, Scrollbar, A11y]}
                    spaceBetween={0}
                    slidesPerView={1}
                    navigation
                    pagination={{ clickable: true }}
                    scrollbar={{ draggable: true }}
                    onSwiper={(swiper) => console.log(swiper)}
                    onSlideChange={() => console.log('Slide change')}
                >
                    <SwiperSlide>
                        <div className={styles.imageHolder}>
                            <img src={cBumBanner} alt="" />
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className={styles.imageHolder}>
                            <img src={ghostBanner} alt="" />
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className={styles.imageHolder}>
                            <img src={cBumBanner} alt="" />
                        </div>
                    </SwiperSlide>
                </Swiper>
            </div>
            <div className={styles.popularHeader}>Most Popular</div>
            <div className={styles.swiperHolder}>
                <Swiper
                    modules={[Navigation, Pagination, Scrollbar, A11y]}
                    spaceBetween={30}
                    slidesPerView={getSlideValue()}
                    navigation
                    pagination={{ clickable: true }}
                    scrollbar={{ draggable: true }}
                    onSwiper={(swiper) => console.log(swiper)}
                    onSlideChange={() => console.log('Slide change')}
                >

                    <SwiperSlide>
                        <Link to='/product/64b48061e6de85ae357e1884' className={styles.productHolder}>
                            <div className={styles.imgHolder}>
                                <img src={dynaProtein} alt="" />
                            </div>
                            <p>Dymatize Protein Powder - Rich Chocolate Flavor</p>
                            <p className={styles.productPrice}>
                                <span className={styles.preDiscountPrice}>$67.00</span>
                                $62.00
                            </p>
                        </Link>
                    </SwiperSlide>
                    <SwiperSlide>
                        <Link to='/product/64934e9b1ab0db0e10ff298f' className={styles.productHolder}>
                            <div className={styles.imgHolder}>
                                <img src={premier} alt="" />
                            </div>
                            <p>Vanilla Milkshake Premier Protein</p>
                            <p className={styles.productPrice}>
                                <span className={styles.preDiscountPrice}>$30.00</span>
                                $25.00</p>
                        </Link>
                    </SwiperSlide>
                    <SwiperSlide>
                        <Link to='/product/64b4868af6076bec379d4cc6' className={styles.productHolder}>
                            <div className={styles.imgHolder}>
                                <img src={optiCreatine} alt="" />
                            </div>
                            <p>Optimum Nutrition Micronized Creatine Monohydrate Powder 60 Servings</p>
                            <p className={styles.productPrice}>$25.00</p>
                        </Link>
                    </SwiperSlide>
                    <SwiperSlide>
                        <Link to='/product/64c99cb5e8909086e1626a1e' className={styles.productHolder}>
                            <div className={styles.imgHolder}>
                                <img src={bumPre} alt="" />
                            </div>
                            <p>Thavage (Green Crush) Cbum Preworkout for Working Out, Hydration, Mental Focus & Energy - 40 Servings</p>
                            <p className={styles.productPrice}>$50.00</p>
                        </Link>
                    </SwiperSlide>
                </Swiper>
            </div>
            <div className={styles.trainingSection}>
                <div className={styles.content}>
                    <p>Get Personalized Training From Our Certified Experts!</p>
                    <div className={styles.buttonHolder}>
                        <button>See Trainers</button>
                        <button>Learn More</button>
                    </div>
                </div>
            </div>
            <div className={styles.categorySelector}>
                <h1>Shop By Category</h1>
                <div className={styles.categoriesHolder}>
                    <Link to='/category/protein'>
                        <img src={goldProtein} alt="" />
                        <h2>Protein</h2>
                        <button>SHOP NOW</button>
                    </Link>
                    <Link to='/category/preworkout'>
                        <img src={optiPre} alt="" />
                        <h2>Preworkout</h2>
                        <button>SHOP NOW</button>
                    </Link>
                    <Link to='/category/supplement'>
                        <img src={optiCreatine} alt="" />
                        <h2>Supplements</h2>
                        <button>SHOP NOW</button>
                    </Link>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Home 