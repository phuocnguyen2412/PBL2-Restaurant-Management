const tabActive = $(".tab-item.active");
const line = $(".tabs .line");

requestIdleCallback(function () {
    line.style.left = tabActive.offsetLeft + "px";
    line.style.width = tabActive.offsetWidth + "px";
});

$$(".tab-item").forEach((tab) => {
    tab.onclick = function () {
        console.log(1);
        $(".tab-item.active").classList.remove("active");

        line.style.left = this.offsetLeft + "px";
        line.style.width = this.offsetWidth + "px";

        this.classList.add("active");
    };
});
getDishes("http://localhost:5225/api/MonAn/MonAn");
$("#all").onclick = function () {
    getDishes("http://localhost:5225/api/MonAn/MonAn");
};
$("#food").onclick = function () {
    getDishes("http://localhost:5225/api/MonAn/DoAn");
};
$("#drink").onclick = function () {
    getDishes("http://localhost:5225/api/MonAn/DoUong ");
};

function getDishes(url) {
    fetch(`${url}`)
        .then(function (response) {
            return response.json();
        })
        .then(function (dish_list) {
            showDish(dish_list);
        });
}
function showDish(dish_list) {
    let dishes = dish_list.map(function (dish) {
        return `
            <div class="dish col-3 mb-3">
                <div class="dish-img">
                    <img
                        class="w-100"
                        src="${dish.linkAnh}"
                        alt=""
                    />
                </div>
                <h5 class="dish-name text-center m-2">
                    ${dish.tenMon}
                </h5>
                <i class="dish-prize text-center d-block m-2"
                    >${dish.giaMon / 1000}.000 VND</i
                >
            </div>
        `;
    });

    $("#dish_list").innerHTML = dishes.join("");
}
