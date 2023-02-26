
function plusDivs(n) {
    showDivs(slideIndex += n);
}

function showDivs(n) {
    var i;
    var x = document.querySelectorAll(".eventSlide");
    for(i = 0; i < x.length; i++) {
        x[i].setAttribute("style", "display:none");
    }
    n++;
    if (n > x.length) {
        slideIndex = 1;
    }
    x[slideIndex-1].setAttribute("style", "display:flex")
}

var slideIndex = 1;
showDivs(slideIndex);