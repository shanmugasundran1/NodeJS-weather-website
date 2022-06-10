// const geocodeURL = "https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1Ijoic2hhbm11Z2EwMSIsImEiOiJjbDQybjl0dDUwMWRwM2lxeGlvZHd2YmN1In0.DuW6ewNe9y0OEk78Q47knw&limit=1"

// request({url:geocodeURL, json:true}, (error, response)=> {
//     if(error){
//         console.log('Unable to connect to Weather Service')
//     }else if (response.body.features.length === 0){
//         console.log('Unable to find the location')
//     }
//     else{
//         const latitude = response.body.features[0].center[0]
//         const longitude = response.body.features[0].center[1]
//         console.log(latitude, '', longitude)
//     }
// })


const request = require('request')

const geocode = (address, callback) => {
    setTimeout(() => {
        const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1Ijoic2hhbm11Z2EwMSIsImEiOiJjbDQybjl0dDUwMWRwM2lxeGlvZHd2YmN1In0.DuW6ewNe9y0OEk78Q47knw&limit=1'
        
        request({url, json: true}, (error, {body}) => {
            if(error){
                callback('Unable to connect to location services!', undefined)
            }else if (body.features.length === 0){
                callback('Unable to find the location!', undefined)
            }
            else{
                callback(undefined, {
                    latitude : body.features[0].center[1],
                    longitude : body.features[0].center[0],
                    place_name : body.features[0].place_name
                })
            }  
        })
    }, 2000)
}
//callback = console.log('')
module.exports = geocode
