const ball = document.querySelector(".ball");
const surface = document.querySelector(".surface");
const allActionButtons = document.querySelectorAll(".action-btn");
const ballPositionVal = ball.getBoundingClientRect();
const newBallBoudary = ballBoundary(ballPositionVal);  //to add extra boundary values.

let surfaceVal = {
    "left": [0, 85],  //[min, max]
    "top": [0, 70]
};

//surface to start at (0,0) on loading
surface.style.left = surfaceVal["left"][0] + "%";
surface.style.top = surfaceVal["top"][0] + "%";

//add eventListener to all buttons
allActionButtons.forEach(function(eachBtn){
    eachBtn.addEventListener("click", function(){
        moveSurface(this.innerHTML);

        if (detectCollision()) {
            surface.classList.add("on-collide");
        }
        else {
            surface.classList.remove("on-collide");
        }
    });
});

//eventListener for keyboard key press
document.addEventListener("keydown", function(event){
    moveSurface(event.key);

    if (detectCollision()) {
        surface.classList.add("on-collide");
    }
    else {
        surface.classList.remove("on-collide");
    }
});


//move surface block based on button press and key press
function moveSurface(clickedBtn){
    let btnClickedInLower = clickedBtn.toLowerCase();
    let styleSurfaceLeft = surface.style.left;
    let styleSurfaceTop = surface.style.top;

    //Move left
    if (btnClickedInLower === "left" || btnClickedInLower === "arrowleft") {
        if (styleSurfaceLeft != surfaceVal["left"][0] + "%"){
            let newVal = Number(styleSurfaceLeft.slice(0, (styleSurfaceLeft.length - 1))) - 1;
            surface.style.left = newVal + "%";
        }
    }
    //Move right
    else if (btnClickedInLower === "right" || btnClickedInLower === "arrowright") {
        if (styleSurfaceLeft != surfaceVal["left"][1] + "%"){
            let newVal = Number(styleSurfaceLeft.slice(0, (styleSurfaceLeft.length - 1))) + 1;
            surface.style.left = newVal + "%";
        }
    }
    //Move up
    else if (btnClickedInLower === "up" || btnClickedInLower === "arrowup") {
        if (styleSurfaceTop != surfaceVal["top"][0] + "%"){
            let newVal = Number(styleSurfaceTop.slice(0, (styleSurfaceTop.length - 1))) - 1;
            surface.style.top = newVal + "%";
        }
    }
    //Move down
    else if (btnClickedInLower === "down" || btnClickedInLower === "arrowdown") {
        if (styleSurfaceTop != surfaceVal["top"][1] + "%"){
            let newVal = Number(styleSurfaceTop.slice(0, (styleSurfaceTop.length - 1))) + 1;
            surface.style.top = newVal + "%";
        }
    }
}

//get ball current positions
function ballBoundary(ballCurrentpos){
    let ballPositionValBoundary = {};
    let parametersArray = ["right", "left", "top", "bottom"];
    for (let key in ballCurrentpos){
        if (parametersArray.includes(key)){
            ballPositionValBoundary[key] = ballCurrentpos[key] + 10  
        }
        
    }

    return ballPositionValBoundary;
}

//detect collision
function detectCollision(){
    let currentSurfacePos = surface.getBoundingClientRect();

    if (currentSurfacePos["top"] < newBallBoudary["bottom"] - 10){
        if (currentSurfacePos["bottom"] + 10 > newBallBoudary["top"]){
            if (currentSurfacePos["right"] > newBallBoudary["left"]){
                if (currentSurfacePos["left"] < newBallBoudary["right"]){
                    console.log("collided");
                    
                    return true;
                } 
            }
        } 
    }
}

//redundant code
// function removeAnimation(currentSurfacePos){
//     if ((currentSurfacePos["top"] > newBallBoudary["bottom"] - 10) || 
//     (currentSurfacePos["bottom"] + 10 < newBallBoudary["top"]) ||
//     (currentSurfacePos["right"] < newBallBoudary["left"]) ||
//     (currentSurfacePos["left"] > newBallBoudary["right"])){
//         surface.classList.remove("on-collide");
//     }
// }