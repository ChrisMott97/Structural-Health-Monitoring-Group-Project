const reports = [['1', new Date('2022-02-03T12:00:00'), 'West Antenna January 2022', new Date('2022-01-01T00:00:00'), new Date('2022-01-31T23:59:59'), 'Marcia Ratke'],
                 ['2', new Date('2022-02-21T12:00:00'), 'Storm Eunice Impact Report', new Date('2022-02-17T00:00:00'), new Date('2022-02-20T23:59:59'), 'Ross Kunze'],
                 ['3', new Date('2022-02-22T12:00:00'), '2021 Report', new Date('2021-01-01T00:00:00'), new Date('2021-12-31T23:59:59'), 'Mark Evans']]

const statuses = ['Fixed', 'Dismissed', 'Under Investigation']
const userID = 1

window.onload = (event) => {
    axios.get(`http://localhost:3030/users/${userID}`)
    .then(function (response) {
        // handle success
        document.getElementById("profile-name").innerHTML = response.data.name
    })
};

function generate_random_anomaly(start_time, end_time) {
    sensor = sensors[Math.floor(Math.random()*sensors.length)]
    sensorID = sensors[0]
    sensorType = sensors[1]
    anomalyID = Math.random().toString(36).substring(2,11).toUpperCase()
    
    engineer = engineers[Math.floor(Math.random()*engineers.length)]
    anomaly_status = statuses[Math.floor(Math.random()*statuses.length)]

    confidence = Math.random() * (100 - 50) + 50

    anomaly_date = randomDate(start_time, end_time)
    status_date = randomDate(anomaly_date, new Date())

    anomaly = [anomalyID, anomaly_date, sensorID, sensorType, confidence, [anomaly_status, 'Mark Evans', status_date]]

    return anomaly
}

function randomDate(start, end) { return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())); }

function generate_random_anomalies(no_anomalies) {
    anomalies = []
    const week = 604800000
    end_date = new Date()
    start_date = new Date(end_date - (week))

    for (let i = 0; i < no_anomalies; i++) {
        anomalies.push(generate_random_anomaly(start_date, end_date))
        end_date = start_date
        start_date = new Date(end_date - (week))
    }
    return anomalies
}

function generate_random_sensor_data(no_vals) {
    sensorData = []
    currentDate = new Date()
    for (let i = 0; i < no_vals; i++) {
        sensorData.push([currentDate, (Math.random() * 4) - (Math.random() * 4), (Math.random() * 4) - (Math.random() * 4), (Math.random() * 4) - (Math.random() * 4)])
        currentDate = new Date(currentDate - 10000)
    }
    return sensorData
}

function formatDateString(dateString) {
    dateArray = dateString.split("T")
    date = dateArray[0].split("-").reverse().join("/")
    time = dateArray[1].substring(0, dateArray[1].length - 2);
    return [date, time]
}

function toggleOverlay(content) {
    shadow = document.getElementById('overlay-shadow')
    div = document.getElementById('overlay-div')
    if (shadow.style.display == 'block') {
        enableScroll()
        // Only for prototype!
        if (content == 'reload') {window.location = window.location.href.split('&unread')[0]}
        shadow.classList.remove('overlay-fadeIn');
        div.classList.remove('overlay-slideIn');
        shadow.classList.add('overlay-fadeOut');
        div.classList.add('overlay-slideOut');
        setTimeout(function () {
            shadow.style.display = 'none';
            div.style.width = "400px";
            div.style.height = "75%";
        }, 750);
    } else {
        div.style.width = "400px";
        div.style.height = "75%";
        if (content == 'user-info') { loadUserInfo(div) }
        else if (content == 'anomaly-form') { loadAnomalyForm(div)}
        disableScroll()
        shadow.classList.remove('overlay-fadeOut');
        div.classList.remove('overlay-slideOut');
        shadow.classList.add('overlay-fadeIn');
        div.classList.add('overlay-slideIn');
        shadow.style.display = 'block'
    }
}

function disableScroll() {
    scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
  
        window.onscroll = function() {
            window.scrollTo(scrollLeft, scrollTop);
        };
}
  
function enableScroll() {
    window.onscroll = function() {};
}

function loadUserInfo() {
    axios.get(`http://localhost:3030/users/${userID}`)
    .then(function (response) {
        // handle success
        document.getElementById('overlay-content').innerHTML = `<img id="profile-pic-large" src="images/user-pic.png"><p class="user-info-text">Hello ${response.data.name.split(' ')[0]}!</p>`
    })
}

function loadAnomalyForm(div) {
    div.style.height = "auto";
    document.getElementById('overlay-content').innerHTML = `<table><tbody><form action='sensor.html' method='GET'><tr>
                        <td>Choose Status: <select>
                            <option value="" disabled selected>Pending Status</option>
                            <option value="status-investigating">Under Investigation</option>
                            <option value="status-fixed">Fixed</option>
                            <option value="status-dismissed">Dismissed</option>
                            </select>
                        </td></tr>
                        <tr><td><textarea placeholder="Notes"></textarea></td></tr>
                        <tr><td><button class="button-styling" onclick="toggleOverlay('reload')">Change Status</button></td><td><button class="button-styling" onclick='toggleOverlay()'>Cancel</button></td></tr>
                    </form></tbody></table>`
}


function generateLineGraph(chartID, graphTitle, sensorData) {
    labels = []
    vals = []
    for (let i = 0; i < sensorData.length; i++ ) {
        if (sensorData[i].value < 2) {
            labels.push(formatDateString(sensorData[i].time)[1])
            vals.push(sensorData[i].value)
        }
    }
    const ctx = document.getElementById(chartID);
    const data = {
    labels: labels,
    datasets: [{
        label: graphTitle,
        data: vals,
        fill: false,
        borderColor: 'rgb(31, 69, 135)',
        tension: 0.1
    }]
    };

    const myChart = new Chart(ctx, config = {type: 'line',
                                             data: data,
                                             options: {
                                                legend: { display: false },
                                                scales: {
                                                    y: {
                                                        display: true, 
                                                        title: {
                                                            display: true,
                                                            text: 'Degrees',
                                                            font: {
                                                            size: 15,
                                                            style: 'normal',
                                                            lineHeight: 1.2
                                                            }}}}}})
}