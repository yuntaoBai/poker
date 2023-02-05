import { fabric } from 'fabric'
import seatParams, {width, height} from '../config/seat'
import {fillRoundRect, strokeRoundRect, contdown} from '../utils/canvas'
import PokerItem from './pokerItem'
import Deler from './deler'

type optionsParams = {
    top: number
    left: number,
    nickName: string,
    status?: number
    chip?: number,
    seatId: number,
    address: string
    mode: number
}

const statusText = ['', '让牌', '跟注', '加注', '弃牌']

export default fabric.util.createClass(fabric.Object, {
    initialize: function(options: optionsParams) {
        this.callSuper('initialize', options)
        const {top, left, nickName, status, chip, seatId, address, mode} = options
        this.width = width
        this.height = height
        this.top = seatParams[mode].top
        this.left = seatParams[mode].left
        this.nickName = nickName
        this.selectable = false
        this.alias = 'seatItem'
        this.status = status || 0 // 0 初始 1 让牌 2 跟注 3 加注 4 弃牌
        this.chip = chip || 0
        this.seatId = seatId
        this.address = address
        this.mode = mode
        this.speedCount = 0
        // `M 96 100 Q 100 100 100 104`
        this.contdown = new fabric.Path(`M ${this.left} ${this.top} Z`, {
            fill: '',
            strokeWidth: 3,
            stroke: '#efe615',
            strokeLineJoin: 'round',
            objectCaching: false
        })
        this._angle = 0
        this.time = 15
        this.count = 0
        console.log(this.top -  (this.height * 0.4) * 2 - 5, this.left - 8, mode)
        this.pokerWidth = 96 * 0.4
        this.pokerOne = new PokerItem({
            top: seatParams[this.mode].ptop,
            left: this.left - this.pokerWidth * 0.2,
            type: 'bg',
            alias: 'poker',
            display: false,
            zoom: 0.4
        }, (window as any).canvasPokerImageObject).scale(0.4)
        this.pokerTwo = new PokerItem({
            top: seatParams[this.mode].ptop ,
            left: this.left - this.pokerWidth * 0.2 + this.pokerWidth,
            type: 'bg',
            alias: 'poker',
            display: false,
            zoom: 0.4
        }, (window as any).canvasPokerImageObject).scale(0.4)

    },
    _render: function(ctx: any) {
        this.ctx = ctx
        const x = -this.width/2
        const y = -this.height/2
        this.canvas.add(this.contdown)
        if (this.address) {
            this.renderItem(ctx, x, y)
            this.canvas.add(this.pokerOne)
            this.canvas.add(this.pokerTwo)
            if (this.deler) {
                this.canvas.add(new Deler({
                    top: this.top,
                    left: this.left - 18
                }))
            }
        } else {
            this.renderAddItem(ctx, x, y)
        }
    },
    renderAddItem(ctx: any, x: number, y: number) {
        strokeRoundRect(ctx, x, y, this.width, this.width, 3, 1, '#055103')
        ctx.fillStyle = '#055103'
        ctx.fillRect(x + (this.width - 24)/2, y + (this.width - 2)/2, 24, 2)
        ctx.fillRect(x + (this.width - 2)/2, y + (this.width - 24)/2, 2, 24)
    },
    renderItem(ctx: any, x: number, y: number) {
        fillRoundRect(ctx, x, y, this.width, this.height, 3, '#025103')
        strokeRoundRect(ctx, x, y, this.width, this.height, 3, 2, '#055103')
        ctx.font= '14px Arial'
        ctx.fillStyle = '#ccc'
        ctx.textAlign = 'center'
        ctx.fillText(statusText[this.status], 0, y + 16, this.width)
        ctx.fillStyle = 'rgba(0, 0, 0, 0.1)'
        ctx.fillRect(x, y + 22, this.width, this.height - 40)
        ctx.fillStyle = '#ffc000'
        ctx.fillText(this.chip, 0, y + this.height - 4, this.width)
        ctx.fillStyle = '#fff'
        ctx.font= '18px Arial'
        ctx.fillText(this.nickName, 0, 10, this.width)
    },
    resetSeatItem(user: any, mode: number) {
        if (this.address) {
            this.pokerOne && this.pokerOne.animateMove({
                top: seatParams[mode].ptop + (140 * 0.4) / 2,
                left: seatParams[mode].left - this.pokerWidth * 0.2 +  + (96 * 0.4) / 2
            }, 500)
            this.pokerTwo && this.pokerTwo.animateMove({
                top: seatParams[mode].ptop + (140 * 0.4) / 2,
                left: seatParams[mode].left - this.pokerWidth * 0.2 +  + (96 * 0.4) / 2 + this.pokerWidth
            }, 500)
        }
        this.animate({
            left: seatParams[mode].left,
            top: seatParams[mode].top
        }, {
            duration: 500,
            onChange: () => this._render(this.ctx),
            onComplete: () => {
                this.mode = mode
                this.nickName = user.nickName
                this.address = user.address
                this.chip = user.chip
                this.card = user.card
                this.deler = user.deler
                if (!!user.contdown) {
                    this.animate({
                        count: 280
                    }, {
                        duration: 15000,
                        onChange: (e:any) => {
                            if (this.speedCount < parseInt(e)) {
                                this.speedCount = parseInt(e)
                                this.setCountdown()
                                this.canvas.renderAll()
                            }
                        },
                        onComplete: () => {
                            this.contdown.path = [
                                ['M', this.left, this.top]
                            ]
                            this.canvas.renderAll()
                        }
                    })
                }
                if (this.card && user.isAccount) {
                    this.pokerOne.animateFlip(this.card[0].type + this.card[0].value, 0.4).then(() => {
                        this.pokerTwo.animateFlip(this.card[1].type + this.card[1].value, 0.4)
                    })
                }
                this._render(this.ctx)
            }
        })
    },
    setCountdown() {
        // `M 96 100 Q 100 100 100 104`
        const count = this.speedCount
        if (count < 58) {
            this.contdown.path[1][0] = 'L'
            this.contdown.path[1][1] = this.left + count
            this.contdown.path[1][2] = this.top
        } else if (count >= 58 && count <= 62) {
            this.contdown.path[2] = this.contdown.path[2] || []
            this.contdown.path[2][0] = 'Q'
            this.contdown.path[2][1] = this.left + 60
            this.contdown.path[2][2] = this.top
            this.contdown.path[2][3] = this.left + 60
            this.contdown.path[2][4] = this.top + 2
        } else if (count > 62 && count < 138) {
            this.contdown.path[3] = this.contdown.path[3] || []
            this.contdown.path[3][0] = 'L'
            this.contdown.path[3][1] = this.left + 60
            this.contdown.path[3][2] = this.top + count - 60
        } else if (count >= 138 && count <= 142) {
            this.contdown.path[4] = this.contdown.path[4] || []
            this.contdown.path[4][0] = 'Q'
            this.contdown.path[4][1] = this.left + 60
            this.contdown.path[4][2] = this.top + 80
            this.contdown.path[4][3] = this.left + 58
            this.contdown.path[4][4] = this.top + 80
        } else if (count > 142 && count < 198) {
            this.contdown.path[5] = this.contdown.path[5] || []
            this.contdown.path[5][0] = 'L'
            this.contdown.path[5][1] = this.left + 60 - (count - 140)
            this.contdown.path[5][2] = this.top + 80
        } else if (count >= 198 && count <= 202) {
            this.contdown.path[6] = this.contdown.path[6] || []
            this.contdown.path[6][0] = 'Q'
            this.contdown.path[6][1] = this.left
            this.contdown.path[6][2] = this.top + 80
            this.contdown.path[6][3] = this.left
            this.contdown.path[6][4] = this.top + 78
        } else if (count > 202 && count < 278) {
            this.contdown.path[7] = this.contdown.path[7] || []
            this.contdown.path[7][0] = 'L'
            this.contdown.path[7][1] = this.left
            this.contdown.path[7][2] = this.top + 80 - (count - 200)
        } else {
            this.contdown.path[8] = this.contdown.path[8] || []
            this.contdown.path[8][0] = 'Q'
            this.contdown.path[8][1] = this.left
            this.contdown.path[8][2] = this.top
            this.contdown.path[8][3] = this.left + 2
            this.contdown.path[8][4] = this.top
        }
    }
})