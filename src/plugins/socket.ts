
import socketIoClient from 'socket.io-client'

export default {
    install: (app: { provide: (arg0: string, arg1: any) => void,config: { globalProperties: { $socket: (key: any) => any } } }, options?: {url?: string, autoConnect?: boolean}) => {
        const socketIo: any = socketIoClient(options?.url || 'ws://localhost:3000', {
            autoConnect: options?.autoConnect || true
        })
        app.config.globalProperties.$socket = socketIo
        app.provide('socket', socketIo)
    }
  }