<template>
    <div class="page page-poker">
        <canvas id="canvas"></canvas>
    </div>
</template>

<script setup lang="ts">
import {ref, onMounted, getCurrentInstance, inject} from 'vue'
import {useRoute} from 'vue-router'
import {fabric} from 'fabric'
import {useCreatePoker} from '../../hooks/useCreatePoker'
import {useCreateSeat} from '../../hooks/useCreateSeat'
import emitter from '../../utils/emitter'
import {usePokerStore} from '../../stores/poker'
import {useAccountStore} from '../../stores/account'
import Poker from "../../canvas/poker";

const route = useRoute()
// const a = getCurrentInstance()
const socket: any = inject('socket')
const pokerStore = usePokerStore()
const accountStore = useAccountStore()
onMounted(() => {
    const canvasMainWidth =  document.body.clientWidth
    const canvasMainHeight = document.body.clientHeight
    const canvas = new fabric.Canvas('canvas', { 
        backgroundColor: '#037204',
        width: canvasMainWidth,
        height: canvasMainHeight
    })
    const PokerImage: any = new Image()
    PokerImage.src = '../src/assets/images/poker.png'
    PokerImage.onload = (() => {
        (window as any).canvasPokerImageObject = PokerImage
        socket.emit('game')
        socket.on('data', (res: string) => {
            const data: {seats: any[], id: number, status: number} = JSON.parse(res)
            pokerStore.setSeatData(data.seats)
            useCreateSeat(canvas, data.seats)
        })
        setTimeout(() => {
            socket.emit('betting', {
                address: '12312312',
                nickName: 'SDS',
                chip: 2000,
                place: 0
            })
            setTimeout(() => {
                socket.emit('betting', {
                    address: '12312312',
                    nickName: 'SDS',
                    chip: 2000,
                    place: 1
                })
            }, 10000)
        }, 5000)
        // const s = 0.45
        // useCreatePoker(canvas,  `s1`, {
        //     left: 76,
        //     top: canvasMainHeight/2 - 48
        // }, s)
    })
    canvas.on('mouse:down', (e: any) => {
        console.log(e)
        const target = e.target
        if (target && target.alias === 'seatItem' && !target.address && !accountStore.play.status) {
            const account = {
                seatId: target.seatId,
                userInfo: {
                    address: accountStore.address,
                    nickName: accountStore.nickName,
                    chip: accountStore.chip,
                }
            }
            accountStore.setPlay({
                status: true,
                seatId: target.seatId,
                mode: target.mode
            })
            socket.emit('add-user', account)
        }
    })
})
</script>

<style lang="less">
.page-poker {
    width: 100vw;
    height: 100vh;
    canvas {
        width: 100%;
        height: 100%;
    }
}
</style>