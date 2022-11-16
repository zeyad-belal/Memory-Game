// start the game and take the player name
document.querySelector(".control-buttons span").onclick = function(){
    let playerName=  window.prompt("what is your name ?")
    if(playerName === null || playerName == "" ){
        document.querySelector(".info-container .name span").innerHTML = "Unknown"
    }else {
        document.querySelector(".info-container .name span").innerHTML = playerName
    }
    document.querySelector(".control-buttons").remove()
}

let blocksContainer = document.querySelector(".memory-game-blocks")

let blocks = Array.from(blocksContainer.children)

// array of indexes 
let orderRange = [...Array(blocks.length).keys()]

// shuffle the aray of indexes and the cards
shuffle(orderRange)

// flipping cards
blocks.forEach((block)=>{
    block.addEventListener("click",function () {
        flippeBlock(block)
    })
})

/* 
ALL FUNCTIONS
1- shuffle
2- flippe block
3- stop clicking
4- block comparing
*/ 

function shuffle(array) {
    let current = blocks.length -1
    let temp;
    
    // swap the last ele with random ele (shuffle order range)
    while(current > 0){
        let random = Math.floor(Math.random()*current)

        temp = array[current] ;
        array[current] = array[random];
        array[random] = temp ;

        current--
    }
    //shuffle the cards
    let i=0;
    while(i < 19){
        blocks.forEach((block)=>{
        block.style.order = orderRange[i]
        i++
    })
    }
}


function flippeBlock (selectedBlock){
    // Add Class is-flipped
    selectedBlock.classList.add("is-flipped");

    // Collect All Flipped Cards
    let allFlippedBlocks = blocks.filter(flippedBlock => flippedBlock.classList.contains('is-flipped'));

    if (allFlippedBlocks.length === 2) {
        // Stop Clicking Function
        stopClicking(blocksContainer);
        // compare the two flipped blocks
        blockComparing(allFlippedBlocks[0] , allFlippedBlocks[1])
    }
}


function stopClicking(blocksContainer) {
    // prevent clicking on all cards if two are clicked
    blocksContainer.classList.add("no-clicking")
    setTimeout(()=>{
    blocksContainer.classList.remove("no-clicking")
    },800)
}


function blockComparing (blockOne,blockTwo){
    // comparing the two blocks if matched
    if(blockOne.dataset.technology === blockTwo.dataset.technology){
        blockOne.classList.remove("is-flipped")
        blockTwo.classList.remove("is-flipped")
        
        blockOne.classList.add("has-match")
        blockTwo.classList.add("has-match")
        document.querySelector("#success").play()

    }else{
        setTimeout(()=>{
            blockOne.classList.remove("is-flipped")
            blockTwo.classList.remove("is-flipped")
            document.querySelector(".tries span").innerHTML++
            document.querySelector("#fail").play()

        },800)
    }
}