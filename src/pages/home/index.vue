<template>
    <div class="page page-home">
        <canvas id="canvas"></canvas>
    </div>
</template>

<script setup lang="ts">
import {ref, onMounted} from 'vue'
import {fabric} from 'fabric'
import {useCreatePoker} from '../../hooks/useCreatePoker'
import {useCreateSeat} from '../../hooks/useCreateSeat'
import emitter from '../../utils/emitter'
import {usePokerStore} from '../../stores/poker'
console.log(emitter)

const pokerStore = usePokerStore()
onMounted(() => {
    const account = ref<any>(null)
    const canvasMainWidth =  document.body.clientWidth
    const canvasMainHeight = document.body.clientHeight
    const canvas = new fabric.Canvas('canvas', { 
        backgroundColor: '#037204',
        width: canvasMainWidth,
        height: canvasMainHeight
    })
    const users = pokerStore.seatData
    // [
    //     {
    //         address: '0xE615ac5226caa8B0Ec54Aa060ddcAE1e7a1125D1',
    //         nickName: 'YUN',
    //         chip: 1000,
    //         status: 0,
    //         seatId: 1
    //     },
    //     {
    //         address: '0xE615ac5226caa8B0Ec54Aa060ddcAE1e7a1125D0',
    //         nickName: 'EGT',
    //         chip: 1000,
    //         status: 0,
    //         seatId: 2
    //     },
    //     {
    //         seatId: 3
    //     },
    //     {
    //         address: '0xE615ac5226caa8B0Ec54Aa060ddcAE1e7a1125D2',
    //         nickName: 'KM',
    //         chip: 1000,
    //         status: 0,
    //         seatId: 4
    //     },
    //     {
    //         address: '0xE615ac5226caa8B0Ec54Aa060ddcAE1e7a1125D3',
    //         nickName: 'CHL',
    //         chip: 1000,
    //         status: 0,
    //         seatId: 5
    //     },
    //     {
    //         seatId: 6,
    //     },
    //     {
    //         address: '0xE615ac5226caa8B0Ec54Aa060ddcAE1e7a1125D3',
    //         nickName: 'FC',
    //         chip: 1000,
    //         status: 0,
    //         seatId: 7
    //     },
    //     {
    //         seatId: 8
    //     }
    // ]
    canvas.on('mouse:down', (e: any) => {
        console.log(e)
        const target = e.target
        if (target && target.alias === 'seatItem' && !target.address && !account.value) {
            account.value = {
                address: '0xE615ac5226caa8B0Ec54Aa060ddcAE1e7a11111',
                nickName: 'TC',
                chip: 20000,
                mode: target.mode,
                seatId: target.seatId
            }
            emitter.emit('addAccount', account.value)
        }
    })
    useCreateSeat(canvas, users)

    const s = 0.45
    useCreatePoker(canvas,  `s1`, {
        left: 76,
        top: canvasMainHeight/2 - 48
    }, s)
    // useCreatePoker(canvas,  `c1`, {
    //     left: 124,
    //     top: canvasMainHeight/2 - 48
    // }, s)
    // useCreatePoker(canvas,  `h1`, {
    //     left: 172,
    //     top: canvasMainHeight/2 - 48
    // }, s)
    // useCreatePoker(canvas,  `d1`, {
    //     left: 218,
    //     top: canvasMainHeight/2 - 48
    // }, s)
    // useCreatePoker(canvas,  `s13`, {
    //     left: 266,
    //     top: canvasMainHeight/2 - 48
    // }, s)
    // useCreatePoker(canvas, 'bg', {
    //     left: 0,
    //     top: 0
    // }, 0.5).then(res => {
    //     console.log(res, 88888)
    //     // animate(res)
    // })
    // for (let i = 1; i < 14; i ++) {
    //     useCreatePoker(canvas,  `s${i}`, {
    //         left: 20 * i,
    //         top: 140
    //     }, 0.5)
    // }
    // for (let i = 1; i < 14; i ++) {
    //     useCreatePoker(canvas,  `h${i}`, {
    //         left: 20 * i,
    //         top: 280
    //     }, 0.5)
    // }
    // for (let i = 1; i < 14; i ++) {
    //     useCreatePoker(canvas,  `c${i}`, {
    //         left: 20 * i,
    //         top: 420
    //     }, 0.5)
    // }
    // for (let i = 1; i < 14; i ++) {
    //     useCreatePoker(canvas,  `d${i}`, {
    //         left: 20 * i,
    //         top: 560
    //     }, 0.5)
    // }
    // function animate(klass: any) {
    //     // const staticCanvas: any = canvas.item(0)
    //     // console.log(staticCanvas, 999999)
    //     klass.animate('top', klass.get('top') === 500 ? '100' : '500', {
    //         duration: 1000,
    //         onChange: canvas.renderAll.bind(canvas),
    //         onComplete: () => {
    //             animate(klass)
    //         }
    //     })
    // }
})
</script>

<style lang="less">
.page-home {
    width: 100vw;
    height: 100vh;
    canvas {
        width: 100%;
        height: 100%;
    }
}
</style>