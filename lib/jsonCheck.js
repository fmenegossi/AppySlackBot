module.exports = (requestBody) => {
  try {
    JSON.parse(requestBody)
    console.log("JsonCheck",true)
    return true
  } catch (err) {
    console.log("JsonCheck",false)
    return false
  }
}
