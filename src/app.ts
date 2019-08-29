
const billInput = document.querySelector('#billInput') as HTMLInputElement;
const billAmount = document.querySelector('#billAmount') as HTMLSpanElement;
const tipPercentage = document.querySelector('#tipPercentage') as HTMLSpanElement;
const tipPercentageMessage = document.querySelector('#tipPercentageMessage') as HTMLSpanElement;
const tipAmount = document.querySelector('#tipAmount') as HTMLSpanElement;
const totalPayment = document.querySelector('#totalPayment') as HTMLSpanElement;
const tipButtons = document.querySelectorAll('#tipButtons button');

export function runApp() {
    billInput.addEventListener('keyup', handleUpdate);

    tipButtons.forEach(function (tipButton: HTMLButtonElement) {
        tipButton.addEventListener('click', handleButtonClick);
    });
}

function handleUpdate() {
    const bill = parseFloat(billInput.value);

    if (bill >= 0) {
        billInput.classList.remove('is-invalid');
        calculateTip();
    } else {
        billInput.classList.add('is-invalid');
        clearResults();
    }
}

function handleButtonClick() {
    const selectedTipButton = this as HTMLButtonElement;
    tipButtons.forEach(function (tipButton: HTMLButtonElement) {
        tipButton.disabled = false;
    });
    selectedTipButton.disabled = true;

    const selectedTip = selectedTipButton.attributes.getNamedItem('data-tip-percentage').value;
    tipPercentageMessage.innerText = selectedTip;

    calculateTip();
}

function calculateTip() {
    const bill = parseFloat(billInput.value);
    const tip = parseInt(tipPercentageMessage.innerText);

    if (bill && tip) {
        const result = bill * (1 + tip / 100);
        const tipDollarAmount = result - bill;

        billAmount.innerText = `$${bill.toFixed(2)}`;
        tipPercentage.innerText = `${tip}%`;
        tipAmount.innerText = `$${tipDollarAmount.toFixed(2)}`;
        totalPayment.innerText = `$${result.toFixed(2)}`;
    } else {
        clearResults();
    }
}

function clearResults() {
    billAmount.innerText = '';
    tipPercentage.innerText = '';
    tipAmount.innerText = '';
    totalPayment.innerText = '';
}
