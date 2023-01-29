import { defineStore } from 'pinia'

export const useAccountStore = defineStore('account', {
    state: () => {
        return {
            address: 'sdsdfsfsdvfwesdfsdf',
            nickName: 'BYT',
            chip: 5000,
            status: 0,
            headImg: ''
        }
    },
    actions: {
        setAddress(value: string) {
            this.address = value
        },
        setNickName(value: string) {
            this.nickName = value
        },
        setChip(value: number) {
            this.chip = value
        },
        setStatus(value: number) {
            this.status = value
        },
        setHeadImg(value: string) {
            this.headImg = value
        }
    }
})