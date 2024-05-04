import { categoryArray_female, categoryArray_kids, categoryArray_male, collection_kids, collection_men, collection_women, theme_kids, theme_men, theme_women } from "../../../../helpers/helpers"

const priceList = [
  'Less then 800',
  '800 To 1500',
  '1500 To 2500',
  'More then 2500'
]

export const priceListForFilter = {
  'Less then 800': { min: 0, max: 800 },
  '800 To 1500': { min: 800, max: 1500 },
  '1500 To 2500': { min: 1500, max: 2500 },
  'More then 2500': { min: 2500, max: 10000 }
}

export const dicountList = [1, 2, 3, 4, 5, 6]

function handleFilter(e, header) {
  e.stopPropagation()
  header.column.setFilterValue(e.target.value)
}

const categoryNameList = []
const collectionNameList = []
const themeNameList = []

function convert(array, ...categorys) {
  const items = categorys.flat()

  items.forEach(item => {
    if (array.includes(item.name)) return;
    array.push(item.name)
  })
}
convert(categoryNameList, categoryArray_male, categoryArray_female, categoryArray_kids)
convert(collectionNameList, collection_men, collection_women, collection_kids)
convert(themeNameList, theme_men, theme_women, theme_kids)

export function filterItem(header) {
  switch (header.column.columnDef.header) {
    case 'For Whom':
      return <div>
        <select name="gender" onChange={(e) => handleFilter(e, header)}>
          <option value="all">All</option>
          <option value="male">Male</option>
          <option value="women">Women</option>
          <option value="kids">Kids</option>
        </select>
      </div>
    case 'Category':
      return <div>
        <select name="category" onChange={(e) => handleFilter(e, header)}>
          <option value="all">All</option>
          {categoryNameList.map((item, index) => {
            return <option key={index} value={item}>{item}</option>
          })}
        </select>
      </div>
    case 'Collection':
      return <div>
        <select name="collection" onChange={(e) => handleFilter(e, header)}>
          <option value="all">All</option>
          {collectionNameList.map((item, index) => {
            return <option key={index} value={item}>{item}</option>
          })}
        </select>
      </div>
    case 'Theme':
      return <div>
        <select name="theme" onChange={(e) => handleFilter(e, header)}>
          <option value="all">All</option>
          {themeNameList.map((item, index) => {
            return <option key={index} value={item}>{item}</option>
          })}
        </select>
      </div>
    case 'Price':
      return <div>
        <select name="price" onChange={(e) => handleFilter(e, header)}>
          <option value="all">All</option>
          {priceList.map((item, index) => {
            return <option key={index} value={item}>{item}</option>
          })}
        </select>
      </div>
    case 'Discount':
      return <div>
        <select name="discount" onChange={(e) => handleFilter(e, header)}>
          <option value="all">All</option>
          {dicountList.map((item, index) => {
            return <option key={index} value={item}>{item}</option>
          })}
        </select>
      </div>
    default:
      return ""
  }
}