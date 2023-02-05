import {fabric} from 'fabric'
import pokerParams from '../config/poker'
import Poker from '../canvas/poker'

export async function useCreatePoker(canvas: any, type: string, options: {}, scale = 1) {
    const params: object = pokerParams[type]
    const image = new Poker({
        width: 96,
        height: 140,
        pokers: []
    })
    canvas.add(image)
    // setTimeout(() => {
    //     image.addFlopItem([{type: 's9'}, {type: 'd9'}, {type: 'h12'}])
    //     setTimeout(() => {
    //         image.addTurnItem({type: 's6'})
    //         setTimeout(() => {
    //             image.addRiverItem({type: 'd1'})
    //             setTimeout(() => {
    //                 image.clearPokerItem()
    //             }, 3000)
    //         }, 3000)
    //     }, 3000)
    // }, 3000)
    return image
}