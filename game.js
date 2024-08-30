//alert("Hello!");

var buttonColours = ["red", "blue", "green", "yellow"];

//array do jogo
var gamePattern = [];
//array da escolha do user
var userChosenPattern = [];

var level = 0;

var started = false;

//Função para começar o jogo assim que o user pressiona uma tecla
$(document).keypress( function(){
    if(!started){

        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});

//------USER-------
//Criar função para começar o jogo assim que o user clica numa tecla.
//Ativa os buttons através da classe "btn".
$(".btn").on("click", function(){
    //Ligar a escolha do user ao button, através do id
    var userChosenColour = $(this).attr("id");
    //Adicionar a cor que o user escolheu ao array
    userChosenPattern.push(userChosenColour);
    
    playSound(userChosenColour);

    animatePress(userChosenColour);

    checkAnswer(userChosenPattern.length-1);
});


//criar função para verificar se a escolha do utlizador está certa com o programa.
function checkAnswer(currentLevel){
    
    //verificar se a última escolha do utilizador está correta
    if(gamePattern[currentLevel] === userChosenPattern[currentLevel]){

        console.log("sucess");

        if (userChosenPattern.length === gamePattern.length){

            setTimeout(function(){
                nextSequence();
            }, 1000);
        }

    } else {

        console.log("wrong");

        var name = "wrong";
        playSound(name);

        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);

        $("#level-title").text("Game Over, Press Any Key to Restart");

        startOver();
    }
}


//------PROGRAMA------
//função para criar uma sequência no jogo
function nextSequence(){

    userChosenPattern = [];
    //aumentar um nível cada vez que a função nextSequence() é chamada
    level++;
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    //associar o número aleatório a uma cor do array
    var randomChosenColour = buttonColours[randomNumber];
    //Criar um array para gravar as cores aleatórias e jogar 
    gamePattern.push(randomChosenColour); 
    //Adicionar uma animação para marcar a cor seguinte a ser selecionada
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);

}

//Criação de uma função para adicionar som
function playSound(name){

    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

//Criar animação adicionanda uma classe e removendo-a depois de 100 milisegundos.
function animatePress(currentColour){
    
    $("#" + currentColour).addClass("pressed");

    var delay = 100;
    setTimeout(function(){
        $("#" + currentColour).removeClass("pressed");
    }, delay);
}

function startOver(){
    level = 0;

    gamePattern = [];

    started = false;
}