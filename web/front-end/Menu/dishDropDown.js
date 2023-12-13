fetch(`http://localhost:5225/api/NhaCC/GetNguyenLieuByNhaCC/${id}`)
  .then(function (response) {
    return response.json();
  })
  .then(function (dish_list) {
    let dishes = dish_list.map(function (dish) {
      return `
            <option value="${dish.id}">${dish.tenMonAn}</option>
          `;
    });
    $$(".input-row-dish").forEach(function (input, index) {
      dish.forEach(function (infor) {
        $(`.idMonAn${index}`).innerHTML = dish.join("");
      });
    });
  });
