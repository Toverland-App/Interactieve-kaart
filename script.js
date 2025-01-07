document.addEventListener("DOMContentLoaded", function () {
    const menuIcon = document.querySelector("#menu-icon");
    const hamburgerMenu = document.querySelector("#hamburger-menu");
    const apiURL = "https://i558324.luna.fhict.nl/api/";
    let attracties = [];

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

    function updateAttracties(filteredAttracties) {
        const lijst = document.getElementById("attracties-list");
        lijst.innerHTML = "";

        filteredAttracties.forEach(attractie => {
            const item = document.createElement("li");
            item.classList.add("attractie-item");

            const tekstContainer = document.createElement("div");
            tekstContainer.classList.add("tekst-container");

            const attractieNaam = document.createElement("h2");
            attractieNaam.textContent = attractie.name;
            attractieNaam.classList.add("attractie-naam");

            const wachttijd = document.createElement("p");
            const wachttijdMinuten = Math.ceil(attractie.queueLength / attractie.queueSpeed);
            wachttijd.textContent = `Wachttijd: ${wachttijdMinuten} minuten`;
            wachttijd.classList.add("wachttijd");

            tekstContainer.appendChild(attractieNaam);
            tekstContainer.appendChild(wachttijd);

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

    fetchWachttijden();
});
