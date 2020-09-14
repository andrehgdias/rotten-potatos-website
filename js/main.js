window.addEventListener("load", async function () {
	let innerHtmlButtons = window.localStorage.getItem("user")
		? "<li><button class='custom-button' id='sair'>Sair</button>"
		: "<li><button class='custom-button' id='entrar'>Entrar</button></li><li><button class='custom-button' id='cadastrar'>Cadastrar</button></li>";
	document.getElementById("buttons").innerHTML = innerHtmlButtons;

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

	favorite = (e) => {
		console.log("Filme id: ", e.target.dataset.filmeid);
		e.target.classList.toggle("star-selected");
	};

	like = (e) => {
		console.log("Filme id: ", e.target.dataset.filmeid);
		e.target.classList.toggle("thumbs-selected");
	};

	openDescription = (e) => {
		document.getElementById("film"+e.target.dataset.filmeid).submit();
	}

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

	// Checking id api is online
	try {
		let response = await fetch(
			"https://rotten-potatos-api.herokuapp.com/ping"
		);
		let data = await response.text();
		console.info(data);
		init();
	} catch (error) {
		console.warn(error);
		console.warn("HTTP-Error: " + response.status);
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
				Swal.fire({
					toast: true,
					position: "top",
					title: "Você não está logado!",
					text: "Faça login para poder favoritar um filme!",
					type: "info",
				});
			});
			thumbs[i].addEventListener("click", () => {
				Swal.fire({
					toast: true,
					position: "top",
					title: "Você não está logado!",
					text: "Faça login para poder dar like em um filme!",
					type: "info",
				});
			});
		}
	}

	let comments = document.getElementsByClassName("comment");
	for (var i = 0; i < comments.length; i++) {
		comments[i].addEventListener("click", () => {
			if (window.localStorage.getItem("user")) {
				animModal("modalComments", "open");
				toggleModal("modalComments");
			} else {
				Swal.fire({
					toast: true,
					position: "top",
					title: "Você não está logado!",
					text: "Faça login para poder adicionar um comentário!",
					type: "info",
				});
			}
		});
	}
}

function sleep(ms) {
	console.info("Sleep: ", ms);
	return new Promise((resolve) => setTimeout(resolve, ms));
}
