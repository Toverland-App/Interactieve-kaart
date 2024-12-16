document.addEventListener("DOMContentLoaded", function () {
    const apiURL = "http://localhost:5000/api/";
    let attracties = [];

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

            const attractieNaam = document.createElement("h2");
            attractieNaam.textContent = attractie.name;
            attractieNaam.classList.add("attractie-naam");

            const wachttijd = document.createElement("p");
            const wachttijdMinuten = Math.ceil(attractie.queueLength / attractie.queueSpeed);
            wachttijd.textContent = `Wachttijd: ${wachttijdMinuten} minuten`;
            wachttijd.classList.add("wachttijd");

            item.appendChild(attractieNaam);
            item.appendChild(wachttijd);

            lijst.appendChild(item);
        });
    }

    // Zoekfunctionaliteit
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
