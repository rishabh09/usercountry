const request = require('request')

const userCountry = token => {
  let tokenQuery = token ? `?token==${token}`: ''
  return (req, res, next) => {
    let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress 
    request(`http://usercountry.com/v1.0/json/${ip}${tokenQuery}`,
      (err, response, body) => {
        const result = JSON.parse(body)
        req.userCountry = result
        next()
      }
    )
  }
}

module.exports = userCountry