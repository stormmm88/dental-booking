/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { 
  Form, 
  Input, 
  Select, 
  DatePicker, 
  TimePicker, 
  Button, 
  Card, 
  Row, 
  Col, 
  Space,
  Typography,
  Divider,
  Radio,
  message,
  Result,
  Checkbox,
  Alert,
  Spin
} from 'antd';
import { 
  UserOutlined, 
  PhoneOutlined, 
  MailOutlined, 
  EnvironmentOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  CalendarOutlined,
  VideoCameraOutlined,
  MedicineBoxOutlined,
  EditOutlined,
  InfoCircleOutlined,
  LoadingOutlined,
  LoginOutlined
} from '@ant-design/icons';
import dayjs from 'dayjs';
import './BookingPage.scss'

const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;
const { Option } = Select;

const Bookingpage = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);
  const [appointmentType, setAppointmentType] = useState('offline');
  const [useAccountInfo, setUseAccountInfo] = useState(true);
  const [showEditInfo, setShowEditInfo] = useState(false);
  console.log(showEditInfo);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  // Data from JSON server
  const [services, setServices] = useState([]);
  const [timeSlots, setTimeSlots] = useState([]);
  const [clinicInfo, setClinicInfo] = useState({});
  const [userAccountData, setUserAccountData] = useState({});

  // JSON Server base URL
  const JSON_SERVER_URL = 'http://localhost:3001';

  // Token management
  const getToken = () => {
    return localStorage.getItem('authToken');
  };

  const setToken = (token) => {
    localStorage.setItem('authToken', token);
  };

  const removeToken = () => {
    localStorage.removeItem('authToken');
  };

  // Check authentication
  const checkAuth = async () => {
    const token = getToken();
    if (!token) {
      setIsAuthenticated(false);
      return false;
    }

    try {
      const response = await fetch(`${JSON_SERVER_URL}/auth/verify`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        setIsAuthenticated(true);
        return true;
      } else {
        removeToken();
        setIsAuthenticated(false);
        return false;
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      // For demo purposes, assume token is valid if server is not available
      setIsAuthenticated(true);
      return true;
    }
  };

  // Fetch data from JSON server with token
  const fetchData = async () => {
    try {
      setDataLoading(true);
      
      const token = getToken();
      const headers = {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` })
      };
      
      // Fetch all data concurrently
      const [servicesRes, timeSlotsRes, clinicRes, userRes] = await Promise.all([
        fetch(`${JSON_SERVER_URL}/services`, { headers }),
        fetch(`${JSON_SERVER_URL}/timeSlots`, { headers }),
        fetch(`${JSON_SERVER_URL}/clinicInfo`, { headers }),
        isAuthenticated ? fetch(`${JSON_SERVER_URL}/user/profile`, { headers }) : Promise.resolve(null)
      ]);

      // Check if all requests were successful
      if (!servicesRes.ok || !timeSlotsRes.ok || !clinicRes.ok) {
        throw new Error('Failed to fetch data from server');
      }

      // Parse JSON data
      const servicesData = await servicesRes.json();
      const timeSlotsData = await timeSlotsRes.json();
      const clinicData = await clinicRes.json();
      const userData = userRes && userRes.ok ? await userRes.json() : null;

      // Update state
      setServices(servicesData);
      setTimeSlots(timeSlotsData);
      setClinicInfo(clinicData);
      
      if (userData) {
        setUserAccountData({ ...userData, isLoggedIn: true });
      } else {
        setUserAccountData({ isLoggedIn: false });
      }

    } catch (error) {
      console.error('Error fetching data:', error);
      message.error('Không thể tải dữ liệu từ server. Sử dụng dữ liệu mẫu.');
      
      // Fallback to default data
      setServices([
        { value: 'general-checkup', label: 'Khám tổng quát' },
        { value: 'teeth-cleaning', label: 'Vệ sinh răng miệng' },
        { value: 'filling', label: 'Hàn răng' },
        { value: 'root-canal', label: 'Điều trị tủy răng' },
        { value: 'extraction', label: 'Nhổ răng' },
        { value: 'orthodontics', label: 'Niềng răng' },
        { value: 'implant', label: 'Cấy ghép implant' },
        { value: 'whitening', label: 'Tẩy trắng răng' },
        { value: 'consultation', label: 'Tư vấn nha khoa' }
      ]);
      
      setTimeSlots([
        '08:00', '08:30', '09:00', '09:30', '10:00', '10:30',
        '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00'
      ]);
      
      setClinicInfo({
        name: "Nha Khoa ABC",
        address: "123 Đường ABC, Quận 1, TP.HCM",
        phone: "0901 234 567",
        email: "info@nhakhoa.com",
        workingHours: "Thứ 2 - Chủ nhật: 8:00 - 17:30"
      });
      
      if (isAuthenticated) {
        setUserAccountData({
          fullName: "Nguyễn Văn An",
          phone: "0901234567",
          email: "nguyenvanan@gmail.com",
          isLoggedIn: true
        });
      } else {
        setUserAccountData({ isLoggedIn: false });
      }
    } finally {
      setDataLoading(false);
    }
  };

  // Submit appointment to JSON server with token
  const submitAppointment = async (appointmentData) => {
    try {
      const token = getToken();
      const headers = {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` })
      };

      const response = await fetch(`${JSON_SERVER_URL}/appointments`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          ...appointmentData,
          id: Date.now(), // Simple ID generation
          status: 'pending',
          createdAt: new Date().toISOString(),
          userId: userAccountData.id || null
        })
      });

      if (response.status === 401) {
        removeToken();
        setIsAuthenticated(false);
        message.error('Token đã hết hạn, vui lòng đăng nhập lại');
        return;
      }

      if (!response.ok) {
        throw new Error('Failed to submit appointment');
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error submitting appointment:', error);
      throw error;
    }
  };

  // Check available time slots for a specific date
  const checkAvailableTimeSlots = async (date) => {
    try {
      const token = getToken();
      const headers = {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` })
      };

      const response = await fetch(`${JSON_SERVER_URL}/appointments?date=${date}`, { headers });
      
      if (!response.ok) {
        throw new Error('Failed to check availability');
      }
      
      const existingAppointments = await response.json();
      const bookedTimes = existingAppointments.map(apt => apt.time);
      
      return timeSlots.filter(time => !bookedTimes.includes(time));
    } catch (error) {
      console.error('Error checking availability:', error);
      return timeSlots; // Return all slots if check fails
    }
  };

  // Login function (for demo purposes)
  const handleLogin = async () => {
    try {
      const response = await fetch(`${JSON_SERVER_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: 'nguyenvanan@gmail.com',
          password: 'password123'
        })
      });

      if (response.ok) {
        const { token } = await response.json();
        setToken(token);
        setIsAuthenticated(true);
        message.success('Đăng nhập thành công!');
        fetchData();
      } else {
        throw new Error('Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      // For demo purposes, create a mock token
      const mockToken = 'mock-jwt-token-' + Date.now();
      setToken(mockToken);
      setIsAuthenticated(true);
      message.success('Đăng nhập thành công (Demo)!');
      fetchData();
    }
  };

  // Initialize app
  useEffect(() => {
    const initApp = async () => {
      const isAuth = await checkAuth();
      setIsAuthenticated(isAuth);
      await fetchData();
    };
    initApp();
  }, []);

  // Auto-fill form with user account data
  useEffect(() => {
    if (userAccountData.isLoggedIn && useAccountInfo) {
      form.setFieldsValue({
        fullName: userAccountData.fullName,
        phone: userAccountData.phone,
        email: userAccountData.email
      });
    }
  }, [form, useAccountInfo, userAccountData]);

  const disabledDate = (current) => {
    return current && current < dayjs().startOf('day');
  };

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const formattedData = {
        ...values,
        date: values.date.format('DD/MM/YYYY'),
        time: values.time.format('HH:mm'),
        appointmentType,
        useAccountInfo,
        isAuthenticated
      };
      
      // Submit to JSON server
      await submitAppointment(formattedData);
      
      setSubmittedData(formattedData);
      setIsSubmitted(true);
      message.success('Đặt lịch thành công!');
      
      // Reset form after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setSubmittedData(null);
        form.resetFields();
        setAppointmentType('offline');
        setUseAccountInfo(true);
        setShowEditInfo(false);
      }, 5000);
      
    } catch (error) {
      message.error('Có lỗi xảy ra khi đặt lịch, vui lòng thử lại!');
      console.error('Submit error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAppointmentTypeChange = (e) => {
    setAppointmentType(e.target.value);
  };

  const handleUseAccountInfoChange = (e) => {
    const checked = e.target.checked;
    setUseAccountInfo(checked);
    setShowEditInfo(!checked);
    
    if (checked) {
      form.setFieldsValue({
        fullName: userAccountData.fullName,
        phone: userAccountData.phone,
        email: userAccountData.email
      });
    } else {
      form.setFieldsValue({
        fullName: '',
        phone: '',
        email: ''
      });
    }
  };

  const handleDateChange = async (date) => {
    if (date) {
      const dateStr = date.format('DD/MM/YYYY');
      try {
        const availableSlots = await checkAvailableTimeSlots(dateStr);
        console.log('Available slots for', dateStr, ':', availableSlots);
      } catch (error) {
        console.error('Error checking availability:', error);
      }
    }
  };

  // Show loading spinner while fetching data
  if (dataLoading) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        background: '#f5f5f5', 
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <Spin 
          indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
          tip="Đang tải dữ liệu..."
        />
      </div>
    );
  }

  if (isSubmitted) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        background: '#f5f5f5', 
        padding: '20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <Card style={{ maxWidth: 600, width: '100%' }}>
          <Result
            icon={<CheckCircleOutlined style={{ color: '#52c41a' }} />}
            title="Đặt lịch thành công!"
            subTitle="Chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất để xác nhận lịch hẹn."
            extra={
              <Card 
                title="Thông tin lịch hẹn" 
                size="small" 
                style={{ textAlign: 'left', marginTop: 20 }}
              >
                <Space direction="vertical" size="small" style={{ width: '100%' }}>
                  <div><strong>Họ tên:</strong> {submittedData?.fullName}</div>
                  <div><strong>Loại lịch:</strong> {appointmentType === 'offline' ? 'Khám tại phòng khám' : 'Tư vấn trực tuyến'}</div>
                  <div><strong>Dịch vụ:</strong> {services.find(s => s.value === submittedData?.service)?.label}</div>
                  <div><strong>Ngày:</strong> {submittedData?.date}</div>
                  <div><strong>Giờ:</strong> {submittedData?.time}</div>
                  {submittedData?.phone && <div><strong>Số điện thoại:</strong> {submittedData.phone}</div>}
                  {submittedData?.email && <div><strong>Email:</strong> {submittedData.email}</div>}
                  {submittedData?.isAuthenticated && <div><strong>Trạng thái:</strong> <span style={{ color: '#52c41a' }}>Đã đăng nhập</span></div>}
                </Space>
              </Card>
            }
          />
        </Card>
      </div>
    );
  }

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: '#f5f5f5', 
      padding: '20px 16px' 
    }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: 40 }}>
        <Title level={1} style={{ color: '#1890ff', marginBottom: 8 }}>
          Đặt lịch khám nha khoa
        </Title>
        <Paragraph style={{ fontSize: '16px', color: '#666' }}>
          Đặt lịch hẹn nhanh chóng và tiện lợi
        </Paragraph>
        {!isAuthenticated && (
          <Alert
            message="Thông báo"
            description={
              <div>
                Bạn chưa đăng nhập. Bạn vẫn có thể đặt lịch nhưng sẽ không thể theo dõi lịch sử đặt lịch.{' '}
                <Button type="link" onClick={handleLogin} style={{ padding: 0 }}>
                  Đăng nhập ngay
                </Button>
              </div>
            }
            type="info"
            showIcon
            style={{ maxWidth: 600, margin: '0 auto', marginBottom: 20 }}
          />
        )}
      </div>

      {/* Main Content */}
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <Row gutter={[32, 32]}>
          {/* Left Column - Clinic Information */}
          <Col xs={24} lg={10}>
            <Card title="Thông tin phòng khám" bordered={false}>
              <Space direction="vertical" size="large" style={{ width: '100%' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                  <EnvironmentOutlined style={{ color: '#1890ff', fontSize: 16, marginTop: 2 }} />
                  <div>
                    <Text strong>Địa chỉ</Text>
                    <br />
                    <Text type="secondary">{clinicInfo.address}</Text>
                  </div>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                  <PhoneOutlined style={{ color: '#1890ff', fontSize: 16, marginTop: 2 }} />
                  <div>
                    <Text strong>Điện thoại</Text>
                    <br />
                    <Text type="secondary">{clinicInfo.phone}</Text>
                  </div>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                  <MailOutlined style={{ color: '#1890ff', fontSize: 16, marginTop: 2 }} />
                  <div>
                    <Text strong>Email</Text>
                    <br />
                    <Text type="secondary">{clinicInfo.email}</Text>
                  </div>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                  <ClockCircleOutlined style={{ color: '#1890ff', fontSize: 16, marginTop: 2 }} />
                  <div>
                    <Text strong>Giờ làm việc</Text>
                    <br />
                    <Text type="secondary">{clinicInfo.workingHours}</Text>
                  </div>
                </div>
              </Space>

              <Divider />

              <Card 
                size="small" 
                style={{ 
                  backgroundColor: '#f0f9ff', 
                  border: '1px solid #bae0ff' 
                }}
              >
                <Title level={5} style={{ color: '#1890ff', marginBottom: 12 }}>
                  Cam kết của chúng tôi
                </Title>
                <Space direction="vertical" size="small">
                  <Text>• Đội ngũ bác sĩ giàu kinh nghiệm</Text>
                  <Text>• Trang thiết bị hiện đại</Text>
                  <Text>• Dịch vụ chăm sóc tận tâm</Text>
                  <Text>• Giá cả hợp lý, minh bạch</Text>
                </Space>
              </Card>

              {/* Authentication Status */}
              <Divider />
              <Card 
                size="small" 
                style={{ 
                  backgroundColor: isAuthenticated ? '#f6ffed' : '#fff7e6', 
                  border: `1px solid ${isAuthenticated ? '#b7eb8f' : '#ffd591'}` 
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <LoginOutlined style={{ color: isAuthenticated ? '#52c41a' : '#faad14' }} />
                  <Text strong style={{ color: isAuthenticated ? '#52c41a' : '#faad14' }}>
                    {isAuthenticated ? 'Đã đăng nhập' : 'Chưa đăng nhập'}
                  </Text>
                </div>
                {isAuthenticated ? (
                  <Text type="secondary" style={{ fontSize: 12 }}>
                    Bạn có thể theo dõi lịch sử đặt lịch và quản lý thông tin cá nhân
                  </Text>
                ) : (
                  <div style={{ marginTop: 8 }}>
                    <Text type="secondary" style={{ fontSize: 12, display: 'block' }}>
                      Đăng nhập để theo dõi lịch sử và quản lý thông tin dễ dàng hơn
                    </Text>
                    <Button 
                      type="link" 
                      size="small" 
                      onClick={handleLogin}
                      style={{ padding: 0, marginTop: 4 }}
                    >
                      Đăng nhập ngay
                    </Button>
                  </div>
                )}
              </Card>
            </Card>
          </Col>

          {/* Right Column - Booking Form */}
          <Col xs={24} lg={14}>
            <Card title="Đặt lịch khám" bordered={false}>
              <div>
                <Form
                  form={form}
                  layout="vertical"
                  onFinish={handleSubmit}
                  requiredMark={false}
                  size="large"
                >
                {/* Appointment Type */}
                <Form.Item 
                  label="Loại lịch hẹn"
                  name="appointmentType"
                  rules={[{ required: true, message: 'Vui lòng chọn loại lịch hẹn!' }]}
                >
                  <Radio.Group 
                    value={appointmentType} 
                    onChange={handleAppointmentTypeChange}
                    style={{ width: '100%' }}
                  >
                    <Row gutter={16}>
                      <Col xs={24} sm={12}>
                        <Radio.Button 
                          value="offline" 
                          style={{ 
                            height: 'auto', 
                            padding: '12px 16px',
                            display: 'flex',
                            alignItems: 'center',
                            width: '100%'
                          }}
                        >
                          <div style={{ textAlign: 'center', width: '100%' }}>
                            <MedicineBoxOutlined style={{ fontSize: 20, marginBottom: 4 }} />
                            <div>Khám tại phòng khám</div>
                          </div>
                        </Radio.Button>
                      </Col>
                      <Col xs={24} sm={12}>
                        <Radio.Button 
                          value="online" 
                          style={{ 
                            height: 'auto', 
                            padding: '12px 16px',
                            display: 'flex',
                            alignItems: 'center',
                            width: '100%'
                          }}
                        >
                          <div style={{ textAlign: 'center', width: '100%' }}>
                            <VideoCameraOutlined style={{ fontSize: 20, marginBottom: 4 }} />
                            <div>Tư vấn trực tuyến</div>
                          </div>
                        </Radio.Button>
                      </Col>
                    </Row>
                  </Radio.Group>
                </Form.Item>

                {/* Account Information Section */}
                {userAccountData.isLoggedIn && (
                  <Card 
                    size="small" 
                    style={{ 
                      backgroundColor: '#f6ffed', 
                      border: '1px solid #b7eb8f',
                      marginBottom: 24
                    }}
                  >
                    <div style={{ marginBottom: 12 }}>
                      <InfoCircleOutlined style={{ color: '#52c41a', marginRight: 8 }} />
                      <Text strong>Thông tin tài khoản</Text>
                    </div>
                    
                    <Checkbox 
                      checked={useAccountInfo} 
                      onChange={handleUseAccountInfoChange}
                      style={{ marginBottom: 12 }}
                    >
                      Sử dụng thông tin từ tài khoản của tôi
                    </Checkbox>
                    
                    {useAccountInfo && (
                      <div style={{ marginLeft: 24 }}>
                        <Space direction="vertical" size="small">
                          <Text><strong>Họ tên:</strong> {userAccountData.fullName}</Text>
                          <Text><strong>Điện thoại:</strong> {userAccountData.phone}</Text>
                          <Text><strong>Email:</strong> {userAccountData.email}</Text>
                        </Space>
                      </div>
                    )}
                    
                    {!useAccountInfo && (
                      <Alert
                        message="Bạn có thể nhập thông tin khác hoặc đặt lịch cho người thân"
                        type="info"
                        showIcon
                        style={{ marginTop: 8 }}
                      />
                    )}
                  </Card>
                )}

                {/* Personal Information Fields */}
                {(!userAccountData.isLoggedIn || !useAccountInfo) && (
                  <>
                    {/* Full Name */}
                    <Form.Item
                      label="Họ và tên"
                      name="fullName"
                      rules={[{ required: true, message: 'Vui lòng nhập họ và tên!' }]}
                    >
                      <Input 
                        prefix={<UserOutlined />} 
                        placeholder="Nhập họ và tên" 
                      />
                    </Form.Item>

                    {/* Phone and Email */}
                    <Row gutter={16}>
                      <Col xs={24} sm={12}>
                        <Form.Item
                          label="Số điện thoại"
                          name="phone"
                          rules={[
                            { required: true, message: 'Vui lòng nhập số điện thoại!' },
                            { pattern: /^[0-9]{10,11}$/, message: 'Số điện thoại không hợp lệ!' }
                          ]}
                        >
                          <Input 
                            prefix={<PhoneOutlined />} 
                            placeholder="0901 234 567" 
                          />
                        </Form.Item>
                      </Col>
                      <Col xs={24} sm={12}>
                        <Form.Item
                          label="Email"
                          name="email"
                          rules={[
                            { type: 'email', message: 'Email không hợp lệ!' }
                          ]}
                        >
                          <Input 
                            prefix={<MailOutlined />} 
                            placeholder="email@example.com" 
                          />
                        </Form.Item>
                      </Col>
                    </Row>
                  </>
                )}

                {/* Edit Information Button for logged-in users */}
                {userAccountData.isLoggedIn && useAccountInfo && (
                  <Form.Item>
                    <Button 
                      type="link" 
                      icon={<EditOutlined />}
                      onClick={() => setUseAccountInfo(false)}
                      style={{ padding: 0, marginBottom: 16 }}
                    >
                      Chỉnh sửa thông tin cho lần đặt lịch này
                    </Button>
                  </Form.Item>
                )}

                {/* Service */}
                <Form.Item
                  label="Dịch vụ"
                  name="service"
                  rules={[{ required: true, message: 'Vui lòng chọn dịch vụ!' }]}
                >
                  <Select placeholder="-- Chọn dịch vụ --">
                    {services.map(service => (
                      <Option key={service.value} value={service.value}>
                        {service.label}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>

                {/* Date and Time */}
                <Row gutter={16}>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      label="Ngày khám"
                      name="date"
                      rules={[{ required: true, message: 'Vui lòng chọn ngày khám!' }]}
                    >
                      <DatePicker 
                        style={{ width: '100%' }}
                        placeholder="Chọn ngày khám"
                        disabledDate={disabledDate}
                        format="DD/MM/YYYY"
                        suffixIcon={<CalendarOutlined />}
                        onChange={handleDateChange}
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      label="Giờ khám"
                      name="time"
                      rules={[{ required: true, message: 'Vui lòng chọn giờ khám!' }]}
                    >
                      <TimePicker 
                        style={{ width: '100%' }}
                        placeholder="Chọn giờ khám"
                        format="HH:mm"
                        minuteStep={30}
                        showNow={false}
                        suffixIcon={<ClockCircleOutlined />}
                      />
                    </Form.Item>
                  </Col>
                </Row>

                {/* Notes */}
                <Form.Item
                  label="Ghi chú"
                  name="notes"
                >
                  <TextArea 
                    rows={4} 
                    placeholder="Mô tả triệu chứng hoặc yêu cầu đặc biệt..." 
                  />
                </Form.Item>

                {/* Submit Button */}
                <Form.Item>
                  <Button 
                    type="primary" 
                    htmlType="submit" 
                    loading={loading}
                    size="large"
                    style={{ 
                      width: '100%', 
                      height: 48,
                      fontSize: 16,
                      fontWeight: 600
                    }}
                  >
                    {loading ? 'Đang xử lý...' : 'Đặt lịch ngay'}
                  </Button>
                </Form.Item>
                </Form>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Bookingpage;