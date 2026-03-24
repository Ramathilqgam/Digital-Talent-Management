import axios from "axios";
import { useState } from "react";
 
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;600&family=DM+Sans:wght@300;400;500&display=swap');
 
  .reg-root * { box-sizing: border-box; margin: 0; padding: 0; }
 
  .reg-root {
    min-height: 100vh;
    display: flex;
    font-family: 'DM Sans', sans-serif;
    background: #0a0a0f;
    color: #f0ede8;
  }
 
  /* Right decorative panel */
  .reg-panel-right {
    width: 42%;
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 3rem;
    background: #0d0d14;
    order: 2;
  }
 
  .reg-panel-right::before {
    content: '';
    position: absolute;
    inset: 0;
    background:
      radial-gradient(ellipse 80% 60% at 80% 20%, rgba(120,180,240,0.1) 0%, transparent 60%),
      radial-gradient(ellipse 60% 80% at 20% 80%, rgba(80,140,200,0.07) 0%, transparent 60%);
  }
 
  .geo-grid-r {
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(rgba(120,180,240,0.04) 1px, transparent 1px),
      linear-gradient(90deg, rgba(120,180,240,0.04) 1px, transparent 1px);
    background-size: 60px 60px;
  }
 
  .orb-r {
    position: absolute;
    border-radius: 50%;
    filter: blur(70px);
    animation: floatR 9s ease-in-out infinite;
  }
  .orb-r1 { width: 320px; height: 320px; background: rgba(80,140,220,0.08); top: -100px; right: -80px; animation-delay: 0s; }
  .orb-r2 { width: 200px; height: 200px; background: rgba(120,80,200,0.06); bottom: 5%; left: -60px; animation-delay: 4s; }
 
  @keyframes floatR {
    0%, 100% { transform: translateY(0px) scale(1); }
    50% { transform: translateY(-25px) scale(1.04); }
  }
 
  .visual-center {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
 
  .ring-diagram {
    position: relative;
    width: 180px;
    height: 180px;
    margin-bottom: 2.5rem;
  }
 
  .ring {
    position: absolute;
    border-radius: 50%;
    border: 1px solid;
    animation: spinRing linear infinite;
  }
 
  .ring-1 {
    inset: 0;
    border-color: rgba(120,180,240,0.2);
    animation-duration: 20s;
  }
  .ring-2 {
    inset: 20px;
    border-color: rgba(120,180,240,0.12);
    border-style: dashed;
    animation-duration: 15s;
    animation-direction: reverse;
  }
  .ring-3 {
    inset: 44px;
    border-color: rgba(120,180,240,0.3);
    animation-duration: 30s;
  }
 
  @keyframes spinRing {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
 
  .ring-dot {
    position: absolute;
    width: 6px; height: 6px;
    border-radius: 50%;
    background: #78b4f0;
    top: -3px; left: 50%;
    transform: translateX(-50%);
    box-shadow: 0 0 8px rgba(120,180,240,0.6);
  }
 
  .ring-center {
    position: absolute;
    inset: 64px;
    display: flex; align-items: center; justify-content: center;
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.2rem;
    font-weight: 300;
    color: rgba(240,237,232,0.6);
    letter-spacing: 0.05em;
  }
 
  .visual-center h2 {
    font-family: 'Cormorant Garamond', serif;
    font-size: 2.2rem;
    font-weight: 300;
    line-height: 1.2;
    color: #f0ede8;
    margin-bottom: 1rem;
  }
 
  .visual-center h2 em { font-style: italic; color: #78b4f0; }
 
  .visual-center p {
    font-size: 0.82rem;
    color: rgba(240,237,232,0.4);
    line-height: 1.7;
    max-width: 260px;
    font-weight: 300;
  }
 
  .perks {
    margin-top: 2rem;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    width: 100%;
    max-width: 260px;
  }
 
  .perk {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    font-size: 0.78rem;
    color: rgba(240,237,232,0.45);
  }
 
  .perk-dot {
    width: 5px; height: 5px;
    border-radius: 50%;
    background: #78b4f0;
    flex-shrink: 0;
    box-shadow: 0 0 6px rgba(120,180,240,0.5);
  }
 
  /* Left form panel */
  .reg-panel-left {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 3rem 4rem;
    background: #0a0a0f;
    position: relative;
    order: 1;
  }
 
  .reg-panel-left::after {
    content: '';
    position: absolute;
    top: 0; right: 0;
    width: 1px;
    height: 100%;
    background: linear-gradient(to bottom, transparent, rgba(120,180,240,0.15) 30%, rgba(120,180,240,0.15) 70%, transparent);
  }
 
  .reg-form-wrap {
    width: 100%;
    max-width: 400px;
    animation: slideIn 0.6s cubic-bezier(.22,1,.36,1) both;
  }
 
  @keyframes slideIn {
    from { opacity: 0; transform: translateX(-20px); }
    to { opacity: 1; transform: translateX(0); }
  }
 
  .social-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.6rem;
    margin-bottom: 1rem;
  }
 
  .btn-social-wide {
    grid-column: span 2;
  }
 
  .btn-social {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.55rem;
    padding: 0.72rem 0.5rem;
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.09);
    border-radius: 4px;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.8rem;
    font-weight: 400;
    color: rgba(240,237,232,0.65);
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
 
  .btn-social svg { flex-shrink: 0; }
 
  .social-divider {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin: 1rem 0 1.25rem;
  }
 
  .social-divider-line {
    flex: 1;
    height: 1px;
    background: rgba(255,255,255,0.07);
  }
 
  .social-divider span {
    font-size: 0.7rem;
    color: rgba(240,237,232,0.25);
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }
 
  .form-header h2 {
    font-family: 'Cormorant Garamond', serif;
    font-size: 2rem;
    font-weight: 400;
    color: #f0ede8;
    margin-bottom: 0.3rem;
  }
 
  .form-header p {
    font-size: 0.8rem;
    color: rgba(240,237,232,0.35);
    font-weight: 300;
    margin-bottom: 2rem;
  }
 
  .form-row-2 {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.75rem;
  }
 
  .form-group { margin-bottom: 1.1rem; }
 
  .form-label {
    display: block;
    font-size: 0.68rem;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: rgba(240,237,232,0.38);
    margin-bottom: 0.45rem;
  }
 
  .input-wrap { position: relative; }
 
  .form-input {
    width: 100%;
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.07);
    border-radius: 2px;
    padding: 0.8rem 0.9rem;
    font-size: 0.875rem;
    font-family: 'DM Sans', sans-serif;
    color: #f0ede8;
    outline: none;
    transition: border-color 0.2s, background 0.2s;
  }
 
  .form-input::placeholder { color: rgba(240,237,232,0.18); }
 
  .form-input:focus {
    border-color: rgba(120,180,240,0.4);
    background: rgba(120,180,240,0.03);
  }
 
  .input-accent {
    position: absolute;
    bottom: 0; left: 0;
    height: 2px; width: 0;
    background: linear-gradient(90deg, #78b4f0, #a0c8f8);
    transition: width 0.3s ease;
  }
 
  .form-input:focus ~ .input-accent { width: 100%; }
 
  .error-msg { font-size: 0.72rem; color: #e07070; margin-top: 0.3rem; }
 
  .strength-bar {
    height: 3px;
    border-radius: 2px;
    margin-top: 0.5rem;
    background: rgba(255,255,255,0.07);
    overflow: hidden;
  }
 
  .strength-fill {
    height: 100%;
    border-radius: 2px;
    transition: width 0.3s, background 0.3s;
  }
 
  .strength-label {
    font-size: 0.68rem;
    margin-top: 0.3rem;
    transition: color 0.2s;
  }
 
  .terms-row {
    display: flex; align-items: flex-start; gap: 0.6rem;
    margin: 1.25rem 0 1.5rem;
    cursor: pointer;
  }
 
  .terms-row input { display: none; }
 
  .custom-check {
    width: 14px; height: 14px;
    border: 1px solid rgba(255,255,255,0.18);
    border-radius: 1px;
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
    margin-top: 1px;
    transition: background 0.2s, border-color 0.2s;
  }
 
  .terms-row input:checked ~ .custom-check {
    background: #78b4f0;
    border-color: #78b4f0;
  }
 
  .check-tick { width: 8px; height: 8px; fill: none; stroke: #0a0a0f; stroke-width: 2; }
 
  .terms-text {
    font-size: 0.76rem;
    color: rgba(240,237,232,0.35);
    line-height: 1.5;
  }
 
  .terms-text a { color: #78b4f0; text-decoration: none; }
  .terms-text a:hover { color: #a0c8f8; }
 
  .btn-primary {
    width: 100%;
    padding: 0.875rem;
    background: #78b4f0;
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
    margin-bottom: 1.25rem;
  }
 
  .btn-primary:hover:not(:disabled) { background: #a0c8f8; transform: translateY(-1px); }
  .btn-primary:active:not(:disabled) { transform: translateY(0); }
  .btn-primary:disabled { opacity: 0.5; cursor: not-allowed; }
 
  .login-link {
    text-align: center;
    font-size: 0.78rem;
    color: rgba(240,237,232,0.35);
  }
 
  .login-link a {
    color: #78b4f0;
    text-decoration: none;
    margin-left: 0.25rem;
    transition: color 0.2s;
  }
  .login-link a:hover { color: #a0c8f8; }
 
  .success-wrap {
    text-align: center;
    animation: fadeUp 0.5s ease both;
    padding: 2rem 0;
  }
 
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(16px); }
    to { opacity: 1; transform: translateY(0); }
  }
 
  .success-icon {
    width: 56px; height: 56px;
    border-radius: 50%;
    border: 1.5px solid rgba(120,180,240,0.4);
    display: flex; align-items: center; justify-content: center;
    margin: 0 auto 1.5rem;
  }
 
  .success-wrap h3 {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.8rem;
    font-weight: 400;
    color: #f0ede8;
    margin-bottom: 0.5rem;
  }
 
  .success-wrap p {
    font-size: 0.82rem;
    color: rgba(240,237,232,0.4);
    line-height: 1.6;
  }
 
  @media (max-width: 768px) {
    .reg-panel-right { display: none; }
    .reg-panel-left { padding: 2rem; order: 1; }
  }
`;
 
function getStrength(pw) {
  if (!pw) return { score: 0, label: "", color: "transparent" };
  let score = 0;
  if (pw.length >= 8) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  const map = [
    { label: "Weak", color: "#e06060" },
    { label: "Fair", color: "#e09040" },
    { label: "Good", color: "#78b4f0" },
    { label: "Strong", color: "#60c090" },
  ];
  return { score, ...map[Math.max(0, score - 1)] };
}
 
export default function Register({ onNavigateToLogin }) {
  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", password: "", confirm: "", agreed: false,
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
 
  const strength = getStrength(form.password);
 
  const validate = () => {
    const e = {};
    if (!form.firstName.trim()) e.firstName = "Required";
    if (!form.lastName.trim()) e.lastName = "Required";
    if (!form.email) e.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Enter a valid email";
    if (!form.password) e.password = "Password is required";
    else if (form.password.length < 8) e.password = "Minimum 8 characters";
    if (form.confirm !== form.password) e.confirm = "Passwords don't match";
    if (!form.agreed) e.agreed = "You must accept the terms";
    return e;
  };
 
  

  const handleSubmit = async (e) => {
  e.preventDefault();

  const errs = validate();
  if (Object.keys(errs).length) {
    setErrors(errs);
    return;
  }

  setErrors({});
  setLoading(true);

  try {
    const res = await axios.post(
      "http://127.0.0.1:5000/api/auth/register",
      {
        name: form.firstName + " " + form.lastName,
        email: form.email,
        password: form.password,
      }
    );

    setSuccess(true);

  } catch (err) {
    console.log(err);

    if (err.response?.data?.error) {
      alert(err.response.data.error);
    } else {
      alert("Registration failed ❌");
    }

  } finally {
    setLoading(false);
  }
};
  
 
  const update = (field) => (e) => {
    const val = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setForm(f => ({ ...f, [field]: val }));
    if (errors[field]) setErrors(err => ({ ...err, [field]: null }));
  };
 
  return (
    <>
      <style>{styles}</style>
      <div className="reg-root">
        {/* Form panel (left) */}
        <div className="reg-panel-left">
          <div className="reg-form-wrap">
 
            {success ? (
              <div className="success-wrap">
                <div className="success-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#78b4f0" strokeWidth="1.5">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h3>Account created.</h3>
                <p>Welcome. Check your inbox to verify your email and get started.</p>
              </div>
            ) : (
              <>
                <div className="form-header">
                  <h2>Create account</h2>
                  <p>Join thousands building something remarkable.</p>
                </div>
 
                <form onSubmit={handleSubmit}>
                  <div className="form-row-2">
                    <div className="form-group">
                      <label className="form-label">First name</label>
                      <div className="input-wrap">
                        <input className="form-input" type="text" placeholder="Jane" value={form.firstName} onChange={update("firstName")} />
                        <div className="input-accent" />
                      </div>
                      {errors.firstName && <div className="error-msg">{errors.firstName}</div>}
                    </div>
                    <div className="form-group">
                      <label className="form-label">Last name</label>
                      <div className="input-wrap">
                        <input className="form-input" type="text" placeholder="Doe" value={form.lastName} onChange={update("lastName")} />
                        <div className="input-accent" />
                      </div>
                      {errors.lastName && <div className="error-msg">{errors.lastName}</div>}
                    </div>
                  </div>
 
                  <div className="form-group">
                    <label className="form-label">Email address</label>
                    <div className="input-wrap">
                      <input className="form-input" type="email" placeholder="you@example.com" value={form.email} onChange={update("email")} />
                      <div className="input-accent" />
                    </div>
                    {errors.email && <div className="error-msg">{errors.email}</div>}
                  </div>
 
                  <div className="form-group">
                    <label className="form-label">Password</label>
                    <div className="input-wrap">
                      <input className="form-input" type="password" placeholder="Min. 8 characters" value={form.password} onChange={update("password")} />
                      <div className="input-accent" />
                    </div>
                    {form.password && (
                      <>
                        <div className="strength-bar">
                          <div className="strength-fill" style={{ width: `${strength.score * 25}%`, background: strength.color }} />
                        </div>
                        <div className="strength-label" style={{ color: strength.color }}>{strength.label}</div>
                      </>
                    )}
                    {errors.password && <div className="error-msg">{errors.password}</div>}
                  </div>
 
                  <div className="form-group">
                    <label className="form-label">Confirm password</label>
                    <div className="input-wrap">
                      <input className="form-input" type="password" placeholder="Repeat password" value={form.confirm} onChange={update("confirm")} />
                      <div className="input-accent" />
                    </div>
                    {errors.confirm && <div className="error-msg">{errors.confirm}</div>}
                  </div>
 
                  <label className="terms-row">
                    <input type="checkbox" checked={form.agreed} onChange={update("agreed")} />
                    <div className="custom-check">
                      {form.agreed && (
                        <svg className="check-tick" viewBox="0 0 8 8">
                          <polyline points="1,4 3,6 7,2" />
                        </svg>
                      )}
                    </div>
                    <span className="terms-text">
                      I agree to the <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>
                    </span>
                  </label>
                  {errors.agreed && <div className="error-msg" style={{ marginTop: "-1rem", marginBottom: "1rem" }}>{errors.agreed}</div>}
 
                  <button className="btn-primary" type="submit" disabled={loading}>
                    {loading ? "Creating account…" : "Create account"}
                  </button>
                </form>
              </>
            )}
 
            <div className="login-link">
              Already have an account?
              <a href="#" onClick={e => { e.preventDefault(); onNavigateToLogin?.(); }}>Sign in</a>
            </div>
          </div>
        </div>
 
        {/* Decorative right panel */}
        <div className="reg-panel-right">
          <div className="geo-grid-r" />
          <div className="orb-r orb-r1" />
          <div className="orb-r orb-r2" />
 
          <div className="visual-center">
            <div className="ring-diagram">
              <div className="ring ring-1"><div className="ring-dot" /></div>
              <div className="ring ring-2" />
              <div className="ring ring-3"><div className="ring-dot" /></div>
              <div className="ring-center">AU</div>
            </div>
 
            <h2>Build something<br /><em>extraordinary.</em></h2>
            <p>Everything you need to bring your vision to life, in one refined workspace.</p>
 
           
              
            </div>
          </div>
        </div>
      
    </>
  );
}