import { getDocs } from "firebase/firestore";

export function useGetData(ref) {
  const querySnapshot = getDocs(ref);
  return querySnapshot.then((data) => {
    const temp = [];
    data.forEach((doc) => {
      temp.push(doc.data());
    });
    return temp;
  })
};
