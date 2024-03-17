"use client";
import React from 'react';
import styled from 'styled-components';
import { useParams } from 'next/navigation';
import productData from '../../data/products.json';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/app/redux/slices/cartSlice';
import toast from 'react-hot-toast';

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
  display: flex; 
  justify-content: center;
  padding: 1.2rem;
  background-color: #f5f5f5;
`;

const ProductDetailContainer = styled.div`
  display: flex; 
  width: 100%;
`;

const ProductDetailCard = styled.div`
  flex: 1; 
  padding: 20px;
`;

const ProductImage = styled.img`
  width: 50%;
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
  padding: 12px 24px; 
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 18px; 
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

const Product = () => {
  const { id } = useParams(); 
  const dispatch = useDispatch();

  const product = productData.products.find(product => product.id === parseInt(id as string));

  if (!product) {
    return <div>Ürün bulunamadı.</div>;
  }

  function handleAddItemToCart() {
    dispatch(addToCart(product));
    toast.success('Ürün sepete eklendi!');
  }

  return (
    <ContainerWrapper>
      <ProductDetailContainer>
        <ProductImage src={product.image} alt={product.title} />
        <ProductDetailCard>
          <ProductTitle>{product.title}</ProductTitle>
          <ProductBrand>Marka: {product.brand}</ProductBrand>
          <ProductDescription>{product.description}</ProductDescription>
          <ProductPrice>Fiyat: ${product.price}</ProductPrice>
          <AddToCartButton onClick={handleAddItemToCart}>Sepete Ekle</AddToCartButton>
        </ProductDetailCard>
      </ProductDetailContainer>
    </ContainerWrapper>
  );
};

export default Product;
