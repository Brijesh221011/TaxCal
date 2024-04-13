function calculateTax() {
    // Fetch input values
    const income = parseFloat(document.getElementById('income').value);
    const extraIncome = parseFloat(document.getElementById('extraIncome').value);
    const deductions = parseFloat(document.getElementById('deductions').value);
    const age = document.getElementById('age').value;

    // Check for errors
    const errors = [];
    if (isNaN(income)) errors.push('incomeError');
    if (isNaN(extraIncome)) errors.push('extraIncomeError');
    if (isNaN(deductions)) errors.push('deductionsError');
    if (age === '') errors.push('ageError');

    // Display error icons and stop calculation if errors exist
    errors.forEach(errorId => {
        document.getElementById(errorId).style.display = 'inline-block';
    });
    if (errors.length > 0) return;

    // Calculate tax
    let tax = 0;
    const taxableIncome = income + extraIncome - deductions;
    if (taxableIncome > 800000) {
        if (age === '<40') tax = 0.3 * (taxableIncome - 800000);
        else if (age === '≥40 & <60') tax = 0.4 * (taxableIncome - 800000);
        else if (age === '≥60') tax = 0.1 * (taxableIncome - 800000);
    }

    // Display tax result in modal
    document.getElementById('taxResult').textContent = `Tax Payable: ${tax.toFixed(2)}`;
    document.getElementById('modal').style.display = 'block';
}

// Hide error icons by default
document.querySelectorAll('.error-icon').forEach(icon => {
    icon.style.display = 'none';
});

// Reset error icons on input change
document.querySelectorAll('input, select').forEach(input => {
    input.addEventListener('input', () => {
        document.getElementById(input.id + 'Error').style.display = 'none';
    });
});
document.getElementById('closeModal').addEventListener('click', () => {
    document.getElementById('modal').style.display = 'none';
});

