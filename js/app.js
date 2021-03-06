const searchItem = () => {
    const searchItem = document.getElementById('search-field');
    const itemDetails = document.getElementById('item-details');
    const viewButton = document.querySelector('.view-all-btn');
    viewButton.style.display = 'none';
    const searchText = searchItem.value;
    searchItem.value = '';
    itemDetails.textContent = '';
    const brandName = document.querySelector('.brand-name');
    brandName.textContent= searchText;
    if(searchText == ''){
        swal("Input is Empty!", "please write what you want?", "warning");
    }
    else{
        const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`

        fetch(url)
        .then(response => response.json())
        .then(data => {
            displayedSearchItem(data.data);
            if(data.data.length > 20){
                viewButton.style.display = 'block';
            }
        })
    }

}

const displayedSearchItem = (phones, viewAll = false) => {
    if(phones.length == 0) {
        swal("Wrong Input!", "please write what you want?", "error");
    }
    else {
        const searchResult = document.getElementById('search-result');
        searchResult.textContent = '';
        let showtwentyphones;
 if(viewAll === false){
    if(phones.length > 20){
        showtwentyphones =  phones.slice(0,20);
   }else if(phones.length < 20){
       showtwentyphones = phones;
   }
 }else{
       showtwentyphones = phones;
   }
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
    const url =  `https://openapi.programming-hero.com/api/phone/${id}`
    fetch(url).then(res => res.json())
    .then(data => productsDetailsDisplayed(data.data))
}

const productsDetailsDisplayed = (details) => {
    // console.log(detail)
    const itemDetails = document.getElementById('item-details');
    itemDetails.textContent = "";
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML= `
    <img class = "w-50 m-auto py-2" text-center" src="${details.image}" class="card-img-top" alt="..." />
    <div class="card-body">
      <h5 class="card-title">Name: ${details.name}</h5>
      <h6 class="card-title">Release Date: ${details.releaseDate}</h6>
      <div>
      Sensor:
            <p>Face ID: ${details.mainFeatures.sensors[0]}</p><br>
           <p> Accelerometer: ${details.mainFeatures.sensors[1]}</p><br>
           <p>Gyro: ${details.mainFeatures.sensors[2]}</p><br>
           <p>Proximity: ${details.mainFeatures.sensors[3]}</p><br>
           <p>Compass: ${details.mainFeatures.sensors[4]}</p><br>
           <p>Barometer: ${details.mainFeatures.sensors[5]}</p><br>
            <p>ChipSet: ${details.mainFeatures.chipSet}</p><br>        
            <p>Display Size: ${details.mainFeatures.displaySize}</p><br>        
            <p>Storage: ${details.mainFeatures.memory}</p>
        </div>
      <div>
      ${details.others ? 'Others: ' : ''}
            <p>Buletooth: ${details?.others?.Bluetooth ? details?.others?.Bluetooth :  ""}</p><br>
            <p>GPS: ${details?.others?.GPS ? details?.others?.GPS : ""}</p><br>

            <p>NFC: ${details?.others?.NFC ? details?.others?.NFC : ""}</p><br>

            <p>Radio: ${details?.others?.Radio ? details?.others?.Radio : ""}</p><br>

            <p>USB: ${details?.others?.USB ? details?.others?.USB : ''}</p><br>

            <p>WLAN: ${details?.others?.WLAN ? details?.others?.WLAN :  ""}</p>
        </div>
    `;
    itemDetails.appendChild(div);
}

const viewAll = () => {
    const searchItem = document.querySelector('.brand-name');
    const itemDetails = document.getElementById('item-details');
    const viewButton = document.querySelector('.view-all-btn');
    viewButton.style.display = 'none';
    const searchText = searchItem.textContent;
    itemDetails.textContent = '';
        const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`

        fetch(url)
        .then(response => response.json())
        .then(data => {
            displayedSearchItem(data.data, true);
        })
   
}


