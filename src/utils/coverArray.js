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

export { convertToObjects }
