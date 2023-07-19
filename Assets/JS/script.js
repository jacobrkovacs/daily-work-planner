var schedule = $('#schedule').children();
var currentHour = dayjs();
var saveBtnEl = $('.saveBtn');
let savedEvents = {}

$(function () {
  renderSavedEvents();
  
  //sets current textarea content to the time block and adds that content to the savedEvents object and then stores that to the localStorage
  saveBtnEl.click(function(){
    var parent = this.parentElement
    var userInput = parent.children[1].value
    var textareaEl = this.previousElementSibling.textContent
    textareaEl = userInput
    savedEvents[parent.id] = textareaEl
    localStorage.setItem('savedEvents', JSON.stringify(savedEvents))
  })
  
  //Compares current hour to different time-blocks and adds present, future or past class to the time-block
  schedule.each(function(i){
    if(this.id === currentHour.format('H')){
      schedule.eq(i).addClass('present')
    }else if(Number(this.id) > Number(currentHour.format('H'))){
      schedule.eq(i).addClass('future')
    }else{
      schedule.eq(i).addClass('past')
    }
  })


  //get any user input that was saved in localStorage and set the values of the corresponding textarea elements
  function renderSavedEvents(){

    let renderedEvents = localStorage.getItem('savedEvents')
    let parsedRenderedEvents = JSON.parse(renderedEvents)
    
    if(parsedRenderedEvents == null){
      console.log("No Saved Events")
      return
    }

    schedule.each(function(i){
      if(parsedRenderedEvents[Number(this.id)] != null){
        schedule.children('textarea').eq(i)[0].innerHTML = parsedRenderedEvents[Number(this.id)]
        console.log(Number(this.id))
        savedEvents = parsedRenderedEvents
      }
    })
  }

  //displays the current date in the header of the page.
  $('#currentDay').text(dayjs().format('MMM D, YYYY'));
});
