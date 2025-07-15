import { Col, Row } from "antd";
import { Link } from "react-router-dom";
import voucherImg from "../../assets/first_time.jpg";
import "./voucher.scss";

function Voucher() {
    return (
        <section className="voucher__section">
            <div className="container">
                <div className="voucher__content">
                    <Row gutter={[40, 40]} align="middle">
                        <Col xxl={12} xl={12} lg={12} md={24} sm={24} xs={24}>
                            <div className="voucher__text">
                                <h2 className="voucher__header">
                                    Bạn lần đầu tiên khám tại đây? 
                                    <span> Tận hưởng ngay ưu đãi chào mừng đặc biệt!</span>
                                </h2>
                                <p className="voucher__desc">
                                    Bệnh nhân lần đầu sẽ được tư vấn miễn phí và giảm giá độc quyền cho lần điều trị đầu tiên.
                                </p>
                                <Link to="/bookingPage" className="voucher__link">
                                    <button className="btn btn--voucher">
                                        Liên hệ ngay
                                    </button>
                                </Link>
                            </div>
                        </Col>

                        <Col xxl={12} xl={12} lg={12} md={24} sm={24} xs={24}>
                            <div className="voucher__image">
                                <img src={voucherImg} alt="Ưu đãi khách hàng lần đầu" />
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
        </section>
    );
}

export default Voucher;