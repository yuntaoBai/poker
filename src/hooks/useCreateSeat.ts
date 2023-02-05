import Seat from '../canvas/seat'
import emitter from '../utils/emitter'
import {useAccountStore} from '../stores/account'

let seatObject: any = null

export async function useCreateSeat(canvas: any, seats: object[]) {
    const accountStore = useAccountStore()
    seats = resetMode(seats, accountStore.play.mode, accountStore.address)
    if (!seatObject) {
        seatObject = await new Promise((resolve, reject) => {
            const userSeat = new Seat({
                seats
            })
            resolve(userSeat)
        })
        canvas.add(seatObject)
    } else {
        seatObject.resetUsers(seats)
    }
    return seatObject
}

function resetMode(users: any[], modeSpeed: number, address: string) {
    return users.map((item, index) => {
        let m = item.seatId
        if (modeSpeed > 0) {
            m = m - (modeSpeed - 1)
            if (m < 1) {
                m = 8 + m
            }
        }
        item.mode = m
        if (item.user && item.user.address === address) {
            item.isAccount = true
        }
        return item
    })
}