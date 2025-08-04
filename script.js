function openFeatures() {
    const allElems = document.querySelectorAll('.elem');
    const fullElemPages = document.querySelectorAll('.fullElem');
    const backButtons = document.querySelectorAll('.fullElem .back');


    allElems.forEach(elem => {
        elem.addEventListener('click', () => {
            const index = parseInt(elem.getAttribute('id'));
            if (!isNaN(index)) {
                fullElemPages[index].style.display = 'block';
            }
        });
    });


    backButtons.forEach(backBtn => {
        backBtn.addEventListener('click', () => {
            const index = parseInt(backBtn.getAttribute('id'));
            if (!isNaN(index)) {
                fullElemPages[index].style.display = 'none';
            }
        });
    });
}

openFeatures();



function todoList() {
    var currentTask = [];

    if (localStorage.getItem('currentTask')) {
        currentTask = JSON.parse(localStorage.getItem('currentTask'));
    } else {
        console.log('Task is empty');

    }

    function renderTask() {

        let allTask = document.querySelector('.allTask')
        let sum = '';

        currentTask.forEach(function (elem, idx) {
            sum = sum + `<div class="task">
             <h5>${elem.task} <span class=${elem.imp}>imp</span> </h5>
            <button id=${idx}>Mark As Completed</button>
           </div>`;
        })

        allTask.innerHTML = sum;

        localStorage.setItem('currentTask', JSON.stringify(currentTask));

        document.querySelectorAll('.task button').forEach(function (btn) {
            btn.addEventListener('click', function () {
                currentTask.splice(btn.id, 1)
                renderTask()

            })
        })
    }
    renderTask()

    let form = document.querySelector('.addTask form')
    let taskInput = document.querySelector('.addTask form #task-input')
    let taskDetailsInput = document.querySelector('.addTask form textarea')
    let taskCheckbox = document.querySelector('.addTask form #check')

    form.addEventListener('submit', function (e) {
        e.preventDefault()

        currentTask.push({
            task: taskInput.value,
            details: taskDetailsInput.value,
            imp: taskCheckbox.checked
        })
        renderTask()
        taskCheckbox.checked = false
        taskInput.value = ' '
        taskDetailsInput.value = ' '

    })

}
todoList()



function dailyPlanner() {
    var dayPlanner = document.querySelector('.day-planner')

    var dayPlanData = JSON.parse(localStorage.getItem('dayPlanData')) || {}

    var hours = Array.from({ length: 18 }, (_, idx) => `${6 + idx}:00 - ${7 + idx}:00`)


    var wholeDaySum = ''
    hours.forEach(function (elem, idx) {

        var savedData = dayPlanData[idx] || ''

        wholeDaySum = wholeDaySum + `<div class="day-planner-time">
    <p>${elem}</p>
    <input id=${idx} type="text" placeholder="..." value=${savedData}>
</div>`
    })

    dayPlanner.innerHTML = wholeDaySum


    var dayPlannerInput = document.querySelectorAll('.day-planner input')

    dayPlannerInput.forEach(function (elem) {
        elem.addEventListener('input', function () {
            console.log('hello');
            dayPlanData[elem.id] = elem.value

            localStorage.setItem('dayPlanData', JSON.stringify(dayPlanData))
        })
    })
}

dailyPlanner()


function motivationalQuote() {
    async function fetchQuote() {
    let response = await fetch("https://api.quotable.io/random");
    let data = await response.json();

    motivationQuoteContent.innerHTML = `“${data.content}”`;
    motivationAuthor.innerHTML = `— ${data.author}`;
}

}

motivationalQuote()

function pomodoroTimer() {
    let timer = document.querySelector('.pomo-timer h1')
    var startBtn = document.querySelector('.pomo-timer .start-timer')
    var pauseBtn = document.querySelector('.pomo-timer .pause-timer')
    var resetBtn = document.querySelector('.pomo-timer .reset-timer')
    var isWorkSession = true

    let timerInterval = null
    let totalSecond = 25 * 60

    function upDateTimer() {
        let minutes = Math.floor(totalSecond / 60)
        let seconds = totalSecond % 60
        timer.innerHTML = `${String(minutes).padStart('2', '0')}:${String(seconds).padStart('2', '0')}`
    }

    function startTimer() {
        clearInterval(timerInterval)

        if (isWorkSession) {
            totalSecond = 25 * 60
            timerInterval = setInterval(function () {
                if (totalSecond > 0) {
                    totalSecond--
                    upDateTimer()
                } else {
                    isWorkSession = false
                    clearInterval(timerInterval)
                    totalSecond = 5 * 60
                }

            }, 1000)
        }
        else {
            totalSecond = 5 * 60
            timerInterval = setInterval(function () {
                if (totalSecond > 0) {
                    totalSecond--
                    upDateTimer()
                } else {
                    isWorkSession = true
                    clearInterval(timerInterval)
                    totalSecond = 5 * 60
                }

            }, 1000)
        }

    }

    function pauseTimer() {
        clearInterval(timerInterval)
    }

    function resetTimer() {
        totalSecond = 25 * 60
        clearInterval(timerInterval)
        upDateTimer()
    }
    startBtn.addEventListener('click', startTimer)
    pauseBtn.addEventListener('click', pauseTimer)
    resetBtn.addEventListener('click', resetTimer)
}
pomodoroTimer()



function wheaterapp(){
    var apiKey = 'c7e63dc3c6e84b9bafb61946250907';
var city ='Nagpur'

var header1Time = document.querySelector('.header1 h1')
var header1Date = document.querySelector('.header1 h2')
var header2Temp = document.querySelector('.header2 h2')
var header2Condition = document.querySelector('header2 h4')
var precipitation = document.querySelector('.header2 .precipitation')
var humidty = document.querySelector('.header2 .humidty')
var wind = document.querySelector('.header2 .wind')

var data = null
async function weatheerAPICall() {
    var response = await fetch(`http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`);
    var data = await response.json();
    console.log(data.current.temp_c);

    header2Temp.innerHTML = `${data.current.temp_c}°C`;
header2Condition.innerHTML = `${data.current.condition.text}`;
wind.innerHTML = `Wind : ${data.current.wind_kph} km/h`;
humidity.innerHTML = `Humidity : ${data.current.humidity}%`;
precipitation.innerHTML = `Heat Index : ${data.current.heatindex_c}`;

}

weatheerAPICall();

var date = null
function timeDate() {
    const totalDaysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];


    date = new Date()
    var dayOfWeek = totalDaysOfWeek[date.getDay()]
    var hours = date.getHours()
    var minutes = date.getMinutes()
    var seconds = date.getSeconds()
    var tarik = date.getDate()
    var month = monthNames[date.getMonth()]
    var year = date.getFullYear()
    header1Date.innerHTML = `${tarik}  ${month} ${year}`


    if (hours > 12) {
        header1Time.innerHTML = `${dayOfWeek},${hours - 12}:${String(minutes).padStart('2', '0')}:${String(seconds).padStart('2', '0')}PM`
    } else {
        header1Time.innerHTML = `${dayOfWeek},${hours}:${String(minutes).padStart('2', '0')}:${String(seconds).padStart('2', '0')}AM`
    }
}

setInterval(() => {
    timeDate()
}, 1000);

}
wheaterapp()

function theme(){
     
   let isDark = false;
const rootElement = document.documentElement;
const theme = document.querySelector('.theme');

theme.addEventListener('click', function () {
  if (!isDark) {
    rootElement.style.setProperty('--pri', '#DFD0B8');
    rootElement.style.setProperty('--sec', '#222831');
    rootElement.style.setProperty('--tri1', '#948979');
    rootElement.style.setProperty('--tri2', '#393E46');
    theme.querySelector('h4').textContent = "Light Theme";
  } else {
    rootElement.style.setProperty('--pri', '#F8F4E1');
    rootElement.style.setProperty('--sec', '#381c0a');
    rootElement.style.setProperty('--tri1', '#FEBA17');
    rootElement.style.setProperty('--tri2', '#74512D');
    theme.querySelector('h4').textContent = "Dark Theme";
  }
  isDark = !isDark;
}
)}
theme()