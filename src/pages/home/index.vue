<template>
    <div class="page page-home">
        <div class="poker-list">
            <div class="poker-item" v-for="(item, index) in data" :key="index" @click="gotoPoker(item)">
                <div>{{item.name}}</div>
                <div>{{ item.users }}人</div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import {ref, onMounted, getCurrentInstance} from 'vue'
import {useRouter} from 'vue-router'

const router = useRouter()
const data = [
    { name: '房间 - 01', id: 1, users: 1},
    { name: '房间 - 02', id: 2, users: 3},
    { name: '房间 - 03', id: 3, users: 5},
    { name: '房间 - 04', id: 4, users: 4},
    { name: '房间 - 05', id: 5, users: 8}
]
const gotoPoker = (item: any) => {
    router.push('/poker/' + item.id)
}
</script>

<style lang="less">
.page-home {
    width: 100vw;
    .poker-list {
        padding: 0 16px;
        .poker-item {
            display: flex;
            justify-content: space-between;
            color: #fff;
            background-color: #666;
            padding: 12px;
            margin: 6px 0;
            border-radius: 3px;
        }
    }
}
</style>