/**
 * This file is just a silly example to show everything working in the browser.
 * When you're ready to start on your site, clear the file. Happy hacking!
 **/

const baseURL = "https://platzi-avo.vercel.app";
const apiURL = `${baseURL}/api/avo`;
const avocadosNode = document.querySelector("#avocados-list-container");
const formatPrice = (price) => {
  const formattedPrice = new window.Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
  }).format(price);

  return formattedPrice;
};
// Web API
const fetchData = async () => {
  try {
    // 1. Conectarnos al server
    const response = await fetch(apiURL);
    // 2. procesar la respuesta y convertirla en JSON
    const responseJson = await response.json();
    // 3. JSON --> renderizar info en el browser
    const itemsToRender = storeItemsToRender(responseJson);
    // 4. Añadir los nodos al body
    avocadosNode.append(...itemsToRender);
  } catch (error) {
    console.log(error);
  }
};

// Crea la estructura del nodo que presenta los aguacates
const createNewNode = (item) => {
  const nodeContainer = document.createElement("div");
  nodeContainer.className = "group";

  // Añade nodos al nodeContenedor
  nodeContainer.innerHTML = `<div class="flex-shrink-0 mx-2 mb-6 relative overflow-hidden bg-yellow-500 rounded-lg max-w-xs shadow-lg avocado-container">
  <svg class="absolute bottom-0 left-0 mb-8" viewBox="0 0 375 283" fill="none">
    <rect x="159.52" y="175" width="152" height="152" rx="8" transform="rotate(-45 159.52 175)" fill="#f3c06b">
    </rect>
    <rect y="107.48" width="152" height="152" rx="8" transform="rotate(-45 0 107.48)" fill="#f3c06b">
    </rect>
  </svg>
  <div class="relative pt-10 px-10 flex items-center justify-center">
    <div class="block absolute w-48 h-48 bottom-0 left-0 -mb-24 ml-3">
    </div>
    <picture>
      <img class="relative w-40 avocado-img" src="${baseURL}${
    item.image
  }" alt="shopping item" />
    </picture>
  </div>
  <div class="relative text-white px-6 pb-6 mt-6">
    <span class="block opacity-75 -mb-1">
      Indoor
    </span>
    <div class="block justify-between">
      <span class="block font-semibold text-xl">
        ${item.name}
      </span>
      <span class="bg-white rounded-full text-yellow-500 text-xs font-bold px-3 py-2 leading-none flex items-center avocado-price">
        ${formatPrice(item.price)}
      </span>
    </div>
  </div>
</div>`;
  // Devuelve el contenedor
  return nodeContainer;
};

// Acomoda los nodos de aguacate en un array
const storeItemsToRender = (responseJson) => {
  const itemsToRender = [];
  responseJson.data.forEach((item) => {
    const newNode = createNewNode(item);
    itemsToRender.push(newNode);
  });
  return itemsToRender;
};

fetchData(apiURL);
