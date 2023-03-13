
const locale = 'en'
const actualYear  = new Date().getFullYear()

const createCalendar = (locale, year) =>
    {
      const weekdays = [...Array(7).keys()]
      const intlWeekday = new Intl.DateTimeFormat(locale, { weekday: 'short'})

      //Function to create weekdays list
      const weekDaysNames = weekdays.map(weekdayIndex => {

        const date = new Date(2021, 10, weekdayIndex + 1)
        const weekDayName = intlWeekday.format(date)
      
        return `<li>${weekDayName}</li>`
      }).join('')
    
    const months = [...Array(12).keys()]
    const intl = new Intl.DateTimeFormat(locale, { month: 'long'})

    //Calendar function to return month name, days of that month and day when that month starts
    const calendar = months.map(monthKey => {

      const monthName = intl.format(new Date(year, monthKey))

      const nextMonthIndex = monthKey + 1
      const daysOfMonth = new Date(year, nextMonthIndex, 0).getDate()

      const startsOn = new Date(year, monthKey, 1).getDay()
      
      return {
        monthName,
        daysOfMonth,
        startsOn
      }
    })

    //Render calendar on html
    const html = calendar.map(({daysOfMonth, monthName, startsOn}) => {

      const days = [...Array(daysOfMonth).keys()]

      const firstDayAttributes = `class ='first-day' style='--first-day-start: ${startsOn}'`

      //Function to render all days of month
      const renderedDays = days.map((day, index) => 
        `<li ${index === 0 ? firstDayAttributes : ''}> ${day + 1}</li>`).join('')

      const title = `<div class='calendarAll-content-title'>
                      <div class='calendarAll-content-title--top'>
                        <h3>${year}</h3>
                      </div>
                      <div class='calendarAll-content-title--bottom'>
                        <h5>${monthName}</h5>
                      </div>
                    </div>`

      return `<div class='month-container' id='month-container'>
                ${title} 
                <div class='calendarAll-content--content'>
                  <ol class='weekdays'>${weekDaysNames}</ol> 
                  <ol>${renderedDays}</ol>
                </div>
              </div>`
    }).join('')
    
    document.querySelector('.calendarAll-content').innerHTML = html
  }

  createCalendar(locale, actualYear);

  //Function to fill calendarDay div
  
  const actualMonth = new Date().getMonth();
  const intlMonth = new Intl.DateTimeFormat(locale, { month: 'long'})
  const monthName = intlMonth.format(new Date(actualYear, actualMonth))

  const actualDay = new Date().getDate()
  const intlWeekday = new Intl.DateTimeFormat(locale, { weekday: 'long'})
  const dayWeekName = intlWeekday.format(new Date(actualYear, actualMonth, actualDay))

  // console.log(dayWeekName);

  const calendarDay = document.getElementById('calendarDay-title')
  calendarDay.innerHTML = actualDay

  const calendarDaySub = document.getElementById('calendarDay-subtitle')
  calendarDaySub.innerHTML = `${dayWeekName} * ${monthName} * ${actualYear}`
  
  // console.log(calendarDaySub);

  //Function to scroll calendar
  const prev      = document.querySelector('#prev')
  const next      = document.querySelector('#next')
  const monthContainer  = document.querySelector('.calendarAll-content')
  
  next.addEventListener('click', () => {

    monthContainer.scrollTo(
      {
        left: monthContainer.scrollLeft + (monthContainer.clientWidth+1.27), 
        behavior:'smooth'
      }
    );
  })

  prev.addEventListener('click', () => {
    monthContainer.scrollTo(
      {
        left: monthContainer.scrollLeft - (monthContainer.clientWidth + 1.27), 
        behavior:'smooth'
      }
    );
  })
  
  