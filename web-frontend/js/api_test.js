axios.get('http://localhost:3030/sensors')
  .then(function (response) {
    // handle success
    console.log(response.data.data)
    response.data.data.forEach(item => {
        document.getElementById("results").innerHTML += `
        <tr>
        <td>${item.id}</td>
        <td>${item.type}</td>
        <td>${item.subtype}</td>
        <td>${item.location}</td>
        <td>${item.unit}</td>
        </tr>
        `;
    });
    
  })