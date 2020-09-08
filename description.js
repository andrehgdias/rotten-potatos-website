window.addEventListener("load", function () {
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
        e.target.classList.toggle("star-selected");
    };

    like = (e) => {
        e.target.classList.toggle("thumbs-selected");
    };

    document
        .getElementsByClassName("mask")[0]
        .addEventListener("click", toggleSidebar);
    document
        .getElementsByClassName("sm-only")[0]
        .addEventListener("click", toggleSidebar);

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

    let stars = document.getElementsByClassName("star");
    for (var i = 0; i < stars.length; i++) {
        stars[i].addEventListener("click", favorite);
    }

    let thumbs = document.getElementsByClassName("thumbs");
    for (var i = 0; i < thumbs.length; i++) {
        thumbs[i].addEventListener("click", like);
    }

    let comments = document.getElementsByClassName("comment");
    for (var i = 0; i < comments.length; i++) {
        comments[i].addEventListener("click", () => {
            animModal("modalComments", "open");
            toggleModal("modalComments");
        });
    }
});
