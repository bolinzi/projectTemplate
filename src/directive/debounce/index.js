/**
     * 自定义防抖指令
     * @param {*} binding 函数名
*/
export default {
    inserted: function(el, binding) {
        let timer;
        el.addEventListener('click', () => {
            if (timer) {
                clearTimeout(timer);
            }
            timer = setTimeout(() => {
                //关键点:vue 的自定义指令传递的参数binding 如果是一个函数,则通过      binding.value()来执行,通过上述示例,还可以传递比如事件, 绑定对象之类的
                binding.value();
            }, 300);
        });
    }
};
