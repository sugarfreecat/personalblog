var bgcolour = "#ff90cf"; // background colour
var fgcolour = "#a90060"; // foreground colour
var speed = 80;           // speed of bubbling, lower is faster
var shades = 12;           // number of shades of bubble

/****************************
 * Bubbling Text Effect
 * Adapted to support multiple .bubble elements
 ****************************/

var bubbcol = [];
var bubbshd;
var bubbchr = new WeakMap();

function addLoadEvent(funky) {
    var oldonload = window.onload;

    if (typeof oldonload !== "function") {
        window.onload = funky;
    } else {
        window.onload = function () {
            if (oldonload) oldonload();
            funky();
        };
    }
}

addLoadEvent(bubbagump);

function bubbagump() {
    if (!document.getElementById) return;

    // Generate the colour gradient once.
    for (var i = 0; i <= shades; i++) {
        var col = "#";

        for (var j = 1; j < 6; j += 2) {
            var bg = parseInt(bgcolour.substring(j, j + 2), 16);
            var fg = parseInt(fgcolour.substring(j, j + 2), 16);

            col += dechex(bg + (fg - bg) * (i / shades));
        }

        bubbcol[i + 1] = col;

        if (i === Math.floor(shades / 2)) {
            bubbshd = col;
        }
    }

    // Initialize every element with the bubble class.
    document.querySelectorAll(".bubble").forEach(function (element) {
        var text = element.textContent;
        var characters = [];

        element.textContent = "";

        for (var i = 0; i < text.length; i++) {
            var span = document.createElement("span");

            span.style.textShadow = bubbshd + " 0px 0px 2px";
            span.textContent = text.charAt(i);

            element.appendChild(span);
            characters.push(0);
        }

        bubbchr.set(element, characters);
    });

    setInterval(bubbling, speed);
}

function dechex(dec) {
    dec = Math.floor(dec);
    return ((dec < 16) ? "0" : "") + dec.toString(16);
}

function bubbling() {
    document.querySelectorAll(".bubble").forEach(function (element) {
        var characters = bubbchr.get(element);

        if (!characters) return;

        var spans = element.children;

        for (var i = 0; i < characters.length; i++) {
            if (characters[i]) {
                spans[i].style.color = bubbcol[characters[i]];
                characters[i] = (characters[i] + 1) % bubbcol.length;
            } else if (
                Math.random() < 7.5 / (shades * characters.length)
            ) {
                characters[i] = 1;
            }
        }
    });
}