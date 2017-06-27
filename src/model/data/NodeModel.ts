import {AttributeModel} from "./AttributeModel";
export class NodeModel {
    name: string;
    attrs: AttributeModel[];

    constructor(name: string, attrs: AttributeModel[]) {
        this.name = name;
        this.attrs = attrs;
    }
}