import { categoryArray_female, categoryArray_kids, categoryArray_male, collection_kids, collection_men, collection_women, theme_kids, theme_men, theme_women } from "../../../helpers/helpers";

export function categoryOptions(whome) {
  switch (whome) {
    case "male":
      return categoryArray_male.map((item, index) => {
        return (
          <option value={item.name} key={index}>
            {item.name}
          </option>
        );
      });
    case "women":
      return categoryArray_female.map((item, index) => {
        return (
          <option value={item.name} key={index}>
            {item.name}
          </option>
        );
      });
    case "kids":
      return categoryArray_kids.map((item, index) => {
        return (
          <option value={item.name} key={index}>
            {item.name}
          </option>
        );
      });
    default:
      return [];
  }
}
export function collectionOptions(whome) {
  switch (whome) {
    case "male":
      return collection_men.map((item, index) => {
        return (
          <option value={item.name} key={index}>
            {item.name}
          </option>
        );
      });
    case "women":
      return collection_women.map((item, index) => {
        return (
          <option value={item.name} key={index}>
            {item.name}
          </option>
        );
      });
    case "kids":
      return collection_kids.map((item, index) => {
        return (
          <option value={item.name} key={index}>
            {item.name}
          </option>
        );
      });
    default:
      return [];
  }
}
export function themeOptions(whome) {
  switch (whome) {
    case "male":
      return theme_men.map((item, index) => {
        return (
          <option value={item.name} key={index}>
            {item.name}
          </option>
        );
      });
    case "women":
      return theme_women.map((item, index) => {
        return (
          <option value={item.name} key={index}>
            {item.name}
          </option>
        );
      });
    case "kids":
      return theme_kids.map((item, index) => {
        return (
          <option value={item.name} key={index}>
            {item.name}
          </option>
        );
      });
    default:
      return [];
  }
}