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
  // const [allProductData, setAllProductData] = useState(null)
  // function forWhome() {
  //   switch (section) {
  //     case 'MEN':
  //       return 'male'
  //     case 'WOMEN':
  //       return 'women'
  //     case 'KIDS':
  //       return 'kids'
  //     default:
  //       break;
  //   }
  // }
  // async function productListData() {
  //   const productRef = collection(db, 'products')
  //   const temp = []
  //   try {
  //     const q = query(productRef, where('forWhome', '==', `${forWhome()}`))
  //     const querySnapshot = await getDocs(q)
  //     querySnapshot.forEach(doc => {
  //       temp.push(doc.data())
  //     })
  //     setAllProductData(temp)
  //     console.log("temp: ", temp)
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

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