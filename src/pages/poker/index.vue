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

const route = useRoute()
// const a = getCurrentInstance()
const socket: any = inject('socket')
const pokerStore = usePokerStore()
const accountStore = useAccountStore()
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
    socket.emit('getRoomInfo', route.params.id)
    socket.on('getRoomInfo', (res: string) => {
        const data: {seats: any[], roomId: number, status: number} = JSON.parse(res)
        pokerStore.setSeatData(data.seats)
        useCreateSeat(canvas, data.seats)
    })
    
    canvas.on('mouse:down', (e: any) => {
        console.log(e)
        const target = e.target
        if (target && target.alias === 'seatItem' && !target.address && !account.value) {
            account.value = {
                address: accountStore.address,
                nickName: accountStore.nickName,
                chip: accountStore.chip,
                mode: target.mode,
                seatId: target.seatId
            }
            emitter.emit('addAccount', account.value)
        }
    })
    const s = 0.45
    useCreatePoker(canvas,  `s1`, {
        left: 76,
        top: canvasMainHeight/2 - 48
    }, s)
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