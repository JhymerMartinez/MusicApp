import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { RiCloseLine } from 'react-icons/ri';
import { HiOutlineMenu } from 'react-icons/hi';
import { logo } from '../assets';
import { links } from '../assets/constants';

const NavLinks = ({ handleClick }) => (

  <div className="mt-10">
    {links.map((link) => (
      <NavLink
        key={link.name}
        to={link.to}
        onClick={handleClick && handleClick()}
        className={({ isActive }) => {
          const activeClass = isActive ? 'text-emerald-200' : '';
          return `flex flex-row justify-start items-center my-8 text-sm font-medium text-gray-400 hover:text-emerald-200 ${activeClass}`;
        }}
      >
        <link.icon className="w-6 h-6 mr-2" />
        {link.name}
      </NavLink>
    ))}
  </div>

);

const Sidebar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Menu */}
      <div className="md:flex hidden flex-col w-[240px] py-10 px-4 bg-[#1A1B26]">
        <img src={logo} alt="logo" className="w-full h-14 object-contain" />
        <NavLinks />
      </div>
      {/* Mobile menu */}
      <div className="absolute md:hidden block top-6 right-3">
        {mobileMenuOpen
          ? <RiCloseLine className="w-6 h-6 text-white mr-2" onClick={() => setMobileMenuOpen(false)} />
          : <HiOutlineMenu className="w-6 h-6 text-white mr-2" onClick={() => setMobileMenuOpen(true)} />}
      </div>
      <div className={`absolute top-0 h-screen w-2/3 bg-gradient-to-tl from-white/10 to-[#032b1f] backdrop-blur-lg z-10 p6 md:hidden smooth-transition ${mobileMenuOpen ? 'left-0' : '-left-full'}`}>
        <img src={logo} alt="logo" className="w-full h-14 object-contain mt-2" />
        <NavLinks onClick={() => setMobileMenuOpen(false)} />
      </div>
    </>
  );
};

export default Sidebar;
