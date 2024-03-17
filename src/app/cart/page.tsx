"use client";
import React, { useState,useEffect } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { decrementQty, incrementQty, removeFromCart } from '../redux/slices/cartSlice';
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
  padding:1.2rem;
  background-color: #F5F5F5;
`;

const ProductContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 10px;
  justify-content: center;
  margin-left: auto;
  margin-right: auto;
  max-width: 1200px;
`;

const ProductCard = styled.div`
  display: flex;
  align-items: center;
  padding: 15px;
  border-bottom: 1px solid #ddd;
  background-color: #fff;
  border-radius: 8px; /* Rounded corners */
`;

const ProductImage = styled.img`
  width: 150px;
  height: auto;
  margin-right: 20px;
`;

const ProductInfo = styled.div`
  flex-grow: 1;
`;

const ActionButtons = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
`;

const QuantityButton = styled.button`
  padding: 5px 10px;
  border: none;
  cursor: pointer;
  background-color: #f9f9f9;
  color: #333;
  font-size: 14px;
  border-radius: 4px;
`;

const RemoveButton = styled.button`
  padding: 8px 16px; /* Increase padding for a larger button */
  border: none;
  cursor: pointer;
  background-color: #f44336;
  color: white;
  font-size: 14px;
  border-radius: 4px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #d32f2f;
  }
`;

const TotalPrice = styled.div`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
`;

interface Product {
  id: number;
  name: string;
  brand: string;
  price: number;
  image: string;
  quantity: number;
}

export default function Cart() {
  const dispatch = useDispatch();
  const [cartItems, setCartItems] = useState<Product[]>([]); 

  const totalPrice = cartItems.reduce((acc: number, currentItem: Product) => {
    return acc + currentItem.price * currentItem.quantity;
  }, 0);

  useEffect(() => {
    // LocalStorage'dan sepetteki ürün bilgilerini getir
    const storedCartItems = JSON.parse(localStorage.getItem("cart") || "[]"); 
    setCartItems(storedCartItems);
  }, [cartItems]);

  const handleItemIncrement = (productId: number) => {
    dispatch(incrementQty(productId));
  };

  const handleItemDecrement = (productId: number) => {
    dispatch(decrementQty(productId));
  };

  const handleItemDelete = (productId: number) => {
    dispatch(removeFromCart(productId));
    toast.success('Ürün sepetten silindi!');
  };

  return (
    <ContainerWrapper>
      <ProductContainer>
        {cartItems.length > 0 ? (
          <>
            <TotalPrice>Toplam Tutar: ${totalPrice}</TotalPrice>
            {cartItems.map((product) => (
              <ProductCard key={product.id}>
                <ProductImage src={product.image} />
                <ProductInfo>
                  <Link href={`/product/${product.id}`}>
                    <h3>{product.name}</h3>
                  </Link>
                  <p>{product.brand}</p>
                  <p>Price: ${product.price * product.quantity}</p>
                  <ActionButtons>
                    <QuantityButton onClick={() => handleItemDecrement(product.id)}>-</QuantityButton>
                    <span>{product.quantity}</span>
                    <QuantityButton onClick={() => handleItemIncrement(product.id)}>+</QuantityButton>
                    <RemoveButton onClick={() => handleItemDelete(product.id)}>Sepetten Çıkar</RemoveButton>
                  </ActionButtons>
                </ProductInfo>
              </ProductCard>
            ))}
          </>
        ) : (
          <div>Sepette ürün bulunmamaktadır...</div>
        )}
      </ProductContainer>
    </ContainerWrapper>
  );
}
