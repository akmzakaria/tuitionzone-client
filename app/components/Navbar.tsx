'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isMenuClosing, setIsMenuClosing] = useState(false)
  const [activeNav, setActiveNav] = useState('home')

  const toggleMenu = () => {
    if (isMenuOpen) {
      closeMenu()
    } else {
      setIsMenuOpen(true)
      setIsMenuClosing(false)
    }
  }

  const closeMenu = () => {
    setIsMenuClosing(true)
    setTimeout(() => {
      setIsMenuOpen(false)
      setIsMenuClosing(false)
    }, 300)
  }

  const handleNavClick = (navItem) => {
    setActiveNav(navItem)
  }

  return (
    <>
      <style>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideUp {
          from {
            opacity: 1;
            transform: translateY(0);
          }
          to {
            opacity: 0;
            transform: translateY(-20px);
          }
        }

        .menu-slide-down {
          animation: slideDown 0.3s ease-out forwards;
        }

        .menu-slide-up {
          animation: slideUp 0.3s ease-out forwards;
        }

        .hamburger-line {
          transform-origin: center;
          transition: all 0.3s ease;
        }

        .hamburger-open .line-1 {
          transform: translateY(6px) rotate(45deg);
        }

        .hamburger-open .line-2 {
          opacity: 0;
        }

        .hamburger-open .line-3 {
          transform: translateY(-6px) rotate(-45deg);
        }
      `}</style>

      <header className="bg-[#1B263B] border-b-4 border-[#F4D35E] sticky top-0 z-9999">
        <nav className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          {/* Hamburger Menu Button - Visible on small devices */}
          <button
            onClick={toggleMenu}
            className={`md:hidden flex flex-col gap-1 focus:outline-none ${
              isMenuOpen ? 'hamburger-open' : ''
            }`}
            aria-label="Toggle navigation menu"
          >
            <span className="hamburger-line line-1 w-6 h-0.5 bg-[#F4D35E]"></span>
            <span className="hamburger-line line-2 w-6 h-0.5 bg-[#F4D35E]"></span>
            <span className="hamburger-line line-3 w-6 h-0.5 bg-[#F4D35E]"></span>
          </button>

          {/* <h1 className="text-2xl font-bold text-[#F4D35E] whitespace-nowrap">TutionZoneBD</h1> */}

          <Link href={'/'}>
            <img src="/tuitionzonebd2_bg-removed_edited.png" className="w-35" alt="" />
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex gap-8 text-white font-medium flex-1 justify-center">
            <li>
              <a href="#tutions" className="hover:text-[#F4D35E] transition duration-200">
                Tutions
              </a>
            </li>
            <li>
              <a href="#tutors" className="hover:text-[#F4D35E] transition duration-200">
                Tutors
              </a>
            </li>
            <li>
              <a href="#contact" className="hover:text-[#F4D35E] transition duration-200">
                Contact
              </a>
            </li>
            <li>
              <a href="/aboutUs" className="hover:text-[#F4D35E] transition duration-200">
                About
              </a>
            </li>
          </ul>

          <button className="bg-[#415A77] text-white px-6 py-2 rounded-lg hover:bg-[#F4D35E] hover:text-[#1B263B] transition duration-200 font-bold border-2 border-[#F4D35E]">
            Login
          </button>
        </nav>
      </header>

      {/* Backdrop Overlay - Click to close menu */}
      {(isMenuOpen || isMenuClosing) && (
        <div
          onClick={closeMenu}
          className={`md:hidden fixed inset-0 bg-black/0 z-40 ${
            isMenuClosing ? 'menu-slide-up' : 'menu-slide-down'
          }`}
          style={{ top: '0' }}
        ></div>
      )}

      {/* Mobile Menu - Overlays the page */}
      {(isMenuOpen || isMenuClosing) && (
        <div
          className={`md:hidden fixed top-17 left-0 right-0 bg-[#1B263B]/80 backdrop-blur-md border-b border-[#F4D35E] px-6 py-4 z-50 ${
            isMenuClosing ? 'menu-slide-up' : 'menu-slide-down'
          }`}
        >
          <ul className="flex flex-col gap-4 text-white font-medium">
            <li>
              <a
                href="#tutions"
                onClick={closeMenu}
                className="hover:text-[#F4D35E] transition duration-200 block"
              >
                Tutions
              </a>
            </li>
            <li>
              <a
                href="#tutors"
                onClick={closeMenu}
                className="hover:text-[#F4D35E] transition duration-200 block"
              >
                Tutors
              </a>
            </li>
            <li>
              <a
                href="#contact"
                onClick={closeMenu}
                className="hover:text-[#F4D35E] transition duration-200 block"
              >
                Contact
              </a>
            </li>
            <li>
              <a
                href="#about"
                onClick={closeMenu}
                className="hover:text-[#F4D35E] transition duration-200 block"
              >
                About
              </a>
            </li>
          </ul>
        </div>
      )}

      {/* Bottom Navigation - Mobile Only */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-[#1B263B] border-t-2 border-[#F4D35E] z-40">
        <div className="flex items-center justify-around py-3">
          {/* Profile */}
          <a
            href="#profile"
            onClick={() => handleNavClick('profile')}
            className={`flex flex-col items-center gap-1 transition duration-200 ${
              activeNav === 'profile' ? 'text-[#F4D35E]' : 'text-white hover:text-[#F4D35E]'
            }`}
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
            <span className="text-xs font-medium">Profile</span>
          </a>

          {/* Tuitions */}
          <a
            href="#tutions"
            onClick={() => handleNavClick('tuitions')}
            className={`flex flex-col items-center gap-1 transition duration-200 ${
              activeNav === 'tuitions' ? 'text-[#F4D35E]' : 'text-white hover:text-[#F4D35E]'
            }`}
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20 6h-2.15c-.74-1.18-2.05-2-3.85-2-1.8 0-3.11.82-3.85 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-7-2c.83 0 1.5.67 1.5 1.5S13.83 7 13 7s-1.5-.67-1.5-1.5S12.17 4 13 4zm7 14H4V8h4.46c-.05.31-.08.64-.08 1 0 1.66 1.34 3 3 3s3-1.34 3-3c0-.36-.03-.69-.08-1H20v10z" />
            </svg>
            <span className="text-xs font-medium">Tuitions</span>
          </a>

          {/* Home */}
          <a
            href="#home"
            onClick={() => handleNavClick('home')}
            className={`flex flex-col items-center gap-1 transition duration-200 ${
              activeNav === 'home' ? 'text-[#F4D35E]' : 'text-white hover:text-[#F4D35E]'
            }`}
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
            </svg>
            <span className="text-xs font-medium">Home</span>
          </a>

          {/* Tutors */}
          <a
            href="#tutors"
            onClick={() => handleNavClick('tutors')}
            className={`flex flex-col items-center gap-1 transition duration-200 ${
              activeNav === 'tutors' ? 'text-[#F4D35E]' : 'text-white hover:text-[#F4D35E]'
            }`}
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
            </svg>
            <span className="text-xs font-medium">Tutors</span>
          </a>

          {/* Menu */}
          <button
            onClick={toggleMenu}
            className={`flex flex-col items-center gap-1 transition duration-200 focus:outline-none ${
              isMenuOpen ? 'text-[#F4D35E]' : 'text-white hover:text-[#F4D35E]'
            }`}
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
            </svg>
            <span className="text-xs font-medium">Menu</span>
          </button>
        </div>
      </nav>
    </>
  )
}
