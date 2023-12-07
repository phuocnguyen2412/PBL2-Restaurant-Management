function openPart(button, htmlNode) {
    button.onclick = function (e) {
        $$(".part").forEach(function (part) {
            part.style.display = "none";
        });
        e.preventDefault();
        htmlNode.style.display = "block";
    };
}

openPart($("#employee-part"), $("#employee"));

openPart($("#orderItem-List-part"), $("#orderItem"));
openPart($("#bill-part"), $("#bill"));
openPart($("#storage-part"), $("#storage"));
openPart($("#resource-input-part"), $("#resource-input"));
openPart($("#home-part"), $("#home"));

