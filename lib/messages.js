const { SUCCESS_COLOR , WARNING_COLOR , NEUTRAL_COLOR } = require('../config/config')



module.exports.generalMsg = (obj) => {


  switch (obj.msg) {

      case 'confirmUserCreated' :

        return messageFormat(`User ${obj.data.name} created with code ${obj.data.code}`,
                      SUCCESS_COLOR)
        break

      case 'confirmUserUpdated' :

        return messageFormat(`User ${obj.data.name} updated with code ${obj.data.code}`,
                      SUCCESS_COLOR)
        break
      case 'provideNameMess' :

        return messageFormat(`proper format for /apistatus is:
                      {"name":"api name","platformName":"platform name"}
                       or list`,
                      WARNING_COLOR)
        break

      case 'displayApiList' :

        return messageFormat(`Full list of apis : ${obj.data}`,
                      NEUTRAL_COLOR)
        break

      case 'showSingleApi' :

        return messageFormat( obj.data , NEUTRAL_COLOR)

        break
      case 'fetchUserList' :
        const text = obj.data.map(user => `User ${user.name} with code ${user.code} existing\n`).join("")
        return messageFormat( text , NEUTRAL_COLOR)

        break
      case 'properPlatformFormat' :

        return messageFormat( `Proper format for /apiplatform is:
          {"name": "platform_name", "password": "password", "username": "email_adress", "url": "platform_url"}` , WARNING_COLOR)

        break
      case 'nameOrCodeNotPresent' :

        return messageFormat( 'User and/or Code not present!' , WARNING_COLOR)

        break
        'Api on platform:'+api.platformName+'\n name:'+api.name+'\n was changed by:'+name+'\n on:'+api.changed_at

        case 'changedPlatform' :
          const text = 'Api on platform:'+obj.data.platformName+'\n name:'+obj.data.name+'\n was changed by:'+obj.optional.name+'\n on:'+obj.data.changed_at
          return messageFormat( text , SUCCESS_COLOR)

          break
      default :
        break
    }
}


messageFormat = (text,color) => {
  //console.log(text,color)
  return {

    "attachments": [
        {
            "text" : text,
            "color": color
        }
    ]
  }
}
