const searchItem = () => {
    const searchItem = document.getElementById('search-field');
    const searchText = searchItem.value;
    searchItem.value = '';

    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`

    fetch(url)
    .then(response => response.json())
    .then(data => displayedSearchItem(data.data))
}

const displayedSearchItem = (phones) => {
    const searchResult = document.getElementById('search-result');
    const showtwentyphones = phones.slice(0, 20)
    for(const phone of showtwentyphones){
        const div =document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card h-100">
        <img class = "w-50 m-auto py-2" text-center" src="${phone.image}" class="card-img-top" alt="..." />
        <div class="card-body">
          <h5 class="card-title">Name: ${phone.phone_name}</h5>
          <p class="card-text">
            This is a longer card with supporting text below as a
            natural lead-in to additional content. This content is a
            little bit longer.
          </p>
        </div>
        <button class="btn btn-success">Details</button>
      </div>
        `;
        searchResult.appendChild(div);
    }
}