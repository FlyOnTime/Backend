/**
 * Created by jossi on 18.07.2017.
 */

export class RegisterRequestBody {
    constructor(public userId: number, public sessionId: string, public sessionValidityInHours: number) {
    }
}