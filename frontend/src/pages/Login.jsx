
import { useState } from "react";
 
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;600&family=DM+Sans:wght@300;400;500&display=swap');
 
  .login-root * { box-sizing: border-box; margin: 0; padding: 0; }
 
  .login-root {
    min-height: 100vh;
    display: flex;
    font-family: 'DM Sans', sans-serif;
    background: #0a0a0f;
    color: #f0ede8;
  }
 
  /* Left panel */
  .login-panel-left {
    width: 45%;
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 3rem;
    background: #0d0d14;
  }
 
  .login-panel-left::before {
    content: '';
    position: absolute;
    inset: 0;
    background:
      radial-gradient(ellipse 80% 60% at 20% 80%, rgba(200,160,80,0.12) 0%, transparent 60%),
      radial-gradient(ellipse 60% 80% at 80% 20%, rgba(120,100,200,0.08) 0%, transparent 60%);
  }
 
  .geo-grid {
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(rgba(200,160,80,0.04) 1px, transparent 1px),
      linear-gradient(90deg, rgba(200,160,80,0.04) 1px, transparent 1px);
    background-size: 60px 60px;
  }
 
  .orb {
    position: absolute;
    border-radius: 50%;
    filter: blur(60px);
    animation: float 8s ease-in-out infinite;
  }
  .orb-1 { width: 300px; height: 300px; background: rgba(200,160,80,0.08); bottom: -80px; left: -80px; animation-delay: 0s; }
  .orb-2 { width: 200px; height: 200px; background: rgba(120,100,200,0.06); top: 10%; right: -60px; animation-delay: 3s; }
 
  @keyframes float {
    0%, 100% { transform: translateY(0px) scale(1); }
    50% { transform: translateY(-30px) scale(1.05); }
  }
 
  .brand-mark {
    position: relative;
    z-index: 1;
  }
 
  .brand-logo {
    width: 40px;
    height: 40px;
    border: 1.5px solid rgba(200,160,80,0.6);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1rem;
    position: relative;
  }
 
  .brand-logo::before {
    content: '';
    position: absolute;
    width: 24px;
    height: 24px;
    border: 1px solid rgba(200,160,80,0.3);
    transform: rotate(45deg);
  }
 
  .brand-name {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.1rem;
    font-weight: 300;
    letter-spacing: 0.3em;
    color: rgba(240,237,232,0.7);
    text-transform: uppercase;
  }
 
  .left-headline {
    position: relative;
    z-index: 1;
  }
 
  .left-headline h1 {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(2.8rem, 4vw, 4rem);
    font-weight: 300;
    line-height: 1.1;
    letter-spacing: -0.01em;
    color: #f0ede8;
    margin-bottom: 1.5rem;
  }
 
  .left-headline h1 em {
    font-style: italic;
    color: #c8a050;
  }
 
  .left-headline p {
    font-size: 0.875rem;
    color: rgba(240,237,232,0.45);
    line-height: 1.7;
    max-width: 300px;
    font-weight: 300;
  }
 
  .left-footer {
    position: relative;
    z-index: 1;
    display: flex;
    align-items: center;
    gap: 1rem;
  }
 
  .left-footer-line {
    width: 40px;
    height: 1px;
    background: rgba(200,160,80,0.4);
  }
 
  .left-footer p {
    font-size: 0.75rem;
    color: rgba(240,237,232,0.3);
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }
 
  /* Right panel */
  .login-panel-right {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 3rem 4rem;
    background: #0a0a0f;
    position: relative;
  }
 
  .login-panel-right::before {
    content: '';
    position: absolute;
    top: 0; left: 0;
    width: 1px;
    height: 100%;
    background: linear-gradient(to bottom, transparent, rgba(200,160,80,0.2) 30%, rgba(200,160,80,0.2) 70%, transparent);
  }
 
  .login-form-wrap {
    width: 100%;
    max-width: 380px;
    animation: fadeUp 0.7s ease both;
  }
 
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(24px); }
    to { opacity: 1; transform: translateY(0); }
  }
 
  .form-header {
    margin-bottom: 2.5rem;
  }
 
  .form-header h2 {
    font-family: 'Cormorant Garamond', serif;
    font-size: 2rem;
    font-weight: 400;
    color: #f0ede8;
    margin-bottom: 0.4rem;
  }
 
  .form-header p {
    font-size: 0.8rem;
    color: rgba(240,237,232,0.4);
    font-weight: 300;
  }
 
  .form-group {
    margin-bottom: 1.25rem;
  }
 
  .form-label {
    display: block;
    font-size: 0.7rem;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: rgba(240,237,232,0.4);
    margin-bottom: 0.5rem;
    font-weight: 400;
  }
 
  .input-wrap {
    position: relative;
  }
 
  .form-input {
    width: 100%;
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 2px;
    padding: 0.875rem 1rem;
    font-size: 0.9rem;
    font-family: 'DM Sans', sans-serif;
    color: #f0ede8;
    outline: none;
    transition: border-color 0.2s, background 0.2s;
  }
 
  .form-input::placeholder { color: rgba(240,237,232,0.2); }
 
  .form-input:focus {
    border-color: rgba(200,160,80,0.5);
    background: rgba(200,160,80,0.03);
  }
 
  .input-accent {
    position: absolute;
    bottom: 0; left: 0;
    height: 2px;
    width: 0;
    background: linear-gradient(90deg, #c8a050, #e8c880);
    transition: width 0.3s ease;
    border-radius: 0 0 2px 2px;
  }
 
  .form-input:focus ~ .input-accent { width: 100%; }
 
  .form-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1.75rem;
  }
 
  .checkbox-wrap {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
  }
 
  .checkbox-wrap input { display: none; }
 
  .custom-check {
    width: 14px; height: 14px;
    border: 1px solid rgba(255,255,255,0.2);
    border-radius: 1px;
    display: flex; align-items: center; justify-content: center;
    transition: border-color 0.2s, background 0.2s;
    flex-shrink: 0;
  }
 
  .checkbox-wrap input:checked ~ .custom-check {
    background: #c8a050;
    border-color: #c8a050;
  }
 
  .check-tick {
    width: 8px; height: 8px;
    fill: none;
    stroke: #0a0a0f;
    stroke-width: 2;
  }
 
  .checkbox-label {
    font-size: 0.78rem;
    color: rgba(240,237,232,0.4);
    cursor: pointer;
  }
 
  .forgot-link {
    font-size: 0.78rem;
    color: rgba(200,160,80,0.7);
    text-decoration: none;
    transition: color 0.2s;
  }
  .forgot-link:hover { color: #c8a050; }
 
  .btn-primary {
    width: 100%;
    padding: 0.9rem;
    background: #c8a050;
    border: none;
    border-radius: 2px;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.8rem;
    font-weight: 500;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #0a0a0f;
    cursor: pointer;
    transition: background 0.2s, transform 0.15s;
    margin-bottom: 1.5rem;
    position: relative;
    overflow: hidden;
  }
 
  .btn-primary:hover { background: #e0b860; transform: translateY(-1px); }
  .btn-primary:active { transform: translateY(0); }
 
  .divider {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1.5rem;
  }
 
  .divider-line {
    flex: 1;
    height: 1px;
    background: rgba(255,255,255,0.07);
  }
 
  .divider span {
    font-size: 0.72rem;
    color: rgba(240,237,232,0.25);
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }
 
  .social-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.55rem;
  }
 
  .btn-social-wide { grid-column: span 2; }
 
  .btn-social {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding: 0.72rem 0.5rem;
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.09);
    border-radius: 3px;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.8rem;
    color: rgba(240,237,232,0.6);
    cursor: pointer;
    transition: background 0.18s, border-color 0.18s, color 0.18s, transform 0.12s;
    white-space: nowrap;
  }
 
  .btn-social:hover {
    background: rgba(255,255,255,0.07);
    border-color: rgba(255,255,255,0.18);
    color: #f0ede8;
    transform: translateY(-1px);
  }
 
  .btn-social:active { transform: translateY(0); }
 
  .register-link {
    text-align: center;
    margin-top: 2rem;
    font-size: 0.78rem;
    color: rgba(240,237,232,0.35);
  }
 
  .register-link a {
    color: #c8a050;
    text-decoration: none;
    margin-left: 0.25rem;
    transition: color 0.2s;
  }
  .register-link a:hover { color: #e0b860; }
 
  .error-msg {
    font-size: 0.75rem;
    color: #e06060;
    margin-top: 0.4rem;
  }
 
  .success-flash {
    background: rgba(80,180,120,0.1);
    border: 1px solid rgba(80,180,120,0.3);
    border-radius: 2px;
    padding: 0.75rem 1rem;
    font-size: 0.82rem;
    color: rgba(120,220,160,0.9);
    margin-bottom: 1.5rem;
    animation: fadeUp 0.3s ease;
  }
 
  @media (max-width: 768px) {
    .login-panel-left { display: none; }
    .login-panel-right { padding: 2rem; }
  }
`;
 
export default function Login({ onNavigateToRegister }) {
  const [form, setForm] = useState({ email: "", password: "", remember: false });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
 
  const validate = () => {
    const e = {};
    if (!form.email) e.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Enter a valid email";
    if (!form.password) e.password = "Password is required";
    else if (form.password.length < 6) e.password = "Minimum 6 characters";
    return e;
  };
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setLoading(true);
    await new Promise(r => setTimeout(r, 1400));
    setLoading(false);
    setSuccess(true);
  };
 
  const update = (field) => (e) => {
    setForm(f => ({ ...f, [field]: e.target.value }));
    if (errors[field]) setErrors(err => ({ ...err, [field]: null }));
  };
 
  return (
    <>
      <style>{styles}</style>
      <div className="login-root">
        
        {/* Right panel */}
        <div className="login-panel-right">
          <div className="login-form-wrap">
            <div className="form-header">
              <h2>Welcome back</h2>
              <p>Sign in to continue your journey</p>
            </div>
 
            {success && (
              <div className="success-flash">
                You're in — redirecting to your dashboard…
              </div>
            )}
 
            {!success && (
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label className="form-label">Email address</label>
                  <div className="input-wrap">
                    <input
                      className="form-input"
                      type="email"
                      placeholder="you@example.com"
                      value={form.email}
                      onChange={update("email")}
                      onFocus={() => setFocusedField("email")}
                      onBlur={() => setFocusedField(null)}
                    />
                    <div className="input-accent" />
                  </div>
                  {errors.email && <div className="error-msg">{errors.email}</div>}
                </div>
 
                <div className="form-group">
                  <label className="form-label">Password</label>
                  <div className="input-wrap">
                    <input
                      className="form-input"
                      type="password"
                      placeholder="••••••••"
                      value={form.password}
                      onChange={update("password")}
                      onFocus={() => setFocusedField("password")}
                      onBlur={() => setFocusedField(null)}
                    />
                    <div className="input-accent" />
                  </div>
                  {errors.password && <div className="error-msg">{errors.password}</div>}
                </div>
 
                <div className="form-row">
                  <label className="checkbox-wrap">
                    <input
                      type="checkbox"
                      checked={form.remember}
                      onChange={e => setForm(f => ({ ...f, remember: e.target.checked }))}
                    />
                    <div className="custom-check">
                      {form.remember && (
                        <svg className="check-tick" viewBox="0 0 8 8">
                          <polyline points="1,4 3,6 7,2" />
                        </svg>
                      )}
                    </div>
                    <span className="checkbox-label">Remember me</span>
                  </label>
                  <a href="#" className="forgot-link">Forgot password?</a>
                </div>
 
                <button className="btn-primary" type="submit" disabled={loading}>
                  {loading ? "Authenticating…" : "Sign in"}
                </button>
 
                <div className="divider">
                  <div className="divider-line" />
                  <span>or continue with</span>
                  <div className="divider-line" />
                </div>
 
                <div className="social-grid">
                  {/* Google — full width */}
                  <button type="button" className="btn-social btn-social-wide">
                    <svg width="16" height="16" viewBox="0 0 24 24">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                    </svg>
                    Continue with Google
                  </button>
 
                  {/* Apple */}
                  <button type="button" className="btn-social">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                    </svg>
                    Apple
                  </button>
 
                  {/* Facebook */}
                  <button type="button" className="btn-social">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="#1877F2">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                    Facebook
                  </button>
 
                  {/* X / Twitter */}
                  <button type="button" className="btn-social">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                    X / Twitter
                  </button>
 
                  {/* Microsoft */}
                  <button type="button" className="btn-social">
                    <svg width="15" height="15" viewBox="0 0 24 24">
                      <rect x="1" y="1" width="10.5" height="10.5" fill="#F25022"/>
                      <rect x="12.5" y="1" width="10.5" height="10.5" fill="#7FBA00"/>
                      <rect x="1" y="12.5" width="10.5" height="10.5" fill="#00A4EF"/>
                      <rect x="12.5" y="12.5" width="10.5" height="10.5" fill="#FFB900"/>
                    </svg>
                    Microsoft
                  </button>
                </div>
              </form>
            )}
 
            <div className="register-link">
              Don't have an account?
              <a href="#" onClick={e => { e.preventDefault(); onNavigateToRegister?.(); }}>
                Create one
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

