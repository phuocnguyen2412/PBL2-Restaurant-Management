const closeButtons = $$(".close");
closeButtons.forEach(function (close) {
    close.onclick = function (event) {
        event.preventDefault();
        $$(".new-layer").forEach(function (layer) {
            layer.style.display = "none";
        });
    };
});
