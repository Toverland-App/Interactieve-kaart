document.addEventListener("DOMContentLoaded", function () {
    const apiURL = "http://localhost:5000/api/";

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
            const data = await response.json();
            updateAttracties(data);
        } catch (error) {
            console.error("Fout bij ophalen wachttijden:", error);
        }
    }

    function updateAttracties(attracties) {
        const lijst = document.getElementById("attracties-list");
        lijst.innerHTML = "";

        attracties.forEach(attractie => {
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

    fetchWachttijden();
});