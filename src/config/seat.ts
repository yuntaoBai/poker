type seatParamItem = {
    top: number 
    left: number
    ptop: number
}
interface seatParam {
    [key: string]: seatParamItem;
}

const {clientWidth, clientHeight} = document.body

export const width = 60
export const height = 80

export const seatKeys = [1, 2, 3, 4, 5, 6, 7, 8]

const seatConfig: seatParam = {
    1: {
        top: clientHeight - height - 30,
        left: (clientWidth - width)/2,
        ptop: clientHeight - height - 30 - height + 10
    },
    2: {
        top: (clientHeight/4) * 3 - height/2,
        left: 10,
        ptop: (clientHeight/4) * 3 - height/2 - height + 10
    },
    3: {
        top: (clientHeight - height)/2,
        left: 10,
        ptop: (clientHeight - height)/2 - height + 10
    },
    4: {
        top: clientHeight/4 - height/2,
        left: 10,
        ptop: clientHeight/4 - height/2 - height + 10
    },
    5: {
        top: 30,
        left: (clientWidth - width)/2,
        ptop: 30 + height
    },
    6: {
        top: clientHeight/4 - height/2,
        left: clientWidth - width - 10,
        ptop: clientHeight/4 - height/2 - height + 10
    },
    7: {
        top: (clientHeight - height)/2,
        left: clientWidth - width - 10,
        ptop: (clientHeight - height)/2 - height + 10
    },
    8: {
        top: (clientHeight/4) * 3 - height/2,
        left: clientWidth - width - 10,
        ptop: (clientHeight/4) * 3 - height/2 - height + 10
    }
}

export default seatConfig