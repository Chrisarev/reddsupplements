import styles from './stylesheets/Home.module.css'
import Navbar from './Navbar'
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import goldProtein from './stylesheets/images/goldProtein.jpg'
import Footer from './Footer'
import cBumBanner from './stylesheets/images/cbumBanner.jpg'
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className={styles.panel}>
            <Navbar />
            <div className={styles.header}>Red Supplements</div>
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
                            <img src={cBumBanner} alt="" />
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
                    slidesPerView={4}
                    navigation
                    pagination={{ clickable: true }}
                    scrollbar={{ draggable: true }}
                    onSwiper={(swiper) => console.log(swiper)}
                    onSlideChange={() => console.log('Slide change')}
                >
                    <SwiperSlide>
                        <div className={styles.productHolder}>
                            <img src={goldProtein} alt="" />
                            <p>Gold's Protein</p>
                            <p className={styles.productPrice}>$30.00</p>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className={styles.productHolder}>
                            <img src={goldProtein} alt="" />
                            <p>Gold's Protein</p>
                            <p className={styles.productPrice}>$30.00</p>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className={styles.productHolder}>
                            <img src={goldProtein} alt="" />
                            <p>Gold's Protein</p>
                            <p className={styles.productPrice}>
                                <span className={styles.preDiscountPrice}>$35.00</span>
                                $30.00</p>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className={styles.productHolder}>
                            <img src={goldProtein} alt="" />
                            <p>Gold's Protein</p>
                            <p className={styles.productPrice}>$30.00</p>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className={styles.productHolder}>
                            <img src={goldProtein} alt="" />
                            <p>Gold's Protein</p>
                            <p className={styles.productPrice}>$30.00</p>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className={styles.productHolder}>
                            <img src={goldProtein} alt="" />
                            <p>Gold's Protein</p>
                            <p className={styles.productPrice}>$30.00</p>
                        </div>
                    </SwiperSlide>
                </Swiper>
            </div>
            <div className={styles.trainingSection}>
                <p>Get Personalized Training From Our Certified Experts!</p>
            </div>
            <div className={styles.categorySelector}>
                <h1>Shop By Category</h1>
                <div className={styles.categoriesHolder}>
                    <Link to='/protein'>
                        <img src={goldProtein} alt="" />
                        <h2>Protein</h2>
                        <button>SHOP NOW</button>
                    </Link>
                    <Link to='/preworkout'>
                        <img src={goldProtein} alt="" />
                        <h2>Preworkout</h2>
                        <button>SHOP NOW</button>
                    </Link>
                    <Link to='/supplements'>
                        <img src={goldProtein} alt="" />
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