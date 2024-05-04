import { fanDomData } from "../../components/home/collection/getCollecationData";
import { merchandiseData } from "../../components/home/merchandise/merchandiseData";
import { categoryArray_female, categoryArray_kids, categoryArray_male } from "../../helpers/helpers";

export function getDropDownItems(item, section) {
  switch (item) {
    case "TOPWEAR":
      if (section === 'MEN') {
        return [
          "Oversized t-shirts",
          "T-shirt",
          "Shirts",
          "Jakets",
          "Hoodies",
          "Sweatshits"
        ];
      }
      else {
        return [
          "Oversized t-shirts",
          "Shirts",
          "Tops",
          "Jakets",
          "Dresses",
        ];
      }
    case "BOTTOMWEAR":
      if (section === 'MEN') {
        return [
          "Cargo pants",
          "Jeans",
          "Joggers",
          "Shorts",
        ];
      }
      else {
        return [
          "All bottoms",
          "Cargo & joggers",
          "Jeans",
        ];
      }
    // case "SHOES & ACCESSORIES":
    //   return ["Shoes", "Backpacks", "Caps"];
    case "ACCESSORIES":
      return ["Perfumes", "Backpacks", "Socks", "Caps"];
    case "THEMES":
      return ["Batman", "Black Panther", "Naruto", "One Piece", "Rick And Morxy", "Harry Potter"];
    case "BOY":
      return ["Boys t-shirts", "Boys polos", "Boys joggers", "Boys full-sleeved t-shirts", "Boys hodies & sweatshirts", "Boys jackets"];
    case "GIRL":
      return ["Girls top", "Girls dresses", "Girls joggers", "Girls full-sleevedt-shirts", "Girls hodies & sweatshirts", "Girls jackets"];
    default:
      return [];
  }

}


//-----------------------------------------------------

export function dropDownItemsNavigation(dropDownCategory, dropDownItem, section) {
  const categoryArray = {
    MEN: categoryArray_male,
    WOMEN: categoryArray_female,
    KIDS: categoryArray_kids,
  };

  const dropDownThemeData = {
    MEN: fanDomData(section),
    WOMEN: merchandiseData(section),
    KIDS: merchandiseData(section),
  };

  const whichNavigation =
    dropDownCategory === "THEMES" ? dropDownThemeData : categoryArray;

  const categoryId = whichNavigation[section].find(
    (item) => item.name === dropDownItem
  );
  return categoryId?.id || 1;
}