"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by jossi on 24.06.2017.
 */
var romagny13_html_parser_1 = require("romagny13-html-parser");
var NodeModel_1 = require("../data/NodeModel");
var AttributeModel_1 = require("../data/AttributeModel");
var JSONLDMarkupParsingStrategy = (function () {
    function JSONLDMarkupParsingStrategy() {
        this.SEARCH_ATTRIBUTES = new NodeModel_1.NodeModel("script", [new AttributeModel_1.AttributeModel("type", "application/ld+json")]);
    }
    JSONLDMarkupParsingStrategy.prototype.getData = function (fileContents) {
        var nodes = romagny13_html_parser_1.parse(fileContents);
        var indexOfStuff = this.recursiveIterate(nodes, this.SEARCH_ATTRIBUTES);
        var nextElement;
        var previousElement = nodes[0];
        for (var i = 0; i < indexOfStuff.length; i++) {
            if (i < indexOfStuff.length - 1) {
                nextElement = previousElement.children[indexOfStuff[i]];
                previousElement = nextElement.children[indexOfStuff[i + 1]];
            }
            else {
                return JSON.parse(previousElement.innerHTML);
            }
        }
    };
    JSONLDMarkupParsingStrategy.prototype.findNeedleInHaystack = function (nodes, needle, returnArray) {
        for (var i = 0; i < nodes.length; i++) {
            var found = false;
            var node = nodes[i];
            if (node.children.length > 0) {
                returnArray.push(i);
            }
            for (var _i = 0, _a = node["attrs"]; _i < _a.length; _i++) {
                var nodeAttribute = _a[_i];
                for (var _b = 0, _c = needle.attrs; _b < _c.length; _b++) {
                    var givenAttribute = _c[_b];
                    if (nodeAttribute["name"] == givenAttribute["name"] && nodeAttribute["value"] == givenAttribute["value"]) {
                        returnArray.push(i);
                        found = true;
                    }
                }
            }
            if (nodes.length == i + 1 && !found && node.children.length == 0) {
                returnArray = [];
            }
            if (node.children.length > 0) {
                returnArray = this.findNeedleInHaystack(node.children, needle, returnArray);
            }
        }
        return returnArray;
    };
    JSONLDMarkupParsingStrategy.prototype.recursiveIterate = function (nodes, needle) {
        return this.findNeedleInHaystack(nodes, needle, []);
    };
    return JSONLDMarkupParsingStrategy;
}());
exports.JSONLDMarkupParsingStrategy = JSONLDMarkupParsingStrategy;
