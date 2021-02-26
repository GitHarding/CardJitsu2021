//Login

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
            document.getElementById("cardhand").innerHTML = ("Player 1 Card " + player1Card + "   Player 2 Card ___");
            console.log("case1");
            break;

        case 2: //Player 2 action
            pass++;
            player2Card = cards2D.shift(); //Shifts the array and gets rid of the last card in the deck
            player2Cardtxt = player2Card;
            document.getElementById("cardhand").innerHTML = ("Player 1 Card " + player1Card + "   Player 2 Card " + player2Card);
            console.log("case2");
            break;

        case 3: //Rule Application
            RuleApply(); //Apply the rules
            player1Cardtxt = "";
            player2Cardtxt = "";
            document.getElementById("cardhand").innerHTML = ("Player 1 Card ___    Player 2 Card ___");
            document.getElementById("score").innerHTML = ("Player1 Score " + player1Cards.length + "   Player2 Score " + player2Cards.length)
            if (cards2D.length > 0) { //repeats the game if no cards left
                pass = 1 //Sends progression backwards
            }else{
                pass = 4 //Sends prgression forwards
            }
            console.log("case3");
            break;

        case 4:
            pass++;
            console.log("\n\n _-_-_-_ \n" + player1Cards.length + " <-> " + player2Cards.length)
            if (player1Cards.length > player2Cards.length) {
                document.getElementById("results").innerHTML = ("Player 1 Wins with the cards " + player1Cards);
            } else {
                document.getElementById("results").innerHTML = ("Player 2 Wins with the cards  " + player2Cards);
            }
            console.log("case4");
            break;

        case 5:
            if(confirm("do you want to replay?")){
                alert("reloading the game");
                location.reload();
            }else{
                alert("you can replay at any time by pressing the button");
            }
            break;
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


//Shuffle cards
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

//Functions
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