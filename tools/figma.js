"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var path = require("path");
var TOKEN = process.env.FIGMA_TOKEN;
var PRIMITIVE_FIGMA_FILE_KEY = process.env.PRIMITIVE_FIGMA_DESIGN_FILE_KEY;
var SEMANTIC_FIGMA_FILE_KEY = process.env.SEMANTIC_FIGMA_DESIGN_FILE_KEY;
function isVariableAlias(value) {
    return "type" in value && value.type === "VARIABLE_ALIAS";
}
function fetchLocalVariables(fileKey) {
    return __awaiter(this, void 0, void 0, function () {
        var url, headers, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    url = "https://api.figma.com/v1/files/".concat(fileKey, "/variables/local");
                    headers = { "X-FIGMA-TOKEN": TOKEN };
                    return [4 /*yield*/, fetch(url, {
                            headers: headers,
                        }).then(function (response) { return response.json(); })];
                case 1:
                    response = _a.sent();
                    return [2 /*return*/, response.meta];
            }
        });
    });
}
function rgbaToHex(r, g, b, a) {
    var hr = Math.round(r).toString(16).padStart(2, "0");
    var hg = Math.round(g).toString(16).padStart(2, "0");
    var hb = Math.round(b).toString(16).padStart(2, "0");
    var ha = typeof a === "undefined" || a === 1
        ? ""
        : Math.round(a * 255)
            .toString(16)
            .padStart(2, "0");
    return "#" + hr + hg + hb + ha;
}
function toHexValue(color) {
    var r = color.r, g = color.g, b = color.b, a = color.a;
    var hex = rgbaToHex(r * 255, g * 255, b * 255, a);
    return hex;
}
function findVariableCollectionByName(name, variableCollections) {
    return Object.values(variableCollections).find(function (collection) { return collection.name === name; });
}
function findVariableById(id, variables) {
    var hoge = Object.values(variables).find(function (variable) { return (variable.id === id); });
    if (typeof hoge === "undefined") {
        //console.log(id);
    }
    return hoge;
}
function resolveColorVariable(variable, referencedVariables) {
    if (variable.resolvedType !== "COLOR") {
        throw new Error("変数の型がCOLORではありません");
    }
    var value = Object.values(variable.valuesByMode)[0];
    if (!isVariableAlias(value)) {
        return variable;
    }
    var referencedVariable = findVariableById(value.id, referencedVariables);
    if (!referencedVariable) {
        throw new Error("参照先の変数が見つかりません");
    }
    return resolveColorVariable(referencedVariable, referencedVariables);
}
function toColorTree(colorTokens) {
    var sortedColorTokens = __spreadArray([], colorTokens, true);
    sortedColorTokens.sort(function (a, b) { return a.color.localeCompare(b.color, "en"); });
    return Object.fromEntries(sortedColorTokens.map(function (_a) {
        var color = _a.color, value = _a.value;
        return [color, { value: value }];
    }));
}
var main = function () { return __awaiter(void 0, void 0, void 0, function () {
    var primitiveLocalVariables, semanticLocalVariables, uiPrimitiveColorCollection, semanticColorCollection, primitiveColorTokens, allVariables, semanticColorTokens, colorContent, outputDir;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, fetchLocalVariables(PRIMITIVE_FIGMA_FILE_KEY)];
            case 1:
                primitiveLocalVariables = _a.sent();
                return [4 /*yield*/, fetchLocalVariables(SEMANTIC_FIGMA_FILE_KEY)];
            case 2:
                semanticLocalVariables = _a.sent();
                uiPrimitiveColorCollection = findVariableCollectionByName("Primitive", primitiveLocalVariables.variableCollections);
                semanticColorCollection = findVariableCollectionByName("UI Semantic Color", semanticLocalVariables.variableCollections);
                console.log(JSON.stringify(semanticColorCollection) + "だよ");
                primitiveColorTokens = uiPrimitiveColorCollection.variableIds
                    .map(function (variableId) {
                    return findVariableById(variableId, primitiveLocalVariables.variables);
                })
                    .filter(function (variable) { return !variable.deletedButReferenced; })
                    .filter(function (variable) { return !variable.remote; })
                    .map(function (variable) {
                    var resolvedVariable = resolveColorVariable(variable, primitiveLocalVariables.variables);
                    var color = "primitive-".concat(variable.name
                        .split("/")
                        .slice(1)
                        .join("-")
                        .trim());
                    var value = Object.values(resolvedVariable.valuesByMode)[0];
                    return {
                        color: color,
                        value: toHexValue(value),
                    };
                });
                allVariables = __assign(__assign({}, primitiveLocalVariables.variables), semanticLocalVariables.variables);
                semanticColorTokens = semanticColorCollection.variableIds
                    .map(function (variableId) {
                    return findVariableById(variableId, semanticLocalVariables.variables);
                })
                    .filter(function (variable) { return !variable.deletedButReferenced; })
                    .filter(function (variable) { return !variable.remote; })
                    .map(function (variable) {
                    var resolvedVariable = resolveColorVariable(variable, allVariables);
                    var color = "semantic-".concat(variable.name.split("/").join("-").trim());
                    var value = Object.values(resolvedVariable.valuesByMode)[0];
                    return {
                        color: color,
                        value: toHexValue(value),
                    };
                });
                colorContent = JSON.stringify({
                    color: toColorTree(primitiveColorTokens.concat(semanticColorTokens)),
                });
                outputDir = path.resolve(__dirname, "tokens/color");
                if (!fs.existsSync(outputDir)) {
                    fs.mkdirSync(outputDir);
                }
                fs.writeFileSync(path.join(outputDir, "base.json"), colorContent);
                console.log("DONE");
                return [2 /*return*/];
        }
    });
}); };
main();
