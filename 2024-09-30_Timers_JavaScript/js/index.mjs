


let timerClick;
let alarmClick;
let startTime;
let timerRunning;
let alarmActive;
document.addEventListener("DOMContentLoaded", async () => {

    let newElement = document.createElement("p");
    newElement.id = "clock-display";
    document.getElementById("clock").appendChild(newElement)

    let delay = 1;
    setInterval(clock, delay);
    createAlarmInputs();
    createTimerInputs();

    document.getElementById("set-alarm-btn").addEventListener('click', ()=>
    {
        if(document.getElementById("alarm-") && document.getElementById("alarm-:"))
        {
            alarmClick = Date.now();
            console.log("Alarm being set");
            alarmActive = setInterval(alarm, 1000);
        }

    });
    document.querySelector("#timer button").addEventListener('click', async () => {
        if(document.getElementById("timer-").value && document.getElementById("timer-:"))
        {
            timerClick = Date.now();
            timerRunning = setInterval(timer, 250);
        }


    });
    await stopwatch();


    // setInterval(alarm, 15000);
});

let ms;
async function timer()
{
    ms = 1000* (document.getElementById("timer-").value * 3600 + document.getElementById("timer-:").value * 60) - (Date.now() - timerClick);
    if(ms <= 999)
    {
        clearInterval(timerRunning);
    }
    let newElement = document.createElement("p");
    newElement.id = "timer-display";
    document.getElementById("timer").appendChild(newElement);

    let seconds = Math.floor((ms / 1000) % 60) ;
    let minutes = Math.floor((ms / (1000*60)) % 60);
    let hours   = Math.floor((ms / (1000*60*60)) % 24);


    hours = `${(hours < 10 ? '0' : '')}${hours}`;
    minutes = `${(minutes < 10 ? '0' : '')}${minutes}`;
    seconds = `${(seconds < 10 ? '0' : '')}${seconds}`;

    document.getElementById("timer-display")
        .innerText = `Timer:\n${hours}:${minutes}:${seconds}`;
}

function createTimerInputs()
{
    const inputOptions = ["", ":"];
    const maxLimits = [100000, 59];
    const minLimits = [0, 0];
    const timer = document.getElementById("timer");
    for(let i = 0; i < inputOptions.length; i++)
    {
        let newElement = document.createElement("label");
        let newElement2 = document.createElement("input");

        newElement.htmlFor = `timer-${inputOptions[i]}`;
        newElement.className = "form-label"
        newElement2.id = `timer-${inputOptions[i]}`;
        newElement2.className = "form-control d-inline-block"
        newElement2.style.width = "70px";
        newElement.textContent = `${inputOptions[i]}`;
        newElement2.type = "number";
        newElement2.min = `${minLimits[i]}`;
        newElement2.max = `${maxLimits[i]}`;
        timer.appendChild(newElement);
        timer.appendChild(newElement2);
        //Change value back to zero when user gets to -1 or 13 in order to make the scroll circular
    }
    document.getElementById('timer-').placeholder = "H";
    document.getElementById("timer-").required = true;
    document.getElementById("timer-").value = 0;
    document.getElementById("timer-:").placeholder = "M";
    document.getElementById("timer-:").required = true;
    document.getElementById("timer-:").value = 0;
    let bu = document.createElement("button");
    bu.innerText = "Start"
    bu.type = "button";

    document.getElementById("timer").appendChild(bu);
}

function alarm()
{
    let now =  new Date();
    let isAM = now.getHours() < 12;
    let givenPeriod;
    let ms = 1000* (document.getElementById("alarm-").value * 3600 + document.getElementById("alarm-:").value * 60) - (Date.now() - alarmClick);

    let arr = document.getElementsByName("am-pm-radios");
    for(let el of arr)
    {
        if(el.checked)
        {
            givenPeriod = el.value;
        }
    }
    let givenIsAM = givenPeriod === 'AM';
    let currentHour = now.getHours() > 12 ? now.getHours()-12 : now.getHours();
    let givenHour = document.getElementById('alarm-').valueAsNumber;
    let currentMinute = now.getMinutes();
    let givenMinute = document.getElementById('alarm-:').valueAsNumber;

    console.log(givenPeriod)
    console.log("currentAM" + isAM);
    console.log("givenAM" + givenIsAM);
    console.log("currentHour " + currentHour);
    console.log("givenHour " + givenHour);
    console.log("currentMinute " + currentMinute);
    console.log("givenMinute " + givenMinute);

    if(givenHour===currentHour && givenMinute===currentMinute && isAM===givenIsAM)
    {
        clearInterval(alarmActive);
        alert("ALARM SOUNDS");
    }



}


function createAlarmInputs()
{
    const inputOptions = ["", ":"];
    const maxLimits = [12, 59];
    const minLimits = [1, 0];
    const radioOptions = ["AM", "PM"];
    const alarmField = document.getElementById("alarm");
    for(let i = 0; i < inputOptions.length; i++)
    {
        let newElement = document.createElement("label");
        let newElement2 = document.createElement("input");
        newElement2.required = true;
        newElement.htmlFor = `alarm-${inputOptions[i]}`;
        newElement.className = "form-label"
        newElement2.id = `alarm-${inputOptions[i]}`;
        newElement2.className = "form-control d-inline-block"
        newElement2.style.width = "70px";
        newElement.textContent = `${inputOptions[i]}`;
        newElement2.type = "number";
        newElement2.min = `${minLimits[i]}`;
        newElement2.max = `${maxLimits[i]}`;
        alarmField.appendChild(newElement);
        alarmField.appendChild(newElement2);
        //Change value back to zero when user gets to -1 or 13 in order to make the scroll circular
    }

    for(let i = 0; i < radioOptions.length; i++) {
        let d = document.createElement("div");
        d.className = "form-check"
        alarmField.appendChild(d);

        let rb = document.createElement("input");
        rb.type = "radio";
        rb.className = "form-check-input am-pm-radios";
        rb.name = "am-pm-radios";
        rb.id = `${radioOptions[i]}-radio`;
        rb.value = `${radioOptions[i]}`;
        rb.required = true;
        rb.id = radioOptions[i];

        let lr = document.createElement("label");
        lr.htmlFor = `${radioOptions[i]}`;
        lr.class = "form-check-label";
        lr.innerText = radioOptions[i];

        d.appendChild(rb);
        d.appendChild(lr);

    }

    //document.getElementById("AM-radio").setAttribute('checked') = "checked";
}


async function stopwatch()
{
    document.getElementsByTagName("img")[0].addEventListener('click', async () => {
        startTime = Date.now();

        document.getElementsByTagName("img")[0].style.display = "none";

        let newElement = document.createElement('p');
        newElement.id = "stop-watch-display";
        document.getElementById("stopwatch").appendChild(newElement);


        setInterval(displayStopwatch, 1);


    });


    document.getElementsByTagName("img")[0].addEventListener('mouseenter', () =>
    {
        document.getElementsByTagName("img")[0].style.transform = "scale(1.1)";
    });
    document.getElementsByTagName('img')[0].addEventListener('mouseleave', () =>
    {
       document.getElementsByTagName("img")[0].style.transform = "scale(1.0)";
    });
}

async function displayStopwatch()
{

    let timeInMS = (Date.now() - startTime);

    let seconds = Math.floor((timeInMS / 1000) % 60) ;
    let minutes = Math.floor((timeInMS / (1000*60)) % 60);
    let hours   = Math.floor((timeInMS / (1000*60*60)) % 24);
    timeInMS = timeInMS - (1000*seconds) -(60000*minutes) - (3600000 * hours)

    hours = `${(hours < 10 ? '0' : '')}${hours}`;
    minutes = `${(minutes < 10 ? '0' : '')}${minutes}`;
    seconds = `${(seconds < 10 ? '0' : '')}${seconds}`;

    document.getElementById("stop-watch-display")
        .innerText = `Stopwatch:\n${hours}:${minutes}:${seconds}:${String(timeInMS).slice(0,2)}`;

}

async function clock()
{


        //Tell the user the current EST time
        let today = new Date();
        let year = `${(today.getFullYear() < 10 ? '0' : '')}${today.getFullYear()}`;
        let month = `${((today.getMonth() + 1) < 10 ? '0' : '')}${(today.getMonth()+1)}`;
        let day = `${(today.getDate() < 10 ? '0' : '')}${today.getDate()}`;
        let hour = `${(today.getHours() < 10 ? '0' : '')}${today.getHours()}`;
        let minutes = `${(today.getMinutes() < 10 ? '0' : '')}${today.getMinutes()}`;
        let seconds = `${(today.getSeconds() < 10 ? '0' : '')}${today.getSeconds()}`;
        let amPm = hour < 12 ? "AM" : "PM";
        hour = hour>12 ? hour-12 : hour;



        document.getElementById("clock-display").innerText = `CLOCK:\n${year}-${month}-${day}\n${hour}:${minutes}:${seconds} ${amPm}`;




}