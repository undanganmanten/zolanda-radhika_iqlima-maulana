$(window).on("load",function(){
  $(".loader-wrapper").fadeOut("slow");
});

//toggle
function toggle(){
    var popup = document.getElementById('popup');
    popup.classList.toggle('active')
}

var playOn = document.getElementById('song');

function playing(){
  playOn.play();
}

// aos
AOS.init();

/*xxxxxxxxxxxxxxxx Count Down xxxxxxxxxxxxxxxxxxxxxx*/
// Set a valid end date
var countDownDate = new Date("Jun 26, 2021 10:00:00").getTime();

// Update the count down every 1 second
var x = setInterval(function() {

  // Get today's date and time
  var now = new Date().getTime();

  // Find the distance between now and the countdown date
  var distance = countDownDate - now;

  // Calculate Remaining Time
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Display the result in the element with id="demo"
  document.getElementById("day").innerHTML = days;
  document.getElementById("hour").innerHTML = hours;
  document.getElementById("minute").innerHTML = minutes;
  document.getElementById("second").innerHTML = seconds;

  // If the countdown is finished, write some text
  function timesup(){
      var habis = document.getElementById("habis");
      habis.classList.toggle('aktif');
      
      var waktu = document.getElementById("times");
      waktu.classList.toggle('aktif');
      var waktu1 = document.getElementById("times1");
      waktu1.classList.toggle('aktif');
      var waktu2 = document.getElementById("times2");
      waktu2.classList.toggle('aktif');
      var waktu3 = document.getElementById("times3");
      waktu3.classList.toggle('aktif');

      var separator = document.getElementById("separator");
      var separator1 = document.getElementById("separator1");
      var separator2 = document.getElementById("separator2");

      separator.classList.toggle('aktif');
      separator1.classList.toggle('aktif');
      separator2.classList.toggle('aktif');
    }
  
  if (distance < 0) {
    clearInterval(x);
    timesup();
    document.getElementById("habis").innerHTML = "Pernikahan 'sedang' / 'telah selesai' dilaksanakan";
  }
}, 1000);


//slide show
var slideIndex = 0;
showSlides();

function showSlides() {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  slideIndex++;
  if (slideIndex > slides.length) {slideIndex = 1}    
  slides[slideIndex-1].style.display = "block"; 
  setTimeout(showSlides, 3500); // Change image every 2 seconds
}

// var firebaseConfig = {
//   apiKey: "AIzaSyAcRO57X8UNRAZ0rLhGjYk2ttXX95VtI84",
//   authDomain: "comments-7198f.firebaseapp.com",
//   databaseURL: "https://comments-7198f-default-rtdb.firebaseio.com",
//   projectId: "comments-7198f",
//   storageBucket: "comments-7198f.appspot.com",
//   messagingSenderId: "376364050831",
//   appId: "1:376364050831:web:14e14651ae6a51eade83fa",
//   measurementId: "G-3W394RQG3Y"
// };

// // Initialize Firebase
// firebase.initializeApp(firebaseConfig);

var firebaseConfig = {
    apiKey: "AIzaSyApP6kodInsMr3vUoT2Gyi_UvGiC8iC7Fc",
    authDomain: "zolanda-95520.firebaseapp.com",
    databaseURL: "https://zolanda-95520-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "zolanda-95520",
    storageBucket: "zolanda-95520.appspot.com",
    messagingSenderId: "39946736380",
    appId: "1:39946736380:web:4df4d21031763da021fd79"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

function add_task(){
  input_box = document.getElementById("message");
  input_date = document.getElementById("name");

  if(input_box.value.length != 0 && input_date.value.length != 0){
    // our boxes have data and we take database
    var key = firebase.database().ref().child("mita").push().key;
    var task = {
      title: input_box.value,
      date: input_date.value,
      key: key
    };

    var updates = {};
    updates["/mita/" + key] = task;
    firebase.database().ref().update(updates);
    create_unfinished_task();
    document.getElementById("name").value=''; 
    document.getElementById("message").value='';
  }
}

function create_unfinished_task(){
  unfinished_task_container = document.getElementsByClassName("container1")[0];
  unfinished_task_container.innerHTML = "";

  task_array = [];
  firebase.database().ref("mita").once('value', function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
      var childKey = childSnapshot.key;
      var childData = childSnapshot.val();
      task_array.push(Object.values(childData));
    });
    for(var i, i = 0; i < task_array.length; i++){
      task_date = task_array[i][0];
      task_key = task_array[i][1];
      task_title = task_array[i][2];  

      task_container = document.createElement("div");
      task_container.setAttribute("class", "task_container");
      task_container.setAttribute("data-key", task_key);

      // TASK DATA  
      task_data = document.createElement('div');
      task_data.setAttribute('id', 'task_data');

      title = document.createElement('p');
      title.setAttribute('id', 'task_title');
      title.innerHTML = task_title;

      date = document.createElement('p');
      date.setAttribute('id', 'task_date');
      date.innerHTML = "-" + task_date + "-";

      unfinished_task_container.append(task_container);
      task_container.append(task_data);
      task_data.append(title);
      task_data.append(date);
    }

  });

}
