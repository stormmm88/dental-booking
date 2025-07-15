import React from 'react';
import { Card, Button, Row, Col } from 'antd';
import { 
  SearchOutlined, 
  SmileOutlined, 
  ThunderboltOutlined,
  MedicineBoxOutlined,
  StarOutlined,
  ArrowRightOutlined
} from '@ant-design/icons';
import './servicePage.scss'
import { Link } from 'react-router-dom';

const ServicePage = () => {
  const services = [
    {
      id: 1,
      title: 'Làm trắng răng',
      description: 'Tại Dentcare, chúng tôi sẽ làm sáng nụ cười của bạn với các liệu trình làm trắng răng chuyên nghiệp.',
      icon: <SearchOutlined className="service-icon" />,
      bgColor: '#e8f4fd'
    },
    {
      id: 2,
      title: 'Cấy ghép răng Implant',
      description: 'Công nghệ cấy ghép tiên tiến của chúng tôi đảm bảo sự thoải mái, ổn định và nụ cười hoàn hảo.',
      icon: <MedicineBoxOutlined className="service-icon" />,
      bgColor: '#f0f9ff'
    },
    {
      id: 3,
      title: 'Chỉnh nha',
      description: 'Nắn thẳng răng của bạn bằng các giải pháp chỉnh nha hiện đại của chúng tôi, bao gồm niềng răng truyền thống và niềng răng trong suốt.',
      icon: <SmileOutlined className="service-icon" />,
      bgColor: '#fffbf0'
    },
    {
      id: 4,
      title: 'Khám sức khỏe',
      description: 'Khám răng định kỳ để duy trì sức khỏe răng miệng và ngăn ngừa các vấn đề về răng miệng trong tương lai.',
      icon: <SearchOutlined className="service-icon" />,
      bgColor: '#e8f4fd'
    },
    {
      id: 5,
      title: 'Nha khoa thẩm mỹ',
      description: 'Nâng cao nụ cười của bạn với mặt dán sứ, một phương pháp dán sứ được thiết kế để cải thiện vẻ ngoài của răng.',
      icon: <StarOutlined className="service-icon" />,
      bgColor: '#f0f9ff'
    },
    {
      id: 6,
      title: 'Chăm sóc Nha khoa Khẩn cấp',
      description: 'Khi xảy ra trường hợp khẩn cấp về nha khoa, đội ngũ của chúng tôi luôn sẵn sàng cung cấp dịch vụ chăm sóc khẩn cấp khi bạn cần nhất',
      icon: <ThunderboltOutlined className="service-icon" />,
      bgColor: '#fffbf0'
    }
  ];

  return (
    <div className="dental-services">
      <div className="container">
        <Row gutter={[24, 24]}>
          {services.map((service) => (
            <Col xs={24} md={12} lg={8} key={service.id}>
              <Card 
                className="service-card"
                style={{ backgroundColor: service.bgColor }}
                bordered={false}
              >
                <div className="service-content">
                  <div className="service-header">
                    {service.icon}
                    <h3 className="service-title">{service.title}</h3>
                  </div>
                  
                  <p className="service-description">
                    {service.description}
                  </p>
                  
                  <Link to="/bookingPage">
                      <Button 
                      type="text" 
                      className="appointment-btn"
                      icon={<ArrowRightOutlined />}
                      iconPosition="end"
                      >
                       Đặt lịch ngay
                      </Button>
                  </Link>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default ServicePage;