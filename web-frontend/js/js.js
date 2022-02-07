const generatedAnomalies =  [['V89J5TL7T', new Date(2022, 2, 5, 6, 49, 50), 'VUIGS1K', 'Inclinometer', 52.318657924600885, ['Under Investigation', 'Mark Evans', new Date(2022, 2, 5, 6, 49, 50)]],
                            ['1YCRS1W4L', new Date(2022, 1, 28, 10, 39, 44), 'CNQKRKA', 'Accelerometer', 88.91018974722647, ['Dismissed', 'Mark Evans', new Date(2022, 1, 28, 10, 39, 44)]],
                            ['H5YD0ZO6I', new Date(2022, 1, 21, 7, 17, 27), 'B8911NX', 'Accelerometer', 79.53420369250034, ['Under Investigation', 'Mark Evans', new Date(2022, 1, 21, 7, 17, 27)]],
                            ['21EQ82KV3', new Date(2022, 1, 12, 11, 59, 54), 'VUIGS1K', 'Inclinometer', 85.29606844518389, ['Fixed', 'Mark Evans', new Date(2022, 1, 12, 11, 59, 54)]],
                            ['EN5GO20EG', new Date(2022, 1, 7, 10, 19, 20), '2M3RCZX', 'Extensometer', 90.56747324611004, ['Under Investigation', 'Mark Evans', new Date(2022, 1, 7, 10, 19, 20)]],
                            ['H6WNDZQ3L', new Date(2021, 12, 26, 20, 39, 30), 'FVCWFKX', 'Extensometer', 52.96116339044495, ['Under Investigation', 'Mark Evans', new Date(2021, 12, 26, 20, 39, 30)]],
                            ['J53L2WS8B', new Date(2021, 12, 24, 23, 55, 9), 'B8911NX', 'Accelerometer', 86.41151536579888, ['Fixed', 'Mark Evans', new Date(2021, 12, 24, 23, 55, 9)]],
                            ['IOV65HX9P', new Date(2022, 12, 14, 1, 2, 14), '2M3RCZX', 'Extensometer', 72.14765995289815, ['Fixed', 'Mark Evans', new Date(2022, 12, 14, 1, 2, 14)]],
                            ['UXAVNW8MR', new Date(2021, 12, 7, 6, 7, 54), 'CNQKRKA', 'Accelerometer', 90.28618782183187, ['Dismissed', 'Mark Evans', new Date(2021, 12, 7, 6, 7, 54)]],
                            ['TU2QVIBA3', new Date(2021, 12, 4, 5, 9, 38), 'FVCWFKX', 'Extensometer', 53.184152749787664, ['Dismissed', 'Mark Evans', new Date(2021, 12, 4, 5, 9, 38)]],
                            ['I7SP28UO8', new Date(2021, 11, 21, 10, 25, 19), 'B8911NX', 'Accelerometer', 68.46495905363147, ['Fixed', 'Mark Evans', new Date(2021, 11, 21, 10, 25, 19)]],
                            ['8YU0QOPSF', new Date(2021, 11, 17, 7, 38, 36), '2M3RCZX', 'Extensometer', 51.81254834613171, ['Dismissed', 'Mark Evans', new Date(2021, 11, 17, 7, 38, 36)]],
                            ['QJN1ZQ91A', new Date(2021, 11, 11, 20, 18, 17), 'VUIGS1K', 'Inclinometer', 54.81272622478832, ['Dismissed', 'Mark Evans', new Date(2021, 11, 11, 20, 18, 17)]],
                            ['R8HKXYCAX', new Date(2021, 11, 4, 9, 54, 45), 'B8911NX', 'Accelerometer', 94.22884741592765, ['Fixed', 'Mark Evans', new Date(2021, 11, 4, 9, 54, 45)]],
                            ['86GFYRZ09', new Date(2021, 10, 29, 16, 55, 5), 'CNQKRKA', 'Accelerometer', 72.33326678167943, ['Fixed', 'Mark Evans', new Date(2021, 10, 29, 16, 55, 5)]],
                            ['GCHYU0OSV', new Date(2021, 10, 19, 11, 2, 33), 'FVCWFKX', 'Extensometer', 63.06913723343247, ['Fixed', 'Mark Evans', new Date(2021, 10, 19, 11, 2, 33)]],
                            ['LTNTXYJLO', new Date(2021, 10, 13, 17, 23, 5), 'B8911NX', 'Accelerometer', 59.48450265413088, ['Dismissed', 'Mark Evans', new Date(2021, 10, 13, 17, 23, 5)]],
                            ['3S6LDI1K3', new Date(2021, 10, 4, 0, 19, 12), '2M3RCZX', 'Extensometer', 59.88859293950114, ['Fixed', 'Mark Evans', new Date(2021, 10, 4, 0, 19, 12)]],
                            ['XSC80J0QE', new Date(2021, 9, 30, 11, 8, 37), '2M3RCZX', 'Extensometer', 81.2283771019383, ['Dismissed', 'Mark Evans', new Date(2021, 9, 30, 11, 8, 37)]],
                            ['FXTYMIFW7', new Date(2021, 9, 22, 20, 17, 10), 'CNQKRKA', 'Accelerometer', 90.22293423170265, ['Fixed', 'Mark Evans', new Date(2021, 9, 22, 20, 17, 10)]]]

const sensors = [['VUIGS1K', 'Inclinometer'], ['B8911NX', 'Accelerometer'], ['2M3RCZX', 'Extensometer'], ['CNQKRKA', 'Accelerometer'], ['FVCWFKX', 'Extensometer']]
const statuses = ['Fixed', 'Dismissed', 'Under Investigation']

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