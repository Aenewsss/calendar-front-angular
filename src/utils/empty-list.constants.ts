import { IEmptyList } from "src/interfaces/empty-list.interface";

export const EMPTY_LIST: IEmptyList[] = new Array(23).fill({
    appointment: {
        _id: '',
        title: '',
        date: '',
        time: '',
        description: '',
    },
    disabled: true
})
// { appointment: {}, disabled: true }