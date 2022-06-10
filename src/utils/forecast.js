// const weatherURL = "http://api.weatherstack.com/current?access_key=3ef5c01eef62c3ad651084d8d47cf277&query=New%20York&units=f"

// request({url: weatherURL, json: true}, (error, response) => {
//     // const data = JSON.parse(response.body)
//     // console.log(data.current) //use if {json:false}
//     //console.log(response.body.current) //if {json:true}
//     if(error){
//         console.log('Unable to connect to Weather Service')
//     }
//     else if(response.body.error){
//         console.log('Unable to find the location')
//     }
//     else{
//         console.log(response.body.current.weather_descriptions[0],'.It is currently', response.body.current.temperature, 'out. It feels like', response.body.current.feelslike, '.There is', response.body.current.precip, 'percent chance of rain')
//     }
// })

const request = require('request')

const forecast = (latitude,longitude, callback) => {
    setTimeout(() => {
        const url = 'http://api.weatherstack.com/current?access_key=3ef5c01eef62c3ad651084d8d47cf277&query=' + latitude + ','+ longitude + '&units=f'

        request({url, json:true}, (error,{body}) => {
            if(error){
                callback('Cannot connect to weather service!', undefined)
            }
            else if(body.error){
                callback('Location not found!', undefined)
            }
            else{
                callback(undefined, body.current.weather_descriptions[0] +'. It is currently ' + body.current.temperature + ' out. It feels like ' + body.current.feelslike + '. There is ' + body.current.precip + ' percent chance of rain')
            } 
        })
    }, 2000)
}
//callback = console.log('')
module.exports = forecast