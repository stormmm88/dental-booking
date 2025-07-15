import { Col, Row } from "antd";
// import { Link } from "react-router-dom";
import docImg01 from "../../assets/doc1.jpg";
import docImg02 from "../../assets/doc2.jpg";
import docImg03 from "../../assets/doc3.jpg";
import "./doctors.scss";

const Doctors = () => {
    const doctorsData = [
        {
            id: 1,
            name: "Dr. Olivia Carter",
            image: docImg01,
            alt: "Dr. Olivia Carter - Bác sĩ nha khoa thẩm mỹ",
            role: "Bác sĩ nha khoa thẩm mỹ",
            delay: "0.1s"
        },
        {
            id: 2,
            name: "Dr. Benjamin Hayes",
            image: docImg02,
            alt: "Dr. Benjamin Hayes - Bác sĩ nha khoa nhi khoa",
            role: "Bác sĩ nha khoa nhi khoa",
            delay: "0.2s"
        },
        {
            id: 3,
            name: "Dr. William Moore",
            image: docImg03,
            alt: "Dr. William Moore - Bác sĩ chuyên khoa nha khoa nhi",
            role: "Bác sĩ chuyên khoa nha khoa nhi",
            delay: "0.3s"
        }
    ];

    return (
        <section className="doctors__section">
            <div className="container">
                <div className="doctors__content">
                    {/* Header Section */}
                    <Row gutter={[40, 40]} className="doctors__header">
                        <Col xxl={16} xl={16} lg={18} md={18} sm={24} xs={24}>
                            <h2 className="doctors__title">
                                <span>Tay nghề khéo léo, Trái tim nhân hậu</span> 
                            </h2>
                            <p className="doctors__desc">
                                Tại đây, đội ngũ chuyên gia nha khoa lành nghề và tận tâm của chúng tôi luôn tận tâm cung cấp dịch vụ chăm sóc chất lượng hàng đầu.
                            </p>
                        </Col>
                        {/* <Col xxl={8} xl={8} lg={6} md={6} sm={24} xs={24}>
                            <div className="doctors__button-wrapper">
                                <Link to='/servicePage' className="doctors__link">
                                    <button className="btn btn--doctors">
                                        Bác sĩ
                                    </button>
                                </Link>
                            </div>
                        </Col> */}
                    </Row>

                    {/* Doctors Grid */}
                    <Row gutter={[30, 30]} className="doctors__grid">
                        {doctorsData.map((doctor) => (
                            <Col
                                key={doctor.id}
                                xxl={8}
                                xl={8}
                                lg={12}
                                md={12}
                                sm={24}
                                xs={24}
                            >
                                <div
                                    className="doctor__card"
                                    style={{ animationDelay: doctor.delay }}
                                >
                                    <div className="doctor__image-container">
                                        <img
                                            src={doctor.image}
                                            alt={doctor.alt}
                                            className="doctor__image"
                                        />
                                        <div className="doctor__overlay">
                                            <div className="doctor__info">
                                                <h3 className="doctor__name">
                                                    {doctor.name}
                                                </h3>
                                                <p className="doctor__role">
                                                    {doctor.role}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        ))}
                    </Row>
                </div>
            </div>
        </section>
    );
};

export default Doctors;