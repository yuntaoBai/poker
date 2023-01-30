import { fabric } from 'fabric'
import { render } from 'vue'
import PokerItem from './pokerItem'

type optionsParams = {
    width: number
    height: number
}

const types = ['flop1', 'flop2', 'flop3', 'turn', 'river']

export default fabric.util.createClass(fabric.Object, {
    initialize: function(options: optionsParams) {
        this.callSuper('initialize', options)
        this.width = options.width
        this.height = options.height
        this.selectable = false
        this.image = (window as any).canvasPokerImageObject
        const width =  document.body.clientWidth - 160
        this.zoom = (width/5)/this.width
        this.initItem({
            width: this.width,
            height: this.height,
            top: document.body.clientHeight/2 - 80,
            left: 80,
            type: 'bg',
            alias: 'poker',
            display: this.flopDisplay,
            zoom: this.zoom
        })
    },
    initItem(options: object) {
        types.forEach(item => {
            this[item] = new PokerItem({...options}, this.image).scale(this.zoom)
        })
    },
    _render: function(ctx: any) {
        types.forEach(item => {
            this.canvas.add(this[item])
        })
    },
    async addFlopItem(items: any[]) {
        const zoom = this.zoom
        this[types[0]].animateFlip(items[0].type, zoom)

        this[types[1]].animateMove({
            left: this[types[0]].left + this[types[1]].width * zoom
        }, 150).then((e: any) => {
            e.animateFlip(items[1].type, zoom)
        })

        this[types[2]].animateMove({
            left: this[types[0]].left + (this[types[2]].width * zoom) * 2
        }, 150).then((e: any) => {
            e.animateFlip(items[2].type, zoom)
        })
    },
    addTurnItem(item: any) {
        const zoom = this.zoom
        this[types[3]].animateMove({
            left: this[types[0]].left + (this[types[3]].width * zoom) * 3
        }, 150).then((e: any) => {
            e.animateFlip(item.type, zoom)
        })
    },
    addRiverItem(item: any) {
        const zoom = this.zoom
        this[types[4]].animateMove({
            left: this[types[0]].left + (this[types[4]].width * zoom) * 4
        }, 150).then((e: any) => {
            e.animateFlip(item.type, zoom)
        })
    },
    clearPokerItem() {
        types.forEach(item => {
            this[item].left = 80
            this[item].type = 'bg'
            this[item]._display(false)
        })
    }
})