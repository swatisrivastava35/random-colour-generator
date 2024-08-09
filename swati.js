const containerEl = document.querySelector(".container");


  const colorContainerEl = document.createElement("div");
  colorContainerEl.classList.add("color-container");

  const colorCodeEl = document.createElement("div");
  colorCodeEl.classList.add("color-code");

  const colorButtonEl = document.createElement("button");
  colorButtonEl.classList.add("color-button");
  colorButtonEl.innerText = "New Color";

  const colorPropertiesEl = document.createElement("div");
  colorPropertiesEl.classList.add("color-properties");

  colorButtonEl.addEventListener("click", () => {
    const newColorCode = randomColor();
    colorContainerEl.style.backgroundColor = "#" + newColorCode;
    colorCodeEl.innerText = "#" + newColorCode;
    fetchColorProperties(newColorCode, colorPropertiesEl);
  });

  colorContainerEl.appendChild(colorCodeEl);
  colorContainerEl.appendChild(colorButtonEl);
  colorContainerEl.appendChild(colorPropertiesEl);
  containerEl.appendChild(colorContainerEl);


const colorContainerEls = document.querySelectorAll(".color-container");

generateColors();

function generateColors() {
  colorContainerEls.forEach((colorContainerEl) => {
    const newColorCode = randomColor();
    colorContainerEl.style.backgroundColor = "#" + newColorCode;
    colorContainerEl.querySelector(".color-code").innerText = "#" + newColorCode;
    const colorPropertiesEl = colorContainerEl.querySelector(".color-properties");
    fetchColorProperties(newColorCode, colorPropertiesEl);
  });
}

function randomColor() {
  const chars = "0123456789abcdef";
  const colorCodeLength = 6;
  let colorCode = "";
  for (let index = 0; index < colorCodeLength; index++) {
    const randomNum = Math.floor(Math.random() * chars.length);
    colorCode += chars.substring(randomNum, randomNum + 1);
  }
  return colorCode;
}

function fetchColorProperties(colorCode, element) {
  fetch(`https://www.thecolorapi.com/id?hex=${colorCode}`)
    .then(response => response.json())
    .then(data => {
      element.innerHTML = `
    <h3>  <p>Name: ${data.name.value}</p></h3>
        <p>Hex: ${data.hex.value}</p>
        <p>RGB: ${data.rgb.value}</p>
        <p>HSL: ${data.hsl.value}</p>

      `;
    })
  
}
