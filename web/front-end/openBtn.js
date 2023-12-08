const openButtons = $$(".open");
openButtons.forEach(function (open) {
    open.onclick = function (event) {
        event.preventDefault();
        $$(".new-layer").forEach(function (layer) {
            layer.style.display = "flex";
        });
    };  
});
