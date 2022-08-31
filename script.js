const getPhone = async () => {
  const url = `https://openapi.programming-hero.com/api/phones?search=iphone`;
  
  try{
    const res = await fetch(url);
  const data = await res.json();
  displayData(data.data);
  }
  catch(error){
    console.log(error.message)
  }
};

const displayData = (items) => {
  const phoneInfo = document.getElementById("phone_container");
  items.forEach((item) => {
    const phoneContainer = document.createElement("div");
    phoneContainer.classList.add("col-lg-3");
    phoneContainer.classList.add("col-md-4");
    phoneContainer.classList.add("col-sm-6");

    phoneContainer.innerHTML = `
        <div class="card">
            <img src="${item.image}" class="card-img-top p-2" alt="${item.brand}">
            <div class="card-body">
                <h5 class="card-title">Brand: ${item.brand}</h5>
                <h5 class="card-title">Phone Name: ${item.phone_name}</h5>
               
                </div>
        </div>
        `
        phoneInfo.appendChild(phoneContainer);
        console.log(item)
  });
};
getPhone();
