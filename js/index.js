
window.addEventListener("load", function () {

    const imgs = document.querySelectorAll(".img");

    setInterval(() => {
        imgs.forEach(img => {
            if (img.classList.contains("image-deco-left")) {
                img.classList.remove("image-deco-left");
                img.classList.add("image-deco-right");
            } else if (img.classList.contains("image-deco-right")) {
                img.classList.remove("image-deco-right");
                img.classList.add("image-deco-left");
            }
        });
    }, 1000);

})