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