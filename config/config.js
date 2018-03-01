const TOKEN_URL = 'https://apiportalu34f5b50f-p1942719152trial.hanatrial.ondemand.com/apiportal/api/1.0/Management.svc'
const DATA_URL = 'https://apiportalu34f5b50f-p1942719152trial.hanatrial.ondemand.com/apiportal/api/1.0/Management.svc/APIProxies?$select=name,life_cycle,state&$format=json'
const SLACKBOT_URL = 'https://hooks.slack.com/services/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'

const WARNING_COLOR = "#ad0505"
const SUCCESS_COLOR = "#005D00"

const INTERVAL = 30000

module.exports = {
       TOKEN_URL ,
       DATA_URL,
       SLACKBOT_URL,
       INTERVAL,
       SUCCESS_COLOR,
       WARNING_COLOR
     }
