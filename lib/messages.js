const { SUCCESS_COLOR , WARNING_COLOR } = require('../config/config')

module.exports.confirmUserCreated = (data) => {
  return {

    "attachments": [
        {
            "text" : `User ${data.name} created with code ${data.code}`,
            "color": SUCCESS_COLOR,
            "image_url": "http://my-website.com/path/to/image.jpg",
           "thumb_url": "http://example.com/path/to/thumb.png",
           "footer": "Slack API",
           "footer_icon": "https://platform.slack-edge.com/img/default_application_icon.png",

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
