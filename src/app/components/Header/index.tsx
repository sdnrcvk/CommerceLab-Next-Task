"use client";
import React, { useState } from 'react';
import styled from 'styled-components';
import { FaShoppingCart } from "react-icons/fa";
import Link from 'next/link';
import productData from '../../data/products.json'; 

interface DropdownContentProps {
  open: boolean;
}

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #FBA834;
  height: 5rem;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  height: 5rem;
  margin-left: 1rem;
`;

const LogoText = styled.span`
  font-weight: bold;
  font-size: 1.5rem;
  cursor: pointer;
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  height: 5rem;
  margin-right: 1rem;
`;

const NavItem = styled.div`
  padding: 0.5rem 1rem;
  color: #333;
  text-decoration: none;
  font-size: 1.2rem;
  border-bottom: none;
  position: relative;
`;

const DropdownMenu = styled.div`
  position: relative;
  cursor: pointer;
`;

const DropdownContent = styled.div<DropdownContentProps>`
  display: ${({ open }) => (open ? 'block' : 'none')};
  position: absolute;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 1;
  width: 150px;
  margin-top:0.2rem;
`;

const DropdownItem = styled.a`
  display: block;
  padding: 0.5rem 1rem;
  color: #333;
  text-decoration: none;
  font-size: 1rem;

  &:hover {
    background-color: #f0f0f0;
  }
`;

const CartIcon = styled.div`
  position: relative;
  cursor: pointer;
`;

const CartCount = styled.span`
  position: absolute;
  top: -8px;
  right: -8px;
  background-color: #ff5722;
  color: #fff;
  font-size: 0.8rem;
  padding: 0.1rem 0.4rem;
  border-radius: 50%;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #000;

  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }
`;

const NavItemLink = styled(Link)`
  text-decoration: none;
  color: #000;

  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }

  &:hover {
    font-weight: bold;
  }
`;

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // Ürün verilerinden kategorileri çıkar
  const categories = Array.from(new Set(productData.products.map(product => product.category)));

  return (
    <HeaderContainer>
      <Logo>
        <StyledLink href="/">
          <LogoText>sdnrcvk</LogoText>
        </StyledLink>
      </Logo>
      <Nav>
        <NavItem>
          <NavItemLink href="/">Ana Sayfa</NavItemLink>
        </NavItem>
        <NavItem onMouseEnter={toggleMenu} onMouseLeave={closeMenu}>
          <NavItemLink href="/#">Kategoriler</NavItemLink>
          <DropdownMenu>
            <DropdownContent open={isMenuOpen}>
              {categories.map((category, index) => (
                <DropdownItem key={index+1} href={`/${index+1}`}>{category}</DropdownItem>
              ))}
            </DropdownContent>
          </DropdownMenu>
        </NavItem>
        <NavItem>
          <StyledLink href="/cart">
          <CartIcon>
            <FaShoppingCart size={24} />
            <CartCount>3</CartCount>
          </CartIcon>
          </StyledLink>
        </NavItem>
      </Nav>
    </HeaderContainer>
  );
};

export default Header;
