import { fabric } from 'fabric'

type optionsParams = {
    top: number
    left: number
}

export default fabric.util.createClass(fabric.Object, {
    initialize: function(options: optionsParams) {
        this.callSuper('initialize', options)
        const {top, left} = options
        this.top = top
        this.left = left

    },
    _render: function(ctx: any) {
        ctx.save()
        ctx.beginPath()
        ctx.fillStyle = '#fff'
        ctx.strokeStyle = 2
        ctx.lineWidth = 1
        ctx.arc(0, 0, 8 , 0, Math.PI*2)
        ctx.fill()
        ctx.stroke()
        ctx.closePath()
        ctx.font= '14px Arial'
        ctx.fillStyle = '#000'
        ctx.textAlign = 'center'
        ctx.fillText('D', 0 ,5, 12)
        ctx.restore()
    }
})