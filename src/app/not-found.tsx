"use client";
import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';

const NotFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color:#fff;
`;

const ErrorCodeGif = styled.div`
  background-image: url(https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif);
  background-size: cover;
  height: 400px;
  width: 650px;
`;

const ErrorCode = styled.h1`
  font-size: 5rem;
  text-align: center;
  margin-top: 0;
  margin-bottom: 0;
`;

const ErrorMessage = styled.p`
  font-size: 1.5rem;
  text-align: center;
`;

const HomeLink = styled.a`
  font-size: 1.2rem;
  cursor: pointer;
  color: #fff!important;
  padding: 10px 20px;
  background: #39ac31;
  margin: 20px 0;
  display: inline-block;
`;

export default function NotFound() {
  return (
    <NotFoundContainer>
        <ErrorCodeGif>
            <ErrorCode>404</ErrorCode>
        </ErrorCodeGif>
      <ErrorMessage>Oops! Aradığınız sayfa mevcut değil.</ErrorMessage>
      <Link href="/" passHref>
        <HomeLink>Ana Sayfaya Geri Dön</HomeLink>
      </Link>
    </NotFoundContainer>
  );
}
