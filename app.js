// api
const api = 'https://api.exchangerate.host/';

// consts 
const el_currency_one = document.getElementById('currency_one');
const el_currency_two = document.getElementById('currency_two');
const el_amount = document.getElementById('amount');
const el_result = document.getElementById('result');
const el_btn_calculate = document.getElementById('btn-calculate');


// frontend from fetch api
fetch('./currencies.json')
    .then(response => response.json())
    .then(data => {
        const keys = Object.keys(data);
        const values = Object.values(data);
        let options;
        for (let i = 0; i < keys.length; i++) {
            options += `<option value="${keys[i]}">${values[i]}</option>`;
        }
        el_currency_one.innerHTML += options;
        el_currency_two.innerHTML += options;
    });

// click event
el_btn_calculate.addEventListener('click', () => {
    const base_currency = el_currency_one.value;
    const to_currency = el_currency_two.value;
    const amount = el_amount.value;

    if (base_currency == "" || to_currency == "" || amount == "") {
        alert('Please fill in the relevant fields.');
    } else {
        // our app from the api link = "https://api.exchangerate.host/"
        fetch(`${api}/convert?from=${base_currency}&to=${to_currency}&amount=${amount}`)
            .then(response => response.json())
            .then(data => {
                el_result.innerHTML =
                    `
                ${new Intl.NumberFormat('tr-TR',{style :'currency',currency:base_currency}).format(amount)} = 
                ${new Intl.NumberFormat('tr-TR',{style :'currency',currency:to_currency}).format(data.result)} 
                `;
            });
    }
});