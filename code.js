// --- Tab Navigation Logic ---
const tabButtons = document.querySelectorAll('.tab-button');
const tabContents = document.querySelectorAll('.tab-content');

tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        tabButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        tabContents.forEach(content => content.classList.remove('active'));
        document.getElementById(button.dataset.tab).classList.add('active');
    });
});

// --- Standard Calculator Logic ---
const display = document.getElementById('display');
const buttons = document.querySelector('.buttons');

buttons.addEventListener('click', e => {
    if (!e.target.matches('button')) return;

    const button = e.target;
    const action = button.textContent;
    const displayedNum = display.value;
    
    if (button.classList.contains('btn') && !button.classList.contains('operator') && !button.classList.contains('equal') && !button.classList.contains('all-clear') && !button.classList.contains('delete')) {
        if (displayedNum === '0' || display.value === 'Error') {
            display.value = action;
        } else {
            display.value += action;
        }
    }
    
    if (button.classList.contains('operator')) {
        display.value += button.dataset.value;
    }

    if (action === 'AC') {
        display.value = '';
    }

    if (action === 'DEL') {
        display.value = displayedNum.slice(0, -1);
    }

    if (action === '=') {
        try {
            // Replace display operators with calculation-friendly ones
            let expression = display.value.replace(/×/g, '*').replace(/÷/g, '/');
            display.value = eval(expression);
        } catch {
            display.value = 'Error';
        }
    }
});

// --- Percentage Calculator Logic ---
const calculatePercentBtn = document.getElementById('calculate-percent-btn');
calculatePercentBtn.addEventListener('click', () => {
    const percent = parseFloat(document.getElementById('percent-input').value);
    const base = parseFloat(document.getElementById('percent-base').value);
    const resultDiv = document.getElementById('percent-result');

    if (isNaN(percent) || isNaN(base)) {
        resultDiv.textContent = 'Please enter valid numbers.';
        return;
    }

    const result = (percent / 100) * base;
    resultDiv.textContent = `${percent}% of ${base} is ${result.toFixed(2)}`;
});

// --- GST Calculator Logic ---
const gstButtons = document.querySelectorAll('.gst-rate-btn');
gstButtons.forEach(button => {
    button.addEventListener('click', () => {
        const baseAmount = parseFloat(document.getElementById('gst-amount').value);
        const rate = parseFloat(button.dataset.rate);
        const resultDiv = document.getElementById('gst-result');

        if (isNaN(baseAmount)) {
            resultDiv.textContent = 'Please enter a valid base amount.';
            return;
        }
        
        const gstAmount = (baseAmount * rate) / 100;
        const totalAmount = baseAmount + gstAmount;

        resultDiv.innerHTML = `
            Base Amount: ${baseAmount.toFixed(2)}<br>
            GST (${rate}%): ${gstAmount.toFixed(2)}<br>
            <strong>Total Amount: ${totalAmount.toFixed(2)}</strong>
        `;
    });
});

// --- Unit Converter Logic ---
const converterCategory = document.getElementById('converter-category');
const converterGroups = document.querySelectorAll('.converter-group');

converterCategory.addEventListener('change', () => {
    converterGroups.forEach(group => group.classList.remove('active'));
    const activeGroup = document.getElementById(`${converterCategory.value}-converter`);
    if (activeGroup) {
        activeGroup.classList.add('active');
    }
});

// Length Conversion
document.getElementById('convert-length-btn').addEventListener('click', () => {
    const value = parseFloat(document.getElementById('length-input').value);
    const fromUnit = document.getElementById('from-length').value;
    const toUnit = document.getElementById('to-length').value;
    const resultDiv = document.getElementById('length-result');
    
    if(isNaN(value)) {
        resultDiv.textContent = "Please enter a value.";
        return;
    }

    const factors = { meter: 1, kilometer: 1000, centimeter: 0.01, mile: 1609.34, foot: 0.3048 };
    const valueInMeters = value * factors[fromUnit];
    const result = valueInMeters / factors[toUnit];
    resultDiv.textContent = `${value} ${fromUnit} = ${result.toFixed(4)} ${toUnit}`;
});

// Weight Conversion
 document.getElementById('convert-weight-btn').addEventListener('click', () => {
    const value = parseFloat(document.getElementById('weight-input').value);
    const fromUnit = document.getElementById('from-weight').value;
    const toUnit = document.getElementById('to-weight').value;
    const resultDiv = document.getElementById('weight-result');
    
    if(isNaN(value)) {
        resultDiv.textContent = "Please enter a value.";
        return;
    }

    const factors = { gram: 1, kilogram: 1000, pound: 453.592, ounce: 28.3495 };
    const valueInGrams = value * factors[fromUnit];
    const result = valueInGrams / factors[toUnit];
    resultDiv.textContent = `${value} ${fromUnit} = ${result.toFixed(4)} ${toUnit}`;
});

// Temperature Conversion
document.getElementById('convert-temp-btn').addEventListener('click', () => {
    const value = parseFloat(document.getElementById('temp-input').value);
    const fromUnit = document.getElementById('from-temp').value;
    const toUnit = document.getElementById('to-temp').value;
    const resultDiv = document.getElementById('temp-result');
    
    if(isNaN(value)) {
        resultDiv.textContent = "Please enter a value.";
        return;
    }
    
    let result;
    if (fromUnit === toUnit) {
        result = value;
    } else if (fromUnit === 'celsius') {
        if (toUnit === 'fahrenheit') result = (value * 9/5) + 32;
        else if (toUnit === 'kelvin') result = value + 273.15;
    } else if (fromUnit === 'fahrenheit') {
        if (toUnit === 'celsius') result = (value - 32) * 5/9;
        else if (toUnit === 'kelvin') result = (value - 32) * 5/9 + 273.15;
    } else if (fromUnit === 'kelvin') {
        if (toUnit === 'celsius') result = value - 273.15;
        else if (toUnit === 'fahrenheit') result = (value - 273.15) * 9/5 + 32;
    }
    
    resultDiv.textContent = `${value}° ${fromUnit} = ${result.toFixed(2)}° ${toUnit}`;
});