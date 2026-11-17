// Recipe database with bilingual titles
const recipes = [
    {
        id: 1,
        title: { de: "Gemüse-Reis-Bowl", en: "Vegetable Rice Bowl" },
        price: 3.80,
        co2: "niedrig",
        categories: ["Gemüse", "Getreide", "Nüsse"],
        image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1000&q=80",
        saved: false
    },
    {
        id: 2,
        title: { de: "Linseneintopf", en: "Lentil Stew" },
        price: 3.20,
        co2: "niedrig",
        categories: ["Gemüse", "Getreide"],
        image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=800&q=80",
        saved: false
    },
    {
        id: 3,
        title: { de: "Gemüse-Pasta", en: "Vegetable Pasta" },
        price: 4.50,
        co2: "niedrig",
        categories: ["Gemüse", "Getreide"],
        image: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=800&q=80",
        saved: false
    },
    {
        id: 4,
        title: { de: "Hähnchen-Curry mit Reis", en: "Chicken Curry with Rice" },
        price: 6.90,
        co2: "mittel",
        categories: ["Fleisch", "Getreide", "Milchprodukte"],
        image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=800&q=80",
        saved: false
    },
    {
        id: 5,
        title: { de: "Rindersteak mit Kartoffeln", en: "Beef Steak with Potatoes" },
        price: 11.50,
        co2: "hoch",
        categories: ["Fleisch", "Gemüse"],
        image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",
        saved: false
    }
];

// Translation dictionary (DE / EN)
const translations = {
    de: {
        filterTitle: "Filter",
        costLabel: "Kosten (€)",
        co2Label: "CO₂-Emissionen",
        co2Low: "Niedrig",
        co2Med: "Mittel",
        co2High: "Hoch",
        catLabel: "Lebensmittelkategorie",
        catFruit: "Obst",
        catVeg: "Gemüse",
        catMeat: "Fleisch",
        catGrain: "Getreide",
        catNuts: "Nüsse",
        catDrinks: "Getränke",
        catDairy: "Milchprodukte",
        showRecipes: "Rezepte anzeigen",
        recipesTitle: "Rezeptvorschläge",
        mainBadge: "HAUPTVORSCHLAG",
        altTitle: "Alternativen",
        noResultTitle: "Keine passenden Rezepte gefunden",
        noResultDesc: "Bitte passen Sie Ihre Filtereinstellungen an.",
        co2Map: { niedrig: "niedrig", mittel: "mittel", hoch: "hoch" },
        modalTitle: "Benutzerprofil",
        personalInfo: "Persönliche Angaben",
        usernameLabel: "Benutzername",
        nameLabel: "Name",
        emailLabel: "E-Mail-Adresse",
        langLabel: "Sprache",
        workInfo: "Berufliche Angaben",
        roleLabel: "Benutzerrolle",
        roleDefault: "Krankenhauspersonal",
        deptLabel: "Abteilung",
        deptKitchen: "Küche / Verpflegungsmanagement",
        deptNursing: "Pflegedienst",
        deptAdmin: "Verwaltung",
        stationLabel: "Standort / Station",
        stationPlaceholder: "z. B. Standort A",
        settingsTitle: "Einstellungen",
        notifyOpt: "Benachrichtigungen aktivieren",
        saveFilterOpt: "Filtereinstellungen speichern",
        saveBtn: "Änderungen speichern"
    },
    en: {
        filterTitle: "Filter",
        costLabel: "Cost (€)",
        co2Label: "CO₂ Emissions",
        co2Low: "Low",
        co2Med: "Medium",
        co2High: "High",
        catLabel: "Food Category",
        catFruit: "Fruits",
        catVeg: "Vegetables",
        catMeat: "Meat",
        catGrain: "Grains",
        catNuts: "Nuts",
        catDrinks: "Beverages",
        catDairy: "Dairy Products",
        showRecipes: "Show Recipes",
        recipesTitle: "Recipe Suggestions",
        mainBadge: "TOP SUGGESTION",
        altTitle: "Alternatives",
        noResultTitle: "No matching recipes found",
        noResultDesc: "Please adjust your filter settings.",
        co2Map: { niedrig: "low", mittel: "medium", hoch: "high" },
        modalTitle: "User Profile",
        personalInfo: "Personal Information",
        usernameLabel: "Username",
        nameLabel: "Name",
        emailLabel: "Email Address",
        langLabel: "Language",
        workInfo: "Professional Information",
        roleLabel: "User Role",
        roleDefault: "Hospital Staff",
        deptLabel: "Department",
        deptKitchen: "Kitchen / Catering Management",
        deptNursing: "Nursing Service",
        deptAdmin: "Administration",
        stationLabel: "Location / Ward",
        stationPlaceholder: "e.g. Ward A",
        settingsTitle: "Settings",
        notifyOpt: "Enable notifications",
        saveFilterOpt: "Save filter settings",
        saveBtn: "Save Changes"
    }
};

// Inline Flag SVGs for reliable cross-platform rendering
const flagSVGs = {
    de: `<svg viewBox="0 0 5 3" width="20" height="14">
            <rect width="5" height="3" y="0" fill="#000"/>
            <rect width="5" height="2" y="1" fill="#D00"/>
            <rect width="5" height="1" y="2" fill="#FFCE00"/>
         </svg>`,
    en: `<svg viewBox="0 0 60 30" width="20" height="14">
            <clipPath id="ukClip"><path d="M0,0 v30 h60 v-30 z"/></clipPath>
            <g clip-path="url(#ukClip)">
                <path d="M0,0 v30 h60 v-30 z" fill="#012169"/>
                <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" stroke-width="6"/>
                <path d="M0,0 L60,30 M60,0 L0,30" stroke="#C8102E" stroke-width="4"/>
                <path d="M30,0 v30 M0,15 h60" stroke="#fff" stroke-width="10"/>
                <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" stroke-width="6"/>
            </g>
         </svg>`
};

// State variables
let currentLang = "de";
let selectedCo2 = "niedrig";
let currentFilteredList = recipes.filter(r => r.co2 === "niedrig");

// DOM Elements
const minRange = document.getElementById("minRange");
const maxRange = document.getElementById("maxRange");
const minPriceInput = document.getElementById("minPriceInput");
const maxPriceInput = document.getElementById("maxPriceInput");
const sliderRange = document.getElementById("sliderRange");
const co2Buttons = document.querySelectorAll("#co2Group .pill");
const applyFilterBtn = document.getElementById("applyFilterBtn");

const langDropdownContainer = document.querySelector(".lang-dropdown-container");
const langToggleBtn = document.getElementById("langToggle");
const langOptions = document.querySelectorAll(".lang-option");
const profLangSelect = document.getElementById("profLang");

// Set Language Function
function setLanguage(lang) {
    currentLang = lang;
    document.documentElement.lang = lang;

    // Update Navbar Flag & Text
    document.getElementById("langFlag").innerHTML = flagSVGs[lang];
    document.getElementById("langText").textContent = lang.toUpperCase();
    profLangSelect.value = lang;

    // Update static elements with data-i18n
    const dict = translations[lang];
    document.querySelectorAll("[data-i18n]").forEach(el => {
        const key = el.getAttribute("data-i18n");
        if (dict[key]) {
            el.textContent = dict[key];
        }
    });

    // Update dynamic inputs/placeholders
    document.getElementById("profRole").value = dict.roleDefault;
    document.getElementById("profStation").placeholder = dict.stationPlaceholder;

    // Re-render recipe cards
    renderRecipes(currentFilteredList);
}

// Language Dropdown Menu Interactions
langToggleBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    langDropdownContainer.classList.toggle("open");
});

document.addEventListener("click", (e) => {
    if (!langDropdownContainer.contains(e.target)) {
        langDropdownContainer.classList.remove("open");
    }
});

langOptions.forEach(opt => {
    opt.addEventListener("click", () => {
        const selectedLang = opt.getAttribute("data-lang");
        setLanguage(selectedLang);
        langDropdownContainer.classList.remove("open");
    });
});

profLangSelect.addEventListener("change", (e) => {
    setLanguage(e.target.value);
});

// Update dual-range slider track
function updateSliderTrack() {
    const min = parseFloat(minRange.value);
    const max = parseFloat(maxRange.value);
    const maxLimit = parseFloat(minRange.max);

    const leftPercent = (min / maxLimit) * 100;
    const rightPercent = 100 - (max / maxLimit) * 100;

    sliderRange.style.left = leftPercent + "%";
    sliderRange.style.right = rightPercent + "%";
}

// Slider and numeric input synchronization
minRange.addEventListener("input", () => {
    if (parseFloat(minRange.value) > parseFloat(maxRange.value)) {
        minRange.value = maxRange.value;
    }
    minPriceInput.value = minRange.value;
    updateSliderTrack();
});

maxRange.addEventListener("input", () => {
    if (parseFloat(maxRange.value) < parseFloat(minRange.value)) {
        maxRange.value = minRange.value;
    }
    maxPriceInput.value = maxRange.value;
    updateSliderTrack();
});

minPriceInput.addEventListener("change", () => {
    let val = Math.max(0, Math.min(parseFloat(minPriceInput.value) || 0, parseFloat(maxRange.value)));
    minRange.value = val;
    minPriceInput.value = val;
    updateSliderTrack();
});

maxPriceInput.addEventListener("change", () => {
    let val = Math.min(15, Math.max(parseFloat(maxPriceInput.value) || 15, parseFloat(minRange.value)));
    maxRange.value = val;
    maxPriceInput.value = val;
    updateSliderTrack();
});

// CO2 pill button selection
co2Buttons.forEach(btn => {
    btn.addEventListener("click", () => {
        co2Buttons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        selectedCo2 = btn.dataset.value;
    });
});

// Format price based on current language locale
function formatPrice(price) {
    if (currentLang === "de") {
        return price.toFixed(2).replace(".", ",") + " €";
    }
    return "€" + price.toFixed(2);
}

// Render Recipes
function renderRecipes(list) {
    currentFilteredList = list;
    const dict = translations[currentLang];
    const heroImg = document.getElementById("heroImg");
    const heroTitle = document.getElementById("heroTitle");
    const heroMeta = document.getElementById("heroMeta");
    const alternativesGrid = document.getElementById("alternativesGrid");

    if (list.length === 0) {
        heroTitle.textContent = dict.noResultTitle;
        heroMeta.textContent = dict.noResultDesc;
        alternativesGrid.innerHTML = "";
        return;
    }

    const mainRecipe = list[0];
    heroImg.src = mainRecipe.image;
    heroImg.alt = mainRecipe.title[currentLang];
    heroTitle.textContent = mainRecipe.title[currentLang];
    heroMeta.textContent = `${formatPrice(mainRecipe.price)} · CO₂ ${dict.co2Map[mainRecipe.co2]}`;

    const altList = list.slice(1);
    alternativesGrid.innerHTML = altList.map(item => `
        <div class="alt-card" data-id="${item.id}">
            <div class="alt-img-box">
                <img src="${item.image}" alt="${item.title[currentLang]}">
                <button class="bookmark-btn ${item.saved ? 'saved' : ''}" title="Save" onclick="toggleSave(event, ${item.id})">
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="${item.saved ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2">
                        <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/>
                    </svg>
                </button>
            </div>
            <h4>${item.title[currentLang]}</h4>
        </div>
    `).join("");

    document.querySelectorAll(".alt-card").forEach(card => {
        card.addEventListener("click", () => {
            const clickedId = parseInt(card.dataset.id);
            const idx = list.findIndex(r => r.id === clickedId);
            if (idx > 0) {
                const [selected] = list.splice(idx, 1);
                list.unshift(selected);
                renderRecipes(list);
            }
        });
    });
}

// Bookmark toggle
window.toggleSave = function(event, id) {
    event.stopPropagation();
    const recipe = recipes.find(r => r.id === id);
    if (recipe) {
        recipe.saved = !recipe.saved;
        event.currentTarget.classList.toggle("saved");
        const svg = event.currentTarget.querySelector("svg");
        svg.setAttribute("fill", recipe.saved ? "currentColor" : "none");
    }
};

// Filter logic
function filterRecipes() {
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

applyFilterBtn.addEventListener("click", filterRecipes);

// User Profile Modal Controls
const userProfileBtn = document.getElementById("userProfileBtn");
const profileModal = document.getElementById("profileModal");
const closeModalBtn = document.getElementById("closeModalBtn");
const profileForm = document.getElementById("profileForm");

userProfileBtn.addEventListener("click", () => {
    profileModal.classList.add("open");
});

closeModalBtn.addEventListener("click", () => {
    profileModal.classList.remove("open");
});

profileModal.addEventListener("click", (e) => {
    if (e.target === profileModal) {
        profileModal.classList.remove("open");
    }
});

profileForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const saveFilter = document.getElementById("optSaveFilter").checked;
    if (saveFilter) {
        localStorage.setItem("savedCo2", selectedCo2);
    }
    profileModal.classList.remove("open");
});

// Initialize Page
updateSliderTrack();
renderRecipes(currentFilteredList);