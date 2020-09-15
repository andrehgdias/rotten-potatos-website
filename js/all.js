window.addEventListener("load", async function () {
	try {
		let response = await fetch(
			"https://rotten-potatos-api.herokuapp.com/filmes"
		);
		let data = await response.json();
		generateCards(data);
		init();
	} catch (error) {
		console.warn(error);
	}

	function generateCards(data) {
		let cardsContainer = document.getElementById("cards");
		let allCards = "";

		for (const filme of data) {
			let cardHtml = `
            <div class="card cursor-normal">
                <div class="overlay">
                    <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 24 24"
                        fill="none" stroke="white" stroke-width="2" stroke-linecap="round"
                        stroke-linejoin="round" class="feather feather-star star" style="margin: 20px;"
                        data-filmeid="${filme.id}">
                        <polygon
                            data-filmeid="${filme.id}"
                            points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2">
                        </polygon>
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 24 24"
                        fill="none" stroke="white" stroke-width="2" stroke-linecap="round"
                        stroke-linejoin="round" class="feather feather-thumbs-up thumbs"
                        style="margin: 20px;"
                        data-filmeid="${filme.id}">
                        <path
                            data-filmeid="${filme.id}"
                            d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3">
                        </path>
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 24 24"
                        fill="none" stroke="white" stroke-width="2" stroke-linecap="round"
                        stroke-linejoin="round" class="feather feather-message-square comment"
                        style="margin: 20px;"
                        data-filmeid="${filme.id}">
                        <path
                            data-filmeid="${filme.id}"
                            d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                    </svg>
                    <form action="description.html" method="GET" id="film${filme.id}">
                        <input type="text" name="filmeId" style="display:none;" value="${filme.id}" />
                        <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60"
                            viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                            stroke-linecap="round" stroke-linejoin="round"
                            class="feather feather-eye see-more" style="margin: 20px;"
                            data-filmeid="${filme.id}">
                            <path
                            data-filmeid="${filme.id}"
                            d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                            <circle
                            data-filmeid="${filme.id}"
                            cx="12" cy="12" r="3"></circle>
                        </svg>
                    </form>
                </div>
                <img src="${filme.url_capa}" style="width: 100%;" />
                <div class="card-content">
                    <h4><b>${filme.titulo}</b></h4>
                    <p>${filme.sinopse}</p>
                </div>
            </div>
            `;

			allCards += cardHtml;
		}
		cardsContainer.innerHTML = allCards;
	}
});
