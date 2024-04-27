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
          "Shits",
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
    case "SHOES & ACCESSORIES":
      return ["Shoes", "Backpacks", "Caps"];
    case "ACCESSORIES":
      return ["Perfumes", "Backpacks", "Socks", "Caps"];
    case "THEMES":
      return ["Batman", "Black Panther", "Naruto", "One Piece", "Rick And Morxy", "Harry Potter"];
    default:
      return [];
  }

}
