// console.log('test')

// Getting elements from HTML
let currentDay = $('#currentDay')
let container = $('.container')
let clear = $('#clearBtn')
let today = moment().format('dddd, [ ]MMMM, Do')
$(currentDay).text(today)


// Hours store with messages
let hours = {
  '9:00 AM': '',
  '10:00 AM': '',
  '11:00 AM': '',
  '12:00 AM': '',
  '1:00 PM': '',
  '2:00 PM': '',
  '3:00 PM': '',
  '4:00 PM': '',
  '5:00 PM': '',
}

function hoursObject() {
  if (localStorage.length == 0) {
    return
  } else {
    let newHours= JSON.parse(localStorage.getItem('hours'))
    hours = newHours
  }
}
// Calls function
hoursObject()

// HTML Display
function displayHours() {
  for (let hour in hours) {
    let li = $('<li></li>').addClass('block');
    let span = $('<span></span>').attr('class', 'blockTime');
    span.text(hour);
    let textArea = $('<textarea></textarea>');
    textArea.attr('class', 'blockText');
    textArea.text(hours[hour])
    let button = $('<button></button>');
    button.attr('class', 'blockSave');
    let icon = $('<i class="fa fa-lock" aria-hidden="true"></i>');
    button.append(icon)
    li.append(span)
    li.append(textArea)
    li.append(button)
    container.append(li)
  }
  
  // Adds event listeners to get value
  ($('.blockSave').get().forEach(element => {
    $(element).on('click', () => {
      let parent = $(element).parent().get()
      let time = $(parent).children('.blockTime').text()
      let msg = $(parent).children('.blockText').val()
      let textBg = $(parent).children('.blockText')
      // changes background on textarea to show that it has been saved 
      textBg.css('background', 'rgb(223, 255, 223)')
      setTimeout(() => {
        textBg.css('background', '#fff')
      }, 650)
      // Stores time and message
      saveBlocks(time, msg);
    })

    $(element).parent().children('.blockText').keypress((event) => {
      if (event.which === 13) {
        event.preventDefault()
        let parent = $(element).parent().get()
        let time = $(parent).children('.blockTime').text()
        let msg = $(parent).children('.blockText').val()
        let textBg = $(parent).children('.blockText')
        // changes background on textarea to show that it has been saved 
        textBg.css('background', 'rgb(0, 255, 76)')
        setTimeout(() => {
          textBg.css('background', '#fff')
        }, 650)
        // Stores time and message
        saveBlocks(time, msg);
      }
    })
  }))
  let momentHour = moment().format('H')
  colorCoordinate(momentHour)
}
// Calls function
displayHours()

// Different color for different hour
function colorCoordinate(momentHour) {
  let blocks = $('.block')
  let blocksNum = $('.block').length;
  let num = [9, 10, 11, 12, 13, 14, 15, 16, 17, 18]
  for (i = 0; i < blocksNum; i++) {
    $(blocks[i]).attr('data-time', num[i])
  }
  for (i = 0; i < blocksNum; i++) {
    let blockData = $(blocks[i]).data().time;
    if (blockData == momentHour) {
      $(blocks[i]).css("background-color", "var(--presentC)")
    } else if (blockData > momentHour) {
      $(blocks[i]).css("background-color", "var(--futureC)")
    } else {
      $(blocks[i]).css("background-color", "var(--greyC)")
    }
  }
}

// Saves time and message
function saveBlocks(time, msg) {
  for (let hour in hours) {
    if (hour === time) {
      hours[time] = msg
    }
  }
  localStorage.setItem('hours', JSON.stringify(hours))
}

// Clear button calls clearblocks function 
clear.on('click', clearBlocks)

// Clears local storage
function clearBlocks() {
  localStorage.clear()
  setTimeout(() => {
    location.reload()
  }, 300)
}