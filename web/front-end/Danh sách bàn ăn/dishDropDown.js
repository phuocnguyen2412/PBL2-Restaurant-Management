fetch(`http://localhost:5225/api/MonAn/MonAn`)
    .then(function (response) {
        return response.json();
    })
    .then(function (dish_list) {
        let dishes = dish_list.map(function (dish) {
            return `
                <option value="${dish.id}">${dish.tenMon}</option>
            `;
        });
        dishes = dishes.join("");
        $$(".input-row-dish").forEach(function (input, index) {
            $$(`.idMonAn${index}`).forEach(function (a, index) {
                a.innerHTML = dishes;
            });

            $$(`.idmonAn`).forEach(function (a, index) {
                a.innerHTML = dishes;
            });
        });
        $$(".idMonAn").forEach(function (input) {
            input.onchange = function () {
                input.innerHTML = dishes;
            };
        });
    });
