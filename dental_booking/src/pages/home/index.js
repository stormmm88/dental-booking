import { Col, Row } from "antd";
import "./home.scss"
import ImgHero from "../../assets/bg01.jpg"
import { Link } from "react-router-dom";
import About from "../../components/about";
import Services from "../../components/services";
import Voucher from "../../components/voucher";
import Why from "../../components/why";
import Doctors from "../../components/doctor";
import Reviews from "../../components/reviews";


function Home(){
    return (
        <>
            {/* ======= HERO SECTION START =======  */}
            <section className="hero__section">
                <div className="container">
                    <div className="section__content">
                        <Row gutter={[20, 20]}>
                            <Col xxl={12} xl={12} lg={12} md={12} sm={24} xs={24}>
                                <h1 className="section__title">Dental Clinic – chăm sóc nụ cười của bạn với dịch vụ nha khoa uy tín và tận tâm.</h1>
                                <p className="section__desc">Dental Clinic là phòng khám nha khoa uy tín, cung cấp dịch vụ chăm sóc răng miệng chuyên nghiệp. Với đội ngũ bác sĩ giàu kinh nghiệm và thiết bị hiện đại, chúng tôi luôn đặt sức khỏe và nụ cười của bạn lên hàng đầu.</p>
                                <Link to='/bookingPage'>
                                    <button className="btn">Đặt lịch ngay</button>
                                </Link>
                                <div className="section__counter">
                                    <div>
                                         <h2 className="section__counter--number">30+</h2>
                                        <span className="number__underline number__underline--01"></span>
                                        <p className="text__para">Kinh nghiệm</p>
                                    </div>
                                    <div>
                                         <h2 className="section__counter--number">15+</h2>
                                        <span className="number__underline number__underline--02"></span>
                                        <p className="text__para">Chi nhánh toàn quốc</p>
                                    </div>
                                    <div>
                                         <h2 className="section__counter--number">100%</h2>
                                        <span className="number__underline number__underline--03"></span>
                                        <p className="text__para">Phản hồi tích cực</p>
                                    </div>
                                </div>
                            </Col>

                            <Col xxl={12} xl={12} lg={12} md={12} sm={24} xs={24}>
                                 <div className="ImgHero">
                                    <img src={ImgHero} alt="" />
                                </div>
                            </Col>
                        </Row>
                    </div>
                </div>
            </section>
            {/* ======= HERO SECTION END =======  */}

            {/* ======= ABOUT SECTION START =======  */}
                <About />
            {/* ======= ABOUT SECTION END =======  */}

            {/* ======= SERVICE SECTION START =======  */}
                <Services />
            {/* ======= SERVICE SECTION END =======  */}

            {/* ======= VOUCHER SECTION START =======  */}
                <Voucher />
            {/* ======= VOUCHER SECTION END =======  */}

            {/* ======= WHY SECTION START =======  */}
                <Why />
            {/* ======= WHY SECTION END =======  */}

            {/* ======= DOCTORS SECTION END =======  */}
                <Doctors />
            {/* ======= DOCTORS SECTION START =======  */}

            {/* ======= REVIEWS SECTION START =======  */}
                <Reviews />
            {/* ======= REVIEWS SECTION END =======  */}
        </>
    )
}

export default Home;


