import { Col, Row } from "antd";
import { Link } from "react-router-dom";
import SerImg01 from "../../assets/teeth__white.jpg";
import SerImg02 from "../../assets/Dental__Implants.jpg";
import SerImg03 from "../../assets/ser-03.jpg";
import "./services.scss";

function Services() {
    const servicesData = [
        {
            id: 1,
            name: "Làm trắng răng",
            image: SerImg01,
            alt: "Làm trắng răng",
            description: "Làm sáng nụ cười của bạn với phương pháp làm trắng răng chuyên nghiệp an toàn và hiệu quả.",
            delay: "0.1s"
        },
        {
            id: 2,
            name: "Cấy ghép răng",
            image: SerImg02,
            alt: "Cấy ghép răng",
            description: "Khôi phục răng đã mất vĩnh viễn bằng cấy ghép răng trông tự nhiên.",
            delay: "0.2s"
        },
        {
            id: 3,
            name: "Nha khoa thẩm mĩ",
            image: SerImg03,
            alt: "Nha khoa thẩm mĩ",
            description: "Cải thiện nụ cười của bạn bằng mặt dán sứ, liên kết răng và nhiều phương pháp khác.",
            delay: "0.3s"
        }
    ];

    return (
        <section className="services__section">
            <div className="container">
                <div className="services__content">
                    {/* Header Section */}
                    <Row gutter={[40, 40]} className="services__header">
                        <Col xxl={16} xl={16} lg={18} md={18} sm={24} xs={24}>
                            <h2 className="services__title">
                                <span>Chăm sóc răng miệng</span> toàn diện cho mọi nụ cười
                            </h2>
                            <p className="services__desc">
                                Tại đây, chúng tôi cung cấp đầy đủ các dịch vụ chăm sóc răng miệng để giữ cho nụ cười của bạn luôn khỏe mạnh, rạng rỡ và tự tin.
                            </p>
                        </Col>
                        <Col xxl={8} xl={8} lg={6} md={6} sm={24} xs={24}>
                            <div className="services__button-wrapper">
                                <Link to='/servicePage' className="services__link">
                                    <button className="btn btn--services">
                                        Dịch vụ
                                    </button>
                                </Link>
                            </div>
                        </Col>
                    </Row>

                    {/* Services Grid */}
                    <Row gutter={[30, 30]} className="services__grid">
                        {servicesData.map((service) => (
                            <Col
                                key={service.id}
                                xxl={8}
                                xl={8}
                                lg={12}
                                md={12}
                                sm={24}
                                xs={24}
                            >
                                <div
                                    className="service__card"
                                    style={{ animationDelay: service.delay }}
                                >
                                    <div className="service__image-wrapper">
                                        <img
                                            src={service.image}
                                            alt={service.alt}
                                            className="service__image"
                                        />
                                        <div className="service__overlay">
                                            <div className="service__name">
                                                {service.name}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="service__content">
                                        <h3 className="service__title">
                                            {service.name}
                                        </h3>
                                        <p className="service__description">
                                            {service.description}
                                        </p>
                                    </div>
                                </div>
                            </Col>
                        ))}
                    </Row>
                </div>
            </div>
        </section>
    );
}

export default Services;