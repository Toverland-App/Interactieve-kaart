let currentRating = null; // Houd de geselecteerde rating bij

// Toon het formulier voor opmerkingen
function showFeedbackForm(rating) {
    currentRating = rating; // Stel de huidige rating in
    document.getElementById("feedback-form").style.display = "block"; // Maak het formulier zichtbaar
}

// Verstuur de feedback naar de API
async function submitFeedback() {
    const apiURL = "https://i558324.luna.fhict.nl/api/feedback";

    // Haal de opmerking uit het tekstvak
    const comment = document.getElementById("feedback-comment").value;

    // Bouw het feedbackobject
    const feedbackData = {
        description: comment || "Geen opmerkingen toegevoegd", // Standaardtekst indien leeg
        date: new Date().toISOString().split("T")[0], // Huidige datum
        rating: currentRating,
    };

    try {
        const response = await fetch(apiURL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(feedbackData),
        });

        if (!response.ok) {
            throw new Error("Fout bij het versturen van feedback: " + response.status);
        }

        alert("Bedankt voor je feedback!");
        resetFeedbackForm();
    } catch (error) {
        console.error("Fout:", error);
        alert("Er is een fout opgetreden bij het versturen van de feedback.");
    }
}

// Reset het formulier na het versturen van feedback
function resetFeedbackForm() {
    document.getElementById("feedback-form").style.display = "none"; // Verberg het formulier
    document.getElementById("feedback-comment").value = ""; // Maak het tekstveld leeg
    currentRating = null; // Reset de rating
}

// Open het navigatiemenu
function openNav() {
    document.getElementById("myNav").style.width = "100%";
}

// Sluit het navigatiemenu
function closeNav() {
    document.getElementById("myNav").style.width = "0";
}
