import React, { useState } from 'react';
import { Container } from '../index';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LogoutBtn from './LogoutBtn';
import Scanner from './Scanner';
import Logo from '../Logo';
function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const status = useSelector((state) => state.auth.status);
  const isNGO = useSelector((state) => state.auth.isNGO);
  const isUser = useSelector((state) => state.auth.isUser);
  const navigate = useNavigate();

  const navItems = [
    { name: 'Home', slug: '/', active: true },
    { name: 'Login', slug: '/login', active: !status },
    { name: 'Register', slug: '/register', active: !status },
    { name: 'View My Donation', slug: '/user/viewDonation', active: isUser },
    { name: 'Around Me', slug: '/user', active: isUser },
    { name: 'Add Issue', slug: '/ngo/addIssue', active: isNGO },
    { name: 'My Stats', slug: '/ngo', active: isNGO },
  ];

  return (
    <header className="py-3 shadow bg-amber-300 border-2 border-amber-700 w-full fixed z-50">
      <Container>
        <nav className="flex flex-wrap items-center justify-between">
          <Logo></Logo>
          {/* Hamburger Toggle Button (Mobile) */}
          <button
            className="md:hidden text-amber-900 focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          {/* Nav Items */}
          <ul
            className={`flex-col md:flex md:flex-row md:ml-auto md:items-center w-full md:w-auto mt-4 md:mt-0 space-y-4 md:space-y-0 md:space-x-6 transition-all duration-300 ease-in-out ${
              isOpen ? 'flex' : 'hidden'
            }`}
          >
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button
                    onClick={() => {
                      navigate(item.slug);
                      setIsOpen(false); // Auto-close on mobile
                    }}
                    className="inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full focus:outline-none focus:bg-white"
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}

            {status && (
              <li>
                <LogoutBtn />
              </li>
            )}

            {isUser && (
              <li>
                <Scanner />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
}

export default Header;
