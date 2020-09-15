class Toast {
    static show(title, text, type, showConfirmButton){
        Swal.fire({
            toast: true,
            position: "top",
            showConfirmButton,
            title,
            text,
            type,
        });
    }
}