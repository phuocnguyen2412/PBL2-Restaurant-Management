
const closeButtons = $$(".close");
closeButtons.forEach(function (close) {
    close.onclick = function () {
        $$(".new-layer").forEach(function (layer) {
            layer.style.display = "none";
        });
    };
});
