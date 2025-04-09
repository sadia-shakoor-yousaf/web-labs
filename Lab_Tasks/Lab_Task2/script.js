document.addEventListener('DOMContentLoaded', function() {
    var form = document.getElementById('paymentForm');
    var successMessage = document.getElementById('successMessage');
    
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        var isValid = true;
        
        clearErrors();
        
        var fullName = document.getElementById('fullName');
        if (!/^[A-Za-z ]+$/.test(fullName.value.trim())) {
            showError(fullName, "Only letters and spaces allowed");
            isValid = false;
        }
        
        var email = document.getElementById('email');
        if (!email.value.includes('@') || !email.value.includes('.')) {
            showError(email, "Please enter a valid email");
            isValid = false;
        }
        
        var phone = document.getElementById('phone');
        if (!/^\d{10,15}$/.test(phone.value)) {
            showError(phone, "Must be 10-15 digits");
            isValid = false;
        }
        
        var address = document.getElementById('address');
        if (address.value.trim().length < 10) {
            showError(address, "Address too short (min 10 chars)");
            isValid = false;
        }
        
        var cardNumber = document.getElementById('cardNumber');
        if (!/^\d{16}$/.test(cardNumber.value)) {
            showError(cardNumber, "Must be 16 digits");
            isValid = false;
        }
        
        var expiryDate = document.getElementById('expiryDate');
        if (expiryDate.value) {
            var today = new Date();
            var selectedDate = new Date(expiryDate.value);
            if (selectedDate < today) {
                showError(expiryDate, "Card must not be expired");
                isValid = false;
            }
        } else {
            showError(expiryDate, "Please select expiry date");
            isValid = false;
        }
        
        var cvv = document.getElementById('cvv');
        if (!/^\d{3}$/.test(cvv.value)) {
            showError(cvv, "Must be 3 digits");
            isValid = false;
        }
        
        if (isValid) {
            successMessage.style.display = 'block';
            
            form.reset();
            
            setTimeout(function() {
                successMessage.style.display = 'none';
            }, 5000);
        }
    });
    
    function showError(input, message) {
        input.classList.add('error');
        
        var errorElement = input.nextElementSibling;
        
        if (errorElement && errorElement.classList.contains('error-message')) {
            errorElement.textContent = message;
            errorElement.style.display = 'block';
        }
    }
    
    function clearErrors() {
        var errorInputs = document.querySelectorAll('.error');
        for (var i = 0; i < errorInputs.length; i++) {
            errorInputs[i].classList.remove('error');
        }
        
        var errorMessages = document.querySelectorAll('.error-message');
        for (var j = 0; j < errorMessages.length; j++) {
            errorMessages[j].textContent = '';
            errorMessages[j].style.display = 'none';
        }
        
        successMessage.style.display = 'none';
    }
    
    var inputs = document.querySelectorAll('input, textarea');
    for (var k = 0; k < inputs.length; k++) {
        inputs[k].addEventListener('input', function() {
            if (this.classList.contains('error')) {
                var errorElement = this.nextElementSibling;
                if (errorElement && errorElement.classList.contains('error-message')) {
                    errorElement.textContent = '';
                    this.classList.remove('error');
                }
            }
        });
    }
});