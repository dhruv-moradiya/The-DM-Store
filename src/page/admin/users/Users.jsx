import React, { useEffect, useState } from 'react'
import UserList from '../../../components/admin/users/UserList'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../../../context/Firebase'
import Loader from '../../../components/common/loader/Loader'

function Users() {
  const [userData, setUserData] = useState(null)
  async function getUserData() {
    let temp = []
    try {
      const querySnapshot = await getDocs(collection(db, 'users'))
      querySnapshot.forEach((doc) => {
        temp.push(doc.data())
      })
      setUserData(temp)
      console.log("temp", temp)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => { getUserData() }, [])
  if (!userData || userData.length === 0) {
    return <div style={{ height: '500px' }}><Loader size='24px' /></div>
  }
  return (
    <div style={{ width: "100%" }}>
      <UserList data={userData} />
    </div>
  )
}

export default Users