/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, ChevronRight, Phone, Mail, MapPin, Building2, ShieldCheck, Zap, HardHat } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// Utility for tailwind classes
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Pages (to be implemented in separate files or defined here for simplicity in this turn)
import Home from "./pages/Home";
import About from "./pages/About";
import Business from "./pages/Business";
import Portfolio from "./pages/Portfolio";
import Tech from "./pages/Tech";
import Contact from "./pages/Contact";
import Admin from "./pages/Admin";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "회사소개", path: "/about" },
    { name: "업무분야", path: "/business" },
    { name: "프로젝트", path: "/portfolio" },
    { name: "기술·연구", path: "/tech" },
    { name: "고객문의", path: "/contact" },
  ];

  const isHomePage = location.pathname === "/";
  const shouldShowWhiteBg = scrolled || !isHomePage;

  return (
    <nav
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300",
        shouldShowWhiteBg ? "bg-white/90 backdrop-blur-md shadow-sm py-4" : "bg-transparent py-6"
      )}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-3">
          <img 
            src="https://lh3.googleusercontent.com/d/12AjL9COH-Q7QuS82G2Jy7saWIhf32pkT" 
            alt="원파트너스 로고" 
            className={cn(
              "h-10 w-auto object-contain transition-all duration-300",
              !shouldShowWhiteBg && "brightness-0 invert"
            )}
            referrerPolicy="no-referrer"
          />
          <div className="flex flex-col">
            <span className={cn(
              "font-bold text-xl tracking-tight transition-colors duration-300", 
              shouldShowWhiteBg ? "text-primary" : "text-white drop-shadow-md"
            )}>
              원파트너스
            </span>
            <span className={cn(
              "text-[10px] uppercase tracking-widest transition-colors duration-300",
              shouldShowWhiteBg ? "text-slate-500" : "text-white/80 drop-shadow-sm"
            )}>
              One Partners
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                "text-sm font-medium transition-all duration-300 hover:text-primary-light",
                shouldShowWhiteBg 
                  ? (location.pathname === link.path ? "text-primary font-bold" : "text-slate-600")
                  : (location.pathname === link.path ? "text-white font-bold" : "text-white/90 drop-shadow-sm")
              )}
            >
              {link.name}
            </Link>
          ))}
          <Link
            to="/admin"
            className={cn(
              "text-xs transition-colors duration-300 ml-4",
              shouldShowWhiteBg ? "text-slate-400 hover:text-primary" : "text-white/50 hover:text-white"
            )}
          >
            Admin
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button 
          className={cn("md:hidden transition-colors duration-300", shouldShowWhiteBg ? "text-primary" : "text-white")} 
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-white shadow-xl border-t border-slate-100 md:hidden"
          >
            <div className="flex flex-col p-6 gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className="text-lg font-medium text-slate-700 hover:text-primary"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 py-16">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-2">
          <div className="flex items-center gap-3 mb-6">
            <img 
              src="https://lh3.googleusercontent.com/d/12AjL9COH-Q7QuS82G2Jy7saWIhf32pkT" 
              alt="원파트너스 로고" 
              className="h-12 w-auto object-contain brightness-0 invert"
              referrerPolicy="no-referrer"
            />
            <span className="font-bold text-2xl text-white">원파트너스</span>
          </div>
          <p className="text-sm leading-relaxed mb-8 max-w-md">
            안전과 신뢰를 최우선으로 하는 건축구조기술사사무소 원파트너스입니다. 
            축적된 실적과 검증된 기술력으로 안정적인 구조해석과 합리적인 설계를 제공합니다.
          </p>
          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-3">
              <MapPin className="w-4 h-4 text-primary-light" />
              <span>경기도 용인시 기흥구 죽현로 8-20</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-primary-light" />
              <span>010-4343-1427</span>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-primary-light" />
              <span>ecsel@naver.com</span>
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-white font-bold mb-6">주요 서비스</h4>
          <ul className="space-y-4 text-sm">
            <li><Link to="/business" className="hover:text-white transition-colors">건축 구조설계</Link></li>
            <li><Link to="/business" className="hover:text-white transition-colors">내진성능평가</Link></li>
            <li><Link to="/business" className="hover:text-white transition-colors">구조 안전진단</Link></li>
            <li><Link to="/business" className="hover:text-white transition-colors">건축구조감리</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-6">회사 정보</h4>
          <div className="text-sm space-y-2">
            <p>대표이사: 박정우</p>
            <p>사업자등록번호: 255-27-02041</p>
            <p>© 2024 One Partners. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col font-sans">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/business" element={<Business />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/tech" element={<Tech />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
