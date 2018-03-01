const { SUCCESS_COLOR , WARNING_COLOR } = require('../config/config')

module.exports.confirmUserCreated = (data) => {
  return {

    "attachments": [
        {
            "text" : `User ${data.name} created with code ${data.code}`,
            "color": SUCCESS_COLOR

        }
    ]
  }
}

module.exports.confirmUserUpdated = (data) => {
  return {
     "attachments" : [{
      	   "text" : `User ${data.name} with code ${data.code} updated`,
      	  "color": SUCCESS_COLOR
      	}]
      }
  }


module.exports.messageToSlack = (data) => {
  return {

    "attachments": [
        {
            "text" : `${data}`,
            "color": SUCCESS_COLOR

        }
    ]
  }

}

module.exports.diplayApiList = (data) => {
  return {

    "attachments": [
        {
            "text" : `Full list of apis : ${data}`
            "color": WARNING_COLOR

        }
    ]
  }
}
module.exports.provideNameMess = () => {
  return {

    "attachments": [
        {
            "text" : `please provide api name`,
            "color": WARNING_COLOR

        }
    ]
  }
}
