require('mraa');
var groveSensor = require('jsupm_grove');
var requestify = require('requestify');
// Load TTP223 touch sensor module
var sensorModule = require('jsupm_ttp223');

// Create the TTP223 touch sensor object using GPIO pin 0
var touch = new sensorModule.TTP223(2);

// Load Grove module
var groveSensor = require('jsupm_grove');

// Create the button object using GPIO pin 0
var button = new groveSensor.GroveButton(3);

var upmBuzzer = require("jsupm_buzzer");
// Initialize on GPIO 5
var myBuzzer = new upmBuzzer.Buzzer(6);

var thing = "board1";
var thing2 = "board2";

var temp = new groveSensor.GroveTemp(0);
var lum = new groveSensor.GroveLight(1);
readData();

function readData() {
  var celsius = temp.value();
  var luminosidade = lum.value();
  var statusBoard = "Incubadora normal";


  if (touch.isPressed()) {
    console.log(touch.name() + " is pressed");
  } else {
    console.log(touch.name() + " is not pressed");
  }

  console.log("Temperatura em Celsius " + celsius);
  console.log("Luminosidade é " + luminosidade);
  console.log(button.name() + " value is " + button.value());

  var url = "https://dweet.io:443/dweet/for/" + thing;
  var url2 = "https://dweet.io:443/get/latest/dweet/for/" + thing2;

  // Envia dados para servidor via método POST    
  requestify.post(url, {
    temperatura: celsius,
    Luminosidade: luminosidade,
    Botão: button.value(),
    Touch: touch.value(),
    Status: statusBoard
  }).then(function (response) {
    response.getBody();
    //console.log(response.body)
  }); 

  requestify.get(url2).then(function (response) {
    var x = response.getBody().with[0].content.buzzer
    response.getBody();
    //console.log("RESP_GET")
    //console.log(x)

   if((celsius > 33) && (luminosidade > 50)){
      console.log("Tocando...")
      statusBoard = "Incubadora com temperatura muito alta";
      myBuzzer.playSound(10000, 10000);
    }else{
      statusBoard = "Incubadora normal";
    }
    console.log("Status:" + statusBoard);
  });

  //Chama a função a cada 1 segundo 
  setTimeout(readData, 3000);
}