const reports = [['1', new Date('2022-02-03T12:00:00'), 'West Antenna January 2022', new Date('2022-01-01T00:00:00'), new Date('2022-01-31T23:59:59'), 'Marcia Ratke'],
                 ['2', new Date('2022-02-21T12:00:00'), 'Storm Eunice Impact Report', new Date('2022-02-17T00:00:00'), new Date('2022-02-20T23:59:59'), 'Ross Kunze'],
                 ['3', new Date('2022-02-22T12:00:00'), '2021 Report', new Date('2021-01-01T00:00:00'), new Date('2021-12-31T23:59:59'), 'Mark Evans']]

const statuses = ['Fixed', 'Dismissed', 'Under Investigation']
const userID = 1

window.onload = (event) => {
    // axios.get(`/api/users/${userID}`)
    // .then(function (response) {
    //     // handle success
    //     // document.getElementById("profile-name").innerHTML = response.data.name
    // })
};

function formatDateString(date) {
    if (typeof date === 'string') {
        dateArray = date.split("T")
        date = dateArray[0].split("-").reverse().join("/")
        time = dateArray[1].substring(0, dateArray[1].length - 2);
        return [date, time]
    } else if (date instanceof Date) {
        return date
    }
}

function toggleOverlay(content, userID, formText) {
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
        else if (content == 'comments-form') { loadCommentsForm(div, userID, formText)}
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
    // axios.get(`/api/users/${userID}`)
    // .then(function (response) {
    //     // handle success
    //     // document.getElementById('overlay-content').innerHTML = `<img id="profile-pic-large" src="images/user_pic.png"><p class="user-info-text">Hello ${response.data.name.split(' ')[0]}!</p>`
    // })
}

function loadAnomalyForm(div) {
    div.style.height = "auto";
    document.getElementById('overlay-content').innerHTML = `<table><tbody style="text-align: center;"><form action='sensor.html' method='GET'><tr>
                        <td>Choose Status: <select class="overlay-select">
                            <option value="" disabled selected>Pending Status</option>
                            <option value="status-investigating">Under Investigation</option>
                            <option value="status-fixed">Fixed</option>
                            <option value="status-dismissed">Dismissed</option>
                            </select>
                        </td></tr>
                        <tr><td><textarea class="overlay-textarea" placeholder="Notes"></textarea></td></tr>
                        <tr><td><button class="button-styling" onclick="toggleOverlay('reload')">Change Status</button> <button class="button-styling" onclick='toggleOverlay()'>Cancel</button></td></tr>
                    </form></tbody></table>`
}

function loadCommentsForm(div, userID, formText) {
    div.style.height = "auto";
    div.style.width = "60%";
    document.getElementById('overlay-content').innerHTML = `<table style="width: 100%;"><tbody style="text-align: center;"><form action='sensor.html' method='GET'><tr>
                        <td>${formText}</td></tr>
                        <tr><td><textarea class="overlay-textarea" placeholder="Notes" style="height: 100px"></textarea></td></tr>
                        <tr><td><button class="button-styling" onclick="toggleOverlay('reload')">Add Note</button> <button class="button-styling" onclick='toggleOverlay()'>Cancel</button></td></tr>
                    </form></tbody></table>`
}

function formatCommentDateString(dateString) {
    commentDate = new Date(dateString)
    currentDate = new Date()
    timeAgo = parseInt((currentDate - commentDate) / 1000)

    if (timeAgo < 10) {
        return 'Just now'
    } else if (timeAgo < 60) {
        timeUnit = 'second'
    } else {
        timeAgo = parseInt(timeAgo / 60)
        if (timeAgo < 60) {
            timeUnit = 'minute'
        } else {
            timeAgo = parseInt(timeAgo / 60)
            if (timeAgo < 2) {
                timeUnit = 'hour'
            } else {
                timeUnit = 'date'
            }
        }
    }
    
    if (timeUnit != 'date') {
        if (timeAgo != 1) {
            timeUnit += 's'
        }
        return timeAgo.toString() + ' ' + timeUnit + ' ago'
    } else {
        commentTime = commentDate.getHours().toString()+':'+((commentDate.getMinutes() < 10 ? '0' : '') + commentDate.getMinutes())
        if (timeAgo < 24) {
            return commentTime
        } else if (currentDate.getFullYear() == commentDate.getFullYear()) {
            return commentDate.getDate()+'/'+commentDate.getMonth()+' '+commentTime
        } else {
            return commentDate.getDate()+'/'+commentDate.getMonth()+'/'+parseInt(commentDate.getFullYear().toString().substr(2,2), 10)+' '+commentTime
        }
    }
}

function formatUnitString(unit) {
    if (unit == 'metre') {
        return 'Metres (m)'
    } else if (unit == 'degrees') {
        return 'Degrees ( ° )'
    } else { return 'unit' }
}

function generateLineGraph(chartID, graphTitle, series, seriesLabels, xlabels, unit, colours, showLegend) {
    unit = formatUnitString(unit)
    const ctx = document.getElementById(chartID);
    ctx.style.height = '100%';

    datasets = []
    for (let i = 0; i < series.length; i++) {

        if (seriesLabels[i] == 'Values') { width = 2; dash = []; displayLegend = false}
        else { width = 1; dash = [5]; displayLegend = true }

        datasets.push({
                        label: seriesLabels[i],
                        data: series[i],
                        fill: false,
                        borderColor: colours[i],
                        legend: { display: displayLegend },
                        tension: 0.2,
                        borderWidth: width,
                        borderDash: dash
                    })
    }

    const data = { labels: xlabels, datasets: datasets };
    const myChart = new Chart(ctx, config = {type: 'line',
                                             data: data,
                                             options: {
                                                maintainAspectRatio: false,
                                                plugins: { legend: { display: showLegend },
                                                title: {
                                                    display: true,
                                                    text: graphTitle,
                                                    color: 'rgb(0, 0, 0)',
                                                    padding: {
                                                        top: 10,
                                                        bottom: 30
                                                    },
                                                    font: {
                                                        size: 16
                                                    }
                                                }},
                                                scales: {
                                                    y: {
                                                        display: true, 
                                                        title: {
                                                            display: true,
                                                            text: unit,
                                                            font: {
                                                            size: 15,
                                                            style: 'normal',
                                                            lineHeight: 1.2
                                                            }}}}}})
                                                            
}

function generateLocationGraph(graphContainerID, sensorID, connectedSensors, connectedSensorTypes) {

    edgeList = []
    nodeList = [{id: 0, label: '#'+sensorID,
                 color: '#1f4587',
                 font: {size: 20, color: "red", face: 'arial', strokeWidth: 20}}]
    for (let i = 0; i < connectedSensors.length; i++) {
        console.log(connectedSensorTypes)
        sensorType = connectedSensorTypes[i]
        if (sensorType == 'Longitude') { colour = 'red' }
        else if (sensorType == 'Height') { colour = 'yellow' }
        else if (sensorType == 'Latitude') { colour = 'green' } 
        else { colour = '#F2F2F2' }
        
        nodeList.push({id: i+1, label: '#'+connectedSensors[i],
                       color: colour,
                       url: '/sensor?sensorID='+connectedSensors[i],
                       font: {size: 15, color: "black", face: 'arial', strokeWidth: 10}})
        edgeList.push({from: 0, to: i+1, color:'#7e7e7e'})
    }
    var nodes = new vis.DataSet(nodeList)
    var edges = new vis.DataSet(edgeList)
    var container = document.getElementById(graphContainerID);

    var data = { nodes: nodes, edges: edges};
    var options = {
        nodes: {
          shape: "dot",
          size: 10,
        },
      };
    
    var network = new vis.Network(container, data, options);
    network.on("doubleClick", function (params) {
        if (params.nodes.length === 1) {
            var node = nodes.get(params.nodes[0]);
            if(node.url != null) {
                window.location.href = node.url;
            }
         }
      });
}