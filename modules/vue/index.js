import { getFirstChildNode } from "./shared/utils";
import reactive from './reactive';
import pools, { eventPool, expPool } from './pools';

const Vue = {
    createApp,
}

function createApp(component) {
    const vm = {};
    const { data, methods, template } = component;
    vm.mount = mount;
    vm.$nodes = createNode(template);

    const init = () => {
        reactive(vm, data);
        pools(vm, methods);
    }
    init();
    return vm;
}

function createNode(template) {
    const _tempNode = document.createElement('div');
    _tempNode.innerHTML = template;
    return getFirstChildNode(_tempNode);
}

function mount(el) {
    console.log(el, this);
}

export {
    createApp,
}

export default Vue;
