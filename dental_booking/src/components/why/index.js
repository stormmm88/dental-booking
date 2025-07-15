import { Carousel, Col, Row } from "antd";
import { Link } from "react-router-dom";
import { useMemo } from "react";
import whyImg from "../../assets/why01.jpg";
import "./Why.scss";

const Why = () => {
  // Dữ liệu cho các card - có thể move ra ngoài component hoặc constants file
  const cardData = useMemo(() => [
    {
      id: 1,
      title: "Đội ngũ chuyên gia và tận tâm",
      description: "Đội ngũ nha sĩ giàu kinh nghiệm và thân thiện của chúng tôi luôn tận tâm cung cấp dịch vụ chăm sóc chất lượng cao với sự quan tâm chu đáo.",
      image: whyImg,
      alt: "Đội ngũ chuyên gia"
    },
    {
      id: 2,
      title: "Công nghệ hiện đại",
      description: "Sử dụng những công nghệ và thiết bị y tế tiên tiến nhất để đảm bảo hiệu quả điều trị tốt nhất cho bệnh nhân.",
      image: whyImg,
      alt: "Công nghệ hiện đại"
    },
    {
      id: 3,
      title: "Dịch vụ toàn diện",
      description: "Cung cấp đầy đủ các dịch vụ nha khoa từ cơ bản đến chuyên sâu, đáp ứng mọi nhu cầu chăm sóc răng miệng.",
      image: whyImg,
      alt: "Dịch vụ toàn diện"
    },
    {
      id: 4,
      title: "Môi trường an toàn",
      description: "Đảm bảo môi trường điều trị vô trùng, an toàn tuyệt đối với các tiêu chuẩn y tế quốc tế.",
      image: whyImg,
      alt: "Môi trường an toàn"
    },
    {
      id: 5,
      title: "Giá cả hợp lý",
      description: "Cam kết mang đến dịch vụ chất lượng cao với mức giá phải chăng, phù hợp với mọi gia đình.",
      image: whyImg,
      alt: "Giá cả hợp lý"
    }
  ], []);

  // Chia dữ liệu thành các nhóm 3 card mỗi slide
  const groupedCards = useMemo(() => {
    const groups = [];
    for (let i = 0; i < cardData.length; i += 3) {
      groups.push(cardData.slice(i, i + 3));
    }
    return groups;
  }, [cardData]);

  // Render card item
  const renderCard = (card) => (
    <div key={card.id} className="why__card">
      <div className="why__card-image">
        <img src={card.image} alt={card.alt} loading="lazy" />
      </div>
      <div className="why__card-content">
        <h3 className="why__card-title">{card.title}</h3>
        <p className="why__card-description">{card.description}</p>
      </div>
    </div>
  );

  // Cấu hình carousel
  const carouselSettings = useMemo(() => ({
    arrows: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 4000,
    dots: true,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          dots: true
        }
      }
    ]
  }), []);

  return (
    <section className="why">
      <div className="container">
        <div className="why__content">
          <Row gutter={[24, 24]} align="middle" className="why__header-row">
            <Col xxl={18} xl={18} lg={18} md={24} sm={24} xs={24}>
              <div className="why__header-content">
                <h2 className="why__title">
                  Tại sao nên chọn chúng tôi cho dịch vụ chăm sóc răng miệng của bạn?
                </h2>
                <p className="why__description">
                  Tại đây, chúng tôi không chỉ cung cấp các dịch vụ điều trị nha khoa mà còn
                  mang đến trải nghiệm đặt bệnh nhân lên hàng đầu, đảm bảo sự thoải mái,
                  chăm sóc tận tình và sự tự tin.
                </p>
              </div>
            </Col>
            <Col xxl={2} xl={2} lg={2} md={24} sm={24} xs={24}>
              {/* khoảng trắng */}
            </Col>
            <Col xxl={4} xl={4} lg={4} md={24} sm={24} xs={24}>
              <div className="why__cta">
                <Link to="/bookingPage" className="why__cta-link">
                  <button className="btn btn--primary btn--why" type="button">
                    Liên hệ ngay
                  </button>
                </Link>
              </div>
            </Col>
          </Row>

          <div className="why__carousel">
            <Carousel {...carouselSettings}>
              {groupedCards.map((group, index) => (
                <div key={index} className="why__slide">
                  <div className="why__cards-grid">
                    {group.map(renderCard)}
                  </div>
                </div>
              ))}
            </Carousel>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Why;