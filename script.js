const getPhone = async (searchText) => {
  const url = ` https://openapi.programming-hero.com/api/phones?search=${searchText}`;
  
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
  phoneInfo.textContent = ""
   const resultText = document.getElementById("no_result")
  if(items.length === 0){
       resultText.classList.remove("d-none")
  }else{
    resultText.classList.add("d-none")
  }
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
               <button class="btn btn-primary" onclick="getDetails('${item.slug}')" data-bs-toggle="modal" data-bs-target="#exampleModal">Detail </button>
                </div>
        </div>
        `
        phoneInfo.appendChild(phoneContainer);

       
        // console.log(item)
  });
  Loading(false)
};



//Search part

  const SearchValue = document.getElementById("searchValue") ;

  SearchValue.addEventListener("keypress" , (e)=>{
    if(e.key === "Enter"){

      Loading(true)
      const value = e.target.value ;
      getPhone(value);
      
      e.target.value = ""
    }
  })
  document.getElementById('searchBtn').addEventListener("click" , ()=>{

     Loading(true)
     const value = SearchValue.value ;
     value ?  getPhone(value) : alert("please Enter value");
     
     SearchValue.value = ""

  }) 

  //Phone details 
  const getDetails = async id =>{
    const url = `https://openapi.programming-hero.com/api/phone/${id}` ;
    const res = await fetch(url);
    const data = await res.json();
    getDetailValue(data.data)
   
   
  }

  const getDetailValue = (data)=>{
    const phoneTitle = document.getElementById("phoneTitle");
    const modalBody = document.querySelector(".modal-body");

    phoneTitle.innerText = data.name
    modalBody.innerHTML = `
    <h5>Brand: ${data.brand}</h5>
    <h5>Relase Date: ${data.releaseDate? data.releaseDate : "Not Found"}</h5>
         <div>
            <h4 class="text-center">Main Features </h4>
            <ol>
                <li>${data.mainFeatures.storage}</li>
                <li>${data.mainFeatures.displaySize}</li>
                <li>${data.mainFeatures.memory}</li>
               
             </ol>
       </div>
    <h4>Relase Date: </h4>
    <h4>Relase Date: </h4>
    
    `
  }
  //isLoading

  const Loading = (value) =>{
    const loadSPiner = document.getElementById("loading");
    if(value === true){
         loadSPiner.classList.remove("d-none")
    }else{
      loadSPiner.classList.add("d-none")
    }
  }

getPhone("phone")


