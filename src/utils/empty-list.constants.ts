import { IEmptyList } from "src/interfaces/empty-list.interface";

export const EMPTY_LIST = new Array(24).fill({
    appointment: {
        id: '',
        title: '',
        date: '',
        time: '',
        description: '',
    },
    disabled: true
})