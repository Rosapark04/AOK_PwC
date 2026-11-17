// Filter logic and slider synchronization
const minRange = document.getElementById("minRange");
const maxRange = document.getElementById("maxRange");
const minPriceInput = document.getElementById("minPriceInput");
const maxPriceInput = document.getElementById("maxPriceInput");
const sliderRange = document.getElementById("sliderRange");
const co2Buttons = document.querySelectorAll("#co2Group .pill");
const applyFilterBtn = document.getElementById("applyFilterBtn");

let selectedCo2 = "niedrig";

// Update dual-range slider track highlight and green line width
function updateSliderTrack() {
    if (!minRange || !maxRange || !sliderRange) return;
    const min = parseFloat(minRange.value);
    const max = parseFloat(maxRange.value);
    const maxLimit = parseFloat(minRange.max);

    const leftPercent = (min / maxLimit) * 100;
    const rightPercent = (max / maxLimit) * 100;

    // Fix line visibility by resetting right property and computing width
    sliderRange.style.left = leftPercent + "%";
    sliderRange.style.right = "auto";
    sliderRange.style.width = (rightPercent - leftPercent) + "%";
}

// Slider and numeric input synchronization
if (minRange) {
    minRange.addEventListener("input", () => {
        if (parseFloat(minRange.value) > parseFloat(maxRange.value)) {
            minRange.value = maxRange.value;
        }
        if (minPriceInput) minPriceInput.value = minRange.value;
        updateSliderTrack();
    });
}

if (maxRange) {
    maxRange.addEventListener("input", () => {
        if (parseFloat(maxRange.value) < parseFloat(minRange.value)) {
            maxRange.value = minRange.value;
        }
        if (maxPriceInput) maxPriceInput.value = maxRange.value;
        updateSliderTrack();
    });
}

if (minPriceInput) {
    minPriceInput.addEventListener("change", () => {
        let val = Math.max(0, Math.min(parseFloat(minPriceInput.value) || 0, parseFloat(maxRange.value)));
        minRange.value = val;
        minPriceInput.value = val;
        updateSliderTrack();
    });
}

if (maxPriceInput) {
    maxPriceInput.addEventListener("change", () => {
        let val = Math.min(15, Math.max(parseFloat(maxPriceInput.value) || 15, parseFloat(minRange.value)));
        maxRange.value = val;
        maxPriceInput.value = val;
        updateSliderTrack();
    });
}

// CO2 pill button selection
co2Buttons.forEach(btn => {
    btn.addEventListener("click", () => {
        co2Buttons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        selectedCo2 = btn.dataset.value;
    });
});

// Execute combined filters
function executeFilter() {
    const minP = parseFloat(minRange.value);
    const maxP = parseFloat(maxRange.value);
    const checkedCategories = Array.from(document.querySelectorAll("#categoryList input:checked"))
        .map(cb => cb.value);

    const filtered = recipes.filter(recipe => {
        const matchPrice = recipe.price >= minP && recipe.price <= maxP;
        const matchCo2 = recipe.co2 === selectedCo2;
        const matchCat = checkedCategories.length === 0 || 
                         checkedCategories.some(cat => recipe.categories.includes(cat));
        return matchPrice && matchCo2 && matchCat;
    });

    renderRecipes(filtered);
}

if (applyFilterBtn) {
    applyFilterBtn.addEventListener("click", executeFilter);
}

// CRITICAL: Initialize slider track and render default recipes on initial page load
updateSliderTrack();
renderRecipes(currentFilteredList);