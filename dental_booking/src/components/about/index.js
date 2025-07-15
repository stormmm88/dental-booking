import { Col, Row } from "antd";
import aboutImg from "../../assets/about.jpg"
import { Link } from "react-router-dom";
import "./about.scss"; // Import SCSS file

function About() {
    return (
        <section className="about__section">
            <div className="container">
                <Row gutter={[40, 40]} align="middle" className="about__row">
                    <Col xxl={12} xl={12} lg={12} md={12} sm={24} xs={24}>
                        <div className="about__image">
                            <img src={aboutImg} alt="Giới thiệu phòng khám nha khoa" />
                        </div>
                    </Col>

                    <Col xxl={12} xl={12} lg={12} md={12} sm={24} xs={24}>
                        <div className="about__content">
                            <Link to='/aboutPage' className="about__link">
                                <button className="btn btn--about">
                                    Giới thiệu
                                </button>
                            </Link>
                            <h2 className="about__title">
                                <span>Giới Thiệu</span> – Chất Lượng Tạo Nên Niềm Tin
                            </h2>
                            <p className="about__desc about__desc--primary">
                                Phòng khám nha khoa của chúng tôi cam kết cung cấp dịch vụ điều trị đạt chuẩn y khoa, 
                                ứng dụng công nghệ hiện đại và quy trình chăm sóc chuyên nghiệp, nhằm mang đến trải 
                                nghiệm an toàn và hiệu quả cho từng khách hàng.
                            </p>
                            <p className="about__desc about__desc--secondary">
                                Với đội ngũ bác sĩ nhiều năm kinh nghiệm và không ngừng cập nhật kiến thức mới, 
                                chúng tôi luôn đặt sức khỏe răng miệng và sự hài lòng của khách hàng lên hàng đầu 
                                trong mọi dịch vụ.
                            </p>
                        </div>
                    </Col>
                </Row>
            </div>
        </section>
    )
}

export default About;