import Seat from '../canvas/seat'
import emitter from '../utils/emitter'

export async function useCreateSeat(canvas: any, users: object[]) {
    const rect: any = await new Promise((resolve, reject) => {
        console.log(users, 777777)
        const userSeat = new Seat({
            users
        })
        resolve(userSeat)
    })
    canvas.add(rect)
    emitter.on('addAccount', (account: object) => {
        rect.createAccount(account)
    })
    // setTimeout(() => {
    //     rect.createUser({
    //         address: 'sdfsdfsdf',
    //         nickName: 'MCD',
    //         seatId: 4,
    //         chip: 5000
    //     })
    //     rect.createUser({
    //         address: 'sdfsdfsdf',
    //         nickName: 'EGT',
    //         seatId: 7,
    //         chip: 1200
    //     })
    // }, 100)
    return rect
}