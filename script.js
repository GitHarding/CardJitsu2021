//Login
let UI = document.getElementById("container");
let Login = document.getElementById("submit");
let Truth = false; //Used to check if inspect is used to enable the button

document.getElementById("submit").addEventListener("click", function () {
    let username = document.getElementById("un").value; //Gets the values from the username input
    let password = document.getElementById("pw").value; //Gets the values from the password input

    let username1 = document.getElementById("un1").value; //Gets the values from the username input
    let password1 = document.getElementById("pw1").value; //Gets the values from the password input

    if(username === "safe" && password === "sound" && username1 === "sensible" && password1 === "safe"){ //Hard coded values for the username and password
        Truth = true;
        alert("Logged in!");
        UI.style.pointerEvents = "auto"; //Enables the card game div
        Login.pointerEvents = "none"; //Disables the login div
    }else{
        alert("Invalid Login");
    }
});

//Variables

//Declares Cards
let blackCards = ["b0", "b1", "b2", "b3", "b4", "b5", "b6", "b7", "b8", "b9"]
let redCards = ["r0", "r1", "r2", "r3", "r4", "r5", "r6", "r7", "r8", "r9"]
let yellowCards = ["y0", "y1", "y2", "y3", "y4", "y5", "y6", "y7", "y8", "y9"]

let player1Card = "";
let player1Cards = [];
let player2Card = "";
let player2Cards = [];

//Progression Variables
let pass = 0;
let cards2D = [];

//HTML interactivity
let player1Cardtxt = "";
let player2Cardtxt = "";

document.getElementById("deck").addEventListener("click", function () {
    if(Truth == false){ //Activates anti inspect "security"
        window.alert("HEY NO USING INSPECT"); //Message to the user
        window.location.replace("https://youtu.be/dQw4w9WgXcQ"); //Redirects them
    }else {
        console.log(Truth);
        switch (pass) {
            case 0:
                ShuffleDeck();
                pass++;
                console.log("case0");
                break;
            case 1: //Player 1 action
                pass++;
                player1Card = cards2D.shift(); //Shifts the array and gets rid of the last card in the deck
                player1Cardtxt = player1Card;
                document.getElementById("cardhand1").innerHTML = ("Player 1 Card " + player1Card);
                canvasUpdate()
                console.log("case1");
                break;

            case 2: //Player 2 action
                pass++;
                player2Card = cards2D.shift(); //Shifts the array and gets rid of the last card in the deck
                player2Cardtxt = player2Card;
                document.getElementById("cardhand2").innerHTML = ("Player 2 Card " + player2Card);
                canvasUpdate()
                console.log("case2");

                break;

            case 3: //Rule Application
                RuleApply(); //Apply the rules
                player1Cardtxt = "";
                player2Cardtxt = "";
                document.getElementById("cardhand1").innerHTML = ("Player 1 Card ___");
                document.getElementById("cardhand2").innerHTML = ("Player 2 Card ___");
                document.getElementById("score1").innerHTML = ("Player 1 Score:  " + player1Cards.length);
                document.getElementById("score2").innerHTML = ("Player 2 Score:  " + player2Cards.length)
                player1Card = "";
                player2Card = "";
                canvasUpdate();
                if (cards2D.length > 0) { //repeats the game if no cards left
                    pass = 1 //Sends progression backwards
                } else {
                    pass = 4 //Sends prgression forwards
                }
                console.log("case3");
                break;

            case 4:
                pass++;
                console.log("\n\n _-_-_-_ \n" + player1Cards.length + " <-> " + player2Cards.length)
                if (player1Cards.length > player2Cards.length) {
                    document.getElementById("results").innerHTML = ("Player 1 Wins with the cards " + "<br>" + String(player1Cards.slice(0, player1Cards.length / 2)) + "<br>" + String(player1Cards.slice(player1Cards.length / 2 + 1, player1Cards.length)));
                } else {
                    document.getElementById("results").innerHTML = ("Player 2 Wins with the cards  " + "<br>" + String(player2Cards.slice(0, player2Cards.length / 2)) + "<br>" + String(player2Cards.slice(player2Cards.length / 2 + 1, player2Cards.length)));
                }
                console.log("case4");
                break;

            case 5:
                if (confirm("do you want to replay?")) {
                    alert("reloading the game");
                    location.reload();
                } else {
                    alert("you can replay at any time by pressing the button");
                }
                break;
        }
    }
});

if (pass === 4){
    alert('uh oh');
    console.log("\n\n _-_-_-_ \n" + player1Cards.length + " <-> " + player2Cards.length)

    if (player1Cards.length > player2Cards.length) {
        console.log("Player 1 Wins");
    } else {
        console.log("Player 2 Wins");
    }
    console.log("case4");
}


//Functions
function ShuffleDeck() {
    blackCards = blackCards.sort(() => Math.random() - 0.5);
    redCards = redCards.sort(() => Math.random() - 0.5);
    yellowCards = yellowCards.sort(() => Math.random() - 0.5);


    //Declares card collection - and shuffles
    cards2D = [blackCards, redCards, yellowCards];
    cards2D = cards2D.flat();
    cards2D = cards2D.sort(() => Math.random() - 0.5); //Shuffles again for randomness
}
function RuleApply() {
    switch (player1Card.substring(0, 1)) {
        case "r":
            if (player2Card.substring(0, 1) === "r") {                       //Red (Same)
                console.log("neutral - down to numbers");
                neutral()
            } else if (player2Card.substring(0, 1) === "y") {                //Yellow
                console.log("player2 wins");
                player2Win();
            } else {                                                        //Must be black
                console.log("player1 wins");
                player1Win();
            }
            break;


        case "y":
            if (player2Card.substring(0, 1) === "r") {                       //Red
                console.log("player1 wins");
                player1Win();
            } else if (player2Card.substring(0, 1) === "y") {                //Yellow (Same)
                console.log("neutral - down to numbers");
                neutral()
            } else {                                                        //Must be black
                console.log("player2 wins");
                player2Win();
            }
            break;


        case "b":
            if (player2Card.substring(0, 1) === "r") {                       //Red
                console.log("player2 wins");
                player2Win();
            } else if (player2Card.substring(0, 1) === "y") {                //Yellow
                console.log("player1 wins");
                player1Win();
            } else {                                                        //Must be black (Same)
                console.log("neutral - down to numbers");
                neutral();
            }
            break;
    }
}

function player1Win() {
    player1Cards.push(player1Card)
    player1Cards.push(player2Card)
}
function player2Win() {
    player2Cards.push(player1Card)
    player2Cards.push(player2Card)
}
function neutral() {
    if (player1Card.substring(1, 2) > player2Card.substring(1, 2)) {
        console.log("_ _ _ player1 wins");
        player1Win();
    } else {
        console.log("_ _ _ player2 wins");
        player2Win();
    }
}

function canvasUpdate(){


    var context1 = document.getElementById("canvascard1").getContext("2d");
    var context2 = document.getElementById("canvascard2").getContext("2d");


    switch (player1Card.substring(0,1)){
        case "":
            context1.clearRect(0,0,document.getElementById("canvascard1").width,document.getElementById("canvascard1").height);
            break;
        case "y":
            context1.fillStyle="yellow";
            context1.fillRect(0,0,document.getElementById("canvascard1").width,document.getElementById("canvascard1").height);
            break;
        case "b":
            context1.fillStyle="black";
            context1.fillRect(0,0,document.getElementById("canvascard1").width,document.getElementById("canvascard1").height);
            break;
        case "r":
            context1.fillStyle="red";
            context1.fillRect(0,0,document.getElementById("canvascard1").width,document.getElementById("canvascard1").height);
            break;
    }

    switch (player2Card.substring(0,1)){
        case "":
            context2.clearRect(0,0,document.getElementById("canvascard2").width,document.getElementById("canvascard2").height);
            break;
        case "y":
            context2.fillStyle="yellow";
            context2.fillRect(0,0,document.getElementById("canvascard2").width,document.getElementById("canvascard2").height);
            break;
        case "b":
            context2.fillStyle="black";
            context2.fillRect(0,0,document.getElementById("canvascard2").width,document.getElementById("canvascard2").height);
            break;
        case "r":
            context2.fillStyle="red";
            context2.fillRect(0,0,document.getElementById("canvascard2").width,document.getElementById("canvascard2").height);
            break;
    }


}