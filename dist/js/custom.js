// Tooltip
var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl)
})

// All card expand and collapse
$(document).ready(function () {
    $("#collapse").click(function () {
        $(".classes").hide(500);
    });

    $("#expand").click(function () {
        $(".classes").show(500);
    });
});

// Single Card expand and collapse
$(document).ready(function () {
    $(".card-heading").click(function (event) {
        console.log($(event.target));
        console.log($(event.target).parent());
        $(event.target).closest(".card").children(".classes").toggle(500);
    });
});


// Back To Top
const toTop = document.querySelector(".to-top");
window.addEventListener("scroll", () => {
    if (window.pageYOffset > 150) {
        toTop.classList.add("active");
    } else {
        toTop.classList.remove("active");
    }
})


// Highlight New Class
$('#highlight-btn').click(function () {
    $('.highlight-class').toggleClass("highlited-active");
});