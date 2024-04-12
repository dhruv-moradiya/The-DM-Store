export function getDropDownItems(item, section) {
  switch (item) {
    case "TOPWEAR":
      if (section === 'MEN') {
        return [
          "Oversized T-shirts",
          "All T-Shirts",
          "All Shirts",
          "Jackets",
          "Hoodies & Sweatshirts",
        ];
      }
      else {
        return [
          "Oversized T-shirts",
          "All T-Shirts",
          "All Shirts",
          "Jackets",
          "Hoodies & Sweatshirts",
          "Sweaters",
          "Boyfriend T-shirts"
        ];
      }
    case "BOTTOMWEAR":
      if (section === 'MEN') {
        return [
          "All Bottoms",
          "Pants",
          "Cargos",
          "Jeans",
          "Boxers & Innerwear",
        ];
      }
      else {
        return [
          "All Cargos",
          "Joggers",
          "Pants",
          "Jeans",
          "Shorts",
        ];
      }
    case "SHOES & ACCESSORIES":
      return ["Shoes", "Backpacks", "Caps"];
    case "ACCESSORIES":
      return ["Perfumes", "Backpacks", "Socks", "Caps"];
    case "THEMES":
      return ["All Superheroes", "All Movies & TV Shows", "All Cartoons", "Patterns", "Funny", "Food"];
    default:
      return [];
  }

}
