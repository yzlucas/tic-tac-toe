'use strict';
class Routes{

	constructor(app,redisDB){
        this.redisDB = redisDB;
		this.app = app;
	}


    appRoutes(){
        const redisDB = this.redisDB;

        //getting the total room counts and available rooms 

        this.app.get('/getRoomStats', (request,response) => {
            Promise.all(['totalRoomCount','allRooms'].map(key => redisDB.getAsync(key))).then(values => {
                const totalRoomCount = values[0];
                const allRooms = JSON.parse(values[1]);
                response.status(200).json({
                    'totalRoomCount' : totalRoomCount,
                    'fullRooms' : allRooms['fullRooms'],
                    'emptyRooms' : allRooms['emptyRooms']
                });
            });
        });
    }

    routesConfig(){
        this.appRoutes();
    }
}

module.exports = Routes;