import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/img/MC-logo.png';

const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="w-full flex justify-center pt-[30px] fixed top-0 left-0 z-[999] px-4 md:px-0 bg-transparent">
      <header className="w-full max-w-[1200px] bg-[#BDC0C4] rounded-[47px] shadow-md flex items-center justify-between px-6 md:px-[60px] h-[70px]">
        
        {/* Logo */}
        <div className="flex items-center h-full">
          <img
            src={logo}
            alt="MC Dee Logo"
            className="h-[60px] w-[60px] object-contain cursor-pointer"
            onClick={() => navigate('/')}
          />
        </div>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex gap-[30px] text-[#043873] font-medium">
          <a href="#" className="hover:text-[#F76300] transition no-underline">Home</a>
          <a href="#services" className="hover:text-[#F76300] transition no-underline">Services</a>
          <a href="#about" className="hover:text-[#F76300] transition no-underline">About Us</a>
          <a href="#faq" className="hover:text-[#F76300] transition no-underline">Contact Us</a>
        </nav>

        {/* Desktop Buttons */}
        <div className="hidden md:flex gap-[12px] h-[40px]">
          <button
            onClick={() => navigate('/login')}
            className="bg-[#F76300] text-[#043873] px-[20px] py-2 rounded-[10px] font-semibold text-sm transition hover:opacity-90 no-underline flex items-center justify-center"
          >
            Login
          </button>
          <button
            onClick={() => navigate('/signup')}
            className="bg-[#3B82F6] text-white px-[20px] py-2 rounded-[10px] font-semibold text-sm transition hover:opacity-90 no-underline flex items-center justify-center"
          >
            Sign Up →
          </button>
        </div>

        {/* Hamburger Icon (Mobile Only) */}
        <div className="md:hidden flex items-center z-50">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="focus:outline-none"
          >
            {menuOpen ? (
              <X className="w-8 h-8 text-[#043873]" />
            ) : (
              <Menu className="w-8 h-8 text-[#043873]" />
            )}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div className="md:hidden absolute top-[80px] w-full bg-[#BDC0C4] rounded-b-[30px] shadow-lg py-6 px-8 flex flex-col gap-4 text-[#043873] font-medium transition-all duration-300">
          <a href="#" className="hover:text-[#F76300] transition no-underline">Home</a>
          <a href="#services" className="hover:text-[#F76300] transition no-underline">Services</a>
          <a href="#about" className="hover:text-[#F76300] transition no-underline">About Us</a>
          <a href="#faq" className="hover:text-[#F76300] transition no-underline">Contact Us</a>

          <div className="flex flex-col gap-[10px] mt-4">
            <button
              onClick={() => navigate('/login')}
              className="bg-[#F76300] text-[#043873] px-[20px] py-2 rounded-[10px] font-semibold text-sm no-underline text-center"
            >
              Login
            </button>
            <button
              onClick={() => navigate('/signup')}
              className="bg-[#3B82F6] text-white px-[20px] py-2 rounded-[10px] font-semibold text-sm no-underline text-center"
            >
              Sign Up →
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;