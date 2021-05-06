window.onload = function() {
    var canvas = document.getElementById("button");
    var ctx = canvas.getContext("2d");
    var clicked = false;
    var clickedTrue = false;
    ctx.font = "30px Arial";
    ctx.strokeText("Enter", 10, 50);
    var hamburger = document.getElementById("hamburger");
    var divs = document.getElementsByClassName("link");
    hamburger.onclick = function() {
        if (hamburger.style.visibility != "hidden") {
            if (clicked === false) {
                clicked = true;
                clickedtrue = true;
                console.log(divs.length);
                for(var i = 0; i < divs.length; i++) {
                    divs[i].style.marginTop = "30px";
                    divs[i].style.visibility = "visible";
                }
            } else {
                clicked = false;
                console.log(divs.length);
                for(var i = 0; i < divs.length; i++) {
                    divs[i].style.marginTop = "30px";
                    divs[i].style.visibility = "";
            }
        }
    }
}

}