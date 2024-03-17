"use client";
import React, { useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'next/navigation';
import productData from '../../data/products.json'; 
import Link from 'next/link';

const ProductContainer = styled.div`
  display: flex;
  flex-wrap: wrap; /* Allow products to wrap to the next row */
  gap: 20px; 
  margin-top: 30px;
  justify-content: center; /* Center products horizontally */
  margin-left: auto; 
  margin-right: auto;
  max-width: 1200px; 
`;

const ProductCard = styled.div`
  width: calc(27% - 20px); /* Set width for 3 columns with a gap of 20px */
  margin-bottom: 20px;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const ProductImage = styled.img`
  width: 100%;
  max-height: 200px; /* Örneğin 200 piksel maksimum yükseklik */
  object-fit: contain; /* Resmi kutunun içine sığacak şekilde boyutlandırır */
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

const CurrentPageButton = styled(PaginationButton)<{ active?: boolean }>`
  background-color: ${({ active }) => (active ? "#ccc" : "#f9f9f9")};
`;

export default function Category () {
  const params = useParams();
  const id=params.id;
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 9; 

  // Kategori id'sine göre ürün getir
  const categoryProducts = productData.products.filter(product => product.categoryId === parseInt(id as string));

  // Sayfalandırma değişkenlerini hesapla
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = categoryProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  // Sayfayı değiştir
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber); 

  // Sayfa numaralarını hesapla
  const pageNumbers = [];
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
    <div>
      <ProductContainer>
        {currentProducts.map(product => (
          <ProductCard key={product.id}>
            <Link href={`/product/${product.id}`} key={product.id}>
            <h3>{product.title}</h3>
            </Link>
            <p>{product.brand}</p>
            <p>Price: ${product.price}</p>
            <ProductImage src={product.image} alt={product.title} />
          </ProductCard>
        ))}
      </ProductContainer>
      {/* Pagination kısmı */}
      <Pagination>
        <PrevNextButton onClick={prevPage}>Önceki</PrevNextButton>
        {pageNumbers.map(number => (
          <CurrentPageButton
            key={number}
            active={currentPage === number}
            onClick={() => paginate(number)}
          >
            {number}
          </CurrentPageButton>
        ))}
        <PrevNextButton onClick={nextPage}>Sonraki</PrevNextButton>
      </Pagination>
    </div>
  );
};