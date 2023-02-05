import { fabric } from 'fabric'
import {seatKeys} from '../config/seat'
import SeatItem from './seatItem'

type optionsParams = {
    seats: object[],
    account?: object
}

export default fabric.util.createClass(fabric.Object, {
    initialize: function(options: optionsParams) {
        this.callSuper('initialize', options)
        this.selectable = false
        this.seats = options.seats
        this.account = options.account
        this.seatObjects = {}
    },
    getAccountIndex() {
        let accountIndex = 0
        if (this.account && this.account.address) {
            this.seats.forEach((item: any, index: number) => {
                if (item.user && item.user.address === this.account.address) {
                    accountIndex = index
                }
            })
        }
        
        return accountIndex
    },
    _render: function(ctx: any) {
        console.log(this.seats)
        // const seatObjects: any[] = []
        seatKeys.forEach((item, index) => {
            const accountIndex = this.getAccountIndex()
            const userIndex = (index + accountIndex) > 7 ? (index + accountIndex) - 8 :  index + accountIndex
            const seatId = this.seats[userIndex].seatId
            const {nickName, chip, status, address} = this.seats[userIndex].user || {}
            const seatItem = new SeatItem({
                nickName,
                chip,
                status,
                seatId,
                address,
                mode: item
            })
            this.seatObjects[seatId] = seatItem
            // seatObjects.push(seatItem)
            this.canvas.add(seatItem)
        })
        // this.seatObjects = seatObjects
    },
    resetUsers(seats: any[]) {
        console.log(seats)
        seats.forEach(seat => {
            this.seatObjects[seat.seatId]?.resetSeatItem(seat.user || {}, seat.mode)
        })
    }
})