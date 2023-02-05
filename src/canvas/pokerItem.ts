import { fabric } from 'fabric'
import pokerParams from '../config/poker'

type optionsParams = {
    width?: number
    height?: number
    top: number
    left: number
    type: string
    alias: string
    display: boolean
    zoom: number
}
export default fabric.util.createClass(fabric.Image, {
    // objectCaching: false,
    originX: 'center',
    originY: 'center',
    initialize: function(options: optionsParams, image: any) {
        this.callSuper('initialize', options)
        const {width, height, top, left, type, alias, display, zoom} = options
        this.selectable = false
        this.width = width || 96
        this.height = height || 140
        this.top = top + this.height * zoom/2
        this.left = left + this.width * zoom/2
        this.type = type
        this.image = image
        this.alias = alias || 'poker'
        this.display = display
    },
    _render: function(ctx: any) {
        if (this.display) {
            const cropX = pokerParams[this.type].cropX
            const cropY = pokerParams[this.type].cropY
            ctx.drawImage(
                this.image,
                cropX, cropY,
                this.width, this.height,
                -this.width/2, -this.width/2,
                this.width, this.height
            )
        }
    },
    _display(v:boolean) {
        this.display = v
        this.canvas.renderAll()
    },
    animateFlip(type: string, zoom: number) {
        this._display(true)
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                this.animate('scaleX', 0, {
                    duration: 150,
                    onChange: () => this.canvas.renderAll(),
                    onComplete: () => {
                        this.type = type
                        this.animate('scaleX', zoom, {
                            duration: 100,
                            onChange: () => this.canvas.renderAll(),
                            onComplete: () => {
                                resolve(this)
                            }
                        })
                    }
                })
            }, 100)
        })
    },
    animateMove(keys: object, duration: number) {
        return new Promise((resolve, reject) => {
            this.animate({...keys}, {
                duration,
                onChange: () => this.canvas.renderAll(),
                onComplete: () => {
                    resolve(this)
                }
            })
        })
    }
})