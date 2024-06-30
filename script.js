$(document).ready(function() {
    // Star rating functionality
    let rating = 0;

    window.highlightStars = function(num) {
        for (let i = 1; i <= num; i++) {
            $(`#ratings .star:nth-child(${i})`).addClass('highlighted');
        }
    };

    window.resetStars = function() {
        $('#ratings .star').removeClass('highlighted');
    };

    window.rate = function(num) {
        rating = num;
        resetStars();
        highlightStars(num);

        // Add glowing effect and size increase to all highlighted stars
        for (let i = 1; i <= num; i++) {
            $(`#ratings .star:nth-child(${i})`).addClass('clicked');
        }

        setTimeout(function() {
            if (num <= 3) {
                $('#pageTitle').text("Tell us more");
                $('#ratings').hide();
                $('#testing').hide();
                $('#feedback').show().addClass('active');
            } else {
                window.open('https://g.page/r/CR4Koahp2uHYEBM/review');
                //Paste review link above
                window.location.href = 'https://yewdigitallock.com.sg/digital-locks/digital-door-locks/';
                //Paste navigator link above such as website
                //Change for specific companies
            }
        }, 500); // 0.5 second delay

        // Remove the glowing effect and size increase after some time
        setTimeout(function() {
            $(`#ratings .star`).removeClass('clicked');
        }, 1500); // 1.5 seconds to remove the effect

        // Set the rating value in the hidden input
        $('#ratingValue').val(rating);
    };

    $('#feedbackForm').submit(function(event) {
        event.preventDefault(); // Prevent the default form submission

        $.ajax({
            type: "POST",
            url: "https://api.web3forms.com/submit",
            data: $(this).serialize(),
            dataType: "json",
            success: function(response) {
                if (response.success) {
                    console.log("Feedback sent successfully!");
                } else {
                    console.error("There was an error sending your feedback: " + response.message);
                }
            },
            error: function(xhr, status, error) {
                console.error("AJAX error: " + status + " - " + error);
            },
            complete: function() {
                $("#feedbackForm")[0].reset();
                $('#feedback').hide();
                $('#ratings').show();
                setTimeout(function() {
                    $('.contact-us-message').show(); // Show the contact us message after 2 seconds
                }, 10);
            }
        });
    });
});















