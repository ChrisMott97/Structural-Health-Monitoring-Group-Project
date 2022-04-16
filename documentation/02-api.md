# API Contract
## API Gateway
All API routes begin with `/api`.
### Sensors
 - Get all sensors
   - Method: GET
   - URI: `/sensors`
   - Response: 
     - ```javascript
        [{id:String, type:String, subtype:String, location:String, unit:String}]
        ```
 - Get limited set of sensors
   - Method: GET
   - URI: `/sensors?limit=6`
   - Response: 
     - ```javascript
        [{id:String, type:String, subtype:String, location:String, unit:String}]
        ```
 - Get the second page of sensors limited to 3 per page
   - Method: GET
   - URI: `/sensors?limit=3&offset=3`
   - Response: 
     - ```javascript
        [{id:String, type:String, subtype:String, location:String, unit:String}]
        ```
   - Notes:
     - For even pages of sensors, `offset` should increase in multiples of `limit`.
 - Get sensors by type, subtype or location
   - Method: GET
   - URI: `/sensors?type=GPS&subtype=Height&Location=West%20Antenna`
   - Response: 
     - ```javascript
        [{id:String, type:String, subtype:String, location:String, unit:String}]
        ```
   - Notes
     - As like any other query parameters, any combination of these or `limit` may be used.
      
- Get one sensor by ID
   - Method: GET
   - URI: `/sensors/1`
   - Response: 
     - ```javascript
        {id:String, type:String, subtype:String, location:String, unit:String}
        ```
- Get list of related sensors for a given sensor by ID
   - Method: GET
   - URI: `/sensors/1/related`
   - Response: 
     - ```javascript
        [String]
- Get all existing sensor types
   - Method: GET
   - URI: `/sensors/types`
   - Response: 
     - ```javascript
        [String]
        ```
- Get all existing sensor subtypes
   - Method: GET
   - URI: `/sensors/subtypes`
   - Response: 
     - ```javascript
        [String]
        ```
- Get all existing sensor locations
   - Method: GET
   - URI: `/sensors/locations`
   - Response: 
     - ```javascript
        [String]
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
- Get limited set of data
   - Method: GET
   - URI: `/data?limit=10`
   - Response: 
     - ```javascript
        [{time: DateTime, value: Number, sensor_id: String}]
        ```
- Get the second page of data limited to 3 per page
   - Method: GET
   - URI: `/data?limit=3&offset=3`
   - Response: 
     - ```javascript
        [{time: DateTime, value: Number, sensor_id: String}]
        ```
   - Notes:
     - For even pages of data, `offset` should increase in multiples of `limit`.
### Users
 - Get all users
   - Method: GET
   - URI: `/users`
   - Response: 
     - ```javascript
        [{email: String, name: String, picture: String, user_id: String, role: {id: String, name: String}}]
        ```
- Get the first page of users with 3 users on it
  - Method: GET
  - URI: `/users?page=0&perPage=3`
  - Response:
    - ```javascript
         [{email: String, name: String, picture: String, user_id: String, role: {id: String, name: String}}]
      ```
- Get one user by ID
   - Method: GET
   - URI: `/users/1`
   - Response: 
     - ```javascript
        {id: Number, name: String, permission: Number}
        ```
### Anomalies
 - Get all anomalies
   - Method: GET
   - URI: `/anomalies`
   - Response: 
     - ```javascript
        [{"id": Number,"time": DateTime,"value": Number,"sensor_id": String,"status": Number,"confidence": Number,"updated_at": DateTime,"notes": String,"name": String}]
        ```
- Get anomaly by ID
   - Method: GET
   - URI: `/anomalies/1`
   - Response: 
     - ```javascript
        {"id": Number,"time": DateTime,"value": Number,"sensor_id": String,"status": Number,"confidence": Number,"updated_at": DateTime,"notes": String,"name": String}
        ```
- Get anomalies by status
   - Method: GET
   - URI: `/anomalies?status=1`
   - Response: 
     - ```javascript
        [{"id": Number,"time": DateTime,"value": Number,"sensor_id": String,"status": Number,"confidence": Number,"updated_at": DateTime,"notes": String,"name": String}]
        ```
- Get a limited set of anomalies
   - Method: GET
   - URI: `/anomalies?limit=6`
   - Response: 
     - ```javascript
        [{"id": Number,"time": DateTime,"value": Number,"sensor_id": String,"status": Number,"confidence": Number,"updated_at": DateTime,"notes": String,"name": String}]
        ```
- Get the second page of anomalies limited to 3 per page
   - Method: GET
   - URI: `/anomalies?limit=3&offset=3`
   - Response: 
     - ```javascript
        [{"id": Number,"time": DateTime,"value": Number,"sensor_id": String,"status": Number,"confidence": Number,"updated_at": DateTime,"notes": String,"name": String}]
        ```
   - Notes:
     - For even pages of users, `offset` should increase in multiples of `limit`.
- Get anomalies between two times
   - Method: GET
   - URI: `/anomalies?from=2011-02-23T22:30:00&until=2011-02-24T00:59:59`
   - Response: 
     - ```javascript
        [{time: DateTime, value: Number, sensor_id: String}]
        ```
   - Notes:
     - Date can also be used in format 2011-02-23 without time
     - Parameters such as sensor can be added to this too
- Get anomalies by sensor
   - Method: GET
   - URI: `/anomalies?sensor=GPH000EDE`
   - Response: 
     - ```javascript
        [{"id": Number,"time": DateTime,"value": Number,"sensor_id": String,"status": Number,"confidence": Number,"updated_at": DateTime,"notes": String,"name": String}]
        ```
### Comments
 - Get all comments
   - Method: GET
   - URI: `/comments`
   - Response: 
     - ```javascript
        [{id: Number, user_id: Number, sensor_id: String, anomaly_id: Number, body: String, created_at: DateTime, updated_at: DateTime}]
        ```
- Get limited set of comments
   - Method: GET
   - URI: `/comments?limit=6`
   - Response: 
     - ```javascript
        [{id: Number, user_id: Number, sensor_id: String, anomaly_id: Number, body: String, created_at: DateTime, updated_at: DateTime}]
        ```
- Get second page of comments limited to 3 per page
   - Method: GET
   - URI: `/comments?limit=3&offset=3`
   - Response: 
     - ```javascript
        [{id: Number, user_id: Number, sensor_id: String, anomaly_id: Number, body: String, created_at: DateTime, updated_at: DateTime}]
        ```
   - Notes:
     - For even pages of users, `offset` should increase in multiples of `limit`.
- Get one comment by ID
   - Method: GET
   - URI: `/comments/1`
   - Response: 
     - ```javascript
        {id: Number, user_id: Number, sensor_id: String, anomaly_id: Number, body: String, created_at: DateTime, updated_at: DateTime}
        ```
- Get all comments by a user ID
   - Method: GET
   - URI: `/comments?user-id=1`
   - Response: 
     - ```javascript
        [{id: Number, user_id: Number, sensor_id: String, anomaly_id: Number, body: String, created_at: DateTime, updated_at: DateTime}]
        ```
   - Notes:
     - Standard for URLs is user-id, standard for MySQL is user_id, and standard for JavaScript is userID :(
- Get all comments by a sensor ID
   - Method: GET
   - URI: `/comments?sensor-id=1`
   - Response: 
     - ```javascript
        [{id: Number, user_id: Number, sensor_id: String, anomaly_id: Number, body: String, created_at: DateTime, updated_at: DateTime}]
        ```
   - Notes:
     - See above
- Get all comments by a anomaly ID
   - Method: GET
   - URI: `/comments?anomaly-id=1`
   - Response: 
     - ```javascript
        [{id: Number, user_id: Number, sensor_id: String, anomaly_id: Number, body: String, created_at: DateTime, updated_at: DateTime}]
        ```
   - Notes:
     - See above
     - Relating comments to anomalies is optional, comments can just be about sensors