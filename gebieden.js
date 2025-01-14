document.addEventListener("DOMContentLoaded", function () {
    const apiURL = "https://i558324.luna.fhict.nl/api/";
    let areas = [];

    // Functie om de lijst van gebieden op te halen
    async function fetchAreas() {
        try {
            const response = await fetch(apiURL + "Area", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (!response.ok) {
                throw new Error("API-fout: " + response.status);
            }
            areas = await response.json();
            renderAreaButtons(areas);
        } catch (error) {
            console.error("Fout bij ophalen gebieden:", error);
        }
    }

    

    // Functie om knoppen te genereren voor elk gebied
    function renderAreaButtons(areas) {
        const container = document.getElementById("areas-container");
        container.innerHTML = "";

        areas.forEach((area) => {
            const button = document.createElement("button");
            button.textContent = area.name;
            button.classList.add("area-button");
            button.addEventListener("click", () => showAttractions(area.attractions));
            container.appendChild(button);
        });
    }

    // Functie om attracties te tonen voor een geselecteerd gebied
    function showAttractions(attractions) {
        const lijst = document.getElementById("attracties-list");
        lijst.innerHTML = "";

        attractions.forEach((attractie) => {
            const item = document.createElement("li");
            item.classList.add("attractie-item");

            const naam = document.createElement("h2");
            naam.textContent = attractie.name;
            naam.classList.add("attractie-naam");

            const beschrijving = document.createElement("p");
            beschrijving.textContent = attractie.description;

            item.appendChild(naam);
            item.appendChild(beschrijving);
            lijst.appendChild(item);
        });
    }

    // Menu functies
    window.openNav = function () {
        document.getElementById("myNav").style.width = "100%";
    };

    window.closeNav = function () {
        document.getElementById("myNav").style.width = "0%";
    };

    // Laad de gebieden bij het openen van de pagina
    fetchAreas();
});
