const { createApp } = Vue;

createApp({
    data() {
        return {
            form: {
                fullName: '',
                dob: '',
                gender: '',
                totalVisitors: '',
                children: '',
                accommodation: '',
                cardHolder: '',
                cardNumber: '',
                expiry: '',
                cvv: ''
            },
            generalError: '',
            places: [],
            selectedPlaces: [],
            accommodationOptions: [
                'No accommodation needed',
                'Forest View Hotel',
                'Totoro Family Inn',
                'Witch Valley Guesthouse',
                'Luxury Ghibli Resort'
            ],
            showSummary: false
        };
    },

    mounted() {
        this.loadPlacesFromJSON();
    },

    methods: {
        async loadPlacesFromJSON() {
            try {
                const res = await fetch('ghibli_park.json');
                this.places = await res.json();
            } catch (e) {
                this.places = [
                    { id: "gwh1", name: "Central Stairs", image: "assets/gwh1.jpg", description: "A brilliant mosaic tile staircase connecting first and second floors." },
                    { id: "gwh2", name: "Open Warehouse", image: "assets/gwh2.jpg", description: "Contains production artifacts and sculptures from past exhibits in Japan and abroad" },
                    { id: "gwh3", name: "No-Face", image: "assets/gwh3.jpg", description: "Part of interactive exhibits,where you can become your favorite Studio Ghibli characters." },
                    { id: "gwh4", name: "Ghibli Meals", image: "assets/gwh4.jpg", description: "Why does the food in Studio Ghibli films look so delicious!? Those secrets are revealed here." },
                    { id: "gwh5", name: "Ghibli Posters", image: "assets/gwh5.jpg", description: "A collection of Studio Ghibli posters, film and music packagings, books and more, all in one place" },
                    { id: "gwh6", name: "Screening Room Cinema Orion", image: "assets/gwh6.jpg", description: "Seating about 170 people, Orion screens Studio Ghibli animated-shorts." },
                    { id: "gwh7", name: "Director's Office", image: "assets/gwh7.jpg", description: "Yubaba from 'Spirited Away' is busy at work." },
                    { id: "gwh8", name: "Catbus Room", image: "assets/gwh8.jpg", description: "In the play area that recreates the world of My Neighbor Totoro, a one-of-a-kind Cat Bus awaits." },
                    { id: "gwh9", name: "Children's Town", image: "assets/gwh9.jpg", description: "This area is a mini-replica of the Higashi-Koganei Station area in Tokyo where Studio Ghibli is located." },
                    { id: "gwh10", name: "Garden in the Sky", image: "assets/gwh10.jpg", description: "Robot Soldiers, from Castle in the Sky, wait patiently for their master to return." },
                    { id: "gwh11", name: "Ghibli Shop", image: "assets/gwh11.jpg", description: "The official shop where you can buy limited-edition Studio Ghibli goods." },
                    { id: "gwh12", name: "Spirited Away Area", image: "assets/gwh12.jpg", description: "A magical recreation of the bathhouse world from Spirited Away." },
                    { id: "gwh13", name: "Kiki’s Bakery", image: "assets/gwh13.jpg", description: "Step inside the bakery from Kiki's Delivery Service." },
                    { id: "hoy1", name: "Hill of Youth Entrance", image: "assets/hoy1.jpg", description: "The nostalgic entrance to Hill of Youth area." },
                    { id: "hoy2", name: "Antique Shop", image: "assets/hoy2.jpg", description: "A vintage shop inspired by Whisper of the Heart." },
                    { id: "hoy3", name: "Cat Bureau", image: "assets/hoy3.jpg", description: "The magical office from The Cat Returns." },
                    { id: "mv1", name: "Mononoke Gate", image: "assets/mv1.jpg", description: "The iconic entrance to Mononoke Village." },
                    { id: "mv2", name: "San’s Hut", image: "assets/mv2.jpg", description: "The home of San from Princess Mononoke." },
                    { id: "mv3", name: "Forest Shrine", image: "assets/mv3.jpg", description: "The ancient forest shrine from Princess Mononoke." },
                    { id: "vow1", name: "Valley of Witches Gate", image: "assets/vow1.jpg", description: "Entrance to the magical Valley of Witches." },
                    { id: "vow2", name: "Ultear’s House", image: "assets/vow2.jpg", description: "The witch’s cottage from Earwig and the Witch." },
                    { id: "vow3", name: "Witch’s Garden", image: "assets/vow3.jpg", description: "A beautiful garden full of magical plants." },
                    { id: "vow4", name: "Flying Broom Station", image: "assets/vow4.jpg", description: "Take off on a magical broomstick ride." },
                    { id: "vow5", name: "Magic Library", image: "assets/vow5.jpg", description: "A library filled with ancient spell books." },
                    { id: "vow6", name: "Potion Lab", image: "assets/vow6.jpg", description: "Create your own magical potions." },
                    { id: "vow7", name: "Witch Tower", image: "assets/vow7.jpg", description: "Climb to the top of a tall witch’s tower." },
                    { id: "vow8", name: "Star View Terrace", image: "assets/vow8.jpg", description: "A terrace with a stunning view of the night sky." },
                    { id: "vow9", name: "Magical Shop", image: "assets/vow9.jpg", description: "Buy wands, potions, and witch supplies." },
                    { id: "vow10", name: "Fairy Fountain", image: "assets/vow10.jpg", description: "A sparkling fountain blessed by fairies." },
                    { id: "vow11", name: "Witch’s Cafe", image: "assets/vow11.jpg", description: "Enjoy magical snacks and drinks." }
                ];
            }
        },

        togglePlace(place) {
            const idx = this.selectedPlaces.findIndex(p => p.id === place.id);
            idx > -1 ? this.selectedPlaces.splice(idx, 1) : this.selectedPlaces.push(place);
        },

        isSelected(place) {
            return this.selectedPlaces.some(p => p.id === place.id);
        },

        validateForm() {
            this.generalError = '';
            if (!this.form.fullName || !this.form.dob || !this.form.gender) {
                this.generalError = 'Please fill all mandatory fields.';
                return false;
            }
            if (this.selectedPlaces.length === 0) {
                this.generalError = 'Select at least one place.';
                return false;
            }
            if (!this.form.totalVisitors || this.form.children < 0) {
                this.generalError = 'Enter valid visitor details.';
                return false;
            }
            if (!this.form.accommodation) {
                this.generalError = 'Select accommodation.';
                return false;
            }
            if (!this.form.cardHolder || !this.form.cardNumber || !this.form.expiry || !this.form.cvv) {
                this.generalError = 'Complete payment fields.';
                return false;
            }
            return true;
        },

        generateItinerary() {
            this.showSummary = false;
            if (this.validateForm()) {
                this.showSummary = true;
            }
        }
    }
}).mount('#app');