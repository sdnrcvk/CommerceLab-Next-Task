"use client"
import React from 'react';
import CategoryProducts from './components/CategoryProducts';
import SimpleSlider from './components/Slider';
import styled from 'styled-components';

const ContainerWrapper = styled.div`
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  margin-top: 20px;
  margin-bottom: 20px;
  margin-left: auto;
  margin-right: auto;
  max-width: 1250px;
  padding:1.2rem;
  background-color: #F5F5F5;
`;

const Home = () => {
  return (
    <div className="home">
      <SimpleSlider/>
      <ContainerWrapper>
        <CategoryProducts categoryId={1} />
        <CategoryProducts categoryId={2} />
      </ContainerWrapper>
    </div>
  );
};

export default Home;
