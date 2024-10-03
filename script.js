
// открыть модальноое окно
document.getElementById("openModalBtn").onclick = function() {
    document.getElementById("modal").style.display = "block";
}

// закрыть модальноое окно
document.getElementsByClassName("close")[0].onclick = function() {
    document.getElementById("modal").style.display = "none";
}

// закрыть модальноое окно при клике вне его
window.onclick = function(event) {
    if (event.target === document.getElementById("modal")) {
        document.getElementById("modal").style.display = "none";
    }
}

// отправка данных 
document.getElementById("jobForm").addEventListener("submit", function(event) {
    event.preventDefault(); 

    // получение данных из формы
    const clientName = document.getElementById("clientName").value;
    const clientPhone = document.getElementById("clientPhone").value;
    const clientEmail = document.getElementById("clientEmail").value;
    const jobType = document.getElementById("jobType").value;
    const jobDescription = document.getElementById("jobDescription").value;
    const address = document.getElementById("address").value;
    const city = document.getElementById("city").value;
    const state = document.getElementById("state").value;
    const jobDate = document.getElementById("jobDate").value;
    const startTime = document.getElementById("startTime").value;
    const technician = document.getElementById("technician").value;

    // данные на отправку
    const dealData = {
        title: clientName, // заголовок
        value: 1000, // значение
        currency: 'USD', // валюта
        custom_fields: {
            job_type: jobType, // тип работы
            job_description: jobDescription, // описание работы
            address: address, 
            city: city, 
            state: state, 
            job_date: jobDate, 
            start_time: startTime,
            technician: technician 
        }
    };

    // отправка данных 
    fetch(`https://api.pipedrive.com/v1/deals?api_token=2ac6c8f6d7ecee0d2d9da1947f7735eb57789fae`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dealData)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        alert('Deal created successfully!');
        document.getElementById("modal").style.display = "none"; 
        document.getElementById("jobForm").reset(); // сбросить форму
    })
    .catch((error) => {
        console.error('Error:', error);
        alert('There was an error creating the deal.');
    });
});
