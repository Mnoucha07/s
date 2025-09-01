// Liste des hôtels
const hotels = [
    { name: "Hotel Riviera", price: 120, image:'images/hotel1.webp' },
    { name: "Hotel El-Djazair", price: 90, image: "images/hotel3.webp" },
    { name: "Hotel Paradise", price: 150, image: "images/hotel2.webp" }
];

// Sélection
const hotelList = document.getElementById("hotelList");
const searchBar = document.getElementById("searchBar");
const modal = document.getElementById("bookingModal");
const closeModal = document.getElementById("closeModal");
const hotelNameEl = document.getElementById("hotelName");
const hotelImageEl = document.getElementById("hotelImage");
const totalPriceEl = document.getElementById("totalPrice");
const bookingForm = document.getElementById("bookingForm");
const personsInput = document.getElementById("clientPersons");

let selectedHotel = null;

// Afficher les hôtels
function displayHotels(list) {
    hotelList.innerHTML = "";
    list.forEach(hotel => {
        const card = document.createElement("div");
        card.classList.add("hotel-card");
        card.innerHTML = `
            <img src="${hotel.image}" alt="${hotel.name}">
            <h3>${hotel.name}</h3>
            <p>Prix: ${hotel.price} € / personne</p>
            <button onclick="openBooking('${hotel.name}')">Réserver</button>
        `;
        hotelList.appendChild(card);
    });
}

// Filtrer avec recherche
searchBar.addEventListener("input", e => {
    const value = e.target.value.toLowerCase();
    const filtered = hotels.filter(h => h.name.toLowerCase().includes(value));
    displayHotels(filtered);
});

// Ouvrir modal réservation
function openBooking(hotelName) {
    selectedHotel = hotels.find(h => h.name === hotelName);
    hotelNameEl.textContent = selectedHotel.name;
    hotelImageEl.src = selectedHotel.image;

    // reset input personnes à 1
    personsInput.value = 1;
    updateTotalPrice();

    modal.style.display = "flex";
}

// Calcul dynamique du prix
function updateTotalPrice() {
    if (selectedHotel) {
        const persons = parseInt(personsInput.value) || 1;
        const total = selectedHotel.price * persons;
        totalPriceEl.textContent = `Prix total: ${total} €;` ;
    }
}

// écouter les changements sur input personnes
personsInput.addEventListener("input", updateTotalPrice);

// Fermer modal
closeModal.onclick = () => modal.style.display = "none";
window.onclick = e => { if (e.target === modal) modal.style.display = "none"; };

// Calcul du prix total au submit
bookingForm.addEventListener("submit", e => {
    e.preventDefault();
    const persons = parseInt(personsInput.value) || 1;
    const total = selectedHotel.price * persons;
    alert(`Réservation confirmée pour ${persons} personne(s).\nTotal: ${total} €`);
    modal.style.display = "none";
});

// Initialisation
displayHotels(hotels);