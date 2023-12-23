$(".delete-dish").onclick = function (event) {
    event.preventDefault();
    $(`#dish-input-table`).innerHTML = ` `;
    index_input = 0;
};
