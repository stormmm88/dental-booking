import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../services/usersServices";
import { setCookie } from "../../helpers/cookie";
import { checkLogin } from "../../actions/login";
import "./login.scss";

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error when user starts typing
        if (error) setError("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        try {
            const { email, password } = formData;
            
            // Basic validation
            if (!email || !password) {
                setError("Vui lòng nhập đầy đủ thông tin");
                setIsLoading(false);
                return;
            }

            const response = await login(email, password);
            
            if (response.length > 0) {
                const user = response[0];
                // Set cookies with user data
                setCookie("id", user.id, 1);
                setCookie("fullName", user.fullName, 1);
                setCookie("email", user.email, 1);
                setCookie("token", user.token, 1);
                
                // Update Redux state
                dispatch(checkLogin(true));
                
                // Navigate to home
                navigate("/");
            } else {
                setError("Email hoặc mật khẩu không chính xác");
            }
        } catch (error) {
            console.error("Login error:", error);
            setError("Đã xảy ra lỗi. Vui lòng thử lại sau.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="login-container">
            <div className="login-wrapper">
                <div className="login-form">
                    <div className="login-header">
                        <h2 className="login-title">Đăng nhập</h2>
                        <p className="login-subtitle">Chào mừng bạn trở lại</p>
                    </div>

                    <form onSubmit={handleSubmit} className="form">
                        {error && (
                            <div className="error-message">
                                <span className="error-icon">⚠️</span>
                                {error}
                            </div>
                        )}

                        <div className="form-group">
                            <label htmlFor="email" className="form-label">
                                Email
                            </label>
                            <div className="input-wrapper">
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    placeholder="Nhập email của bạn"
                                    className="form-input"
                                    required
                                />
                                <span className="input-icon">📧</span>
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="password" className="form-label">
                                Mật khẩu
                            </label>
                            <div className="input-wrapper">
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    placeholder="Nhập mật khẩu"
                                    className="form-input"
                                    required
                                />
                                <span className="input-icon">🔒</span>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className={`submit-btn ${isLoading ? 'loading' : ''}`}
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <>
                                    <span className="loading-spinner"></span>
                                    Đang đăng nhập...
                                </>
                            ) : (
                                "Đăng nhập"
                            )}
                        </button>
                    </form>

                    <div className="login-footer">
                        <p>Chưa có tài khoản? <a href="/register">Đăng ký ngay</a></p>
                        <p><a href="/forgot-password">Quên mật khẩu?</a></p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;