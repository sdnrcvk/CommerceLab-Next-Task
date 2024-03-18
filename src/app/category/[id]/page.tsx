"use client";
import React, { useState,useEffect } from 'react';
import styled from 'styled-components';
import { useParams } from 'next/navigation';
import productData from '../../data/products.json'; 
import Link from 'next/link';

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
  flex-wrap: wrap; 
  gap: 20px; 
  margin-top: 10px;
  justify-content: center; 
  margin-left: auto; 
  margin-right: auto;
  max-width: 1200px; 
`;

const ProductCard = styled.div`
  width: calc(27% - 20px); 
  margin-bottom: 20px;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #fff;
`;

const ProductImage = styled.img`
  width: 100%;
  max-height: 200px; 
  object-fit: contain; 
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const PaginationButton = styled.button`
  margin: 0 5px;
  padding: 8px 16px;
  cursor: pointer;
  border: 1px solid #ccc;
  background-color: #f9f9f9;
  color: #333;
  font-size: 16px;
  transition: background-color 0.3s ease;
  border-radius: 4px;

  &:hover {
    background-color: #e0e0e0;
  }
`;

const PrevNextButton = styled(PaginationButton)`
  background-color: #f3f3f3;
`;

const CurrentPageButton = styled(PaginationButton)`
  background-color:#ccc;
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

type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  brand: string;
  category: string;
  categoryId: number;
  image: string;
};

export default function Category () {
  // Router'dan id parametresini al
  const { id } = useParams(); 
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 9; 

  const [categoryProducts, setCategoryProducts] = useState<Product[]>([]);

  // Ürünleri almak için useEffect kullan
  useEffect(() => {
    const products = productData.products.filter(product => product.categoryId === parseInt(id as string));
    setCategoryProducts(products);
  }, [id]);

  // Sayfalandırma değişkenlerini hesapla
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = categoryProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  // Sayfayı değiştir
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber); 

  // Sayfa numaralarını hesapla
  const pageNumbers:number[]=[];
  for (let i = 1; i <= Math.ceil(categoryProducts.length / productsPerPage); i++) {
    pageNumbers.push(i);
  }

  // Önceki sayfaya git
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Sonraki sayfaya git
  const nextPage = () => {
    if (currentPage < pageNumbers.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <ContainerWrapper>
      <ProductContainer>
        {currentProducts.map(product => (
          <ProductCard key={product.id}>
            <StyledLink href={`/product/${product.id}`}>
            <h3>{product.title}</h3>
            </StyledLink>
            <p>{product.brand}</p>
            <p>Price: ${product.price}</p>
            <StyledLink href={`/product/${product.id}`}>
            <ProductImage src={product.image} alt={product.title} />
            </StyledLink>
          </ProductCard>
        ))}
      </ProductContainer>
      {/* Pagination kısmı */}
      <Pagination>
        <PrevNextButton onClick={prevPage}>Önceki</PrevNextButton>
        {pageNumbers.map(number => (
          <CurrentPageButton
            key={number}
            onClick={() => paginate(number)}
            style={{ backgroundColor: currentPage === number ? '#ccc' : '#f9f9f9' }}
          >
            {number}
          </CurrentPageButton>
        ))}
        <PrevNextButton onClick={nextPage}>Sonraki</PrevNextButton>
      </Pagination>
    </ContainerWrapper>
  );
};