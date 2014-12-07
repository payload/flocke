var flocken = [];
var flocken_div = null;

function main() {
    //get image give size, give pos up 0, left random//reload at next position (sincurve) wavelength random <= load x times at y intervall
    
    var body = document.body;
    flocken_div = document.createElement("div");
    body.appendChild(flocken_div);
    
    for (var i = 0; i < 40; i++) {
        create_flocke("window start");
    }
    
    setInterval(function() {
        create_flocke("window top");
    }, 200);
    
    update_flocken();
}

function create_flocke(top_behaviour) {
    var img = document.createElement("img");
    img.id = "flocke"
    img.src = "http://localhost:8000/flocke.svg";
    img.style.transform = "scale("+(Math.random()*0.4+0.1)+")";
    img.style.position = "absolute"
    
    var initial_left = Math.random()*(window.innerWidth + 200);
    var left = initial_left;
    if (top_behaviour == "window top") {
        var top = -img.height;
    } else if (top_behaviour == "window start") {
        var top = Math.random()*window.innerHeight - img.height;
    } else {
        throw "only want 'window top' or 'window start'";
    }
    
    img.style.left = left+"px";
    img.style.top = top+"px";
    flocken_div.appendChild(img);
    
    var flocke = {
        img: img,
        initial_left: initial_left,
        top: top,
        wind: 0
    };
    flocken.push(flocke);
}

function update_flocken() {
    for (var i in flocken) {
        var flocke = flocken[i];
        var initial_left = flocke.initial_left;
        var top = flocke.top;
        var img = flocke.img;
        var wind = flocke.wind;

        top = top + 1;
        wind = wind + -0.1;
        var left = initial_left + 10*Math.sin(top * 0.05) + wind;
        img.style.left = left+"px";
        img.style.top = top+"px";
        
        flocke.top = top;
        flocke.wind = wind;
        
        if (top > window.innerHeight) {
            img.remove();
        }
    }
    requestAnimationFrame(update_flocken);
}

window.addEventListener("load", main);
//main();
