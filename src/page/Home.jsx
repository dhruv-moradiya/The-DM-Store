import React, { useEffect, useState } from 'react'
import Hero from '../components/home/hero/Hero'
import CategoryList from '../components/home/category/CategoryList'
import ProductList from '../components/common/productCard/ProductList'
import CollectionList from '../components/home/collection/CollectionList'
import MerchndiseList from '../components/home/merchandise/MerchndiseList'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '../context/Firebase'
import { useClothContext } from '../context/ClothContext'

function Home() {
  const { section, productListData, allProductData } = useClothContext()

  useEffect(() => {
    productListData();
  }, [section]);
  return (
    <div style={{ maxWidth: "100vw", overflow: "hidden" }}>
      <Hero />
      <CategoryList />
      <CollectionList title />
      <MerchndiseList />
      <ProductList title allProductData={allProductData} />
    </div >
  )
}

export default Home