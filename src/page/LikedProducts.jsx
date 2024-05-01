import React from 'react'
import LikeProductCardList from '../components/likeProduct/LikeProductCardList'
import { useClothContext } from '../context/ClothContext'

function LikedProducts() {
  const { currentUser } = useClothContext();

  if (!currentUser) return null;

  return (
    <div>
      <LikeProductCardList />
    </div>
  )
}

export default LikedProducts