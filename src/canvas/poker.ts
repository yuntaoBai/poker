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
            display: false,
            zoom: this.zoom
        })
    },
    initItem(options: {width: number, height: number, top: number, left: number, type: string, alias: string, display: boolean, zoom: number}) {
        const lefts = [
            options.left,
            options.left + options.width * this.zoom,
            options.left + options.width * this.zoom * 2,
            options.left + options.width * this.zoom * 3,
            options.left + options.width * this.zoom * 4
        ]
        types.forEach((item, index) => {
            options.left = lefts[index]
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
        this[types[0]].animateFlip(items[0].type, zoom).then(() => {
            this[types[1]].animateFlip(items[1].type, zoom).then(() => {
                this[types[2]].animateFlip(items[2].type, zoom)
            })
        })
    },
    addTurnItem(item: any) {
        const zoom = this.zoom
        this[types[3]].animateFlip(item.type, zoom)
    },
    addRiverItem(item: any) {
        const zoom = this.zoom
        this[types[4]].animateFlip(item.type, zoom)
    },
    clearPokerItem() {
        types.forEach(item => {
            this[item].type = 'bg'
            this[item]._display(false)
        })
    }
})