/**
 * @file:      util工具
 * @author:    花夏(liubiao@itoxs.com)
 * @version:   V1.0.0
 * @date:      2018/8/23 下午4:24:09
 */
import * as CryptoJS from 'crypto-js';
/**
 * @param {Number} times 回调函数需要执行的次数
 * @param {Function} callback 回调函数
 */
export const doCustomTimes = (times, callback) => {
    let i = -1;
    while (++i < times) {
        callback(i);
    }
};
export const randomString = len => {
    let random = '';
    random = Math.ceil(Math.random() * 100000000000000)
        .toString()
        .substr(0, len || 4);
    random = random + Date.now();
    return random;
};
/**
 *加密处理
 */
export const encryption = params => {
    let { data, type, param, key } = params;
    const result = JSON.parse(JSON.stringify(data));
    if (type === 'Base64') {
        param.forEach(ele => {
            result[ele] = btoa(result[ele]);
        });
    } else {
        param.forEach(ele => {
            let data = result[ele];
            key = CryptoJS.enc.Latin1.parse(key);
            let iv = key;
            // 加密
            let encrypted = CryptoJS.AES.encrypt(data, key, {
                iv: iv,
                mode: CryptoJS.mode.CBC
            });
            result[ele] = encrypted.toString();
        });
    }
    return result;
};
export const downloadExcel = (data, name) => {
    const aEle = document.createElement('a');
    const href = URL.createObjectURL(
        new Blob([data], { type: 'application/vnd.ms-excel' })
    );
    aEle.href = href;
    aEle.download = `${name}.xls`;
    document.body.appendChild(aEle);
    aEle.click();
    document.body.removeChild(aEle);
    URL.revokeObjectURL(href);
};
/**
 * tree 数据转换
 * @param  {Array} tree 待转换的 tree
 * @param  {Object} map  键值对映射
 * @return {Array}      转换后的 tree
 */
export const convertTree = (tree, map) => {
    const result = [];
    // 遍历 tree
    tree.forEach((item) => {
        // 读取 map 的键值映射
        const value = item[map.value] + '';
        const label = item[map.label];
        let children = item[map.children || 'children'];
        // 如果有子节点，递归
        if (children) {
            children = convertTree(children, map);
        }
        result.push({
            value,
            label,
            children
        });
    });
    return result;
}
export const watermark = settings => {
    let maskBox = document.getElementById('mask-box');
    if (maskBox !== null) {
        document.body.removeChild(maskBox);
    }
    // 默认设置
    let defaultSettings = {
        watermark_txt: 'text',
        watermark_x: 20, // 水印起始位置x轴坐标
        watermark_y: 20, // 水印起始位置Y轴坐标
        watermark_rows: 20, // 水印行数
        watermark_cols: 20, // 水印列数
        watermark_x_space: 100, // 水印x轴间隔
        watermark_y_space: 50, // 水印y轴间隔
        watermark_color: '#c9c9c9', // 水印字体颜色
        watermark_alpha: 0.3, // 水印透明度
        watermark_fontsize: '12px', // 水印字体大小
        watermark_font: '微软雅黑', // 水印字体
        watermark_width: 210, // 水印宽度
        watermark_height: 80, // 水印长度
        watermark_angle: 15 // 水印倾斜度数
    };
    Object.assign(defaultSettings, settings);
    let oTemp = document.createDocumentFragment();
    // 获取页面最大宽度
    let p_width = Math.max(
        document.body.scrollWidth,
        document.body.clientWidth
    );
    let cutWidth = p_width * 0.015;
    let page_width = p_width - cutWidth;
    // 获取页面最大高度
    let page_height =
        Math.max(document.body.scrollHeight, document.body.clientHeight) + 450;
    // let page_height = document.body.scrollHeight+document.body.scrollTop;
    // 如果将水印列数设置为0，或水印列数设置过大，超过页面最大宽度，则重新计算水印列数和水印x轴间隔
    if (
        defaultSettings.watermark_cols === 0 ||
        parseInt(
            defaultSettings.watermark_x
            + defaultSettings.watermark_width
            * defaultSettings.watermark_cols
            + defaultSettings.watermark_x_space
            * (defaultSettings.watermark_cols - 1)
        ) > page_width
    ) {
        defaultSettings.watermark_cols = parseInt(
            (page_width -
            defaultSettings.watermark_x
            + defaultSettings.watermark_x_space)
            / (defaultSettings.watermark_width
            + defaultSettings.watermark_x_space)
        );
        defaultSettings.watermark_x_space = parseInt(
            (page_width
            - defaultSettings.watermark_x
            - defaultSettings.watermark_width
            * defaultSettings.watermark_cols)
            / (defaultSettings.watermark_cols - 1)
        );
    }
    // 如果将水印行数设置为0，或水印行数设置过大，超过页面最大长度，则重新计算水印行数和水印y轴间隔
    if (
        defaultSettings.watermark_rows === 0 ||
        parseInt(
            defaultSettings.watermark_y
            + defaultSettings.watermark_height
            * defaultSettings.watermark_rows
            + defaultSettings.watermark_y_space
            * (defaultSettings.watermark_rows - 1)
        ) > page_height
    ) {
        defaultSettings.watermark_rows = parseInt(
            (defaultSettings.watermark_y_space +
                page_height -
                defaultSettings.watermark_y) /
                (defaultSettings.watermark_height +
                    defaultSettings.watermark_y_space)
        );
        defaultSettings.watermark_y_space = parseInt(
            (page_height - defaultSettings.watermark_y - defaultSettings.watermark_height * defaultSettings.watermark_rows) / (defaultSettings.watermark_rows - 1)
        );
    }
    let x;
    let y;
    for (let i = 0; i < defaultSettings.watermark_rows; i++) {
        y = defaultSettings.watermark_y + (defaultSettings.watermark_y_space + defaultSettings.watermark_height) * i;
        for (let j = 0; j < defaultSettings.watermark_cols; j++) {
            x = defaultSettings.watermark_x + (defaultSettings.watermark_width + defaultSettings.watermark_x_space) * j;
            let maskEle = document.createElement('span');
            maskEle.id = 'mask-ele' + i + j;
            maskEle.className = 'mask-ele';
            maskEle.appendChild(
                document.createTextNode(defaultSettings.watermark_txt)
            );
            // 设置水印div倾斜显示
            maskEle.style.webkitTransform = 'rotate(-' + defaultSettings.watermark_angle + 'deg)';
            maskEle.style.MozTransform = 'rotate(-' + defaultSettings.watermark_angle + 'deg)';
            maskEle.style.msTransform = 'rotate(-' + defaultSettings.watermark_angle + 'deg)';
            maskEle.style.OTransform = 'rotate(-' + defaultSettings.watermark_angle + 'deg)';
            maskEle.style.transform = 'rotate(-' + defaultSettings.watermark_angle + 'deg)';
            maskEle.style.visibility = '';
            maskEle.style.position = 'absolute';
            maskEle.style.left = x + 'px';
            maskEle.style.top = y + 'px';
            maskEle.style.overflow = 'hidden';
            maskEle.style.zIndex = '9999';
            maskEle.style.pointerEvents = 'none'; // pointer-events:none 让水印不遮挡页面的点击事件
            maskEle.style.opacity = defaultSettings.watermark_alpha;
            maskEle.style.fontSize = defaultSettings.watermark_fontsize;
            maskEle.style.fontFamily = defaultSettings.watermark_font;
            maskEle.style.color = defaultSettings.watermark_color;
            maskEle.style.textAlign = 'center';
            maskEle.style.width = defaultSettings.watermark_width + 'px';
            maskEle.style.height = defaultSettings.watermark_height + 'px';
            maskEle.style.display = 'block';
            oTemp.appendChild(maskEle);
        }
    }
    maskBox = document.createElement('div');
    maskBox.id = 'mask-box';
    document.body.appendChild(maskBox);
    maskBox.appendChild(oTemp);
};
