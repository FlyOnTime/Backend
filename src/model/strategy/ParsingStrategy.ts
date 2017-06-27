import {NodeModel} from "../data/NodeModel";
export interface ParsingStrategy {
    getData(fileContents: string): JSON;
    findNeedleInHaystack(nodes: RNode[], needle: NodeModel, returnArray: number[]): number[]
}