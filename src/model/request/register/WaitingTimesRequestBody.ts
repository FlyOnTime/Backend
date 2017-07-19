/**
 * Created by jossi on 18.07.2017.
 */

class WaitingTimesRequestBody {
    private positions: Array<point> = new Array<point>();
 
    constructor(sessionId: string) {

    }
}

class point {
    lat: number;
    lng: number;
}

// class position