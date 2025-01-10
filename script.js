document.addEventListener("DOMContentLoaded", function () {
    const menuIcon = document.querySelector("#menu-icon");
    const hamburgerMenu = document.querySelector("#hamburger-menu");
    const apiURL = "https://i558324.luna.fhict.nl/api/";
    let attracties = [];

    // Popup elementen
    const popup = document.getElementById("popup");
    const popupClose = document.getElementById("popup-close");
    const popupTitle = document.getElementById("popup-title");
    const popupOpeningTimes = document.getElementById("popup-opening-times");
    const popupWachttijd = document.getElementById("popup-wachttijd");
    const popupMinimaleLengte = document.getElementById("popup-minimale-lengte");

    // Klik op het menu-icoon om het menu te openen of te sluiten
    menuIcon.addEventListener("click", function () {
        hamburgerMenu.classList.toggle("hidden");
    });

    // Data ophalen van de API
    async function fetchWachttijden() {
        try {
            const response = await fetch(apiURL + 'Attraction', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            if (!response.ok) {
                throw new Error("API-fout: " + response.status);
            }
            attracties = await response.json();
            updateAttracties(attracties);
        } catch (error) {
            console.error("Fout bij ophalen wachttijden:", error);
        }
    }

    // Update de lijst met attracties
    function updateAttracties(filteredAttracties) {
        const lijst = document.getElementById("attracties-list");
        lijst.innerHTML = "";

        filteredAttracties.forEach(attractie => {
            const item = document.createElement("li");
            item.classList.add("attractie-item");

            const tekstContainer = document.createElement("div");
            tekstContainer.classList.add("tekst-container");

            // Attractienaam
            const attractieNaam = document.createElement("h2");
            attractieNaam.textContent = attractie.name;
            attractieNaam.classList.add("attractie-naam");

            // Wachttijd
            const wachttijd = document.createElement("p");
            const wachttijdMinuten = Math.ceil(attractie.queueLength / attractie.queueSpeed);
            wachttijd.textContent = `Wachttijd: ${wachttijdMinuten} minuten`;
            wachttijd.classList.add("wachttijd");

            // Minimale lengte
            const minimaleLengte = document.createElement("p");
            let minHeight = attractie.minHeight ? (Math.round(attractie.minHeight * 100)) : 'Geen limiet';
            minimaleLengte.textContent = `Minimale lengte: ${minHeight} cm`;
            minimaleLengte.classList.add("minimale-lengte");

            // Voeg klik-event toe aan attractie voor popup
            item.addEventListener("click", function() {
                showPopup(attractie);
            });

            // Voeg items toe aan de tekstcontainer
            tekstContainer.appendChild(attractieNaam);
            tekstContainer.appendChild(wachttijd);
            tekstContainer.appendChild(minimaleLengte);

            // Voeg illustratie toe
            const illustratie = document.createElement("img");
            illustratie.src = `${attractie.id}.png`; // Pas de URL aan naar jouw afbeelding locatie
            illustratie.alt = `${attractie.name} illustratie`;
            illustratie.classList.add("illustratie");

            item.appendChild(tekstContainer);
            item.appendChild(illustratie);

            lijst.appendChild(item);
        });
    }

    // Functie om de popup te tonen met de attractie-informatie
    function showPopup(attractie) {
        popupTitle.textContent = attractie.name;
        popupOpeningTimes.textContent = `Openingstijden: ${attractie.openingTime} - ${attractie.closingTime}`;
        popupWachttijd.textContent = `Wachttijd: ${Math.ceil(attractie.queueLength / attractie.queueSpeed)} minuten`;
        popupMinimaleLengte.textContent = `Minimale lengte: ${attractie.minHeight ? (Math.round(attractie.minHeight * 100)) : 'Geen limiet'} cm`;

        popup.classList.remove("hidden"); // Toon de popup
    }

    // Sluit de popup
    popupClose.addEventListener("click", function() {
        popup.classList.add("hidden");
    });

    // De zoekfunctie wordt geactiveerd wanneer je op het zoek-icoon klikt
    const searchIcon = document.getElementById("search-icon");
    const searchContainer = document.getElementById("search-container");
    const searchInput = document.getElementById("search-input");
    const searchButton = document.getElementById("search-button");

    searchIcon.addEventListener("click", function () {
        searchContainer.classList.toggle("hidden");
    });

    searchButton.addEventListener("click", function () {
        const query = searchInput.value.toLowerCase();
        const filteredAttracties = attracties.filter(attractie =>
            attractie.name.toLowerCase().includes(query)
        );
        updateAttracties(filteredAttracties);
    });

    fetchWachttijden(); // Haal de wachttijden op bij het laden van de pagina
});
