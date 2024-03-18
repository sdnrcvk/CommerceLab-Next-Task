import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import productData from '../../data/products.json';
import styled from 'styled-components';
import Link from 'next/link';

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

interface Product {
  id: number;
  title: string;
  image: string;
  price: number;
  categoryId: number;
}

interface CategoryProductsProps {
  categoryId: number;
}

const CategoryProducts: React.FC<CategoryProductsProps> = ({ categoryId }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categoryName, setCategoryName] = useState<string>('');

  useEffect(() => {
    // Kategoriye göre ürünleri filtre.İlk 12 ürünü al
    const categoryProducts = productData.products.filter(product => product.categoryId === categoryId).slice(0, 12); 
    setProducts(categoryProducts);

    // Kategori adını bul
    const category = productData.products.find(category => category.categoryId === categoryId);
    if (category) {
      setCategoryName(category.category);
    }
  }, [categoryId]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3
  };

  return (
    <div className="category-products" style={{ width: '90%', margin:'30px auto'}}>
      <h2>{categoryName}</h2>
      <div className="slider-container">
        <Slider {...settings}>
          {products.map((product) => (
            <div key={product.id}>
              <img src={product.image} alt={product.title} style={{ width: '90%', height: 'auto' }} />
              <StyledLink href={`/product/${product.id}`}>
                <p><b>{product.title}</b></p>
              </StyledLink>
              <p>${product.price}</p>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default CategoryProducts;
