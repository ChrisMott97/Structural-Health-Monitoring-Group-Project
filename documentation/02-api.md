# API Contract
## API Gateway
### Sensors
 - Get all sensors
   - Method: GET
   - URI: `/sensors`
   - Response: 
     - ```javascript
        [{id:String, type:String, subtype:String, location:String, unit:String}]
        ```
- Get one sensor by ID
   - Method: GET
   - URI: `/sensors/:id`
   - Response: 
     - ```javascript
        {id:String, type:String, subtype:String, location:String, unit:String}
        ```
### Data
 - Get all data
   - Method: GET
   - URI: `/data`
   - Response: 
     - ```javascript
        [{time: DateTime, value: Number, sensor_id: String}]
        ```
- Get data by sensor ID
   - Method: GET
   - URI: `/data?sensor=GPH000EDE`
   - Response: 
     - ```javascript
        [{time: DateTime, value: Number, sensor_id: String}]
        ```
- Get data between two times
   - Method: GET
   - URI: `/data?from=2011-02-23T22:30:00&until=2011-02-24T00:59:59`
   - Response: 
     - ```javascript
        [{time: DateTime, value: Number, sensor_id: String}]
        ```
   - Notes:
     - Date can also be used in format 2011-02-23 without time
     - Parameters such as sensor can be added to this too
### Users
 - Get all users
   - Method: GET
   - URI: `/users`
   - Response: 
     - ```javascript
        [{id: Number, name: String, permission: Number, password: String}]
        ```
- Get one user by ID
   - Method: GET
   - URI: `/users/1`
   - Response: 
     - ```javascript
        {id: Number, name: String, permission: Number, password: String}
        ```
### Anomalies
 - Get all anomalies
   - Method: GET
   - URI: `/anomalies`
   - Response: 
     - ```javascript
        [{"id": Number,"time": DateTime,"value": Number,"sensor_id": String,"status": Number,"confidence": Number,"updated_at": DateTime,"notes": String,"name": String}]
        ```
- Get anomalies by status
   - Method: GET
   - URI: `/anomalies?status=1`
   - Response: 
     - ```javascript
        [{"id": Number,"time": DateTime,"value": Number,"sensor_id": String,"status": Number,"confidence": Number,"updated_at": DateTime,"notes": String,"name": String}]
        ```