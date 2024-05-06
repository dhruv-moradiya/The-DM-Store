import {
  collectionData,
  fanDomData,
} from "../../components/home/collection/getCollecationData";
import { merchandiseData } from "../../components/home/merchandise/merchandiseData";
import { categoryArray_female, categoryArray_kids, categoryArray_male } from "../../helpers/helpers";

export function filterByWhat(filterStr) {
  switch (filterStr[0]) {
    case "collection":
      return {
        type: "productCollection",
      };
    case "merchndise":
      return {
        type: "theme",
      };
    case "Category_women":
    case "Category_men":
    case "Category_kids":
      return {
        type: "category",
      };

    default:
      break;
  }
}

export function filterByType(filterByWhatType, value, gender) {
  if (filterByWhatType === "productCollection") {
    return collectionData(gender).find((item) => item.id === value);
  } else if (filterByWhatType === "theme") {
    switch (gender) {
      case "MEN":
        return fanDomData(gender).find((item) => item.id === value);
      case "WOMEN":
        return merchandiseData(gender).find((item) => item.id === value);
      case "KIDS":
        return merchandiseData(gender).find((item) => item.id === value);
      default:
        return [];
    }
  } else {
    switch (gender) {
      case "MEN":
        return categoryArray_male.find((item) => item.id === value);
      case "WOMEN":
        return categoryArray_female.find((item) => item.id === value);
      case "KIDS":
        return categoryArray_kids.find((item) => item.id === value);
      default:
        return [];
    }
  }
}

export function gender(section) {
  switch (section) {
    case "MEN":
      return "male";
    case "WOMEN":
      return "women";
    case "KIDS":
      return "kids";

    default:
      break;
  }
}