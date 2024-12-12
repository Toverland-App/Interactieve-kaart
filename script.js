document.addEventListener("DOMContentLoaded", function () {
    // URL van de API (vervang dit door de juiste API-URL)
    const apiURL = "voorbeeld.json"; // Gebruik een lokaal JSON-bestand

    // Functie om gegevens op te halen
    async function fetchWachttijden() {
        try {
            const response = await fetch(apiURL); // Ophalen van API-gegevens
            if (!response.ok) {
                throw new Error("API-fout: " + response.status);
            }
            const data = await response.json(); // Omzetten naar JSON
            updateAttracties(data); // HTML bijwerken
        } catch (error) {
            console.error("Fout bij ophalen wachttijden:", error);
        }
    }

    // Functie om de attracties in de HTML te zetten
    function updateAttracties(attracties) {
        const lijst = document.getElementById("attracties-list");
        lijst.innerHTML = ""; // Maak de lijst leeg voor nieuwe data

        attracties.forEach(attractie => {
            // Maak een nieuw lijst-item voor elke attractie
            const item = document.createElement("li");

            // Voeg de attractienaam toe
            const attractieNaam = document.createElement("h2");
            attractieNaam.textContent = attractie.name;
            attractieNaam.classList.add("attractie-naam"); // Voeg een CSS-class toe voor styling

            // Voeg de wachttijd toe
            const wachttijd = document.createElement("p");
            wachttijd.textContent = `Wachttijd: ${attractie.wait_time} minuten`;
            wachttijd.classList.add("wachttijd"); // Voeg een CSS-class toe voor styling

            // Voeg beide toe aan het lijst-item
            item.appendChild(attractieNaam);
            item.appendChild(wachttijd);

            // Voeg het lijst-item toe aan de lijst
            lijst.appendChild(item);
        });
    }

    // API-gegevens ophalen bij het laden van de pagina
    fetchWachttijden();
});
