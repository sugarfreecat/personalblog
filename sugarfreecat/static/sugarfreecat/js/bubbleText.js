
document.addEventListener('DOMContentLoaded', () => {
    var bgcolour;
    var fgcolour;
    var speed = 80; // speed of bubbling, lower is faster
    var shades = 12; // number of bubble shades

    var bubbcol = [];
    var bubbshd;
    var bubbchr = new WeakMap();

    // Read the current CSS variables and regenerate the gradient.
    function updateBubbleColors() {
        const rootStyles = getComputedStyle(document.documentElement);

        bgcolour = rootStyles.getPropertyValue('--bubble-bg-color').trim();
        fgcolour = rootStyles.getPropertyValue('--bubble-fg-color').trim();

        bubbcol = [];

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

        // Update the text shadows of existing bubble elements.
        document.querySelectorAll(".bubble").forEach(function (element) {
            for (var span of element.children) {
                span.style.textShadow =
                    element.id === "title-banner"
                        ? bubbshd + " 3px 3px 1px"
                        : bubbshd + " 0px 0px 2px";
            }
        });
    }

    function bubbagump() {
        if (!document.getElementById) return;

        // Initialize every element with the bubble class.
        document.querySelectorAll(".bubble").forEach(function (element) {
            var text = element.textContent;
            var characters = [];

            element.textContent = "";

            for (var i = 0; i < text.length; i++) {
                var span = document.createElement("span");

                span.textContent = text.charAt(i);
                element.appendChild(span);
                characters.push(0);
            }

            bubbchr.set(element, characters);
        });

        // Generate the initial colors and shadows.
        updateBubbleColors();

        // Start the animation only once.
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

    // Watch for changes to the selected theme.
    const themeObserver = new MutationObserver(() => {
        updateBubbleColors();
    });

    themeObserver.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['data-theme']
    });

    // Initialize the effect.
    bubbagump();
});
