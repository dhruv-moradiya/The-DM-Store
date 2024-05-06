// import React from "react";
// import SlickSlider from "../../common/slider/SlickSlider";
// import MerchandiseCard from "./MerchandiseCard";
// import Title from "../../common/title/Title";
// import CollectionCard from "../collection/CollectionCard";
// import { useClothContext } from "../../../context/ClothContext";
// import { merchandiseData } from "./merchandiseData";
// import { fanDomData } from "../collection/getCollecationData";

// function MerchandiseList() {
//   const { section } = useClothContext();

//   const merchData = merchandiseData(section);
//   const fandomData = fanDomData(section);

//   if (!merchData || !fandomData) {
//     console.error("Data is empty.");
//     return null;
//   }

//   if (section === "MEN") {
//     return (
//       <div>
//         <Title title="SHOP BY FANDOM" />
//         {fandomData && fandomData.length > 0 && (
//           <SlickSlider slidesToShow={3} speed={300} infinite={false}>
//             {fandomData.map((item, index) => (
//               <CollectionCard src={item.src} id={item.id} key={index} merchndise />
//             ))}
//           </SlickSlider>
//         )}
//       </div>
//     );
//   } else {
//     return (
//       <div>
//         <Title title="OFFICIAL MERCHANDISE" />
//         {merchData && merchData.length > 0 && (
//           <SlickSlider slidesToShow={5} speed={300} infinite={false}>
//             {merchData.map((item, index) => (
//               <MerchandiseCard key={index} src={item.src} id={item.id} />
//             ))}
//           </SlickSlider>
//         )}
//       </div>
//     );
//   }
// }

// export default MerchandiseList;


import React from "react";
import SlickSlider from "../../common/slider/SlickSlider";
import MerchandiseCard from "./MerchandiseCard";
import Title from "../../common/title/Title";
import CollectionCard from "../collection/CollectionCard";
import { useClothContext } from "../../../context/ClothContext";
import { merchandiseData } from "./merchandiseData";
import { fanDomData } from "../collection/getCollecationData";

function MerchandiseList() {
  const { section } = useClothContext();

  const merchData = merchandiseData(section);
  const fandomData = fanDomData(section);

  if (!merchData || !fandomData) {
    console.error("Data is empty.");
    return null;
  }

  if (section === "MEN") {
    return <MenMerchndise />
  } else {
    <WomenOrKidsMerchndise />
  }
}

export default MerchandiseList;

// Helping Components

function MenMerchndise() {
  const { section } = useClothContext();

  const merchData = merchandiseData(section);
  const fandomData = fanDomData(section);

  if (!merchData) {
    console.error("Data is empty.");
    return null;
  }
  return (
    <div>
      <Title title="SHOP BY FANDOM" />
      {fandomData && fandomData.length > 0 && (
        <SlickSlider slidesToShow={3} speed={300} infinite={false}>
          {fandomData.map((item, index) => (
            <CollectionCard
              src={item.src}
              id={item.id}
              key={index}
              merchndise
            />
          ))}
        </SlickSlider>
      )}
    </div>
  );
}

function WomenOrKidsMerchndise() {
  const { section } = useClothContext();

  const merchData = merchandiseData(section);

  if (!merchData) {
    console.error("Data is empty.");
    return null;
  }
  return (
    <div>
      <Title title="OFFICIAL MERCHANDISE" />
      {merchData && merchData.length > 0 && (
        <SlickSlider slidesToShow={5} speed={300} infinite={false}>
          {merchData.map((item, index) => (
            <MerchandiseCard key={index} src={item.src} id={item.id} />
          ))}
        </SlickSlider>
      )}
    </div>
  );
}
