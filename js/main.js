window.addEventListener("load", async function () {
	let innerHtmlButtons = window.localStorage.getItem("user")
		? "<li><button class='custom-button' id='sair'>Sair</button>"
		: "<li><button class='custom-button' id='entrar'>Entrar</button></li><li><button class='custom-button' id='cadastrar'>Cadastrar</button></li>";
	document.getElementById("buttons").innerHTML = innerHtmlButtons;

	var mySwiper = new Swiper(".swiper-container", {
		pagination: {
			el: ".swiper-pagination",
			clickable: true,
		},
		navigation: {
			nextEl: ".swiper-button-next",
			prevEl: ".swiper-button-prev",
		},
		slidesPerView: 1,
		breakpoints: {
			768: {
				slidesPerView: 2,
			},
			1024: {
				slidesPerView: 3,
			},
		},
	});

	document
		.getElementsByClassName("mask")[0]
		.addEventListener("click", toggleSidebar);
	document
		.getElementsByClassName("sm-only")[0]
		.addEventListener("click", toggleSidebar);

	let response;

	// Checking if api is online
	try {
		response = await fetch("https://rotten-potatos-api.herokuapp.com/ping");
		let data = await response.text();
		console.info(data);
		init();
	} catch (error) {
		console.warn(error);
		console.info(response);
	}
});

function init() {
	let stars = document.getElementsByClassName("star");
	let thumbs = document.getElementsByClassName("thumbs");
	let details = document.getElementsByClassName("see-more");

	for (let i = 0; i < details.length; i++) {
		details[i].addEventListener("click", openDescription);
	}

	if (window.localStorage.getItem("user")) {
		for (var i = 0; i < thumbs.length; i++) {
			thumbs[i].addEventListener("click", like);
			stars[i].addEventListener("click", favorite);
		}
	} else {
		for (var i = 0; i < thumbs.length; i++) {
			stars[i].addEventListener("click", () => {
				Toast.show(
					"Você não está logado!",
					"Faça login para poder favoritar um filme!",
					"info",
					false
				);
			});
			thumbs[i].addEventListener("click", () => {
				Toast.show(
					"Você não está logado!",
					"Faça login para poder dar like em um filme!",
					"info",
					false
				);
			});
		}
	}

	let comments = document.getElementsByClassName("comment");
	for (var i = 0; i < comments.length; i++) {
		comments[i].addEventListener("click", comment);
	}

	let buttonAddComment = document.getElementById("addComment");
	buttonAddComment.addEventListener("click", addComment);
}

toggleSidebar = () => {
	document.getElementsByClassName("mask")[0].classList.toggle("hide");
	document.getElementById("navbar").classList.toggle("sidebar");
};

animModal = (modal, animType) => {
	let modalElement = document.getElementById(modal);
	if (animType === "open") modalElement.classList.add("showModalAnim");
	else modalElement.classList.remove("showModalAnim");
};

toggleModal = (modal) => {
	document.getElementById(modal).classList.toggle("hide");
};

addComment = async (e) => {
	e.preventDefault();
	let id_filme = parseInt(window.sessionStorage.getItem("idForComment"));
	console.log("Filme id: ", id_filme);
	let json = {
		id_filme,
		id_usuario: JSON.parse(window.localStorage.getItem("user")).id,
		texto: document.getElementById("userComment").value,
	};
	const options = {
		method: "POST",
		body: JSON.stringify(json),
		headers: {
			"Content-Type": "application/json",
		},
	};
	console.log(options);
	let response;
	try {
		response = await fetch(
			"https://rotten-potatos-api.herokuapp.com/comentar ",
			options
		);
		let text = await response.text();
		if (text == "Salvo!") {
			e.target.classList.toggle("star-selected");
			Toast.show("Sucesso", "Comentário adicionado!", "success", false);
		} else {
			Toast.show(
				"Erro ao comentar!",
				"Houve algum problema ao comentar, tente novamente!",
				"error",
				true
			);
		}
	} catch (error) {
		console.warn(error);
		console.info(response);
	}
};

comment = async (e) => {
	if (window.localStorage.getItem("user")) {
		console.log(e.target.dataset);
		window.sessionStorage.setItem(
			"idForComment",
			parseInt(e.target.dataset.filmeid, 10)
		);
		animModal("modalComments", "open");
		toggleModal("modalComments");
	} else {
		Toast.show(
			"Você não está logado!",
			"Faça login para poder adicionar um comentário!",
			"info",
			false
		);
	}
};

favorite = async (e) => {
	let id_filme = parseInt(e.target.dataset.filmeid, 10);
	console.log("Filme id: ", id_filme);
	let json = {
		id_filme,
		id_usuario: JSON.parse(window.localStorage.getItem("user")).id,
	};
	const options = {
		method: "POST",
		body: JSON.stringify(json),
		headers: {
			"Content-Type": "application/json",
		},
	};
	let response;
	try {
		response = await fetch(
			"https://rotten-potatos-api.herokuapp.com/favoritar",
			options
		);
		let text = await response.text();
		if (text == "Favoritado!") {
			e.target.classList.toggle("star-selected");
			Toast.show(
				"Sucesso",
				"Filme adicionado aos seus favoritos!",
				"success",
				false
			);
		} else {
			Toast.show(
				"Erro ao favoritar!",
				"Houve algum problema ao favoritar, tente novamente!",
				"error",
				true
			);
		}
	} catch (error) {
		console.warn(error);
		console.info(response);
	}
};

like = async (e) => {
	let id_filme = parseInt(e.target.dataset.filmeid, 10);
	console.log("Filme id: ", id_filme);
	let json = {
		id_filme,
		id_usuario: JSON.parse(window.localStorage.getItem("user")).id,
	};

	const options = {
		method: "POST",
		body: JSON.stringify(json),
		headers: {
			"Content-Type": "application/json",
		},
	};
	let response;
	try {
		response = await fetch(
			"https://rotten-potatos-api.herokuapp.com/like",
			options
		);
		let text = await response.text();
		if (text == "Liked!") {
			e.target.classList.toggle("thumbs-selected");
			Toast.show(
				"Sucesso",
				"Você deu like em um filme!",
				"success",
				false
			);
			history.go(0);
		} else {
			Toast.show(
				"Erro dar like!",
				"Houve algum problema ao dar Like, tente novamente!",
				"error",
				true
			);
		}
	} catch (error) {
		console.warn(error);
		console.info(response);
	}
};

openDescription = (e) => {
	document.getElementById("film" + e.target.dataset.filmeid).submit();
};

sleep = (ms) => {
	console.info("Sleep: ", ms);
	return new Promise((resolve) => setTimeout(resolve, ms));
};
