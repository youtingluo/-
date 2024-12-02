const convertToObjects = (array) => {
  const keys = array[0]
  const result = []
  for (let i = 1; i < array.length; i++) {
    const obj = {}
    for (let j = 0; j < keys.length; j++) {
      obj[keys[j]] = array[i][j]
    }
    result.push(obj)
  }
  const filterResult = result.map((item) => {
    return Object.fromEntries(Object.entries(item).filter(([, value]) => value))
  })
  return filterResult
}

function covertAllObjects(array) {
  const categorizedData = array.reduce((acc, item) => {
    const filteredItem = Object.fromEntries(Object.entries(item).filter(([, value]) => value))
    if (!acc[item.類別]) {
      acc[item.類別] = []
    }
    acc[item.類別].push(filteredItem)
    return acc
  }, {})
  const data = []
  for (const key in categorizedData) {
    data.push({ [key]: categorizedData[key] })
  }
  return data
}

const extractMatchingKeys = (dataArray, searchArray) => {
  const extractedKeys = []
  dataArray.forEach((dataItem) => {
    Object.keys(dataItem).forEach((key) => {
      searchArray.forEach((searchItem) => {
        if (dataItem[key] && dataItem[key].includes(searchItem)) {
          extractedKeys.push(key)
        }
      })
    })
  })
  return [...new Set(extractedKeys)]
}

export { convertToObjects, covertAllObjects, extractMatchingKeys }
