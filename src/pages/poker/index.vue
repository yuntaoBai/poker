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
        socket.emit('getRoomInfo', route.params.id)
        socket.on('getRoomInfo', (res: string) => {
            const data: {seats: any[], roomId: number, status: number} = JSON.parse(res)
            pokerStore.setSeatData(data.seats)
            useCreateSeat(canvas, data.seats)
        })
        setTimeout(() => {
            socket.emit('addUser', {
                address: 'accountStore.address',
                nickName: 'FGT',
                chip: 643,
                seatId: 5
            })
            socket.emit('addUser', {
                address: 'accountStore.address',
                nickName: 'FGT',
                chip: 643,
                seatId: 6
            })
            socket.emit('addUser', {
                address: 'fdfdsfsd',
                nickName: 'GHH',
                chip: 4232,
                seatId: 2
            })
            socket.emit('addUser', {
                address: 'ffddsfsdfs',
                nickName: 'AAA',
                chip: 32312,
                seatId: 7
            })
        }, 5000)
        const s = 0.45
        useCreatePoker(canvas,  `s1`, {
            left: 76,
            top: canvasMainHeight/2 - 48
        }, s)
    })
    canvas.on('mouse:down', (e: any) => {
        console.log(e)
        const target = e.target
        if (target && target.alias === 'seatItem' && !target.address && !accountStore.play.status) {
            const account = {
                address: accountStore.address,
                nickName: accountStore.nickName,
                chip: accountStore.chip,
                // mode: target.mode,
                seatId: target.seatId
            }
            accountStore.setPlay({
                status: true,
                seatId: target.seatId,
                mode: target.mode
            })
            socket.emit('addUser', account)
            setTimeout(() => {
                socket.emit('start')
            }, 3000)
            // socket.on('addUser', (user: any) => {
            //     emitter.emit('addAccount', account)
            // })
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