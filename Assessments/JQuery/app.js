$(document).ready(function() {
    // Captions ke liye array 
    const captions = [
        "Caption 1: Gun Park",
        "Caption 2: UI Daniel",
        "Caption 3: Seongji Yuk",
        "Caption 4: James Lee",
        "Caption 5: Jichang Hawk"
    ];

    let currentIndex = 0;
    // jQuery collection ko array ki tarah treat karenge
    const slides = $(".mySlides"); 
    const totalSlides = slides.length;

    // Main logic function [cite: 7]
    function showSlide(index) {
        // Conditional statements boundary handle karne ke liye 
        if (index >= totalSlides) {
            currentIndex = 0; // Wapas pehli image par
        } else if (index < 0) {
            currentIndex = totalSlides - 1; // Last image par
        } else {
            currentIndex = index;
        }

        // Sabhi images hide karke sirf current wali dikhana
        slides.hide();
        $(slides[currentIndex]).fadeIn(500);

        // Counter aur Caption update karna [cite: 5, 6]
        $("#counter").text((currentIndex + 1) + " / " + totalSlides);
        $("#caption-text").text(captions[currentIndex]);

        // Console par clean output [cite: 7]
        console.log("Viewing Slide: " + (currentIndex + 1));
    }

    // Next Button click event
    $("#nextBtn").click(function() {
        showSlide(currentIndex + 1);
    });

    // Previous Button click event
    $("#prevBtn").click(function() {
        showSlide(currentIndex - 1);
    });

    // Pehli slide load karna
    showSlide(0);
});