import React, { useState } from 'react';
import { Col, Row, Rate, Button, Form, Input, message, Avatar } from 'antd';
import { UserOutlined, StarFilled, LikeOutlined, MessageOutlined } from '@ant-design/icons';
import './reviews.scss';

const { TextArea } = Input;

const Reviews = () => {
    const [reviews, setReviews] = useState([
        {
            id: 1,
            name: "Nguyễn Minh Anh",
            avatar: null,
            rating: 5,
            date: "2024-12-15",
            service: "Làm trắng răng",
            doctor: "Dr. Olivia Carter",
            comment: "Dịch vụ tuyệt vời! Bác sĩ rất tận tâm và chuyên nghiệp. Răng của tôi trắng sáng hơn rõ rệt sau 1 buổi điều trị. Phòng khám sạch sẽ, hiện đại. Tôi sẽ quay lại lần sau.",
            likes: 24,
            isLiked: false,
            verified: true
        },
        {
            id: 2,
            name: "Trần Văn Hùng",
            avatar: null,
            rating: 5,
            date: "2024-12-10",
            service: "Cấy ghép răng",
            doctor: "Dr. Benjamin Hayes",
            comment: "Quá trình cấy ghép diễn ra rất suôn sẻ. Bác sĩ Hayes giải thích rất kỹ từng bước và không hề đau đớn. Sau 3 tháng, răng cấy ghép rất chắc khỏe. Highly recommended!",
            likes: 18,
            isLiked: false,
            verified: true
        },
        {
            id: 3,
            name: "Phạm Thị Lan",
            avatar: null,
            rating: 4,
            date: "2024-12-08",
            service: "Niềng răng",
            doctor: "Dr. William Moore",
            comment: "Dịch vụ niềng răng rất tốt, bác sĩ Moore rất kiên nhẫn với trẻ em. Con tôi ban đầu sợ nhưng giờ rất thích đi khám. Giá cả hợp lý, kết quả đạt yêu cầu.",
            likes: 15,
            isLiked: false,
            verified: true
        },
        {
            id: 4,
            name: "Lê Quang Minh",
            avatar: null,
            rating: 5,
            date: "2024-12-05",
            service: "Khám tổng quát",
            doctor: "Dr. Olivia Carter",
            comment: "Đặt lịch online rất tiện lợi. Nhân viên lễ tân thân thiện, bác sĩ khám rất kỹ. Giá cả minh bạch, không phát sinh chi phí. Tôi sẽ giới thiệu cho bạn bè.",
            likes: 32,
            isLiked: false,
            verified: true
        },
        {
            id: 5,
            name: "Võ Thị Mai",
            avatar: null,
            rating: 4,
            date: "2024-12-01",
            service: "Tẩy cao răng",
            doctor: "Dr. Benjamin Hayes",
            comment: "Dịch vụ tẩy cao răng rất sạch sẽ. Bác sĩ tư vấn kỹ về cách chăm sóc răng miệng hàng ngày. Thời gian chờ hơi lâu nhưng chất lượng dịch vụ tốt bù đắp.",
            likes: 12,
            isLiked: false,
            verified: true
        },
        {
            id: 6,
            name: "Hoàng Anh Tuấn",
            avatar: null,
            rating: 5,
            date: "2024-11-28",
            service: "Điều trị tủy răng",
            doctor: "Dr. William Moore",
            comment: "Tôi rất lo lắng về việc điều trị tủy răng nhưng bác sĩ Moore đã làm tôi an tâm. Quá trình điều trị không đau, kỹ thuật hiện đại. Sau điều trị răng không còn đau nhức.",
            likes: 21,
            isLiked: false,
            verified: true
        }
    ]);

    const [form] = Form.useForm();
    const [submitting, setSubmitting] = useState(false);

    // Statistics
    const totalReviews = reviews.length;
    const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews;
    const ratingDistribution = [5, 4, 3, 2, 1].map(star => ({
        star,
        count: reviews.filter(review => review.rating === star).length,
        percentage: (reviews.filter(review => review.rating === star).length / totalReviews) * 100
    }));

    const handleLike = (reviewId) => {
        setReviews(prev => prev.map(review => 
            review.id === reviewId 
                ? { 
                    ...review, 
                    likes: review.isLiked ? review.likes - 1 : review.likes + 1,
                    isLiked: !review.isLiked 
                }
                : review
        ));
    };

    const handleSubmitReview = async (values) => {
        setSubmitting(true);
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            const newReview = {
                id: reviews.length + 1,
                name: values.name,
                avatar: null,
                rating: values.rating,
                date: new Date().toISOString().split('T')[0],
                service: values.service,
                doctor: values.doctor,
                comment: values.comment,
                likes: 0,
                isLiked: false,
                verified: false
            };
            
            setReviews(prev => [newReview, ...prev]);
            form.resetFields();
            message.success('Cảm ơn bạn đã đánh giá! Đánh giá của bạn đã được gửi thành công.');
        } catch (error) {
            message.error('Có lỗi xảy ra, vui lòng thử lại sau.');
        } finally {
            setSubmitting(false);
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('vi-VN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <section className="reviews__section">
            <div className="container">
                <div className="reviews__content">
                    {/* Header */}
                    <div className="reviews__header">
                        <h2 className="reviews__title">
                            <span>Đánh giá từ khách hàng</span>
                        </h2>
                        <p className="reviews__subtitle">
                            Những chia sẻ chân thật từ khách hàng đã trải nghiệm dịch vụ của chúng tôi
                        </p>
                    </div>

                    {/* Statistics */}
                    <div className="reviews__stats">
                        <Row gutter={[30, 30]}>
                            <Col xxl={8} xl={8} lg={8} md={24} sm={24} xs={24}>
                                <div className="reviews__overall">
                                    <div className="reviews__overall-rating">
                                        <span className="reviews__rating-number">
                                            {averageRating.toFixed(1)}
                                        </span>
                                        <div className="reviews__rating-stars">
                                            <Rate disabled defaultValue={averageRating} allowHalf />
                                        </div>
                                    </div>
                                    <p className="reviews__total-count">
                                        Dựa trên {totalReviews} đánh giá
                                    </p>
                                </div>
                            </Col>
                            <Col xxl={16} xl={16} lg={16} md={24} sm={24} xs={24}>
                                <div className="reviews__distribution">
                                    {ratingDistribution.map((item) => (
                                        <div key={item.star} className="reviews__distribution-item">
                                            <span className="reviews__star-label">
                                                {item.star} <StarFilled />
                                            </span>
                                            <div className="reviews__progress-bar">
                                                <div 
                                                    className="reviews__progress-fill"
                                                    style={{ width: `${item.percentage}%` }}
                                                />
                                            </div>
                                            <span className="reviews__count">
                                                {item.count}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </Col>
                        </Row>
                    </div>

                    {/* Reviews List */}
                    <div className="reviews__list">
                        <Row gutter={[30, 30]}>
                            {reviews.map((review) => (
                                <Col key={review.id} xxl={12} xl={12} lg={12} md={24} sm={24} xs={24}>
                                    <div className="review__card">
                                        <div className="review__header">
                                            <div className="review__user">
                                                <Avatar 
                                                    size={50} 
                                                    icon={<UserOutlined />} 
                                                    src={review.avatar}
                                                    className="review__avatar"
                                                />
                                                <div className="review__user-info">
                                                    <h4 className="review__name">
                                                        {review.name}
                                                        {review.verified && (
                                                            <span className="review__verified">✓</span>
                                                        )}
                                                    </h4>
                                                    <p className="review__date">
                                                        {formatDate(review.date)}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="review__rating">
                                                <Rate disabled defaultValue={review.rating} />
                                            </div>
                                        </div>
                                        
                                        <div className="review__service-info">
                                            <span className="review__service">{review.service}</span>
                                            <span className="review__doctor">• {review.doctor}</span>
                                        </div>
                                        
                                        <div className="review__content">
                                            <p className="review__comment">{review.comment}</p>
                                        </div>
                                        
                                        <div className="review__actions">
                                            <Button 
                                                type="text" 
                                                icon={<LikeOutlined />}
                                                onClick={() => handleLike(review.id)}
                                                className={`review__like-btn ${review.isLiked ? 'liked' : ''}`}
                                            >
                                                Hữu ích ({review.likes})
                                            </Button>
                                            <Button 
                                                type="text" 
                                                icon={<MessageOutlined />}
                                                className="review__reply-btn"
                                            >
                                                Trả lời
                                            </Button>
                                        </div>
                                    </div>
                                </Col>
                            ))}
                        </Row>
                    </div>

                    {/* Review Form */}
                    <div className="reviews__form-section">
                        <div className="reviews__form-header">
                            <h3 className="reviews__form-title">Chia sẻ trải nghiệm của bạn</h3>
                            <p className="reviews__form-subtitle">
                                Đánh giá của bạn sẽ giúp những khách hàng khác có thêm thông tin tham khảo
                            </p>
                        </div>
                        
                        <Form
                            form={form}
                            layout="vertical"
                            onFinish={handleSubmitReview}
                            className="reviews__form"
                        >
                            <Row gutter={[20, 20]}>
                                <Col xxl={12} xl={12} lg={12} md={12} sm={24} xs={24}>
                                    <Form.Item
                                        label="Họ và tên"
                                        name="name"
                                        rules={[{ required: true, message: 'Vui lòng nhập họ tên!' }]}
                                    >
                                        <Input placeholder="Nhập họ và tên của bạn" />
                                    </Form.Item>
                                </Col>
                                <Col xxl={12} xl={12} lg={12} md={12} sm={24} xs={24}>
                                    <Form.Item
                                        label="Đánh giá"
                                        name="rating"
                                        rules={[{ required: true, message: 'Vui lòng chọn số sao!' }]}
                                    >
                                        <Rate />
                                    </Form.Item>
                                </Col>
                                <Col xxl={12} xl={12} lg={12} md={12} sm={24} xs={24}>
                                    <Form.Item
                                        label="Dịch vụ đã sử dụng"
                                        name="service"
                                        rules={[{ required: true, message: 'Vui lòng nhập dịch vụ!' }]}
                                    >
                                        <Input placeholder="VD: Làm trắng răng, Cấy ghép răng..." />
                                    </Form.Item>
                                </Col>
                                <Col xxl={12} xl={12} lg={12} md={12} sm={24} xs={24}>
                                    <Form.Item
                                        label="Bác sĩ điều trị"
                                        name="doctor"
                                        rules={[{ required: true, message: 'Vui lòng nhập tên bác sĩ!' }]}
                                    >
                                        <Input placeholder="VD: Dr. Olivia Carter" />
                                    </Form.Item>
                                </Col>
                                <Col span={24}>
                                    <Form.Item
                                        label="Nhận xét chi tiết"
                                        name="comment"
                                        rules={[
                                            { required: true, message: 'Vui lòng nhập nhận xét!' },
                                            { min: 20, message: 'Nhận xét phải có ít nhất 20 ký tự!' }
                                        ]}
                                    >
                                        <TextArea 
                                            rows={4} 
                                            placeholder="Chia sẻ trải nghiệm của bạn về dịch vụ, bác sĩ, chất lượng phục vụ..."
                                            showCount
                                            maxLength={500}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span={24}>
                                    <Form.Item>
                                        <Button 
                                            type="primary" 
                                            htmlType="submit"
                                            size="large"
                                            loading={submitting}
                                            className="reviews__submit-btn"
                                        >
                                            {submitting ? 'Đang gửi...' : 'Gửi đánh giá'}
                                        </Button>
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Reviews;