console.log('hello world')

// Getting elements from HTML
let currentDay = $('#currentDay')
let container = $('.container')
let clear = $('#clearBtn')
let today = moment().format('dddd, [ ]MMMM, Do')
$(currentDay).text(today)

let 