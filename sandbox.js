const testArr = ['abc', 'frodo', 'sam', 'cache-control']

// first cap, multi cap

const onlyFirstCap = (str) =>
  str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()

const addCapsVariations = (lowerCasedArr) => {
  lowerCasedArr.forEach((item) => {
    lowerCasedArr.push(item.toUpperCase())
    lowerCasedArr.push(onlyFirstCap(item))
  })
}

addCapsVariations(testArr)

console.log(testArr)
