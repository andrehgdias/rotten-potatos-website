window.addEventListener("load", async function () {
	if (!window.localStorage.getItem("user")) {
		document.getElementById("addComment").disabled = true;
		document.getElementById("addComment").classList.add("disabled");
	}

	let response;
	let responseComments;
	try {
		let url_string = window.location.href; //window.location.href
		let url = new URL(url_string);
		let filmeId = url.searchParams.get("filmeId");

		window.sessionStorage.setItem("idForComment", filmeId);

		response = await fetch(
			"https://rotten-potatos-api.herokuapp.com/filme/" + filmeId
		);
		let data = await response.json();
		fillValues(data);

		responseComments = await fetch(
			"https://rotten-potatos-api.herokuapp.com/comentarios/" + filmeId
		);
		let comments = await responseComments.json();
		fillComments(comments);

		init();
	} catch (error) {
		console.warn(error);
		console.info(response);
		console.info(responseComments);
	}

	function fillValues(film) {
		let descriptionContainer = document.getElementById("description");

		let content = `
            <div class="container">
                <div class="film-panel cursor-normal">
                    <div class="banner-film">
                        <img src="${film.url_capa}"
                            style="width: 100%;" />
                    </div>
                    <div class="panel-content">
                        <h4><b>${film.titulo}</b></h4>
                        <p>${film.sinopse}</p>
						<div class="panel-actions">
						<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"
								fill="none" stroke="white" stroke-width="2" stroke-linecap="round"
								stroke-linejoin="round" class="stroke-black feather feather-star star"
								style="margin: 10px 10px 10px 0;"
								data-filmeid="${film.id}">
								<polygon
								data-filmeid="${film.id}"
									points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2">
								</polygon>
							</svg>
							<div class="button-likes">
								<span>${film.count_likes}</span>
								<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"
									fill="none" stroke="white" stroke-width="2" stroke-linecap="round"
									stroke-linejoin="round" class="stroke-black feather feather-thumbs-up thumbs"
									style="margin: 10px;"
									data-filmeid="${film.id}">
									<path
									data-filmeid="${film.id}"
										d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3">
									</path>
								</svg>
							</div>
                        </div>
                    </div>
                </div>
            </div>
            `;

		descriptionContainer.innerHTML = content;
	}

	function fillComments(comments) {
		console.log(comments);
		let commentsContainer = document.getElementById("comments");
		let allComments = "";

		for (const comment of comments) {
		let content = `
			<div class="comment">
				<h4>Usuario ${comment.id_usuario} <span>${comment.data}</span></h4>
				<p> ~ ${comment.texto}</p>
			</div>
			`;

			allComments += content;
		}
		commentsContainer.innerHTML = allComments;
	}
});
