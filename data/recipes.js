// data/recipes.js - Recipe database with bilingual titles
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