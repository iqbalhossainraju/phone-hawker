const searchItem = () => {
    const searchItem = document.getElementById('search-field');
    const searchText = searchItem.value;
    searchItem.value = '';
    if(searchText == ''){
        swal("Input is Empty!", "please write what you want?", "warning");
    }
    else{
        const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`

        fetch(url)
        .then(response => response.json())
        .then(data => displayedSearchItem(data.data))
    }

}

const displayedSearchItem = (phones) => {
    if(phones.length == 0) {
        swal("Wrong Input!", "please write what you want?", "error");
    }
    else {
        const searchResult = document.getElementById('search-result');
        searchResult.textContent = '';
        const showtwentyphones = phones.slice(0, 20)
        showtwentyphones.forEach(phone => {
            const div =document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
            <div class="card h-100">
            <img class = "w-50 m-auto py-2" text-center" src="${phone.image}" class="card-img-top" alt="..." />
            <div class="card-body">
              <h5 class="card-title">Name: ${phone.phone_name}</h5>
              <p class="card-text"> Brand Name : ${phone.brand}</p>
              </p>
            </div>
            <button onclick = "productsDetails('${phone.slug}')" class="btn btn-success">
            Details
            </button>

          </div>
            `;
            searchResult.appendChild(div);
        })
    }
}

const productsDetails = (id) => {
    const url =  `https://openapi.programming-hero.com/api/phones?slug=${id}`
    fetch(url)
    .then(response => response.json())
    .then(data => productsDetailsDisplayed(data.data[0]))
}

const productsDetailsDisplayed = (details) => {
    // console.log(detail)
    const itemDetails = document.getElementById('item-details');
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML= `
    <img class = "w-50 m-auto py-2" text-center" src="${details.image}" class="card-img-top" alt="..." />
    <div class="card-body">
      <h5 class="card-title">Sensor: ${details.sensors}</h5>
      </p>
    </div>
    `;
    itemDetails.appendChild(div)
}

