import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../redux/slices/authSlice';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const userLogin = useSelector((state) => state.auth);
  const { loading, error, userInfo } = userLogin;

  const redirect = location.search ? location.search.split('=')[1] : '/';

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
    } else {
      dispatch(register({ name, email, password }));
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[80vh] px-4 py-8">
      <div className="glass w-full max-w-md p-8 md:p-10 rounded-2xl shadow-2xl border border-white/10">
        <h1 className="text-3xl font-extrabold mb-8 text-center text-white">Create Account</h1>
        {message && <div className="bg-red-500/10 text-red-300 p-4 rounded-lg mb-6 border-l-4 border-red-500">{message}</div>}
        {error && <div className="bg-red-500/10 text-red-300 p-4 rounded-lg mb-6 border-l-4 border-red-500">{error}</div>}
        
        <form onSubmit={submitHandler} className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-slate-300">Name</label>
            <input 
              type="text" 
              placeholder="Enter full name" 
              value={name} 
              onChange={(e) => setName(e.target.value)}
              className="px-4 py-3 rounded-lg border border-slate-600 bg-slate-900/50 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-slate-300">Email Address</label>
            <input 
              type="email" 
              placeholder="Enter email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
              className="px-4 py-3 rounded-lg border border-slate-600 bg-slate-900/50 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
              required
            />
          </div>
          
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-slate-300">Password</label>
            <input 
              type="password" 
              placeholder="Create password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
              className="px-4 py-3 rounded-lg border border-slate-600 bg-slate-900/50 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-slate-300">Confirm Password</label>
            <input 
              type="password" 
              placeholder="Confirm password" 
              value={confirmPassword} 
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="px-4 py-3 rounded-lg border border-slate-600 bg-slate-900/50 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
              required
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className={`py-3 mt-4 text-lg font-bold rounded-lg transition-all ${loading ? 'bg-blue-500/50 cursor-not-allowed text-white/70' : 'bg-blue-500 hover:bg-blue-600 hover:shadow-lg text-white hover:-translate-y-0.5'}`}
          >
            {loading ? 'Creating Account...' : 'Register'}
          </button>
        </form>

        <div className="mt-8 text-center text-slate-400">
          Already have an account? <Link to={redirect ? `/login?redirect=${redirect}` : '/login'} className="text-blue-400 font-bold hover:text-blue-300 transition-colors">Sign In</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
