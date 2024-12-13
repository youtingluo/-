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
const merge = (arr) => {
  const mergedData = {}
  arr.forEach((obj) => {
    const vendor = obj['廠商']
    if (!mergedData[vendor]) {
      mergedData[vendor] = {}
    }
    for (const key in obj) {
      if (key === '廠商') continue // 跳過 "廠商" 鍵
      if (mergedData[vendor][key]) {
        const newValues = obj[key].split(',').map((item) => item.trim())
        const existingValues = mergedData[vendor][key].split(',').map((item) => item.trim())
        const mergedValues = Array.from(new Set([...existingValues, ...newValues])).join(',')
        mergedData[vendor][key] = mergedValues
      } else {
        mergedData[vendor][key] = obj[key]
      }
    }
  })

  const mergeArray = Object.keys(mergedData).map((vendor) => ({
    廠商: vendor,
    ...mergedData[vendor]
  }))

  return mergeArray
}
export { convertToObjects, covertAllObjects, extractMatchingKeys, merge }
