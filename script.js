const tabs = document.querySelectorAll('[data-tab-target]');
const tabContents = document.querySelectorAll('[data-tab-content]');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const target = document.querySelector(tab.dataset.tabTarget);

    // Logic for tab content visibility
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


// fetch('https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json')
// .then(response =>{
//   if(!response.ok){
//     throw new Error("Network reponse was not ok");
//   }
//   return response.json();

// })
// .then(data=>{
//   const products = data.map(itemms=>itemms.image)
//   console.log(products)
// })
// .catch(error=>{
//   console.error('There has been a problem with your fetch operation:', error);
// });

// fetch('https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json')
//   .then(response => response.json())
//   .then(data => {
//     // Extract images from the JSON data
//     const images = data.category_products.map(product => product.image[0].src);

//     // Create HTML elements for each image
//     const imageContainer = document.getElementById('imageContainer');
//     images.forEach(imageSrc => {
//       const imgElement = document.createElement('img');
//       imgElement.src = imageSrc;
//       imgElement.alt = 'Product Image';
//       imgElement.style.width = '200px'; // Adjust the width as needed
//       imageContainer.appendChild(imgElement);
//     });
//   })
//   .catch(error => {
//     console.error('Error fetching data:', error);
//   });

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
      // console.log(categoriesData.category_products[category.id]);
      category.category_products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('box');
        console.log(productDiv);

        const productImg = document.createElement('img');
        productImg.src = product.image;
        productImg.alt = product.title;
        productImg.height = "300"; 
        productImg.width = "240"; 

        const cardContent = document.createElement('div');
        cardContent.classList.add('card-content');
        cardContent.innerHTML = `<h3>${product.title}</h3><li>${product.vendor}</li>`;

        // ... Add other elements for price, badge, button (similarly)
        const priceDiv = document.createElement('div');
        priceDiv.classList.add('price');

        priceDiv.innerHTML = `<h3>${product.price}</h3>`;
        const del  = document.createElement('del');
        del.innerHTML = `<h3>${product.compare_at_price}</h3>`;
        priceDiv.appendChild(del)


        productDiv.appendChild(productImg);
        productDiv.appendChild(cardContent);
        productDiv.appendChild(priceDiv);
        // ... append other elements

        sectionElement.appendChild(productDiv);
    });
    } else {
      console.warn(`Section not found for category: ${category.category_name}`);
    }
  });
}

fetchProducts(); 


// function displayProducts(categoryData, sectionElement) {
//     categoryData.category_products.forEach(product => {
//         const productDiv = document.createElement('div');
//         productDiv.classList.add('box');

//         const productImg = document.createElement('img');
//         productImg.src = product.image;
//         productImg.alt = product.title;
//         productImg.height = "300"; 
//         productImg.width = "240"; 

//         const cardContent = document.createElement('div');
//         cardContent.classList.add('card-content');
//         cardContent.innerHTML = `<h3>${product.title}</h3><li>${product.vendor}</li>`;

//         // ... Add other elements for price, badge, button (similarly)

//         productDiv.appendChild(productImg);
//         productDiv.appendChild(cardContent);
//         // ... append other elements

//         sectionElement.appendChild(productDiv);
//     });
// }

// categoriesData.categories.forEach(category => {
//     switch (category.category_name) {
//         case 'Men':
//             displayProducts(category, menSection);
//             break;
//         case 'Women':
//             displayProducts(category, womenSection);
//             break;
//         case 'Kids':
//             displayProducts(category, kidsSection);
//             break;
//         default:
//             console.log(`Unknown category: ${category.category_name}`);
//     }
// });
