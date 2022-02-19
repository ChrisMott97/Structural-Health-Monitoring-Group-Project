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