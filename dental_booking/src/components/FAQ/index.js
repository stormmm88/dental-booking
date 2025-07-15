import React, { useState } from 'react';
import './FAQ.scss';

const FAQ = () => {
  const [openItems, setOpenItems] = useState(new Set());
  const [searchTerm, setSearchTerm] = useState('');

  const faqData = [
    {
      id: 1,
      category: 'Dịch vụ chung',
      question: 'Phòng khám có những dịch vụ nha khoa nào?',
      answer: 'Chúng tôi cung cấp đầy đủ các dịch vụ nha khoa từ cơ bản đến nâng cao bao gồm: khám tổng quát, tẩy trắng răng, niềng răng, cấy ghép implant, bọc răng sứ, nhổ răng khôn, điều trị nướu, và các dịch vụ thẩm mỹ răng miệng khác. Tất cả được thực hiện bởi đội ngũ bác sĩ giàu kinh nghiệm với trang thiết bị hiện đại.',
      icon: '🦷'
    },
    {
      id: 2,
      category: 'Giá cả',
      question: 'Chi phí điều trị nha khoa như thế nào?',
      answer: 'Chi phí điều trị phụ thuộc vào loại dịch vụ và tình trạng răng miệng cụ thể. Chúng tôi luôn báo giá minh bạch và chi tiết trước khi điều trị. Phòng khám có các gói ưu đãi và hỗ trợ trả góp cho các ca điều trị lớn. Bạn có thể liên hệ để được tư vấn báo giá cụ thể.',
      icon: '💰'
    },
    {
      id: 3,
      category: 'Đặt lịch',
      question: 'Làm thế nào để đặt lịch khám?',
      answer: 'Bạn có thể đặt lịch khám qua nhiều cách: (1) Gọi điện trực tiếp đến hotline 0987 654 321, (2) Đặt lịch online trên website, (3) Nhắn tin qua Zalo hoặc Facebook, (4) Đến trực tiếp phòng khám. Chúng tôi làm việc từ 8:00 - 20:00 tất cả các ngày trong tuần.',
      icon: '📅'
    },
    {
      id: 4,
      category: 'Cấy ghép Implant',
      question: 'Cấy ghép implant có đau không? Thời gian thực hiện bao lâu?',
      answer: 'Thủ thuật cấy ghép implant được thực hiện dưới tê cục bộ nên không gây đau. Thời gian cấy ghép mỗi răng khoảng 30-45 phút. Sau cấy ghép, implant cần thời gian 3-6 tháng để lành ghép với xương hàm. Sau đó sẽ gắn mão răng sứ hoàn thiện.',
      icon: '🔧'
    },
    {
      id: 5,
      category: 'Niềng răng',
      question: 'Niềng răng mất bao lâu? Có những loại niềng răng nào?',
      answer: 'Thời gian niềng răng trung bình từ 18-24 tháng, tùy thuộc vào mức độ khó của ca điều trị. Chúng tôi có các loại niềng răng: niềng kim loại thường, niềng sứ, niềng mặt lưỡi, niềng trong suốt Invisalign. Bác sĩ sẽ tư vấn loại niềng phù hợp nhất cho từng trường hợp.',
      icon: '🦷'
    },
    {
      id: 6,
      category: 'Tẩy trắng răng',
      question: 'Tẩy trắng răng có an toàn không? Hiệu quả kéo dài bao lâu?',
      answer: 'Tẩy trắng răng bằng công nghệ hiện đại hoàn toàn an toàn khi thực hiện đúng quy trình. Răng có thể trắng hơn 3-8 tông màu. Hiệu quả kéo dài 2-3 năm nếu chăm sóc đúng cách. Sau tẩy trắng, bạn nên hạn chế thực phẩm có màu và vệ sinh răng miệng đúng cách.',
      icon: '✨'
    },
    {
      id: 7,
      category: 'Bảo hiểm',
      question: 'Phòng khám có hỗ trợ bảo hiểm y tế không?',
      answer: 'Chúng tôi hỗ trợ thanh toán qua bảo hiểm y tế xã hội cho các dịch vụ điều trị cơ bản. Đối với các dịch vụ thẩm mỹ và cao cấp, phòng khám có các gói ưu đãi và hỗ trợ trả góp 0% lãi suất. Bạn có thể mang theo thẻ bảo hiểm khi đến khám để được hỗ trợ tối đa.',
      icon: '🏥'
    },
    {
      id: 8,
      category: 'Chăm sóc sau điều trị',
      question: 'Sau điều trị cần chú ý gì? Có cần tái khám không?',
      answer: 'Sau mỗi lần điều trị, bác sĩ sẽ hướng dẫn cách chăm sóc cụ thể. Nói chung, bạn nên vệ sinh răng miệng đúng cách, hạn chế thực phẩm cứng/dính trong 24-48h đầu. Lịch tái khám sẽ được thông báo và nhắc nhở. Chúng tôi có chế độ bảo hành cho các dịch vụ điều trị.',
      icon: '🔄'
    },
    {
      id: 9,
      category: 'Khẩn cấp',
      question: 'Trường hợp răng đau cấp có thể đến khám ngay không?',
      answer: 'Có, chúng tôi nhận khám cấp cứu nha khoa 24/7. Bạn có thể gọi hotline khẩn cấp 0987 654 321 để được hỗ trợ ngay lập tức. Các trường hợp cấp cứu bao gồm: đau răng dữ dội, răng bị gãy, chảy máu nướu không cầm, nhiễm trùng nặng. Chúng tôi sẽ ưu tiên khám và xử lý ngay.',
      icon: '🚨'
    },
    {
      id: 10,
      category: 'Trẻ em',
      question: 'Phòng khám có dịch vụ nha khoa cho trẻ em không?',
      answer: 'Có, chúng tôi có chuyên khoa nha khoa trẻ em với đội ngũ bác sĩ được đào tạo chuyên sâu. Phòng khám được trang trí thân thiện, có đồ chơi và các hoạt động giúp trẻ bớt lo lắng. Chúng tôi cung cấp các dịch vụ: khám định kỳ, bôi fluor, hàn trám răng sữa, nhổ răng sữa, và tư vấn vệ sinh răng miệng cho trẻ.',
      icon: '👶'
    }
  ];

  const categories = [...new Set(faqData.map(item => item.category))];

  const [selectedCategory, setSelectedCategory] = useState('Tất cả');

  const toggleItem = (id) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(id)) {
      newOpenItems.delete(id);
    } else {
      newOpenItems.add(id);
    }
    setOpenItems(newOpenItems);
  };

  const expandAll = () => {
    setOpenItems(new Set(filteredFAQs.map(item => item.id)));
  };

  const collapseAll = () => {
    setOpenItems(new Set());
  };

  const filteredFAQs = faqData.filter(item => {
    const matchesSearch = item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'Tất cả' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <section className="faq">
      <div className="faq__container">
        {/* Header */}
        <div className="faq__header">
          <h2 className="faq__title">Câu hỏi thường gặp</h2>
          <p className="faq__subtitle">
            Tìm hiểu thêm về dịch vụ nha khoa của chúng tôi qua các câu hỏi phổ biến
          </p>
        </div>

        {/* Controls */}
        <div className="faq__controls">
          {/* Search */}
          <div className="faq__search">
            <div className="faq__search-wrapper">
              <span className="faq__search-icon">🔍</span>
              <input
                type="text"
                placeholder="Tìm kiếm câu hỏi..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="faq__search-input"
              />
              {searchTerm && (
                <button
                  className="faq__search-clear"
                  onClick={() => setSearchTerm('')}
                  aria-label="Xóa tìm kiếm"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Categories */}
          <div className="faq__categories">
            <button
              className={`faq__category ${selectedCategory === 'Tất cả' ? 'faq__category--active' : ''}`}
              onClick={() => setSelectedCategory('Tất cả')}
            >
              Tất cả
            </button>
            {categories.map(category => (
              <button
                key={category}
                className={`faq__category ${selectedCategory === category ? 'faq__category--active' : ''}`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Action buttons */}
          <div className="faq__actions">
            <button className="faq__action-btn" onClick={expandAll}>
              📖 Mở rộng tất cả
            </button>
            <button className="faq__action-btn" onClick={collapseAll}>
              📕 Thu gọn tất cả
            </button>
          </div>
        </div>

        {/* Results info */}
        <div className="faq__results">
          <p className="faq__results-text">
            Hiển thị <strong>{filteredFAQs.length}</strong> câu hỏi
            {searchTerm && ` cho "${searchTerm}"`}
            {selectedCategory !== 'Tất cả' && ` trong danh mục "${selectedCategory}"`}
          </p>
        </div>

        {/* FAQ Items */}
        <div className="faq__list">
          {filteredFAQs.length > 0 ? (
            filteredFAQs.map((item) => (
              <div
                key={item.id}
                className={`faq__item ${openItems.has(item.id) ? 'faq__item--open' : ''}`}
              >
                <button
                  className="faq__question"
                  onClick={() => toggleItem(item.id)}
                  aria-expanded={openItems.has(item.id)}
                  aria-controls={`faq-answer-${item.id}`}
                >
                  <span className="faq__question-icon">{item.icon}</span>
                  <span className="faq__question-text">{item.question}</span>
                  <span className="faq__question-category">{item.category}</span>
                  <span className="faq__toggle-icon">
                    {openItems.has(item.id) ? '−' : '+'}
                  </span>
                </button>
                
                <div
                  id={`faq-answer-${item.id}`}
                  className="faq__answer"
                  aria-hidden={!openItems.has(item.id)}
                >
                  <div className="faq__answer-content">
                    <p>{item.answer}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="faq__empty">
              <div className="faq__empty-icon">🤔</div>
              <h3 className="faq__empty-title">Không tìm thấy câu hỏi phù hợp</h3>
              <p className="faq__empty-text">
                Thử tìm kiếm với từ khóa khác hoặc chọn danh mục khác
              </p>
              <button
                className="faq__empty-btn"
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('Tất cả');
                }}
              >
                Xem tất cả câu hỏi
              </button>
            </div>
          )}
        </div>

        {/* Contact CTA */}
        <div className="faq__cta">
          <div className="faq__cta-content">
            <h3 className="faq__cta-title">Không tìm thấy câu trả lời?</h3>
            <p className="faq__cta-text">
              Liên hệ với chúng tôi để được tư vấn trực tiếp bởi các chuyên gia nha khoa
            </p>
            <div className="faq__cta-actions">
              <a href="tel:0987654321" className="faq__cta-btn faq__cta-btn--primary">
                📞 Gọi ngay
              </a>
              <a href="/contact" className="faq__cta-btn faq__cta-btn--secondary">
                💬 Nhắn tin
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;