// Global state variables
let currentLang = "de";
let currentFilteredList = recipes.filter(r => r.co2 === "niedrig");

// Set language and update all localized texts and elements
function setLanguage(lang) {
    currentLang = lang;
    document.documentElement.lang = lang;

    // Update navbar flag and text
    document.getElementById("langFlag").innerHTML = flagSVGs[lang];
    document.getElementById("langText").textContent = lang.toUpperCase();
    document.getElementById("profLang").value = lang;

    // Update static elements with data-i18n attribute
    const dict = translations[lang];
    document.querySelectorAll("[data-i18n]").forEach(el => {
        const key = el.getAttribute("data-i18n");
        if (dict[key]) el.textContent = dict[key];
    });

    // Update modal dynamic inputs and placeholders
    document.getElementById("profRole").value = dict.roleDefault;
    document.getElementById("profStation").placeholder = dict.stationPlaceholder;

    // Re-render recipes in selected language
    renderRecipes(currentFilteredList);
}

// Format price based on current language locale
function formatPrice(price) {
    if (currentLang === "de") {
        return price.toFixed(2).replace(".", ",") + " €";
    }
    return "€" + price.toFixed(2);
}

// Render main hero card and alternative grid
function renderRecipes(list) {
    currentFilteredList = list;
    const dict = translations[currentLang];
    const heroImg = document.getElementById("heroImg");
    const heroTitle = document.getElementById("heroTitle");
    const heroMeta = document.getElementById("heroMeta");
    const alternativesGrid = document.getElementById("alternativesGrid");

    if (!heroImg || !heroTitle) return;

    if (list.length === 0) {
        heroTitle.textContent = dict.noResultTitle;
        heroMeta.textContent = dict.noResultDesc;
        alternativesGrid.innerHTML = "";
        return;
    }

    // First item as main recipe suggestion
    const mainRecipe = list[0];
    heroImg.src = mainRecipe.image;
    heroImg.alt = mainRecipe.title[currentLang];
    heroTitle.textContent = mainRecipe.title[currentLang];
    heroMeta.textContent = `${formatPrice(mainRecipe.price)} · CO₂ ${dict.co2Map[mainRecipe.co2]}`;

    // Remaining items as alternatives
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

    // Click alternative card to swap it into the main hero slot
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

// Navbar language dropdown interaction
const langDropdownContainer = document.querySelector(".lang-dropdown-container");
const langToggleBtn = document.getElementById("langToggle");
if (langToggleBtn) {
    langToggleBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        langDropdownContainer.classList.toggle("open");
    });
}

document.addEventListener("click", (e) => {
    if (langDropdownContainer && !langDropdownContainer.contains(e.target)) {
        langDropdownContainer.classList.remove("open");
    }
});

document.querySelectorAll(".lang-option").forEach(opt => {
    opt.addEventListener("click", () => {
        setLanguage(opt.getAttribute("data-lang"));
        if (langDropdownContainer) langDropdownContainer.classList.remove("open");
    });
});

const profLangSelect = document.getElementById("profLang");
if (profLangSelect) {
    profLangSelect.addEventListener("change", (e) => {
        setLanguage(e.target.value);
    });
}

// User profile modal interaction
const profileModal = document.getElementById("profileModal");
const userProfileBtn = document.getElementById("userProfileBtn");
const closeModalBtn = document.getElementById("closeModalBtn");
const profileForm = document.getElementById("profileForm");

if (userProfileBtn) userProfileBtn.addEventListener("click", () => profileModal.classList.add("open"));
if (closeModalBtn) closeModalBtn.addEventListener("click", () => profileModal.classList.remove("open"));
if (profileModal) {
    profileModal.addEventListener("click", (e) => {
        if (e.target === profileModal) profileModal.classList.remove("open");
    });
}

if (profileForm) {
    profileForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const saveFilter = document.getElementById("optSaveFilter").checked;
        if (saveFilter) {
            localStorage.setItem("savedCo2", selectedCo2);
        }
        profileModal.classList.remove("open");
    });
}