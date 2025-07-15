import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './register.scss';

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    birthDate: '',
    address: '',
    password: '',
    confirmPassword: '',
    medicalHistory: '',
    terms: false,
    newsletter: false
  });

  const [errors, setErrors] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) newErrors.firstName = 'Họ là bắt buộc';
    if (!formData.lastName.trim()) newErrors.lastName = 'Tên là bắt buộc';

    if (!formData.email.trim()) {
      newErrors.email = 'Email là bắt buộc';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email không hợp lệ';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Số điện thoại là bắt buộc';
    } else if (!/^0\d{9,10}$/.test(formData.phone)) {
      newErrors.phone = 'Số điện thoại không hợp lệ';
    }

    if (!formData.password) {
      newErrors.password = 'Mật khẩu là bắt buộc';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Mật khẩu phải có ít nhất 6 ký tự';
    } else if (!/(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Mật khẩu phải có ít nhất 1 chữ hoa và 1 số';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Mật khẩu xác nhận không khớp';
    }

    if (!formData.terms) {
      newErrors.terms = 'Bạn phải đồng ý với điều khoản sử dụng';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      setShowSuccess(true);
      console.log('Form submitted:', formData);

      setTimeout(() => {
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          birthDate: '',
          address: '',
          password: '',
          confirmPassword: '',
          medicalHistory: '',
          terms: false,
          newsletter: false
        });
        setShowSuccess(false);
      }, 3000);
    }
  };

  return (
    <div className="registration-container">
      <div className="registration-card">
        <div className="left-panel">
          <div className="dental-icon">🦷</div>
          <h1>Chào mừng đến với DentCare</h1>
          <p>
            Hệ thống đặt lịch khám nha khoa hiện đại, tiện lợi và chuyên nghiệp.
            Đăng ký ngay để trải nghiệm dịch vụ tốt nhất!
          </p>
        </div>

        <div className="right-panel">
          <div className="form-title">
            <h2>Đăng Ký Tài Khoản</h2>
            <p>Điền thông tin để tạo tài khoản mới</p>
          </div>

          {showSuccess && (
            <div className="success-message">
              Đăng ký thành công! Chúng tôi sẽ liên hệ với bạn sớm nhất.
            </div>
          )}

          <form onSubmit={handleSubmit} className="registration-form">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="firstName">Họ *</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className={errors.firstName ? 'error' : ''}
                />
                {errors.firstName && <span className="error-message">{errors.firstName}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="lastName">Tên *</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className={errors.lastName ? 'error' : ''}
                />
                {errors.lastName && <span className="error-message">{errors.lastName}</span>}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="email">Email *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={errors.email ? 'error' : ''}
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="phone">Số điện thoại *</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={errors.phone ? 'error' : ''}
                />
                {errors.phone && <span className="error-message">{errors.phone}</span>}
              </div>
              <div className="form-group">
                <label htmlFor="birthDate">Ngày sinh</label>
                <input
                  type="date"
                  id="birthDate"
                  name="birthDate"
                  value={formData.birthDate}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            {/* <div className="form-group">
              <label htmlFor="address">Địa chỉ</label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Số nhà, tên đường, quận/huyện, tỉnh/thành"
              />
            </div> */}

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="password">Mật khẩu *</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={errors.password ? 'error' : ''}
                />
                {errors.password && <span className="error-message">{errors.password}</span>}
              </div>
              <div className="form-group">
                <label htmlFor="confirmPassword">Xác nhận mật khẩu *</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className={errors.confirmPassword ? 'error' : ''}
                />
                {errors.confirmPassword && (
                  <span className="error-message">{errors.confirmPassword}</span>
                )}
              </div>
            </div>

            {/* <div className="form-group">
              <label htmlFor="medicalHistory">Tiền sử bệnh (nếu có)</label>
              <textarea
                id="medicalHistory"
                name="medicalHistory"
                value={formData.medicalHistory}
                onChange={handleInputChange}
                rows="3"
                placeholder="Mô tả ngắn gọn về các vấn đề sức khỏe răng miệng hoặc dị ứng thuốc..."
              />
            </div> */}

            {/* <div className="checkbox-group">
              <input
                type="checkbox"
                id="terms"
                name="terms"
                checked={formData.terms}
                onChange={handleInputChange}
                className={errors.terms ? 'error' : ''}
              />
              <label htmlFor="terms">
                Tôi đồng ý với <a href="#" onClick={(e) => e.preventDefault()}>Điều khoản sử dụng</a> và{' '}
                <a href="#" onClick={(e) => e.preventDefault()}>Chính sách bảo mật</a> của DentCare
              </label>
            </div>
            {errors.terms && <span className="error-message">{errors.terms}</span>}

            <div className="checkbox-group">
              <input
                type="checkbox"
                id="newsletter"
                name="newsletter"
                checked={formData.newsletter}
                onChange={handleInputChange}
              />
              <label htmlFor="newsletter">
                Tôi muốn nhận thông tin khuyến mãi và tin tức từ DentCare
              </label>
            </div> */}

            <button type="submit" className="btn-register">
              Đăng Ký Tài Khoản
            </button>
          </form>

          <div className="login-link">
            Đã có tài khoản?{' '}
            <Link to="/login">Đăng nhập ngay</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
