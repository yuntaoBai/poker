import { fabric } from 'fabric'
import seatParams, {width, height, seatKeys} from '../config/seat'
import SeatItem from './seatItem'

type optionsParams = {
    users: object[],
    account?: object
}

export default fabric.util.createClass(fabric.Object, {
    initialize: function(options: optionsParams) {
        this.callSuper('initialize', options)
        this.selectable = false
        this.users = options.users
        this.account = options.account
        this.seatObjects = {}
    },
    getAccountIndex() {
        let accountIndex = 0
        if (this.account && this.account.address) {
            this.users.forEach((item: any, index: number) => {
                if (item.address === this.account.address) {
                    accountIndex = index
                }
            })
        }
        
        return accountIndex
    },
    _render: function(ctx: any) {
        console.log(this.users)
        // const seatObjects: any[] = []
        seatKeys.forEach((item, index) => {
            const top = seatParams[item].top
            const left =  seatParams[item].left
            const accountIndex = this.getAccountIndex()
            const userIndex = (index + accountIndex) > 7 ? (index + accountIndex) - 8 :  index + accountIndex
            const {nickName, chip, status, seatId, address} = this.users[userIndex]
            const seatItem = new SeatItem({
                width,
                height,
                top,
                left,
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
    resetUsers(users: any[]) {
        console.log(users)
        users.forEach(user => {
            this.seatObjects[user.seatId].resetSeatItem(user)
        })
    }
})