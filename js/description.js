window.addEventListener("load", async function () {
	if (!window.localStorage.getItem("user")) {
		document.getElementById("addComment").disabled = true;
		document.getElementById("addComment").classList.add("disabled");
    }
});
