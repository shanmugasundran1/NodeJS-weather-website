//req = request
//res = response

//app.set
//app.use
//app.get
//app.listen

const path = require('path')
const hbs = require('hbs')
const express = require('express')
const app = express()
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

//console.log(path.join(__dirname, '../public'))
const publicDirectoryPath = path.join(__dirname, '../public') //only for static html pages in public directory
const viewsPath = path.join(__dirname, '../templates/views') //if change default 'view' directory name to 'template'
const partialsPath = path.join(__dirname, '../templates/partials')


app.use(express.static(publicDirectoryPath)) //only for static html pages in public directory

app.set('view engine', 'hbs')
app.set('views', viewsPath) //if change default 'view' directory name to 'template'
hbs.registerPartials(partialsPath)

app.get('', (req,res) => {
    res.render('index', {
        title : 'Weather',
        name: 'Shan',
        footerName: 'Weather Footer'
    })
})

app.get('/about', (req,res) => {
    res.render('about', {
        title : 'About Me',
        name: 'Shan',
        footerName: 'About Footer'
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        title : 'Help Page!',
        name: 'This is to help you all!',
        footerName: 'Help Footer'
    })
})

app.get('/weather', (req,res) => {
    if(!req.query.address){
        return res.send({
            error:'You must provide a search term'
        })
    }
    console.log(req.query.address)

        geocode(req.query.address, (error, {latitude,longitude, place_name} = {}) => {
            if(error){
                return res.send({error})
            }
                forecast(latitude, longitude, (error,foreCast) => {
                    if(error){
                        return res.send({error})
                    }
                    res.send({
                        foreCast: foreCast,
                        address: req.query.address
                    })
                })
        })

})  //non dynamic web page without using html file


app.get('/products', (req,res) => {
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query)
    res.send({
        products : []
    })
})

app.get('*', (req,res) => {
    res.render('404', {
        title: 'Page not found error',
        footerName: 'Error footer',
        errorParagraph: 'The page is not displayed because it is missing in the server. Please check if the url address is correct'
    })
})

app.get('/help/*', (req,res) => {
    res.render('404', {
        title: 'Article not found error',
        footerName: 'Error footer',
        errorParagraph: 'The article is not displayed because it is missing in the server.'
    })
})

// app.get('*', (req,res) => {
//     res.send('My 404 Page')
// })

// app.get('/help/*', (req,res) => {
//     res.send('Help article not found')
// })

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})

// app.com
// app.com/help
// app.com/about 