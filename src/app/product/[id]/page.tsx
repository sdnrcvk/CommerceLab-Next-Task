"use client";
import React from 'react';
import styled from 'styled-components';
import { useParams } from 'next/navigation';
import productData from '../../data/products.json';

const ProductDetailContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 50px;
`;

const ProductDetailCard = styled.div`
  width: 800px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const ProductImage = styled.img`
  width: 100%;
  max-height: 400px;
  object-fit: contain;
  border-radius: 8px;
  margin-bottom: 20px;
`;

const ProductTitle = styled.h2`
  font-size: 24px;
  margin-bottom: 10px;
`;

const ProductBrand = styled.p`
  font-size: 18px;
  color: #777;
  margin-bottom: 10px;
`;

const ProductDescription = styled.p`
  font-size: 16px;
  margin-bottom: 20px;
`;

const ProductPrice = styled.p`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const AddToCartButton = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

const Product = () => {
  const { id } = useParams(); // Router'dan id parametresini al

  const product = productData.products.find(product => product.id === parseInt(id as string));

  const addToCart = () => {
    console.log('Ürün sepete eklendi.');
  };

  if (!product) {
    return <div>Ürün bulunamadı.</div>;
  }

  return (
    <ProductDetailContainer>
      <ProductDetailCard>
        <ProductImage src={product.image} alt={product.title} />
        <ProductTitle>{product.title}</ProductTitle>
        <ProductBrand>Marka: {product.brand}</ProductBrand>
        <ProductDescription>{product.description}</ProductDescription>
        <ProductPrice>Fiyat: ${product.price}</ProductPrice>
        <AddToCartButton onClick={addToCart}>Sepete Ekle</AddToCartButton>
      </ProductDetailCard>
    </ProductDetailContainer>
  );
};

export default Product;
