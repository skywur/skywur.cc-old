
(function($) {

    $(window).on('load', function() {

        const wrapper = document.getElementById("wrapper");
        wrapper.style.opacity = "0";
        wrapper.addEventListener('transitionend', () => wrapper.remove());

    });

    // and/or

    $(document).ready(function() {
    });

})(jQuery);