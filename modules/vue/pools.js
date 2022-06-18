import { checkExpressionHasData, checkFunctionHasArgs } from './shared/utils';
import { vEvent } from "./shared/propTypes";

export const eventPool = new Map();
export const expPool = new Map();

const regExpr = /\{\{(.+?)\}\}/;

export default function (vm, methods) {
    const { $nodes, $data } = vm;
    const allNodes = $nodes.querySelectorAll('*');
    const { vClick } = vEvent;
    allNodes.forEach(node => {
        const vExpression = node.textContent;
        const exprMatched = vExpression.match(regExpr);
        const vClickVal = node.getAttribute(`@${vClick}`);
        if (exprMatched) {
            const poolInfo = checkExpressionHasData($data, exprMatched[1].trim());
            poolInfo && expPool.set(node, poolInfo);
        }
        if (vClickVal) {
            const fnInfo = checkFunctionHasArgs(vClickVal);
            const handler = fnInfo ? methods[fnInfo.methodName].bind(vm, ...fnInfo.args) : methods[vClickVal].bind(vm);
            eventPool.set(node, {
                type: vClick,
                handler
            });
            node.removeAttribute(`@${vClick}`);
        }
    })
}

/**
 *
 * [
 *   {
 *     h1: {
 *         key: count,
 *         expression: key?
 *     }
 *   }
 * ]
 *
 *
 * [
 *  {
 *      button: {
 *          type: click,
 *          handler: methods.plus.bind(vm, ...args);
 *      }
 *  }
 * ]
 *
 *
 *
 *
 */
