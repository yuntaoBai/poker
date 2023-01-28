import {fabric} from 'fabric'
import pokerParams from '../config/poker'
import Poker from '../canvas/poker'

export async function useCreatePoker(canvas: any, type: string, options: {}, scale = 1) {
    const params: object = pokerParams[type]
    const images: any = new Image()
    images.src = '../src/assets/images/poker.png'
    images.onload = (() => {
        const image = new Poker({
            width: 96,
            height: 140,
            image: images,
            pokers: []
        })
        canvas.add(image)
        setTimeout(() => {
            image.addPokerItem([{type: 's9'}, {type: 'd9'}, {type: 'h12'}])
            setTimeout(() => {
                image.addPokerItem([{type: 's6'}])
                setTimeout(() => {
                    image.addPokerItem([{type: 'd1'}])
                    setTimeout(() => {
                        image.clearPokerItem()
                    }, 3000)
                }, 3000)
            }, 3000)
        }, 3000)
    })
    // const imageResult:any = await new Promise((resolve, reject) => {
    //     fabric.Image.fromURL('../src/assets/images/poker.png', function(img) {
    //         resolve(img)
    //     })
    // })
    // const image: any = imageResult.set({ 
    //     width: 96,
    //     height: 140,
    //     ...options,
    //     ...params
    // }).scale(scale)
    return images
}