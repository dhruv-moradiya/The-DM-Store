import React from "react";
import styles from "./merchandise.module.css";
import MerchandiseCard from "./MerchandiseCard";
import SlickSlider from "../../common/slider/SlickSlider";
import { useClothContext } from "../../../context/ClothContext";
import { merchandiseData } from "./merchandiseData";
import Title from "../../common/title/Title";
import CollectionCard from "../collection/CollectionCard";
import { fanDomData } from "../collection/getCollecationData";

function MerchndiseList() {
  const { section } = useClothContext();
  // if (!merchandiseData(section).length) return null;
  return (
    <div className={styles.contanier}>
      {section !== "MEN" ? (
        <>
          <Title title="OFFICIAL MERCHANDISE" />
          {!merchandiseData(section).length ? null : (
            <SlickSlider
              slidesToShow={5}
              play={false}
              speed={300}
              infinite={false}
            >
              {merchandiseData(section)?.map((item, index) => {
                return (
                  <MerchandiseCard key={index} src={item.src} id={item.id} />
                );
              })}
            </SlickSlider>
          )}
        </>
      ) : (
        <>
          <Title title="SHOP BY FANDOM" />
          <SlickSlider
            slidesToShow={3}
            speed={300}
            play={false}
            infinite={false}
          >
            {fanDomData(section)?.map((item, index) => {
              return (
                <CollectionCard
                  src={item.src}
                  id={item.id}
                  key={index}
                  merchndise
                />
              );
            })}
          </SlickSlider>
        </>
      )}
    </div>
  );
}

export default MerchndiseList;

// function MerchndiseList() {
//   const { section } = useClothContext();
//   const merchndiseListData =
//     section === "MEN" ? fanDomData() : merchandiseData(section);
//   return (
//     <div className={styles.contanier}>
//       <Title
//         title={section === "MEN" ? "SHOP BY FANDOM" : "OFFICIAL MERCHANDISE"}
//       />
//       <SlickSlider slidesToShow={section === "MEN" ? 3 : 5} play={false} speed={300} infinite={false}>
//         {merchndiseListData.map((item, index) => {
//           return section === "MEN" ? (
//             <CollectionCard
//               src={item.src}
//               id={item.id}
//               key={index}
//               merchndise
//             />
//           ) : (
//             <MerchandiseCard key={index} src={item.src} id={item.id} />
//           );
//         })}
//       </SlickSlider>
//     </div>
//   );
// }

// export default MerchndiseList;
