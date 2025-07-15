/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import {
  Card,
  Row,
  Col,
  Form,
  Input,
  Button,
  Table,
  Tag,
  Space,
  Typography,
  message,
  Modal,
  Spin,
  Alert,
  Tabs,
  Descriptions,
  Popconfirm,
  Result
} from 'antd';
import {
  UserOutlined,
  PhoneOutlined,
  MailOutlined,
  CalendarOutlined,
  ClockCircleOutlined,
  EditOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
  CheckCircleOutlined,
  SyncOutlined,
  CloseCircleOutlined,
  HistoryOutlined,
  SaveOutlined,
  ReloadOutlined,
  LoginOutlined,
  LogoutOutlined
} from '@ant-design/icons';
import dayjs from 'dayjs';
import './Profile.scss';

const { Title, Text } = Typography;
const { TabPane } = Tabs;

const Profile = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const [appointments, setAppointments] = useState([]);
  const [services, setServices] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

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
      setDataLoading(false);
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

  // Fetch user data and appointments with token
  const fetchUserData = async () => {
    const token = getToken();
    if (!token) {
      setIsAuthenticated(false);
      setDataLoading(false);
      return;
    }

    try {
      setDataLoading(true);
      
      const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      };

      const [userRes, appointmentsRes, servicesRes] = await Promise.all([
        fetch(`${JSON_SERVER_URL}/user/profile`, { headers }),
        fetch(`${JSON_SERVER_URL}/appointments/user`, { headers }),
        fetch(`${JSON_SERVER_URL}/services`, { headers })
      ]);

      if (userRes.status === 401 || appointmentsRes.status === 401) {
        removeToken();
        setIsAuthenticated(false);
        message.error('Token đã hết hạn, vui lòng đăng nhập lại');
        return;
      }

      if (!userRes.ok || !appointmentsRes.ok || !servicesRes.ok) {
        throw new Error('Failed to fetch data from server');
      }

      const userData = await userRes.json();
      const appointmentsData = await appointmentsRes.json();
      const servicesData = await servicesRes.json();

      setUserInfo(userData);
      setAppointments(appointmentsData);
      setServices(servicesData);

      // Set form values
      form.setFieldsValue({
        fullName: userData.fullName,
        phone: userData.phone,
        email: userData.email,
        address: userData.address || '',
        dateOfBirth: userData.dateOfBirth || '',
        gender: userData.gender || ''
      });

    } catch (error) {
      console.error('Error fetching user data:', error);
      message.error('Không thể tải dữ liệu từ server');
      
      // Fallback data for demo
      const fallbackUser = {
        id: 1,
        fullName: "Nguyễn Văn An",
        phone: "0901234567",
        email: "nguyenvanan@gmail.com",
        address: "123 Đường ABC, Quận 1, TP.HCM",
        dateOfBirth: "01/01/1990",
        gender: "Nam"
      };
      
      const fallbackAppointments = [
        {
          id: 1,
          fullName: "Nguyễn Văn An",
          service: "general-checkup",
          date: "15/07/2025",
          time: "09:00",
          status: "confirmed",
          appointmentType: "offline",
          notes: "Khám tổng quát định kỳ",
          createdAt: "2025-07-10T10:00:00Z"
        },
        {
          id: 2,
          fullName: "Nguyễn Văn An",
          service: "teeth-cleaning",
          date: "20/07/2025",
          time: "14:30",
          status: "pending",
          appointmentType: "offline",
          notes: "Vệ sinh răng miệng",
          createdAt: "2025-07-12T15:30:00Z"
        }
      ];
      
      const fallbackServices = [
        { value: 'general-checkup', label: 'Khám tổng quát' },
        { value: 'teeth-cleaning', label: 'Vệ sinh răng miệng' },
        { value: 'filling', label: 'Hàn răng' },
        { value: 'root-canal', label: 'Điều trị tủy răng' }
      ];
      
      setUserInfo(fallbackUser);
      setAppointments(fallbackAppointments);
      setServices(fallbackServices);
      
      form.setFieldsValue(fallbackUser);
    } finally {
      setDataLoading(false);
    }
  };

  // Update user information with token
  const updateUserInfo = async (values) => {
    const token = getToken();
    if (!token) {
      message.error('Vui lòng đăng nhập lại');
      return;
    }

    try {
      setLoading(true);
      
      const updatedUser = { ...userInfo, ...values };
      
      const response = await fetch(`${JSON_SERVER_URL}/user/profile`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedUser)
      });

      if (response.status === 401) {
        removeToken();
        setIsAuthenticated(false);
        message.error('Token đã hết hạn, vui lòng đăng nhập lại');
        return;
      }

      if (!response.ok) {
        throw new Error('Failed to update user information');
      }

      const result = await response.json();
      setUserInfo(result);
      setEditMode(false);
      message.success('Cập nhật thông tin thành công!');
      
    } catch (error) {
      console.error('Error updating user info:', error);
      message.error('Có lỗi xảy ra khi cập nhật thông tin');
    } finally {
      setLoading(false);
    }
  };

  // Cancel appointment with token
  const cancelAppointment = async (appointmentId) => {
    const token = getToken();
    if (!token) {
      message.error('Vui lòng đăng nhập lại');
      return;
    }

    try {
      setLoading(true);
      
      const response = await fetch(`${JSON_SERVER_URL}/appointments/${appointmentId}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: 'cancelled' })
      });

      if (response.status === 401) {
        removeToken();
        setIsAuthenticated(false);
        message.error('Token đã hết hạn, vui lòng đăng nhập lại');
        return;
      }

      if (!response.ok) {
        throw new Error('Failed to cancel appointment');
      }

      // Update local state
      setAppointments(prev => 
        prev.map(apt => 
          apt.id === appointmentId ? { ...apt, status: 'cancelled' } : apt
        )
      );
      
      message.success('Hủy lịch hẹn thành công!');
      
    } catch (error) {
      console.error('Error cancelling appointment:', error);
      message.error('Có lỗi xảy ra khi hủy lịch hẹn');
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const handleLogout = () => {
    removeToken();
    setIsAuthenticated(false);
    setUserInfo({});
    setAppointments([]);
    message.success('Đăng xuất thành công!');
  };

  // Login function (for demo purposes)
  const handleLogin = async () => {
    try {
      // Simulate login API call
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
        fetchUserData();
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
      fetchUserData();
    }
  };

  // Get service label by value
  const getServiceLabel = (serviceValue) => {
    const service = services.find(s => s.value === serviceValue);
    return service ? service.label : serviceValue;
  };

  // Get status color and text
  const getStatusDisplay = (status) => {
    const statusMap = {
      pending: { color: 'orange', text: 'Chờ xác nhận', icon: <SyncOutlined spin /> },
      confirmed: { color: 'green', text: 'Đã xác nhận', icon: <CheckCircleOutlined /> },
      completed: { color: 'blue', text: 'Hoàn thành', icon: <CheckCircleOutlined /> },
      cancelled: { color: 'red', text: 'Đã hủy', icon: <CloseCircleOutlined /> }
    };
    
    return statusMap[status] || { color: 'default', text: status, icon: null };
  };

  // Show appointment details
  const showAppointmentDetails = (appointment) => {
    setSelectedAppointment(appointment);
    setDetailModalVisible(true);
  };

  // Table columns for appointments
  const appointmentColumns = [
    {
      title: 'Ngày khám',
      dataIndex: 'date',
      key: 'date',
      render: (date) => (
        <Space>
          <CalendarOutlined />
          <Text>{date}</Text>
        </Space>
      ),
      sorter: (a, b) => dayjs(a.date, 'DD/MM/YYYY').unix() - dayjs(b.date, 'DD/MM/YYYY').unix(),
    },
    {
      title: 'Giờ khám',
      dataIndex: 'time',
      key: 'time',
      render: (time) => (
        <Space>
          <ClockCircleOutlined />
          <Text>{time}</Text>
        </Space>
      ),
    },
    {
      title: 'Dịch vụ',
      dataIndex: 'service',
      key: 'service',
      render: (service) => getServiceLabel(service),
    },
    {
      title: 'Loại hình',
      dataIndex: 'appointmentType',
      key: 'appointmentType',
      render: (type) => (
        <Tag color={type === 'offline' ? 'blue' : 'green'}>
          {type === 'offline' ? 'Tại phòng khám' : 'Trực tuyến'}
        </Tag>
      ),
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        const { color, text, icon } = getStatusDisplay(status);
        return (
          <Tag color={color} icon={icon}>
            {text}
          </Tag>
        );
      },
      filters: [
        { text: 'Chờ xác nhận', value: 'pending' },
        { text: 'Đã xác nhận', value: 'confirmed' },
        { text: 'Hoàn thành', value: 'completed' },
        { text: 'Đã hủy', value: 'cancelled' },
      ],
      onFilter: (value, record) => record.status === value,
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (_, record) => (
        <Space>
          <Button
            type="link"
            icon={<ExclamationCircleOutlined />}
            onClick={() => showAppointmentDetails(record)}
          >
            Chi tiết
          </Button>
          {record.status === 'pending' && (
            <Popconfirm
              title="Bạn có chắc muốn hủy lịch hẹn này?"
              onConfirm={() => cancelAppointment(record.id)}
              okText="Có"
              cancelText="Không"
            >
              <Button
                type="link"
                danger
                icon={<DeleteOutlined />}
              >
                Hủy lịch
              </Button>
            </Popconfirm>
          )}
        </Space>
      ),
    },
  ];

  useEffect(() => {
    const initAuth = async () => {
      const isAuth = await checkAuth();
      if (isAuth) {
        fetchUserData();
      }
    };
    initAuth();
  }, []);

  const handleEditToggle = () => {
    if (editMode) {
      form.resetFields();
      form.setFieldsValue(userInfo);
    }
    setEditMode(!editMode);
  };

  // Show login screen if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="profile-page">
        <div className="profile-page__container">
          <Card className="profile-page__login-card">
            <Result
              icon={<LoginOutlined />}
              title="Cần đăng nhập"
              subTitle="Bạn cần đăng nhập để xem thông tin cá nhân và lịch sử đặt lịch"
              extra={
                <Button 
                  type="primary" 
                  size="large"
                  onClick={handleLogin}
                  loading={loading}
                >
                  Đăng nhập
                </Button>
              }
            />
          </Card>
        </div>
      </div>
    );
  }

  if (dataLoading) {
    return (
      <div className="profile-page">
        <div className="profile-page__loading">
          <Spin size="large" tip="Đang tải dữ liệu..." />
        </div>
      </div>
    );
  }

  return (
    <div className="profile-page">
      <div className="profile-page__container">
        {/* Header */}
        <div className="profile-page__header">
          <div className="profile-page__header-content">
            <Title level={1} className="profile-page__title">
              Thông tin cá nhân
            </Title>
            <Text type="secondary" className="profile-page__subtitle">
              Quản lý thông tin cá nhân và lịch sử đặt lịch
            </Text>
          </div>
          <Button
            type="default"
            icon={<LogoutOutlined />}
            onClick={handleLogout}
            className="profile-page__logout-btn"
          >
            Đăng xuất
          </Button>
        </div>

        {/* Main Content */}
        <div className="profile-page__content">
          <Tabs defaultActiveKey="1" size="large" className="profile-page__tabs">
            {/* Personal Information Tab */}
            <TabPane
              tab={
                <span>
                  <UserOutlined />
                  Thông tin cá nhân
                </span>
              }
              key="1"
            >
              <Card
                title={
                  <div className="profile-page__card-header">
                    <span>Thông tin cá nhân</span>
                    <Space>
                      <Button
                        icon={<ReloadOutlined />}
                        onClick={fetchUserData}
                        disabled={loading}
                      >
                        Làm mới
                      </Button>
                      <Button
                        type={editMode ? 'default' : 'primary'}
                        icon={<EditOutlined />}
                        onClick={handleEditToggle}
                        disabled={loading}
                      >
                        {editMode ? 'Hủy' : 'Chỉnh sửa'}
                      </Button>
                    </Space>
                  </div>
                }
                bordered={false}
                className="profile-page__info-card"
              >
                {!editMode ? (
                  <Descriptions
                    column={{ xs: 1, sm: 1, md: 2 }}
                    size="large"
                    bordered
                    className="profile-page__descriptions"
                  >
                    <Descriptions.Item label="Họ và tên" span={1}>
                      <Text strong>{userInfo.fullName}</Text>
                    </Descriptions.Item>
                    <Descriptions.Item label="Số điện thoại" span={1}>
                      <Text>{userInfo.phone}</Text>
                    </Descriptions.Item>
                    <Descriptions.Item label="Email" span={1}>
                      <Text>{userInfo.email}</Text>
                    </Descriptions.Item>
                    <Descriptions.Item label="Giới tính" span={1}>
                      <Text>{userInfo.gender || 'Chưa cập nhật'}</Text>
                    </Descriptions.Item>
                    <Descriptions.Item label="Ngày sinh" span={1}>
                      <Text>{userInfo.dateOfBirth || 'Chưa cập nhật'}</Text>
                    </Descriptions.Item>
                    <Descriptions.Item label="Địa chỉ" span={1}>
                      <Text>{userInfo.address || 'Chưa cập nhật'}</Text>
                    </Descriptions.Item>
                  </Descriptions>
                ) : (
                  <Form
                    form={form}
                    layout="vertical"
                    onFinish={updateUserInfo}
                    size="large"
                    className="profile-page__form"
                  >
                    <Row gutter={16}>
                      <Col xs={24} sm={12}>
                        <Form.Item
                          label="Họ và tên"
                          name="fullName"
                          rules={[{ required: true, message: 'Vui lòng nhập họ và tên!' }]}
                        >
                          <Input prefix={<UserOutlined />} />
                        </Form.Item>
                      </Col>
                      <Col xs={24} sm={12}>
                        <Form.Item
                          label="Số điện thoại"
                          name="phone"
                          rules={[
                            { required: true, message: 'Vui lòng nhập số điện thoại!' },
                            { pattern: /^[0-9]{10,11}$/, message: 'Số điện thoại không hợp lệ!' }
                          ]}
                        >
                          <Input prefix={<PhoneOutlined />} />
                        </Form.Item>
                      </Col>
                    </Row>
                    
                    <Row gutter={16}>
                      <Col xs={24} sm={12}>
                        <Form.Item
                          label="Email"
                          name="email"
                          rules={[
                            { required: true, message: 'Vui lòng nhập email!' },
                            { type: 'email', message: 'Email không hợp lệ!' }
                          ]}
                        >
                          <Input prefix={<MailOutlined />} />
                        </Form.Item>
                      </Col>
                      <Col xs={24} sm={12}>
                        <Form.Item
                          label="Giới tính"
                          name="gender"
                        >
                          <Input placeholder="Nam/Nữ" />
                        </Form.Item>
                      </Col>
                    </Row>
                    
                    <Row gutter={16}>
                      <Col xs={24} sm={12}>
                        <Form.Item
                          label="Ngày sinh"
                          name="dateOfBirth"
                        >
                          <Input placeholder="DD/MM/YYYY" />
                        </Form.Item>
                      </Col>
                      <Col xs={24} sm={12}>
                        <Form.Item
                          label="Địa chỉ"
                          name="address"
                        >
                          <Input placeholder="Nhập địa chỉ" />
                        </Form.Item>
                      </Col>
                    </Row>

                    <Form.Item>
                      <Space>
                        <Button
                          type="primary"
                          htmlType="submit"
                          loading={loading}
                          icon={<SaveOutlined />}
                        >
                          Lưu thay đổi
                        </Button>
                        <Button onClick={handleEditToggle}>
                          Hủy
                        </Button>
                      </Space>
                    </Form.Item>
                  </Form>
                )}
              </Card>
            </TabPane>

            {/* Appointment History Tab */}
            <TabPane
              tab={
                <span>
                  <HistoryOutlined />
                  Lịch sử đặt lịch ({appointments.length})
                </span>
              }
              key="2"
            >
              <Card
                title={
                  <div className="profile-page__card-header">
                    <span>Lịch sử đặt lịch</span>
                    <Button
                      icon={<ReloadOutlined />}
                      onClick={fetchUserData}
                      disabled={loading}
                    >
                      Làm mới
                    </Button>
                  </div>
                }
                bordered={false}
                className="profile-page__history-card"
              >
                {appointments.length === 0 ? (
                  <Alert
                    message="Chưa có lịch hẹn nào"
                    description="Bạn chưa đặt lịch hẹn nào. Hãy đặt lịch khám để bắt đầu sử dụng dịch vụ."
                    type="info"
                    showIcon
                    className="profile-page__empty-alert"
                  />
                ) : (
                  <Table
                    columns={appointmentColumns}
                    dataSource={appointments}
                    rowKey="id"
                    pagination={{
                      pageSize: 10,
                      showSizeChanger: true,
                      showQuickJumper: true,
                      showTotal: (total, range) =>
                        `${range[0]}-${range[1]} của ${total} lịch hẹn`,
                    }}
                    scroll={{ x: 800 }}
                    loading={loading}
                    className="profile-page__table"
                  />
                )}
              </Card>
            </TabPane>
          </Tabs>
        </div>
      </div>

      {/* Appointment Detail Modal */}
      <Modal
        title="Chi tiết lịch hẹn"
        visible={detailModalVisible}
        onCancel={() => setDetailModalVisible(false)}
        footer={[
          <Button key="close" onClick={() => setDetailModalVisible(false)}>
            Đóng
          </Button>
        ]}
        width={600}
        className="profile-page__detail-modal"
      >
        {selectedAppointment && (
          <Descriptions column={1} bordered>
            <Descriptions.Item label="Họ tên">
              {selectedAppointment.fullName}
            </Descriptions.Item>
            <Descriptions.Item label="Dịch vụ">
              {getServiceLabel(selectedAppointment.service)}
            </Descriptions.Item>
            <Descriptions.Item label="Ngày khám">
              {selectedAppointment.date}
            </Descriptions.Item>
            <Descriptions.Item label="Giờ khám">
              {selectedAppointment.time}
            </Descriptions.Item>
            <Descriptions.Item label="Loại hình">
              <Tag color={selectedAppointment.appointmentType === 'offline' ? 'blue' : 'green'}>
                {selectedAppointment.appointmentType === 'offline' ? 'Tại phòng khám' : 'Trực tuyến'}
              </Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Trạng thái">
              {(() => {
                const { color, text, icon } = getStatusDisplay(selectedAppointment.status);
                return (
                  <Tag color={color} icon={icon}>
                    {text}
                  </Tag>
                );
              })()}
            </Descriptions.Item>
            <Descriptions.Item label="Ghi chú">
              {selectedAppointment.notes || 'Không có ghi chú'}
            </Descriptions.Item>
            <Descriptions.Item label="Ngày đặt lịch">
              {selectedAppointment.createdAt ? 
                dayjs(selectedAppointment.createdAt).format('DD/MM/YYYY HH:mm') : 
                'Không có thông tin'
              }
            </Descriptions.Item>
          </Descriptions>
        )}
      </Modal>
    </div>
  );
};

export default Profile;