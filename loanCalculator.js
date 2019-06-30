const loanCalculatorView = {
    elements: {
        loanForm: document.getElementById('loan-form'),
        amount: document.getElementById('amount'),
        interest: document.getElementById('interest'),
        years : document.getElementById('years'),
        monthlyPayment : document.getElementById('monthly-payment'),
        totalPayment : document.getElementById('total-payment'),
        totalInterest : document.getElementById('total-interest'),
        errorElement: document.createElement('div'),
        card: document.querySelector('.card'),
        heading: document.querySelector('.heading'),
    },
    formFunctions: {
        calculateResults: function calculateResults(e) {
            let principal = parseFloat(loanCalculatorView.elements.amount.value);
            let interestInDecimals = parseFloat(loanCalculatorView.elements.interest.value) / 100 / 12;
            let numOfMonths = parseFloat(loanCalculatorView.elements.years.value) * 12;

            let x = Math.pow(1 + interestInDecimals, numOfMonths);
            let monthlyPayment = ((principal * x * interestInDecimals) / (x-1)).toFixed(2);
            let totalPayment =  (monthlyPayment * numOfMonths).toFixed(2);
            let totalInterest = ((monthlyPayment * numOfMonths) - principal).toFixed(2);
            
            if (isFinite(monthlyPayment)) {
                loanCalculatorView.elements.monthlyPayment.value = monthlyPayment;
                loanCalculatorView.elements.totalPayment.value = totalPayment;
                loanCalculatorView.elements.totalInterest.value = totalInterest;
            } else {
                loanCalculatorView.formFunctions.showError('Please check your numbers');
            }
            e.preventDefault();
        },
        showError: function showError(errorMessage) {
            loanCalculatorView.elements.errorElement.className = 'alert alert-danger';
            loanCalculatorView.elements.errorElement.appendChild(document.createTextNode(errorMessage));

            loanCalculatorView.elements.card.insertBefore(loanCalculatorView.elements.errorElement, loanCalculatorView.elements.heading);

            loanCalculatorView.formFunctions.clearError();
        },
        clearError: function clearError() {
            setTimeout(loanCalculatorView.formFunctions.clear, 3000);
        },
        clear: function clear() {
            document.querySelector('.alert').remove();
        },
    },
    eventListeners: {
        onCalculateClick:  function onCalculateClick() {
            loanCalculatorView.elements.loanForm.addEventListener('submit', loanCalculatorView.formFunctions.calculateResults);
        },
    },
    init: function initEventListeners() {
        loanCalculatorView.eventListeners.onCalculateClick();
    },
}

loanCalculatorView.init();


