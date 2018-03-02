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

  module.exports.fetchUserList = (users) => {
    const text = users.map(user => `User ${user.name} with code ${user.code} existing\n`).join("")
    console.log("check dit" ,typeof(text))
    return {
       "text": "User and/or Code not present! These are the users we already have",
       "attachments" : [{
        	   "text" : text,
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

module.exports.displayApiList = (data) => {
  console.log(data,'DATA')
  return {
    "attachments": [
        {
            "text" : `Full list of apis : ${data}`,
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
