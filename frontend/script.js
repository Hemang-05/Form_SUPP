// require('dotenv').config();

document.addEventListener('DOMContentLoaded', () => {
    const questions = document.querySelectorAll('.question');
    let currentIndex = 0;

    // Function to show the next question using GSAP animation
    function showNextQuestion() {
        if (currentIndex < questions.length - 1) {
            const currentQuestion = questions[currentIndex];
            const nextQuestion = questions[currentIndex + 1];
            const hiddenInput = currentQuestion.querySelector('input[type="hidden"]');
            const textArea = currentQuestion.querySelector('textarea'); // For subjective questions

            // Ensure that objective questions have a selected option and subjective questions are filled
            if (currentQuestion.classList.contains('objective') && (!hiddenInput || !hiddenInput.value)) {
                alert('Please select an option before proceeding.');
                return;
            }

            if (currentQuestion.classList.contains('subjective') && (!textArea || !textArea.value.trim())) {
                alert('Please provide an answer before proceeding.');
                return;
            }

            // Animate current question out to the left
            gsap.to(currentQuestion, {
                x: '-100%',
                duration: 0.8,
                ease: 'power2.inOut',
                onComplete: () => currentQuestion.classList.remove('active'),
            });

            // Animate next question in from the right
            nextQuestion.classList.add('active');
            gsap.fromTo(
                nextQuestion,
                { x: '100%' },
                { x: '0%', duration: 0.8, ease: 'power2.inOut' }
            );

            currentIndex++;
        }
    }

    // Attach click event to all option buttons for MCQs
    document.querySelectorAll('.option-buttons').forEach((buttonGroup) => {
        const buttons = buttonGroup.querySelectorAll('.option-btn');
        const hiddenInput = buttonGroup.nextElementSibling; // Hidden input element for storing the selected value
        const nextButton = buttonGroup.closest('.question').querySelector('.next-btn'); // The Next button in the same question container

        buttons.forEach((button) => {
            button.addEventListener('click', () => {
                // Clear active state for all buttons in the group
                buttons.forEach((btn) => btn.classList.remove('active'));

                // Add active state to the clicked button
                button.classList.add('active');

                // Update the hidden input's value
                hiddenInput.value = button.getAttribute('data-value');

                // Enable the Next button if the hidden input has a value (i.e., an option is selected)
                if (hiddenInput.value) {
                    nextButton.disabled = false;
                    nextButton.classList.remove('disabled'); // Optional: remove CSS "disabled" styles
                }
            });
        });
    });

    // Attach click event to all "Next" buttons
    document.querySelectorAll('.next-btn').forEach((button) => {
        button.addEventListener('click', showNextQuestion);
    });

    // Attach form submit logic to the submit button
    const submitButton = document.getElementById('submit-btn'); // Replace 'submit-btn' with the actual ID of your button
    if (submitButton) {
        submitButton.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent the form from reloading the page
            submitForm(); // Call the submitForm function
        });
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const personalDetailsSection = document.querySelector('.personal-details');
    const inputs = personalDetailsSection.querySelectorAll('input[required]');
    const nextButton = personalDetailsSection.querySelector('.next-btn');

    // Function to check if all required fields are filled
    function checkFields() {
        const allFilled = Array.from(inputs).every(input => input.value.trim() !== '');
        nextButton.disabled = !allFilled; // Enable the button only if all fields are filled
    }

    // Attach event listeners to each input field
    inputs.forEach(input => {
        input.addEventListener('input', checkFields); // Listen for changes in each field
    });
});

function copyToClipboard() {
    const referralLink = document.getElementById('referral-link').textContent;
    navigator.clipboard.writeText(referralLink).then(() => {
        alert('Referral link copied to clipboard!');
    });
}

// Function to submit the form data
async function submitForm() {
    // Collect form data
    const formData = {
        name: document.getElementById('name').value,
        phone: document.getElementById('phone').value,
        age: parseInt(document.getElementById('age').value),
        q1: document.getElementById('q1').value,
        q2: document.getElementById('q2').value,
        q3: document.getElementById('q3').value,
        q4: document.getElementById('q4').value,
        q5: document.getElementById('q5').value,
        q6: document.getElementById('q6').value,
        q7: document.getElementById('q7').value,
        q8: document.getElementById('q8').value,
        q9: document.getElementById('q9').value,
        q10: document.getElementById('q10').value,
        q11: document.getElementById('q11').value,
        q12: document.getElementById('q12').value,
        brands: [
            document.getElementById('brand1').value,
            document.getElementById('brand2').value,
            document.getElementById('brand3').value,
        ],
        food_preference: document.querySelector('input[name="foodPreference"]:checked').value,
        barbecue_pref: document.querySelector('input[name="barbecuePreference"]:checked').value,
        spending_cats: Array.from(
            document.querySelectorAll('input[name="spendingCategories"]:checked')
        ).map((el) => el.value),
        referred_by: getReferralFromURL(), // Extract referral info from the URL
    };

    try {
        const BACKEND_URL = 'https://formsupp-be.onrender.com/api/form';

        const response = await fetch(BACKEND_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        const result = await response.json();
        if (response.ok) {
            // Update referral link display
            const referralLinkSpan = document.getElementById('referral-link');
            referralLinkSpan.textContent = result.referralLink;

            const referralLinkContainer = document.getElementById('referral-link-container');
            referralLinkContainer.style.display = 'block';
        } else {
            console.error('Error:', result.error);
            alert('Failed to submit the form. Please try again.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An unexpected error occurred.');
    } finally {
        submitButton.disabled = false; // Re-enable button regardless of outcome
    }
}

// Function to get referral information from the URL
function getReferralFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get('ref') || null; // If 'ref' is missing, return null
}
