window.addEventListener("load", async function () {
	if (window.localStorage.getItem("user")) {
		document.getElementById("sair").addEventListener("click", async () => {
			console.log("Log out...");
			window.localStorage.removeItem("user");
			Toast.show(
				"Sucesso!",
				"LOGOUT realizado com sucesso, você será redirecionado automaticamente!",
				"success",
				false
			);
			await sleep(1500);
			history.go(0);
		});
		let buttonModalComments = document.getElementById(
			"closeModalCommentsButton"
		);
		if (buttonModalComments)
			document
				.getElementById("closeModalCommentsButton")
				.addEventListener("click", () => {
					animModal("modalComments", "close");
					toggleModal("modalComments");
				});
	} else {
		document.getElementById("entrar").addEventListener("click", () => {
			animModal("modalLogin", "open");
			toggleModal("modalLogin");
		});

		document
			.getElementById("closeModalLoginButton")
			.addEventListener("click", () => {
				animModal("modalLogin", "close");
				toggleModal("modalLogin");
			});

		document.getElementById("cadastrar").addEventListener("click", () => {
			animModal("modalSignup", "open");
			toggleModal("modalSignup");
		});

		document
			.getElementById("closeModalSignupButton")
			.addEventListener("click", () => {
				animModal("modalSignup", "close");
				toggleModal("modalSignup");
			});
	}

	document
		.getElementById("formLogin")
		.addEventListener("submit", async (event) => {
			event.preventDefault();

			let object = {};
			for (let index = 0; index < 2; index++) {
				object[event.target[index].id] = event.target[index].value;
			}
			let json = JSON.stringify(object);
			console.log(json);

			const options = {
				method: "POST",
				body: json,
				headers: {
					"Content-Type": "application/json",
				},
			};

			try {
				console.clear();
				let response = await fetch(
					"https://rotten-potatos-api.herokuapp.com/login",
					options
				);

				let json = await response.json();
				window.localStorage.setItem("user", JSON.stringify(json));
				Toast.show(
					"Sucesso!",
					"LOGIN realizado com sucesso, você será redirecionado automaticamente!",
					"success",
					false
				);
				await sleep(1500);
				animModal("modalLogin", "close");
				toggleModal("modalLogin");
				history.go(0);
			} catch (error) {
				Toast.show(
					"Erro durante o login!",
					"Houve algum problema com seu login, verifique suas informações e tente novamente!",
					"error",
					false
				);
				console.warn(error);
			}
		});

	document
		.getElementById("formSignup")
		.addEventListener("submit", async (event) => {
			event.preventDefault();

			let object = {};
			for (let index = 0; index < 4; index++) {
				object[event.target[index].id] = event.target[index].value;
			}
			let json = JSON.stringify(object);
			console.log(json);

			const options = {
				method: "POST",
				body: json,
				headers: {
					"Content-Type": "application/json",
				},
			};

			try {
				console.clear();
				let response = await fetch(
					"https://rotten-potatos-api.herokuapp.com/cadastro",
					options
				);

				let text = await response.text();

				if (text == "Salvo") {
					Toast.show(
						"Sucesso!",
						"Cadastro realizado com sucesso, faça seu login!",
						"success",
						false
					);
					animModal("modalSignup", "close");
					toggleModal("modalSignup");
				} else {
					Toast.show(
						"Erro durante o cadastro!",
						"Houve algum problema com seu cadastro, verifique suas informações e tente novamente!",
						"error",
						false
					);
				}
			} catch (error) {
				console.warn(error);
			}
		});
});
