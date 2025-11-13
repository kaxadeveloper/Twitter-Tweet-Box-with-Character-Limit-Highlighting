const editableInput = document.querySelector(".editable"),
  readonlyInput = document.querySelector(".readonly"),
  placeholder = document.querySelector(".placeholder"),
  counter = document.querySelector(".counter"),
  button = document.querySelector("button");

const maxLength = 100;

// Listen for typing, pasting, deleting, etc.
editableInput.addEventListener("input", (e) => checkInput(e.target));

// Hide placeholder when user starts typing
editableInput.addEventListener("keydown", () => {
  placeholder.style.display = "none";
});

function checkInput(element) {
  let currentLength = element.innerText.length;

  // Toggle placeholder and counter
  if (currentLength === 0) {
    placeholder.style.display = "block";
    counter.style.display = "none";
    button.classList.remove("active");
    button.style.opacity = "0.5";
    button.style.pointerEvents = "none";
  } else {
    placeholder.style.display = "none";
    counter.style.display = "block";
    button.classList.add("active");
    button.style.opacity = "1";
    button.style.pointerEvents = "auto";
  }

  // Update remaining characters
  counter.innerText = maxLength - currentLength;

  // Handle overflow text
  if (currentLength > maxLength) {
    let allowedText = element.innerText.substring(0, maxLength);
    let overText = element.innerText.substring(maxLength);
    let highlightedText = `${allowedText}<span class="highlight">${overText}</span>`;

    readonlyInput.innerHTML = highlightedText;
    readonlyInput.style.zIndex = "1";

    // Visual feedback when limit exceeded
    counter.style.color = "#e0245e";
    button.classList.remove("active");
    button.style.opacity = "0.5";
    button.style.pointerEvents = "none";
  } else {
    readonlyInput.innerHTML = element.innerText;
    readonlyInput.style.zIndex = "-1";
    counter.style.color = "#333";
  }
}