/* background*/
var quoteList = {
   0 : ["Don't cry because it's over, smile because it happened." , "Dr. Seuss"],
   1 : ["Be yourself; everyone else is already taken." , "Oscar Wilde"],
   2 : ["Two things are infinite: the universe and human stupidity; and I'm not sure about the universe." , "Albert Einstein"],
   3 : ["So many books, so little time." , "Frank Zappa"],
   4 : ["A room without books is like a body without a soul." , "Marcus Tullius Cicero"],
   5 : ["You only live once, but if you do it right, once is enough." , "Mae West"],
   6 : ["Be the change that you wish to see in the world." , "Mahatma Gandhi"],
   7 : ["In three words I can sum up everything I've learned about life: it goes on." , "Robert Frost"],
   8 : ["If you tell the truth, you don't have to remember anything." , "Mark Twain"],
   9 : ["A friend is someone who knows all about you and still loves you." , "Elbert Hubbard"],
};

var header = $('html');


var backgrounds = new Array(
   'url(images/1.jfif)'
   , 'url(images/2.jfif)'
   , 'url(images/3.jfif)'
   , 'url(images/4.jfif)'
   , 'url(images/5.jfif)'
   , 'url(images/6.jfif)'
   , 'url(images/7.jfif)'
   , 'url(images/8.jfif)'
   , 'url(images/9.jfif)'
   , 'url(images/10.jfif)'
);

var current = 0;
//console.log(quoteList);
//console.log(quoteList[current]);
//console.log(quoteList[current][0]);
$("#quote").html("&quot;" + quoteList[current][0] + "&quot;");
$("#quoteCreator").html(quoteList[current][1]);

function nextBackground() {
   current++;
   current = current % backgrounds.length;
   header.css('background-image', backgrounds[current]);
   $("#quote").html(quoteList[current][0]);
   $("#quoteCreator").html(quoteList[current][1]);
}
setInterval(nextBackground, 300000);

header.css('background-image', backgrounds[0]);
/* // end background*/


/* --- global variables declaration --- */
var userName ="";

var weatherIcons = {
   "clear-day" : "&#xe801;",
   "clear-night" : "&#xe803;",
   "partly-cloudy-day" : "&#xe805;",
   "partly-cloudy-night" : "&#xe803;",
   "cloudy" : "&#xe802;",
   "rain" : "&#xe804;",
   "sleet" : "&#xe806;",
   "snow" : "&#xe807;",
   "wind" : "&#xe80a;",
   "fog" : "&#xe809;"
};

var weekday = [
"SUN",//0
"MON",//1
"TUE",//2
"WED",//3
"THU",//4
"FRI",//5
"SAT"//6
];

var timeCheck = "Good morning, "; //by default

var fullWeekday = {
   "SUN" : "Sunday",
   "MON" : "Monday",
   "TUE" : "Tuesday",
   "WED" : "Wednesday",
   "THU" : "Thursday",
   "FRI" : "Friday",
   "SAT" : "Saturday"
};

var fullTodoList = {
   //"food" : "true",
   //"car" : "false"
};

var taskCount = 0;

var todaysTask = "";

/* --- // end global variables declaration --- */


if (localStorage.getItem("todaysTask") != null && localStorage.getItem("todaysTask") != "") {
   todaysTask = localStorage.getItem("todaysTask");
   $("#inputTask").fadeOut(1000);
   $("#focus").fadeOut(1000);
   $("#myDIV").fadeIn(1000);
   $("#primarytask").html(todaysTask);
}

fillTodoList();

/* fill task list from localstorage */
function fillTodoList(){
   if (localStorage.getItem("taskList") != null) {
      fullTodoList = JSON.parse(localStorage.getItem("taskList"));


      for (var key in fullTodoList){
         if (fullTodoList[key] == "true") {
            $("#myUL").append("<li> <input type='checkbox' checked='checked' onclick='handleClick(this);'> <span class='todolispan' style='text-decoration:line-through;'>" + key  +"</span> <i class='deleteTask fas fa-times'></i> </li>");
         }else {
            $("#myUL").append("<li> <input type='checkbox' onclick='handleClick(this);'> <span class='todolispan' style='text-decoration:none;'>" + key  +"</span> <i class='deleteTask fas fa-times'></i> </li>");
            taskCount++;
         }
      }
      updateTaskCount();
      if (taskCount > 0) {
         $('#todoEmpty').hide();
         $('#startTodo').hide();
         $("#myInput").fadeIn(300);
      }

   }
}

/* update Task Count */
function updateTaskCount(){
   //taskCount = Object.keys(fullTodoList).length;
   $("#taskCount").html(taskCount);
}

/* on click weather */
$("#weatherdrop").click(function(){
   if($('#dropdown').hasClass('is-active')){
      $('#dropdown').removeClass('is-active');
   }else {
      $('#dropdown').addClass( "is-active" );
   }
});

/* button todo */
$("#startTodo").click(function(){
   $(this).hide();
   $("#myInput").fadeIn(300);
});

/* on click todo list */
$("#todoList").click(function(){
   if($('#dropdown2').hasClass('is-active')){
      $('#dropdown2').removeClass('is-active');
   }else {
      $('#dropdown2').addClass( "is-active" );
   }
});

/* delete task */
$("ul").on('click', '.deleteTask', function(){
   var taskName = $(this).siblings("span")[0].textContent;
   if ($(this).siblings("input")[0].attributes.checked == null) {
      taskCount--;
      updateTaskCount();
   }
   $(this).parent().remove();
   delete fullTodoList[taskName];
   localStorage.setItem("taskList", JSON.stringify(fullTodoList));
});

/* task completed */
function handleClick(i){
   if (i.checked == false) {
      i.removeAttribute("checked");
      taskCount++;
      i.nextElementSibling.style.setProperty("text-decoration", "none");

   }else{
      i.setAttribute("checked", "checked");
      i.nextElementSibling.style.setProperty("text-decoration", "line-through");
      taskCount--;


   }
   updateTaskCount();
}

/*  ----------------------------------------------------------------------------------- */
$(document).ready(function(){
   getLocation(0);
   /* if the user already enter his name */
   if (localStorage.getItem("userName") != null) {
      $("#greet").html(timeCheck + localStorage.getItem("userName") + ".");
      $('#userName').hide();
      $("#hello").hide();
      getClock();
   }

   /* enter press event listener for user name*/
   $('#userName').on('keypress', function (e) {
      if(e.which === 13){
         userName = $("input#userName").val();
         localStorage.setItem("userName",userName)
         $("#greet").html(timeCheck + userName + ".");
         $(this).fadeOut(1000);
         $("#hello").fadeOut(1000);
         getClock();
      }
   });

   /* enter press event listener for the tasks*/
   $('#myInput').on('keypress', function (e) {
      if(e.which === 13){

         $('#todoEmpty').hide();
         var task = $('#myInput').val();
         $("#myUL").append("<li> <input type='checkbox' onclick='handleClick(this);'> <span class=' todolispan "+ task +"'>" + task  +"</span> <i class='deleteTask fas fa-times'></i> </li>");
         fullTodoList[task] = "false";
         localStorage.setItem("taskList", JSON.stringify(fullTodoList));
         taskCount++;
         $("#myInput").val('');
         updateTaskCount();
      }
   });

   /* enter press event listener for today task #inputTask */
   $('#inputTask').on('keypress', function (e) {
      if(e.which === 13){
         $("#inputTask").fadeOut(1000);
         $("#focus").fadeOut(1000);
         $("#myDIV").fadeIn(1000);
         $("#primarytask").html($("#inputTask").val());
         localStorage.setItem("todaysTask",$("#inputTask").val());
      }
   });

   document.getElementById('checkmark').onclick = function() {
   // access properties using this keyword
      if ( this.checked ) {
         var ele = document.getElementById("primarytask");
         ele.style.setProperty("text-decoration", "line-through");
      }else{
         var ele = document.getElementById("primarytask");
         ele.style.setProperty("text-decoration", "none");
      }
   };

   /* removing dayly task */
   $('#myDIV').on('click','#xmark',function(){
      $("#myDIV").hide();
      $("#inputTask").fadeIn(1000);
      $("#focus").fadeIn(1000);
      $("#inputTask").val('');
      localStorage.setItem("todaysTask", "");
   });

   $("#0").click(function( event ) { getLocation(0); });
   $("#1").click(function( event ) { getLocation(1); });
   $("#2").click(function( event ) { getLocation(2); });
   $("#3").click(function( event ) { getLocation(3); });
   $("#4").click(function( event ) { getLocation(4); });
});

/* get location by ip*/
function getLocation (selectedDay) {
   $.ajax('http://ip-api.com/json')
   .then(
      function success(response) {
         console.log('User\'s Location Data is ', response);

         /* Get Weather*/
         var apiKey = '5e90264c957862d6179ab26142bbe6e8';
         var url = 'https://api.forecast.io/forecast/';
         var lati = response.lat;
         var longi = response.lon;
         var data;
         $.getJSON(url + apiKey + "/" + lati + "," + longi + "?callback=?", function(data) {
            console.log(data);

            /* fill weather upper right */
            $("#currentWeatherIcon").html(weatherIcons[data.currently.icon]);
            $("#currentCity").html(response.city.toUpperCase() + ", " + response.countryCode);
            var tempCelsios = (data.currently.temperature - 32) * 5/9;
            $("#currentWeatherTemp").html(Math.trunc(tempCelsios) +"&#186;");

            /* fill weather selected (current by default) */
            $("h5#selectedSummary").html(data.daily.data[selectedDay].summary);
            $("#selectedIcon").html(weatherIcons[data.daily.data[selectedDay].icon]);

            if (selectedDay == 0) { /* if is the current day */
               $("h4#selectedCity").html(response.city);
               var temp = (data.daily.data[0].temperatureMax+data.daily.data[0].temperatureMin)/2;
               tempCelsios = Math.trunc((temp - 32) * 5/9);
               $("#selectedTemp").html(tempCelsios+"&#186;");
            }else{
               day = new Date(data.daily.data[selectedDay].time*1000).getDay();
               $("h4#selectedCity").html(response.city + "<span style='opacity: .5;'> &nbsp;" + fullWeekday[weekday[day]] + "</span>");

               tempCelsios = Math.trunc((data.daily.data[selectedDay].temperatureMax - 32) * 5/9);
               var tempCelsios2 = Math.trunc((data.daily.data[selectedDay].temperatureMin - 32) * 5/9);
               $("#selectedTemp").html(tempCelsios+"&#186;" + "<span style='font-size: 37.2px; opacity: .6;'> " + tempCelsios2 + "&#186;</span>");
            }

            /* fill current and next 4 days */
            //day 0
            var day = new Date(data.daily.data[0].time*1000).getDay();
            $("#0 .weekDay").html(weekday[day]);
            $("#0 i").html(weatherIcons[data.daily.data[0].icon]);

            tempCelsios = Math.trunc((data.daily.data[0].temperatureMax - 32) * 5/9);
            $("#0 .MinTemp").html(tempCelsios + "&#186;");
            tempCelsios = Math.trunc((data.daily.data[0].temperatureMin - 32) * 5/9);
            $("#0 .MaxTemp").html(tempCelsios + "&#186;");

            //day 1
            day = new Date(data.daily.data[1].time*1000).getDay();
            $("#1 .weekDay").html(weekday[day]);
            $("#1 i").html(weatherIcons[data.daily.data[1].icon]);

            tempCelsios = Math.trunc((data.daily.data[1].temperatureMax - 32) * 5/9);
            $("#1 .MinTemp").html(tempCelsios + "&#186;");
            tempCelsios = Math.trunc((data.daily.data[1].temperatureMin - 32) * 5/9);
            $("#1 .MaxTemp").html(tempCelsios + "&#186;");

            //day 2
            day = new Date(data.daily.data[2].time*1000).getDay();
            $("#2 .weekDay").html(weekday[day]);
            $("#2 i").html(weatherIcons[data.daily.data[2].icon]);

            tempCelsios = Math.trunc((data.daily.data[2].temperatureMax - 32) * 5/9);
            $("#2 .MinTemp").html(tempCelsios + "&#186;");
            tempCelsios = Math.trunc((data.daily.data[2].temperatureMin - 32) * 5/9);
            $("#2 .MaxTemp").html(tempCelsios + "&#186;");

            //day 3
            day = new Date(data.daily.data[3].time*1000).getDay();
            $("#3 .weekDay").html(weekday[day]);
            $("#3 i").html(weatherIcons[data.daily.data[3].icon]);

            tempCelsios = Math.trunc((data.daily.data[3].temperatureMax - 32) * 5/9);
            $("#3 .MinTemp").html(tempCelsios + "&#186;");
            tempCelsios = Math.trunc((data.daily.data[3].temperatureMin - 32) * 5/9);
            $("#3 .MaxTemp").html(tempCelsios + "&#186;");

            //day 4
            day = new Date(data.daily.data[4].time*1000).getDay();
            $("#4 .weekDay").html(weekday[day]);
            $("#4 i").html(weatherIcons[data.daily.data[4].icon]);

            tempCelsios = Math.trunc((data.daily.data[4].temperatureMax - 32) * 5/9);
            $("#4 .MinTemp").html(tempCelsios + "&#186;");
            tempCelsios = Math.trunc((data.daily.data[4].temperatureMin - 32) * 5/9);
            $("#4 .MaxTemp").html(tempCelsios + "&#186;");

            //°C = (°F − 32) x 5/9
         });
         /* // end Get Weather*/
      },

      function fail(data, status) {
         console.log('Request failed.  Returned status of',
         status);
      }
   );
}
/* // end get location by ip*/

function startTime() {
   var today = new Date();
   var h = today.getHours();
   var m = today.getMinutes();
   var s = today.getSeconds();
   m = checkTime(m);
   s = checkTime(s);

   var timeCalc = "" + h + m;

   if (timeCalc >= "0500" && timeCalc <= "1159")
   {
      timeCheck = "Good morning, ";
   }
   else if (timeCalc >= "1200" && timeCalc <= "1659")
   {
      timeCheck = "Good afternoon, ";
   }
   else{
      timeCheck = "Good evening, ";
   }

   //$('#time').html(h + ":" + m + ":" + s);
   $('#time').html(h + ":" + m);
   var t = setTimeout(startTime, 500);
}

function checkTime(i) {
   if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
   return i;
}

//call greeting
function sleep(ms) {
   return new Promise(resolve => setTimeout(resolve, ms));
}
async function getClock() {
   await sleep(1000);
   //$("#time").fadeIn(1000);
   //$("#greet").fadeIn(1000);
   $("#daylyTask").fadeIn(1000);

   startTime();
}
/* // end call greeting*/
