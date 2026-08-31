
        const vocabularies = {
            berries: {
                title: "Weekly vocabulary: berries",
                items: [
                    { eng: "Strawberry", esp: "Fresa", def: "A small juicy red fruit that has tiny seeds on its surface." },
                    { eng: "Blueberry", esp: "Arándano", def: "A small sweet blue fruit that grows on a bush." },
                    { eng: "Raspberry", esp: "Frambuesa", def: "A small soft red fruit that grows on bushes." },
                    { eng: "Cherry", esp: "Cereza", def: "A small, round, soft red or black fruit with a stone." }
                ]
            },
            clothes: {
                title: "Weekly vocabulary: clothes",
                items: [
                    { eng: "Shirt", esp: "Camisa", def: "A piece of clothing worn on the upper part of the body." },
                    { eng: "Pants", esp: "Pantalones", def: "An outer garment covering the body from the waist to the ankles." },
                    { eng: "Jacket", esp: "Chaqueta", def: "A short coat that covers the upper body against cold weather." },
                    { eng: "Shoes", esp: "Zapatos", def: "Coverings for feet, usually made of leather or plastic." }
                ]
            },
            classroom: {
                title: "Weekly vocabulary: classroom materials",
                items: [
                    { eng: "Pencil Case", esp: "Cartuchera", def: "A small container used to store pencils, pens, and erasers." },
                    { eng: "Pencil", esp: "Lápiz", def: "An instrument for writing or drawing, consisting of a thin stick of graphite." },
                    { eng: "Notebook", esp: "Cuaderno", def: "A book with blank pages for recording notes or homework." },
                    { eng: "Backpack", esp: "Mochila", def: "A bag with straps that go over your shoulders to carry school supplies." }
                ]
            },
            fruits: {
                title: "Weekly vocabulary: fruits",
                items: [
                    { eng: "Apple", esp: "Manzana", def: "A round fruit with red, green, or yellow skin and crisp white flesh." },
                    { eng: "Banana", esp: "Guineo / Plátano", def: "A long curved fruit with a thick yellow skin and soft sweet flesh." },
                    { eng: "Orange", esp: "Naranja", def: "A round juicy citrus fruit with a bright reddish-yellow rind." },
                    { eng: "Watermelon", esp: "Sandía", def: "A large melon with a hard green rind and sweet juicy red pulp." }
                ]
            },
            colors: {
                title: "Weekly vocabulary: colors",
                items: [
                    { eng: "Red", esp: "Rojo", def: "The color of blood, rubies, or ripe strawberries." },
                    { eng: "Blue", esp: "Azul", def: "The color of the clear sky or the deep ocean." },
                    { eng: "Yellow", esp: "Amarillo", def: "The color of lemons, ripe bananas, or the bright sun." },
                    { eng: "Green", esp: "Verde", def: "The color of growing grass, leaves, and emeralds." }
                ]
            },
            animals: {
                title: "Weekly vocabulary: animals",
                items: [
                    { eng: "Dog", esp: "Perro", def: "A common domesticated animal known for being a loyal pet." },
                    { eng: "Cat", esp: "Gato", def: "A small domesticated carnivorous mammal with soft fur." },
                    { eng: "Lion", esp: "León", def: "A large powerful wild cat of Africa, known as the king of the jungle." },
                    { eng: "Elephant", esp: "Elefante", def: "A very large mammal with a long trunk and large tusks." }
                ]
            },
            family: {
                title: "Weekly vocabulary: family members",
                items: [
                    { eng: "Mother", esp: "Madre", def: "A female parent who cares for and raises children." },
                    { eng: "Father", esp: "Padre", def: "A male parent of a child or family leader." },
                    { eng: "Brother", esp: "Hermano", def: "A boy or man in relation to other children of his parents." },
                    { eng: "Sister", esp: "Hermana", def: "A girl or woman in relation to other children of her parents." }
                ]
            },
            weather: {
                title: "Weekly vocabulary: weather",
                items: [
                    { eng: "Sunny", esp: "Soleado", def: "Bright with sunlight and minimal or no clouds." },
                    { eng: "Rainy", esp: "Lluvioso", def: "Having a great deal of rainfall over a period." },
                    { eng: "Windy", esp: "Ventoso", def: "Characterized by strong winds or moving air." },
                    { eng: "Cloudy", esp: "Nublado", def: "Overcast with clouds, blocking direct sunlight." }
                ]
            },
            sports: {
                title: "Weekly vocabulary: sports",
                items: [
                    { eng: "Soccer", esp: "Fútbol", def: "A game played by two teams of eleven players with a round ball." },
                    { eng: "Basketball", esp: "Baloncesto", def: "A game played on a court where players throw a ball into a high hoop." },
                    { eng: "Tennis", esp: "Tenis", def: "A sport in which two or four players use rackets to hit a ball over a net." },
                    { eng: "Swimming", esp: "Natación", def: "The sport or activity of moving through water using your limbs." }
                ]
            },
            house: {
                title: "Weekly vocabulary: house rooms",
                items: [
                    { eng: "Kitchen", esp: "Cocina", def: "A room or area where food is prepared and cooked." },
                    { eng: "Bedroom", esp: "Dormitorio", def: "A room used primarily for sleeping and resting." },
                    { eng: "Bathroom", esp: "Baño", def: "A room containing a toilet and tub or shower for personal hygiene." },
                    { eng: "Living Room", esp: "Sala de Estar", def: "A room in a house for general and everyday social use." }
                ]
            }
        };

        const grid = document.getElementById('dynamic-grid');
        const pageTitle = document.getElementById('page-title');
        const backBtnContainer = document.getElementById('back-button-container');
        const searchInput = document.getElementById('search-input');

        function showCatalog() {
            pageTitle.innerText = "Weekly vocabulary: topics";
            backBtnContainer.style.display = "none";
            searchInput.value = "";
            grid.innerHTML = "";

            for (let key in vocabularies) {
                const capitalizedTopic = key.charAt(0).toUpperCase() + key.slice(1);
                grid.innerHTML += `
                    <div class="col">
                        <div class="vocabulary-card" onclick="showVocabulary('${key}')">
                            <div class="image-placeholder">
                                [Topic: ${capitalizedTopic}]
                            </div>
                            <div class="card-content-area">
                                <h3 class="card-title" style="text-transform: capitalize;">${key} Vocabulary</h3>
                                <div class="card-subtitle">Click here to enter</div>
                                <p class="card-definition-text">Learn more about this topic.</p>
                            </div>
                        </div>
                    </div>
                `;
            }
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        function showVocabulary(key) {
            const data = vocabularies[key];
            if (!data) return;

            pageTitle.innerText = data.title;
            backBtnContainer.style.display = "block";
            grid.innerHTML = "";

            data.items.forEach(item => {
                grid.innerHTML += `
                    <div class="col">
                        <div class="vocabulary-card" onclick="document.getElementById('footer-section').scrollIntoView({behavior: 'smooth'})">
                            <div class="image-placeholder">
                                [Image: ${item.eng.replace("The ", "")}]
                            </div>
                            <div class="card-content-area">
                                <h3 class="card-title">${item.eng}</h3>
                                <div class="card-subtitle">${item.esp}</div>
                                <div class="card-definition-label">Definition:</div>
                                <p class="card-definition-text">${item.def}</p>
                            </div>
                        </div>
                    </div>
                `;
            });
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        searchInput.addEventListener('input', function(e) {
            const query = e.target.value.toLowerCase().trim();
            if (query === "") {
                showCatalog();
                return;
            }

            for (let key in vocabularies) {
                if (key.toLowerCase().includes(query)) {
                    showVocabulary(key);
                    return;
                }
                const match = vocabularies[key].items.some(item => 
                    item.eng.toLowerCase().includes(query) || 
                    item.esp.toLowerCase().includes(query) ||
                    item.def.toLowerCase().includes(query)
                );
                if (match) {
                    showVocabulary(key);
                    return;
                }
            }
        });

        showCatalog();
   