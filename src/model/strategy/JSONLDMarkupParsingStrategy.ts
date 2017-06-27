/**
 * Created by jossi on 24.06.2017.
 */
import { parse } from "romagny13-html-parser";
import {NodeModel} from "../data/NodeModel";
import {AttributeModel} from "../data/AttributeModel";
import {ParsingStrategy} from "./ParsingStrategy";

export class JSONLDMarkupParsingStrategy implements ParsingStrategy{

    private SEARCH_ATTRIBUTES: NodeModel = new NodeModel("script", [new AttributeModel("type", "application/ld+json")]);

    getData(fileContents: string): JSON {

        let nodes: RNode[] = parse(fileContents);
        let indexOfStuff: number[] = this.recursiveIterate(nodes, this.SEARCH_ATTRIBUTES);
        let nextElement;
        let previousElement = nodes[0];
        for (let i = 0; i < indexOfStuff.length; i++) {
            if (i < indexOfStuff.length - 1) {
                nextElement = previousElement.children[indexOfStuff[i]];
                previousElement = nextElement.children[indexOfStuff[i+1]];
            } else {
                return JSON.parse(previousElement.innerHTML);
            }
        }

    }

    findNeedleInHaystack(nodes: RNode[], needle: NodeModel, returnArray: number[]): number[] {
        for (let i = 0; i < nodes.length; i++) {
            let found: boolean = false;
            let node = nodes[i];

            if (node.children.length > 0) {
                returnArray.push(i);
            }

            for (let nodeAttribute of node["attrs"]) {
                for (let givenAttribute of needle.attrs) {
                    if (nodeAttribute["name"] == givenAttribute["name"] && nodeAttribute["value"] == givenAttribute["value"]) {
                        returnArray.push(i);
                        found = true;
                    }
                }
            }
            if (nodes.length == i+1 && !found && node.children.length == 0) {
                returnArray = [];
            }
            if (node.children.length > 0) {
                returnArray = this.findNeedleInHaystack(node.children, needle, returnArray);
            }
        }
        return returnArray;
    }

    public recursiveIterate(nodes: RNode[], needle: NodeModel): number[] {
        return this.findNeedleInHaystack(nodes, needle, []);
    }

}