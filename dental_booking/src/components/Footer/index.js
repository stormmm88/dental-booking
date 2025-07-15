import React from 'react';
import './Footer.scss';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const companyInfo = {
    name: "DentCare",
    slogan: "Nụ cười rạng rỡ - Cuộc sống tự tin",
    description: "Chúng tôi cam kết mang đến dịch vụ chăm sóc răng miệng chất lượng cao với đội ngũ bác sĩ giàu kinh nghiệm và công nghệ hiện đại nhất."
  };

  const contactDetails = [
    {
      id: 1,
      icon: "📍",
      label: "Địa chỉ",
      value: "123 Đường Hàm Răng, Cầu Giấy, Hà Nội",
      type: "address"
    },
    {
      id: 2,
      icon: "📞",
      label: "Điện thoại",
      value: "0987 654 321",
      type: "phone",
      href: "tel:0987654321"
    },
    {
      id: 3,
      icon: "✉️",
      label: "Email",
      value: "info@nhakhoasangngoi.vn",
      type: "email",
      href: "mailto:info@nhakhoasangngoi.vn"
    },
    {
      id: 4,
      icon: "🕐",
      label: "Giờ làm việc",
      value: "8:00 - 20:00 (Thứ 2 - Chủ nhật)",
      type: "hours"
    }
  ];

  const quickLinks = [
    { id: 1, name: "Trang chủ", href: "/home" },
    { id: 2, name: "Giới thiệu", href: "/aboutPage" },
    { id: 3, name: "Dịch vụ", href: "/servicePage" },
    { id: 4, name: "Liên hệ", href: "/bookingPage" }
  ];

  const services = [
    { id: 1, name: "Tẩy trắng răng", href: "/services/whitening" },
    { id: 2, name: "Niềng răng", href: "/services/braces" },
    { id: 3, name: "Cấy ghép Implant", href: "/services/implant" },
    { id: 4, name: "Bọc răng sứ", href: "/services/porcelain" },
    { id: 5, name: "Nhổ răng khôn", href: "/services/extraction" },
    { id: 6, name: "Điều trị nướu", href: "/services/gum-treatment" }
  ];

  const socialLinks = [
    { id: 1, name: "Facebook", icon: "📘", href: "#" },
    { id: 2, name: "Instagram", icon: "📷", href: "#" },
    { id: 3, name: "YouTube", icon: "📺", href: "#" },
    { id: 4, name: "Zalo", icon: "💬", href: "#" }
  ];

  const handleSocialClick = (platform) => {
    console.log(`Clicked ${platform}`);
  };

  return (
    <footer className="footer">
      <div className="footer__wave">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,60 Q300,120 600,60 T1200,60 L1200,0 L0,0 Z" fill="currentColor" />
        </svg>
      </div>

      <div className="footer__main">
        <div className="footer__container">
          {/* Company Information */}
          <div className="footer__section footer__company">
            <div className="footer__logo">
              <h2 className="footer__brand">{companyInfo.name}</h2>
              <p className="footer__slogan">{companyInfo.slogan}</p>
            </div>
            <p className="footer__description">{companyInfo.description}</p>
            
            <div className="footer__social">
              <h4 className="footer__social-title">Theo dõi chúng tôi</h4>
              <div className="footer__social-links">
                {socialLinks.map((social) => (
                  <a
                    key={social.id}
                    href={social.href}
                    className="footer__social-link"
                    onClick={() => handleSocialClick(social.name)}
                    aria-label={`Theo dõi trên ${social.name}`}
                  >
                    <span className="footer__social-icon">{social.icon}</span>
                    <span className="footer__social-name">{social.name}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="footer__section footer__contact">
            <h3 className="footer__title">Thông tin liên hệ</h3>
            <ul className="footer__contact-list">
              {contactDetails.map((contact) => (
                <li key={contact.id} className="footer__contact-item">
                  <span className="footer__contact-icon">{contact.icon}</span>
                  <div className="footer__contact-content">
                    <span className="footer__contact-label">{contact.label}:</span>
                    {contact.href ? (
                      <a 
                        href={contact.href} 
                        className="footer__contact-link"
                        aria-label={`${contact.label}: ${contact.value}`}
                      >
                        {contact.value}
                      </a>
                    ) : (
                      <span className="footer__contact-text">{contact.value}</span>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div className="footer__section footer__links">
            <h3 className="footer__title">Liên kết nhanh</h3>
            <ul className="footer__nav-list">
              {quickLinks.map((link) => (
                <li key={link.id} className="footer__nav-item">
                  <a 
                    href={link.href} 
                    className="footer__nav-link"
                    aria-label={`Đi đến ${link.name}`}
                  >
                    <span className="footer__nav-arrow">▸</span>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="footer__section footer__services">
            <h3 className="footer__title">Dịch vụ nổi bật</h3>
            <ul className="footer__service-list">
              {services.map((service) => (
                <li key={service.id} className="footer__service-item">
                  <a 
                    href={service.href} 
                    className="footer__service-link"
                    aria-label={`Tìm hiểu về ${service.name}`}
                  >
                    <span className="footer__service-dot">•</span>
                    {service.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer__bottom">
        <div className="footer__container">
          <div className="footer__bottom-content">
            <p className="footer__copyright">
              © {currentYear} {companyInfo.name}. Tất cả quyền được bảo lưu.
            </p>
            <div className="footer__legal">
              <a href="/privacy" className="footer__legal-link">
                Chính sách bảo mật
              </a>
              <span className="footer__divider">|</span>
              <a href="/terms" className="footer__legal-link">
                Điều khoản sử dụng
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;