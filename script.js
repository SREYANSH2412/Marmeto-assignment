const tabs = document.querySelectorAll('[data-tab-target]');
const tabContents = document.querySelectorAll('[data-tab-content]');
const WomenBox = document.getElementById("Women");
const MenBox = document.getElementById("Men");
const KidsBox = document.getElementById("Kids");
console.log(WomenBox + " " + MenBox + " " + KidsBox);
tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const target = document.querySelector(tab.dataset.tabTarget);
    // console.log(target);
    // Logic for tab content visibility
    if (target == WomenBox) {
      MenBox.style.display = "none";
      KidsBox.style.display = "none";
      WomenBox.style.removeProperty('display');
    } else if (target == MenBox) {
      WomenBox.style.display = 'none';
      KidsBox.style.display = 'none';
      MenBox.style.removeProperty('display');   
      
    } else if (target == KidsBox) {   
      WomenBox.style.display = 'none';    
      MenBox.style.display = 'none';  
      KidsBox.style.removeProperty('display');      
    }

    // Logic to activate the tab content
    tabContents.forEach(tabContent => {
   
      tabContent.classList.remove('active');  
      

    });
    target.classList.add('active'); 

    // Logic for tab logos and active class
    tabs.forEach(tab => {
      tab.classList.remove('active'); 
      tab.querySelector('.tab-logo').style.display = 'none'; // Hide logos
    });
    tab.classList.add('active'); 
    tab.querySelector('.tab-logo').style.display = 'block'; // Show logo for active
  });
});


// Calculation of discount percentage 
function calculationPercentage(price, compare_at_price){
  let percentage = Math.round(((compare_at_price - price) / compare_at_price) * 100);
  return percentage;
}

// start fetching the api data 
const apiEndpoint = "https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json";

async function fetchProducts() {
  try {
    const response = await fetch(apiEndpoint);

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const categoriesData = await response.json(); 
    console.log(categoriesData);
    displayProducts(categoriesData);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}


function displayProducts(categoriesData) {
  const menSection = document.getElementById('Men');
  const womenSection = document.getElementById('Women');
  const kidsSection = document.getElementById('Kids');

  categoriesData.categories.forEach(category => {
    const sectionElement = document.getElementById(category.category_name); // Get section by category name
    console.log(sectionElement);
    if (sectionElement) { // Check if the section exists
      // console.log("Code is here ")
 
      category.category_products.forEach(product => {
        // Creatimg the card here 
        const productDiv = document.createElement('div');
        productDiv.classList.add('box');
        // console.log(productDiv);
        // Adiing the image secion
        const productImg = document.createElement('img');
        productImg.src = product.image;
        productImg.alt = product.title;
        productImg.height = "300"; 
        productImg.width = "240"; 

        const cardContent = document.createElement('div');
        cardContent.classList.add('card-content');
        cardContent.innerHTML = `<h3>${product.title}</h3><li>${product.vendor}</li>`;

        
        const priceDiv = document.createElement('div');
        priceDiv.classList.add('price');

        priceDiv.innerHTML = `<h3>Rs ${product.price}</h3>`;
        const del  = document.createElement('del');
        del.innerHTML = `<h3>${product.compare_at_price}</h3>`;
        priceDiv.appendChild(del)
        const percentage = calculationPercentage(product.price, product.compare_at_price);
        const paragraphTag = document.createElement('p');
        paragraphTag.innerHTML= `${percentage}% Off`;
        priceDiv.appendChild(paragraphTag);

        
        productDiv.appendChild(productImg);
        productDiv.appendChild(cardContent);
        productDiv.appendChild(priceDiv);
        // ... append other elements
        const createButton = document.createElement('button');
        createButton.classList.add('btn');
        createButton.innerHTML = "Add to Cart";
        productDiv.appendChild(createButton);
        sectionElement.appendChild(productDiv);
    });
    } else {
      console.warn(`Section not found for category: ${category.category_name}`);
    }
  });
}

fetchProducts(); 



let isMenPresent = MenBox.classList.contains("active");
let isWomenPresent = WomenBox.classList.contains("active");
let isKidsPresent = KidsBox.classList.contains("active");
if(isMenPresent){
     WomenBox.style.display = "none";
     KidsBox.style.display= "none";
    
    
}
if(isWomenPresent){
  console.log("Akhil")
     MenBox.style.display = "none";
     KidsBox.style.display= "none"; 
     WomenBox.style.display = "flex";
 }
 if(isKidsPresent){
      MenBox.style.display = "none";
      WomenBox.style.display= "none";
      KidsBox.style.display= "flex";  
 }
