import {Service} from "typedi";

@Service()
export class StorageContainer {
    values: Map<string, any> = new Map();

    set(k: string, v: any): void {
        this.values.set(k, v)
    }

    get<T>(k: string): T {
        return this.values.get(k)
    }

}