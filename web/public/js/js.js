const reports = [['1', new Date('2022-02-03T12:00:00'), 'West Antenna January 2022', new Date('2022-01-01T00:00:00'), new Date('2022-01-31T23:59:59'), 'Marcia Ratke'],
                 ['2', new Date('2022-02-21T12:00:00'), 'Storm Eunice Impact Report', new Date('2022-02-17T00:00:00'), new Date('2022-02-20T23:59:59'), 'Ross Kunze'],
                 ['3', new Date('2022-02-22T12:00:00'), '2021 Report', new Date('2021-01-01T00:00:00'), new Date('2021-12-31T23:59:59'), 'Mark Evans']]

const statuses = ['Pending', 'Under Investigation', 'Urgent', 'Fixed', 'Dismissed']
const sensitivities = ['Very Low', 'Low', 'Normal', 'High', 'Very High']

const confidenceColours = ['#00FF00', '#FFFF00', '#FF0000']

const lineRenderer = ({ ctx, id, x, y, state: { selected, hover }, style }) => {
    const r = style.size;
    const drawNode = () => {
        ctx.beginPath();
        ctx.lineWidth = 2;
        ctx.strokeStyle = '#7e7e7e'
        ctx.moveTo(x, y - 10);
        ctx.lineTo(x, y + 15);
        ctx.closePath();
        ctx.save();
        ctx.stroke();
        ctx.restore();
    };
    return {
        drawNode,
        nodeDimensions: { width: 2 * r, height: 2 * r },
    };
}

const custom_canvas_background_color = {
    id: 'custom_canvas_background_color',
    beforeDraw: (chart, args, options) => {
      const {
        ctx,
        chartArea: { top, right, bottom, left, width, height },
        scales: { x, y },
      } = chart;
      ctx.save();
      ctx.globalCompositeOperation = 'destination-over';
      ctx.fillStyle = '#FAFAFA';
      ctx.fillRect(left, top, width, height);
      ctx.restore();
    },
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

function getSensitivityString(sensitivity) {
    if (sensitivity >= sensitivities.length - 1 || sensitivity < 1) {
        return 'INVALID'
    }
    return sensitivities[sensitivity - 1]
}

function getStatusString(status) {
    if (status >= status.length - 1 || status < 1) {
        return 'INVALID'
    }
    return statuses[status - 1]
}

function toggleOverlay(content, userID, formText) {
    shadow = document.getElementById('overlay-shadow')
    div = document.getElementById('overlay-div')
    if (shadow.style.display == 'block') {
        enableScroll()
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
        else if (content == 'reports-creation') {loadReportCreationForm(div)}
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

function loadAnomalyForm(div) {
    div.style.height = "auto";
    statusOptions = ""
    for (let i = 0; i < statuses.length; i++) {
        if (statuses[i] == 'Pending') {
            selected = ' disabled selected'
        } else { selected = "" }
        statusOptions += `<option value="${i}"${selected}>${statuses[i]}</option>`
    }

    document.getElementById('overlay-content').innerHTML = `<table style="width: 80%;margin: 20px 10%;"><tbody style="text-align: center;"><form action='sensor.html' method='GET'><tr>
                        <td>Choose New Status: <select class="overlay-select">
                            ${statusOptions}
                            </select>
                        </td></tr>
                        <tr><td><textarea class="overlay-textarea" placeholder="Notes"></textarea></td></tr>
                        <tr><td><button class="button-styling" onclick="toggleOverlay('reload')">Change Status</button> <button class="button-styling" onclick='toggleOverlay()'>Cancel</button></td></tr>
                    </form></tbody></table>`
}

function loadCommentsForm(div, userID, formText) {
    div.style.height = "auto";
    div.style.width = "60%";
    document.getElementById('overlay-content').innerHTML = `<table style="width: 90%;margin: 20px 5%;"><tbody style="text-align: center;"><form action='sensor.html' method='GET'><tr>
                        <td>${formText}</td></tr>
                        <tr><td><textarea class="overlay-textarea" placeholder="Notes" style="height: 100px"></textarea></td></tr>
                        <tr><td><button class="button-styling" onclick="toggleOverlay('reload')">Add Note</button> <button class="button-styling" onclick='toggleOverlay()'>Cancel</button></td></tr>
                    </form></tbody></table>`
}

function loadReportCreationForm(div) {
    div.style.height = "auto"
    div.style.width = "30%"
    div.style.padding = "60px"
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

function addReportSensorChart(sensorID, reportDuration) {
    axios.get(`/api/sensors/${sensorID}`)
        .then(function (response) {
            sensorUnit = response.data.unit
            sensorLocation = response.data.location

            axios.get(`/api/data?sensor=${sensorID}`)
            .then(function (response) {
                let sensorData = response.data
                
                
                seriesData = createSeriesFromData(sensorData)

                document.getElementById('sensor-visualisations-parent').innerHTML += `<div class="dashboard-tile-div">
                                                                                          <div height="100%"><canvas id="${sensorID}-all-chart"></canvas></div>
                                                                                      </div>`
                generateLineGraph(`${sensorID}-all-chart`, `#${sensorID} - All Values`, [seriesData[allVals]], ['Values'], seriesData[allLabels], sensorUnit, ['#1f4587', '#1f4587'], false)
                
                if (reportDuration > 2) {
                    document.getElementById('sensor-visualisations-parent').innerHTML += `<div class="dashboard-tile-div">
                                                                                              <div height="100%"><canvas id="${sensorID}-week-chart"></canvas></div>
                                                                                          </div>`
                    
                    generateLineGraph(`${sensorID}-week-chart`, `#${sensorID} - Day Values`, [seriesData[weekVals], seriesData[weekMaxVals], seriesData[weekMinVals]], ['Values', 'Maximum Value', 'Minimum Value'], seriesData[weekLabels], sensorUnit, ['#1f4587', '#7e7e7e', '#7e7e7e'], true)
                
                }
            })
    })
}

function createSeriesFromData(sensorData) {
    // Current day of iteration
    currentDay = formatDateString(sensorData[0].time)[0]
    // Current time used to get data for the preceding 24 hours
    currentTime = new Date(sensorData[sensorData.length - 1].time)
    
    dayTotal = 0
    numVals = 0

    allVals = []
    allLabels = []
    
    weekVals = []
    weekLabels = [currentDay]
    weekMaxVals = [Number.NEGATIVE_INFINITY]
    weekMinVals = [Number.POSITIVE_INFINITY]

    dayLabels = []
    dayVals = []
    
    for (let i = 0; i < sensorData.length; i++) {

        if (sensorData[i].value < 1000) {
            
            allVals.push(sensorData[i].value)
            allLabels.push(formatDateString(sensorData[i].time)[1].slice(0, -3))

            if (formatDateString(sensorData[i].time)[0] == currentDay) {
                
                dayTotal += sensorData[i].value
                numVals += 1

            } else {
                weekMaxVals.push(Number.NEGATIVE_INFINITY)
                weekMinVals.push(Number.POSITIVE_INFINITY)
                weekVals.push(dayTotal / numVals)
                dayTotal = sensorData[i].value
                numVals = 1
                currentDay = formatDateString(sensorData[i].time)[0]
                weekLabels.push(currentDay)
            }

            valueTime = new Date(sensorData[i].time)
            if (currentTime - valueTime < (1000 * 60 * 60 * 24)) {
                dayLabels.push(formatDateString(sensorData[i].time)[1].slice(0, -3))
                dayVals.push(sensorData[i].value)
            }
            if (sensorData[i].value > weekMaxVals[weekMaxVals.length - 1]) {weekMaxVals[weekMaxVals.length - 1] = sensorData[i].value}
            else if (sensorData[i].value < weekMinVals[weekMinVals.length - 1]) {weekMinVals[weekMinVals.length - 1] = sensorData[i].value}
        }
    }
    weekVals.push(dayTotal / numVals)

    var seriesData = {}
    seriesData[allVals] = allVals
    seriesData[allLabels] = allLabels
    seriesData[weekVals] = weekVals
    seriesData[weekLabels] = weekLabels
    seriesData[weekMinVals] = weekMinVals
    seriesData[weekMaxVals] = weekMaxVals
    seriesData[dayVals] = dayVals
    seriesData[dayLabels] = dayLabels

    return seriesData
}

function generateLineGraph(chartID, graphTitle, series, seriesLabels, xlabels, unit, colours, showLegend, dash) {
    unit = formatUnitString(unit)
    ctx = document.getElementById(chartID);
    ctx.style.height = '300px';

    datasets = []
    for (let i = 0; i < series.length; i++) {

        if (seriesLabels[i] == 'Values') { width = 2; dash = dash; displayLegend = false}
        else { width = 1; dash = dash; displayLegend = true }

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
    ctx.globalCompositeOperation = 'destination-over';
    data = { labels: xlabels, datasets: datasets };
    myChart = new Chart(ctx, config = {plugins: [custom_canvas_background_color],
                                        type: 'line',
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

function mapAllSensors(graphContainerID, sensorLocations, sensorTypes) {
    edgeList = []
    nodeList = []
    for (const [location, sensors] of Object.entries(sensorLocations)) {
        connectedSensors = []
        for (let i = 0; i < sensors.length; i++) {
            if (sensorTypes[sensors[i]] == 'Longitude') { colour = 'red' }
            else if (sensorTypes[sensors[i]] == 'Height') { colour = 'yellow' }
            else if (sensorTypes[sensors[i]] == 'Latitude') { colour = 'green' } 
            else { colour = '#F2F2F2' }

            nodeId = nodeList.length
            label = '#'+sensors[i]
            if (i == 0) {
                label += '\n' + location
            }
            nodeList.push({id: nodeId, label: label,
                        color: colour,
                        url: '/sensor?sensorID='+sensors[i],
                        font: {size: 15, color: "black", face: 'arial', strokeWidth: 10}})

            for (let j = 0; j < connectedSensors.length; j++) {
                edgeList.push({from: nodeId, to: connectedSensors[j], color:'#7e7e7e'})
            }
            connectedSensors.push(nodeId)
        }
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
        interaction: {
                        dragNodes: false,
                        zoomView: false,
                        dragView: false,
                        hover: true,
                        hoverConnectedEdges: false
                    }
      };
    
    var network = new vis.Network(container, data, options);
    network.on("click", function (params) {
        if (params.nodes.length === 1) {
            var node = nodes.get(params.nodes[0]);
            if(node.url != null) {
                window.location.href = node.url;
            }
         }
      });
}

function mapConnectedSensors(graphContainerID, sensorID, connectedSensors, connectedSensorTypes) {

    edgeList = []
    nodeList = [{id: 0, label: '#'+sensorID,
                 color: '#1f4587',
                 font: {size: 20, color: "red", face: 'arial', strokeWidth: 20}}]
    for (let i = 0; i < connectedSensors.length; i++) {
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
        interaction: {
            dragNodes: false,
            zoomView: false,
            dragView: false,
            hover: true,
            hoverConnectedEdges: false
        }
      };
    
    var network = new vis.Network(container, data, options);
    network.on("click", function (params) {
        if (params.nodes.length === 1) {
            var node = nodes.get(params.nodes[0]);
            if(node.url != null) {
                window.location.href = node.url;
            }
         }
      });
}

function createAnomalyTimeline(divId, anomalyTimes, anomalySensors, anomalyIDs, reportStartEnd, colours, timelineLength) {
    timelineLength = 1000
    reportDuration = reportStartEnd[1].getTime() - reportStartEnd[0].getTime()
    
    nodeList = [{id: 0, label: "custom", shape: "custom", x:0, y:2, ctxRenderer: lineRenderer}]
                    
    edgeList = []
    for (let i = 0; i < anomalyTimes.length; i++) {
        label = anomalyTimes[i].getDate()+"/"+anomalyTimes[i].getMonth()
        label += " - "+anomalyTimes[i].getHours()+":"+('0'+anomalyTimes[i].getMinutes()).slice(-2)+":"+('0'+anomalyTimes[i].getSeconds()).slice(-2)
        xShift = (anomalyTimes[i].getTime() - reportStartEnd[0].getTime()) / reportDuration * timelineLength
        nodeList.push({id: i+1, url: `/sensor?sensorID=${anomalySensors[i]}&anomalyID=${anomalyIDs[i]}`,
                       color: colours[i], fixed: true, x: 0 + xShift, y: 0, size: 10,
                       font: {size: 10, color: "black", face: 'arial', strokeWidth: 10}})
        nodeList.push({id: anomalyTimes.length+i+2, x: 0 + xShift, y: 150, fixed: true, color: 'white'})
        edgeList.push({from: i+1, to: anomalyTimes.length+i+2, color:'white', selectionWidth: 0, hoverWidth: 0, smooth: false,
                       size: 1, label: label, font: {align: 'middle'}})
        edgeList.push({from: i, to: i+1, color:'#7e7e7e', selectionWidth: 0, hoverWidth: 0, smooth: false})
    }
    
    nodeList.push({id: anomalyTimes.length+1, label: 'custom', shape: "custom", fixed: true, x:timelineLength, y:0, ctxRenderer: lineRenderer})
    edgeList.push({from: anomalyTimes.length+1, to: anomalyTimes.length, color:'#7e7e7e', selectionWidth: 0, hoverWidth: 0, smooth: false})

    var nodes = new vis.DataSet(nodeList)
    var edges = new vis.DataSet(edgeList)
    var container = document.getElementById(divId);
    container.style.backgroundColor = '#FFFFFF'

    var data = { nodes: nodes, edges: edges};
    var options = {
        nodes: {
          shape: "dot",
          size: 10,
        },
        interaction: {
                        dragNodes: false,
                        hover: true,
                        hoverConnectedEdges: false
                    }
      };
    
    var network = new vis.Network(container, data, options);
    network.on("click", function (params) {
        if (params.nodes.length === 1) {
            var node = nodes.get(params.nodes[0]);
            if(node.url != null) {
                window.location.href = node.url;
            }
         }
      });
}

function updateSensorData(sensorID, dataLimit, dataOffset) {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    remaining = 0
    document.getElementById("database-search-form").innerHTML += `<input type="hidden" name="sensorID" value="${sensorID}">`
    
    let dataQuery = `/api/data?sensor=${sensorID}&limit=${dataLimit}&offset=${dataOffset}`
    
    if (urlParams.has('from')) {
        if (urlParams.get('from') != '') {
            document.getElementById('date-from').value = urlParams.get('from')
            dataQuery += `&from=${urlParams.get('from')}T00:00:00`
        }
    }
    if (urlParams.has('until')) {
        if (urlParams.get('until') != '') {
            document.getElementById('date-until').value = urlParams.get('until')
            dataQuery += `&until=${urlParams.get('until')}T23:59:59`
        }
    }

    axios.get(dataQuery)
    .then(function (response) {
        document.getElementById('sensor-data').innerHTML = `<tr class="database-table-row"><th>Date</th><th>Time</th><th>value</th></tr>`
        let sensorData = response.data
        lastUpdatedArray = formatDateString(sensorData[sensorData.length - 1].time)
        lastUpdated = lastUpdatedArray[0] + ', ' + lastUpdatedArray[1]

        for (let i = 0; i < sensorData.length; i++ ) {
            table = document.getElementById("sensor-data")
            datetime = formatDateString(sensorData[i].time)
            if (sensorData[i].value < 1000) {table.innerHTML += `<tr class="database-table-row"><td>${datetime[0]}</td><td>${datetime[1]}</td><td>${sensorData[i].value.toFixed(8)}</td></tr>` }
        }
        if (sensorData.length < dataLimit) {
            document.getElementById('next-data-btn').disabled = true
        }
    })
}