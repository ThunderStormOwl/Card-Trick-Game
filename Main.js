
var deckApiRequest = new XMLHttpRequest()
var urls = ['https://deckofcardsapi.com/api/deck/new/draw/?count=21',
'https://deckofcardsapi.com/api/deck/<<deck_id>>/pile/<<pile_name>>/add/?cards=AS,2S']

const page = document.getElementById('root')

var htmlDivL = document.createElement('div')
htmlDivL.setAttribute('class', 'LeftCardPile')
var htmlDivC = document.createElement('div')
htmlDivC.setAttribute('class', 'CenterCardPile')
var htmlDivR = document.createElement('div')
htmlDivR.setAttribute('class', 'RightCardPile')

var cardPng = document.createElement('img')

page.appendChild(htmlDivL)
page.appendChild(htmlDivC)
page.appendChild(htmlDivR)

var deck = []

var leftPile = []
var centerPile = []
var rightPile = []

var deckID

var curPile = 0;
var curYpos = 0;
var trickRound = 0;

var readyForInput = true

//var update = setInterval(Update,

deckApiRequest.open('GET','https://deckofcardsapi.com/api/deck/new/draw/?count=21')

deckApiRequest.onload = function(){

  var index = 0

  const response = JSON.parse(this.response)

  if (deckApiRequest.status >= 200 && deckApiRequest.status < 400) {

    deckID = response.deck_id
    deck = response.cards

    response.cards.forEach(cards =>{

      if(curPile < 2){

        cardPng = document.createElement('img')
        cardPng.id = 'Card ' + index
        cardPng.src = cards.image
        cardPng.style = "position: absolute; left: 12px; top:" + curYpos + "px"

        page.appendChild(cardPng)

        curPile++

      }
      else {

        cardPng = document.createElement('img')
        cardPng.id = 'Card ' + index
        cardPng.src = cards.image
        cardPng.style = "position: absolute; left: 12px; top:" + curYpos + "px"
        curYpos += 75

        page.appendChild(cardPng)

        curPile = 0

      }
      index++

    })

  }
  else {

   console.log('error, bad http request')

  }

  SetupPiles()

}

deckApiRequest.send()

function SetupPiles(){

  htmlDivL.style = "position: absolute; left: 50px; top: 0px; width: 250px; height: 763px"
  htmlDivL.addEventListener("click", function(){PileSelected(0)})
  htmlDivL.addEventListener("mouseover", function(){Selected(0)})
  htmlDivL.addEventListener("mouseout", function(){Unselected(0)})

  htmlDivC.style = "position: absolute; left: 350px; top: 0px; width: 250px; height: 763px"
  htmlDivC.addEventListener("click", function(){PileSelected(1)})
  htmlDivC.addEventListener("mouseover", function(){Selected(1)})
  htmlDivC.addEventListener("mouseout", function(){Unselected(1)})

  htmlDivR.style = "position: absolute; left: 650px; top: 0px; width: 250px; height: 763px"
  htmlDivR.addEventListener("click", function(){PileSelected(2)})
  htmlDivR.addEventListener("mouseover", function(){Selected(2)})
  htmlDivR.addEventListener("mouseout", function(){Unselected(2)})

  //Left Pile
  var index = 0
  for(i = 0; i < 7; i++){

    leftPile.push(deck[index])
    htmlDivL.appendChild(document.getElementById('Card ' + index))
    index += 3

  }

  //Center Pile
  index = 1
  for(i = 0; i < 7; i++){

    centerPile.push(deck[index])
    htmlDivC.appendChild(document.getElementById('Card ' + index))
    index += 3

  }

  //Right Pile
  index = 2
  for(i = 0; i < 7; i++){

    rightPile.push(deck[index])
    htmlDivR.appendChild(document.getElementById('Card ' + index))
    index += 3

  }

}

function PileSelected(choice){

  deck = []

  if(!readyForInput)
    return
  readyForInput = false

   switch (choice) {

     case 0:

       for(i = 0; i < 7; i++)
        deck.push(centerPile[i])
       for(i = 0; i < 7; i++)
        deck.push(leftPile[i])
       for(i = 0; i < 7; i++)
        deck.push(rightPile[i])



       break;

     case 1:

       for(i = 0; i < 7; i++)
        deck.push(leftPile[i])
       for(i = 0; i < 7; i++)
        deck.push(centerPile[i])
       for(i = 0; i < 7; i++)
        deck.push(rightPile[i])

       break;

     case 2:

       for(i = 0; i < 7; i++)
        deck.push(leftPile[i])
       for(i = 0; i < 7; i++)
        deck.push(rightPile[i])
       for(i = 0; i < 7; i++)
        deck.push(centerPile[i])

       break;

   }

   for(i = 0; i < 3; i++)
    page.removeChild(page.childNodes[0])

   trickRound++;

   if(trickRound < 3)
    ResetPiles()
   else
    Draw11thCard()

}

function ResetPiles(){

  var index = 0
  curPile = 0
  curYpos = 0

  leftPile = []
  centerPile = []
  rightPile = []

  htmlDivL = document.createElement('div')
  htmlDivL.setAttribute('class', 'LeftCardPile')
  htmlDivC = document.createElement('div')
  htmlDivC.setAttribute('class', 'CenterCardPile')
  htmlDivR = document.createElement('div')
  htmlDivR.setAttribute('class', 'RightCardPile')

  page.appendChild(htmlDivL)
  page.appendChild(htmlDivC)
  page.appendChild(htmlDivR)

  for(i = 0; i < 21; i++){

    if(curPile == 0){

      cardPng = document.createElement('img')
      cardPng.id = 'Card ' + index
      cardPng.src = deck[i].image
      cardPng.style = "position: absolute; left: 12px; top:" + curYpos + "px"

      htmlDivL.appendChild(cardPng)
      leftPile.push(deck[i])

      curPile++

    }

    else if(curPile == 1){

      cardPng = document.createElement('img')
      cardPng.id = 'Card ' + index
      cardPng.src = deck[i].image
      cardPng.style = "position: absolute; left: 12px; top:" + curYpos + "px"

      htmlDivC.appendChild(cardPng)
      centerPile.push(deck[i])

      curPile++

    }

    else{

      cardPng = document.createElement('img')
      cardPng.id = 'Card ' + index
      cardPng.src = deck[i].image
      cardPng.style = "position: absolute; left: 12px; top:" + curYpos + "px"

      htmlDivR.appendChild(cardPng)
      rightPile.push(deck[i])

      curPile = 0
      curYpos += 75

    }

    index++

  }

  htmlDivL.style = "position: absolute; left: 50px; top: 0px; width: 250px; height: 763px"
  htmlDivL.addEventListener("click", function(){PileSelected(0)})
  htmlDivL.addEventListener("mouseover", function(){Selected(0)})
  htmlDivL.addEventListener("mouseout", function(){Unselected(0)})

  htmlDivC.style = "position: absolute; left: 350px; top: 0px; width: 250px; height: 763px"
  htmlDivC.addEventListener("click", function(){PileSelected(1)})
  htmlDivC.addEventListener("mouseover", function(){Selected(1)})
  htmlDivC.addEventListener("mouseout", function(){Unselected(1)})

  htmlDivR.style = "position: absolute; left: 650px; top: 0px; width: 250px; height: 763px"
  htmlDivR.addEventListener("click", function(){PileSelected(2)})
  htmlDivR.addEventListener("mouseover", function(){Selected(2)})
  htmlDivR.addEventListener("mouseout", function(){Unselected(2)})

  readyForInput = true;

}

function Draw11thCard(){

  cardPng = document.createElement('img')
  cardPng.src = deck[10].image
  cardPng.style = "position: absolute; left: 380px; top: 120px; width: 225px; height: 320px"
  page.appendChild(cardPng)

  const restartBtn = document.createElement('button')
  page.appendChild(restartBtn)
  restartBtn.onclick = Restart
  restartBtn.innerHTML = "Restart trick"
  restartBtn.style = "position: absolute; left: 420px; top: 50px; width: 150px; height: 50px"

}

function Restart(){

  page.removeChild(page.childNodes[0])
  page.removeChild(page.childNodes[0])
  trickRound = 0
  ResetPiles()

}

function Selected(pile){

  if(pile == 0)
    htmlDivL.style.backgroundColor = 'red'
  else if(pile == 1)
    htmlDivC.style.backgroundColor = 'red'
  else
    htmlDivR.style.backgroundColor = 'red'

}

function Unselected(pile){

  if(pile == 0)
    htmlDivL.style.backgroundColor = 'white'
  else if(pile == 1)
    htmlDivC.style.backgroundColor = 'white'
  else
    htmlDivR.style.backgroundColor = 'white'

}
