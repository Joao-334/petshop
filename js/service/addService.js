async function addService() {
    const service = $('.add').val();
    console.log(service);

    await fetch('http://localhost:3000/services', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({service})
    });

    return;
}

$('.add_service').on('submit', addService);
$('.add').on('enter', addService);