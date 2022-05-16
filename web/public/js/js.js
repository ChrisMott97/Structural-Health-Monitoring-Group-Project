const statuses = ['Pending', 'Under Investigation', 'Urgent', 'Fixed', 'Dismissed']
const sensitivities = ['Very Low', 'Low', 'Normal', 'High', 'Very High']

const confidenceColours = ['#00FF00', '#FFFF00', '#FF0000']

// Draws lines at the end of a timeline
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

// Adds white background to canvases
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

// Converts a ISO date string into an array
// with the date and time
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

// Converts a date object into a label for timelines
function formatDateObject(date, includeTime) {
    dateString = date.getDate()+"/"+date.getMonth()+"/"+date.getFullYear()
    if (includeTime) { dateString += ", "+date.getHours()+":"+('0'+date.getMinutes()).slice(-2)+":"+('0'+date.getSeconds()).slice(-2) }
    return dateString
}

// Gets the sensitivity value string from the list
function getSensitivityString(sensitivity) {
    if (sensitivity > sensitivities.length || sensitivity < 1) {
        return 'INVALID'
    }
    return sensitivities[sensitivity - 1]
}

// Gets the status value string from the list
function getStatusString(status) {
    if (status >= status.length - 1 || status < 1) {
        return 'INVALID'
    }
    return statuses[status - 1]
}

// Toggles the overlay div & shadow
function toggleOverlay(content, userID, formText, sensorID, anomalyID, currentStatus, commentsTable) {
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
        else if (content == 'anomaly-form') { loadAnomalyForm(div, userID, anomalyID, currentStatus)}
        else if (content == 'comments-form') { loadCommentsForm(div, userID, formText, sensorID, anomalyID, commentsTable)}
        else if (content == 'reports-creation') {loadReportCreationForm(div)}
        disableScroll()
        shadow.classList.remove('overlay-fadeOut');
        div.classList.remove('overlay-slideOut');
        shadow.classList.add('overlay-fadeIn');
        div.classList.add('overlay-slideIn');
        shadow.style.display = 'block'
    }
}

// Disables scrolling
function disableScroll() {
    scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
  
        window.onscroll = function() {
            window.scrollTo(scrollLeft, scrollTop);
        };
}
  
// Renables scrolling
function enableScroll() {
    window.onscroll = function() {};
}

// Loads the anomaly status change form into
// the overlay div
function loadAnomalyForm(div, userID, anomalyID, currentStatus) {
    div.style.height = "auto";
    statusOptions = ""
    for (let i = 0; i < statuses.length; i++) {
        selected = ""
        if (statuses[i] == 'Pending' || statuses[i] == currentStatus) { selected += ' disabled' }
        if (statuses[i] == currentStatus) { selected += " selected" }
        console.log(currentStatus, statuses[i], selected)
        statusOptions += `<option value="${i+1}"${selected}>${statuses[i]}</option>`
    }
    document.getElementById('overlay-content').innerHTML = `<table style="width: 80%;margin: 20px 10%;"><tbody style="text-align: center;"><form action='sensor.html' method='GET'><tr>
                        <td>Choose New Status: <select class="overlay-select" id="new-status">
                            ${statusOptions}
                            </select>
                        </td></tr>
                        <tr><td><button class="button-styling" onclick="submitAnomalyForm('${anomalyID}', '${userID}')">Change Status</button> <button class="button-styling" onclick="toggleOverlay('reload')">Cancel</button></td></tr>
                    </form></tbody></table>`
}

// Submits the anomaly form to change the status of an anomaly
function submitAnomalyForm(anomalyID, userID) {
    newStatus = document.getElementById('new-status').value
    statusChange = {status: newStatus, user_id: userID}
    console.log(statusChange)
    axios.put(`/api/anomalies/${anomalyID}`, statusChange).then(function (response) {
        location.reload()
    }).catch(function (error) {
        console.log('Status could not be changed.')
        console.log(error)
    });
}

// Loads the comments form into
// the overlay div
function loadCommentsForm(div, userID, formText, sensorID, anomalyID, commentsTable) {
    div.style.height = "auto";
    div.style.width = "60%";
    document.getElementById('overlay-content').innerHTML = `<table style="width: 90%;margin: 20px 5%;"><tbody style="text-align: center;"><form action='sensor.html' method='GET'><tr>
                        <td>${formText}</td></tr>
                        <input type="hidden" id="user-id" value="${userID}">
                        <input type="hidden" id="sensor-id" value="${sensorID}">
                        <input type="hidden" id="anomaly-id" value="${anomalyID}">
                        <tr><td><textarea class="overlay-textarea" id="comment-textarea" placeholder="Notes" style="height: 100px"></textarea></td></tr>
                        <tr><td><button class="button-styling" onclick="submitCommentsForm('${sensorID}', ${anomalyID}, '${userID}', '${commentsTable}')">Add Note</button> <button class="button-styling" onclick="toggleOverlay('reload')">Cancel</button></td></tr>
                    </form></tbody></table>`
}

// Submits the comment form, updating the database
function submitCommentsForm(sensorID, anomalyID, userID, table) {
    comment = document.getElementById('comment-textarea').value
    if (comment != '') {
        
        if (anomalyID != null) {commentInfo = {sensor_id: sensorID, anomaly_id: anomalyID, body: comment, user_id:userID}}
        else {commentInfo = {sensor_id: sensorID, body: comment, user_id:userID}}

        axios.post('/api/comments', commentInfo).then(function (response) {
            toggleOverlay('')
            reloadComments(sensorID, anomalyID, table)
        }).catch(function (error) {
            alert('Comment could not be added.')
            console.log(error);
            console.log(comment)
        });
    }
}

// Updates the comments table on the page
function reloadComments(sensorID, anomalyID, table) {
    dataQuery = `/api/comments`
    added = false
    if (anomalyID != null){
        added = true
        dataQuery = `/api/comments?anomaly-id=${anomalyID}`
    }
    if (sensorID != null) {
        if (added) {dataQuery += '&'}
        else {dataQuery += '?'}
        dataQuery += `sensor-id=${sensorID}`
    }

    axios.get(dataQuery)
    .then(function (response) {
        let commentsData = response.data

        commentsTable = document.getElementById(table)
        commentsTable.innerHTML = ""

        for (let i = 0; i < commentsData.length; i++ ) {
            axios.get(`/api/users/${commentsData[i].user_id}`)
            .then(function (response) {
                commentAuthor = response.data.name
                commentText = `<tr class="comment-table-row">
                                <td class="comment-table-body">
                                    <span class="comment-author">${commentAuthor}</span><i> ${formatCommentDateString(commentsData[i].created_at)}</i><br>
                                    ${commentsData[i].body}
                                </td></tr>`
                commentsTable.innerHTML += commentText
            })   
        }
    }).catch((err)=>{
        commentsTable = document.getElementById(table)
        commentsTable.innerHTML = "No comments."
    })
}

// Loads the report creation change form into
// the overlay div
function loadReportCreationForm(div) {
    div.style.height = "auto"
    div.style.width = "30%"
    div.style.padding = "60px"
}

// Formats a date string in a comment format,
// giving the time since the comment
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

// Converts units into its full name
// and abbreviation
function formatUnitString(unit) {
    if (unit == 'metre') {
        return 'Metres (m)'
    } else if (unit == 'degrees') {
        return 'Degrees ( ° )'
    } else if (unit == 'mm') {
        return 'Millimetres (mm)'
    } else if (unit == 'C') {
        return 'Degrees Celsius ( °C )'
    } else if (unit == 'Hz') {
        return 'Hertz (Hz)'
    } else if (unit == '%') {
        return 'Percent (%)'
    } else { return unit }
}

// Adds a report sensor chart for a given sensor group
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

// Converts a matlab datenum object to a
// ISO string
function matlabDatenumToDate(datenum) {
    baseDate = new Date(Date.UTC(1970, 0, 1, 0, 0, 0));
    daysSinceEpoch = (datenum / (24*3600*1000)) - 719528
    numDays = Math.floor(daysSinceEpoch)

    hours = (daysSinceEpoch - numDays) * 24
    minutes = (hours - Math.floor(hours)) * 60
    seconds = (minutes - Math.floor(minutes)) * 60

    newDate = new Date(baseDate.setDate(baseDate.getDate() + numDays))
    newDate = new Date(newDate.setHours(newDate.getHours()+Math.floor(hours), newDate.getMinutes()+Math.floor(minutes), newDate.getSeconds()+Math.floor(seconds)))

    return newDate.toISOString()
}

// Creates a set of week and day series for use in graphs
function createSeriesFromData(sensorData, sensorID) {
    console.log(sensorData)

    latestTime = new Date(Date.UTC(1970, 0, 1, 0, 0, 0));
    earliestTime = new Date(2100, 0, 1, 0, 0, 0)

    for (let i = 0; i < sensorData.length; i++) {
        valueDatetime = new Date(matlabDatenumToDate(sensorData[i].timestamp))
        if (valueDatetime < earliestTime) {earliestTime = valueDatetime}
        if (valueDatetime > latestTime) {latestTime = valueDatetime}
    }
    currentDay = formatDateString(earliestTime.toISOString())[0]
    currentTime = latestTime
    
    allVals = []
    weekVals = []
    weekLabels = []
    previousDayVals = []
    previousDayLabels = []

    for (let i = 0; i < sensorData.length; i++) {
        valueDatetime = new Date(matlabDatenumToDate(sensorData[i].timestamp))
        if (((currentTime - valueDatetime) / (1000 * 3600 * 24)) < 7 && (currentTime - valueDatetime >= 0)) {
            if (sensorData[i][sensorID] != null) {
                allVals.push(sensorData[i][sensorID])
                valueDatetimeArray = formatDateString(valueDatetime.toISOString())
                valueDay = valueDatetimeArray[0]
                valueTime = valueDatetimeArray[1]

                if (weekLabels.indexOf(valueDay) < 0) {
                    weekVals.push([sensorData[i][sensorID]])
                    weekLabels.push(valueDay)
                } else {
                    weekVals[weekLabels.indexOf(valueDay)].push(sensorData[i][sensorID])
                }

                if (((currentTime - valueDatetime) / (1000 * 3600 * 24)) < 1) {
                    previousDayVals.push(sensorData[i][sensorID])
                    previousDayLabels.push(valueTime.slice(0, -3))
                }
            }
        }
    }

    weekMinVals = []
    weekMaxVals = []

    for (let i = 0; i < weekVals.length; i++) {
        maxVal = Number.NEGATIVE_INFINITY
        minVal = Number.POSITIVE_INFINITY
        

        total = 0
        for (let j = 0; j < weekVals[i].length; j++) {
            total += weekVals[i][j]
            if (weekVals[i][j] > maxVal) {maxVal = weekVals[i][j]}
            else if (weekVals[i][j] < minVal) {minVal = weekVals[i][j]}
        }
        if (weekVals[i].length > 0) {
            weekVals[i] = total / weekVals[i].length
        }
        weekMinVals.push(minVal)
        weekMaxVals.push(maxVal)
    }

    var seriesData = {
                        allVals: allVals,
                        weekVals: weekVals,
                        weekLabels: weekLabels,
                        weekMinVals: weekMinVals,
                        weekMaxVals: weekMaxVals,
                        previousDayVals: previousDayVals,
                        previousDayLabels: previousDayLabels
                     }

    return seriesData
}

// Generates a line graph
function generateLineGraph(chartID, height, graphTitle, series, seriesLabels, xlabels, unit, colours, showLegend, dash) {
    unit = formatUnitString(unit)
    ctx = document.getElementById(chartID);
    ctx.style.height = height;

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

// Creates a network diagram of all sensors, grouped
// by location
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
          widthConstraint: 50
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

// Creates a network diagram of sensors connected by location,
// with the main focused node in the centre
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

// Generates a timeline displaying the given anomalies
function createAnomalyTimeline(divId, anomalyTimes, anomalySensors, anomalyIDs, reportStartEnd, colours, timelineLength) {
    timelineLength = 1000
    reportDuration = reportStartEnd[1].getTime() - reportStartEnd[0].getTime()
    
    nodeList = [{id: 0, label: "custom", shape: "custom", x:0, y:0, ctxRenderer: lineRenderer, fixed: true}]
                    
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
        physics: {enabled: false},
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

// Updates the table showing a sensor's data
function updateSensorData(sensorID, dataLimit, dataOffset, reverseData) {
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
        if (reverseData) {sensorData.reverse()}
        lastUpdatedArray = formatDateString(matlabDatenumToDate(sensorData[sensorData.length - 1].timestamp))
        lastUpdated = lastUpdatedArray[0] + ', ' + lastUpdatedArray[1]

        for (let i = 0; i < sensorData.length; i++ ) {
            table = document.getElementById("sensor-data")
            datetime = formatDateString(matlabDatenumToDate(sensorData[i].timestamp))
            
            table.innerHTML += `<tr class="database-table-row"><td>${datetime[0]}</td><td>${datetime[1]}</td><td>${sensorData[i][sensorID]}</td></tr>`
        }
        if (sensorData.length < dataLimit) {
            document.getElementById('next-data-btn').disabled = true
        }
    }).catch((err)=>{
        document.getElementById('sensor-data').innerHTML = `<br>No sensor data found`
    })
}