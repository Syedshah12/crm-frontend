import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import { loginImg } from '../../utils';
import { ToastContainer, toast } from 'react-toastify';
import { ClipLoader } from 'react-spinners';

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.auth);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await dispatch(login({ email, password }));
      if (result.meta.requestStatus === 'fulfilled') {
        toast.success('Login successful!', { position: 'top-right', autoClose: 2000 });
        if (result.payload.role === 'Admin') navigate('/admin/dashboard');
        else navigate('/shop/dashboard');
      } else {
        throw new Error(result.payload || 'Login failed');
      }
    } catch (err) {
      toast.error(err.message || 'Login failed', { position: 'top-right', autoClose: 3000 });
    }
  };

  return (
    <div className="flex font-display items-center justify-center min-h-screen bg-gray-100 md:px-4">
      <ToastContainer />
      <div className="flex flex-col md:flex-row border-px border-gray-100 bg-white rounded-2xl shadow-2xl w-[85%] overflow-hidden max-w-5xl min-h-[80%]">
        {/* Left Form */}
        <div className="md:w-1/2 py-12 px-10 md:p-12 flex flex-col justify-center">
          <h1 className="text-2xl md:text-4xl font-bold mb-4 text-gray-900">Welcome Back</h1>
          <p className="text-gray-500  mb-8">Sign in to your account</p>

          <form onSubmit={handleSubmit} className="space-y-6 ">
            <div>
              <label className="block mb-2 text-gray-700">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-5 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
                required
              />
            </div>

            <div>
              <label className="block mb-2 text-gray-700">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password.."
                  className="w-full px-5 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
                  required
                />
                <button
                  type="button"
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-black text-white font-semibold rounded-lg hover:bg-gray-900 transition flex items-center justify-center"
              disabled={loading}
            >
              {loading ? <ClipLoader color="#fff" size={24} /> : 'Login'}
            </button>
          </form>
        </div>

        {/* Right Image */}
        <div className="md:w-1/2 hidden md:flex items-center justify-center bg-gray-50">
          <img
            src={loginImg}
            alt="Login Illustration"
            className="object-contain h-[500px] w-full"
          />
        </div>
      </div>
    </div>
  );
}
