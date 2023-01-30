import Seat from '../canvas/seat'
import emitter from '../utils/emitter'
import {useAccountStore} from '../stores/account'

let seatObject: any = null

export async function useCreateSeat(canvas: any, users: object[]) {
    const accountStore = useAccountStore()
    users = resetMode(users, accountStore.play.mode)
    if (!seatObject) {
        seatObject = await new Promise((resolve, reject) => {
            const userSeat = new Seat({
                users
            })
            resolve(userSeat)
        })
        canvas.add(seatObject)
    } else {
        seatObject.resetUsers(users)
    }
    return seatObject
}

function resetMode(users: any[], modeSpeed: number) {
    return users.map((item, index) => {
        let m = item.seatId
        if (modeSpeed > 0) {
            m = m - (modeSpeed - 1)
            if (m < 1) {
                m = 8 + m
            }
        }
        item.mode = m
        return item
    })
}