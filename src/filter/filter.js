import util from '../libs/utils';
/**
     * 日期转换
     * @param {*} date 日期
     * @param {*} type 日期格式化类型
*/
let dateFormat = (date, type) => {
    let time = date;
    if (!time) {
        return '-';
    } else if (time.toString().length === 10 && !isNaN(time)) {
        time *= 1000;
    }
    return util.dateFormat(new Date(time), type);
};
/**
     * 计算文件大小
     * @param {*} value 文件大小数，单位为B
*/
let fileSize = (value) => {
    if (!value) {
        return '0B';
    }
    let size = '';
    let num = 1024.00;
    if (value < num) {
        size = value + 'B';
    } else if (value < Math.pow(num, 2)) {
        size = (value / num).toFixed(2) + 'K';
    } else if (value < Math.pow(num, 3)) {
        size = (value / Math.pow(num, 2)).toFixed(2) + 'M';
    } else if (value < Math.pow(num, 4)) {
        size = (value / Math.pow(num, 3)).toFixed(2) + 'G';
    } else {
        size = (value / Math.pow(num, 4)).toFixed(2) + 'T';
    }
    return size;
};
/**
     * 匹配字典
     * @param {*} value 字典类的value值
     * @param {*} name 字典名
*/
let phraseType = (value, name) => {
    let dictionary = JSON.parse(util.getStore('vuex')).dictionary;
    let data = dictionary[name];
    for (let item of data) {
        if (value + '' === item.value) {
            return item.label;
        }
    }
};
/**
     * 将数组转换为，号隔开的字符串
     * @param {Array} arr 转换的数组
*/
let toString = (arr) => {
    if (!arr) {
        return '';
    }
    let str = arr.join(',');
    return str;
};
/**
     * 判断是否为空，为空显示内容
     * @param {*} value 检验的字段
     * @param {*}  text 展示内容
*/
let isEmpty = (value, text) => {
    if (!value) {
        return value === 0 ? value : text;
    }
    return value;
};
/**
     * 去除空格
     * @param {String} value 去空格字段
     * @param {*}  trim 去空格类型 1-所有空格 2-前后空格 3-前空格 4-后空格
*/
let trim = (value, trim) => {
    switch (+trim) {
        case 1:
        return value.replace(/\s+/g, '');
        case 2:
        return value.replace(/(^\s*)|(\s*$)/g, '');
        case 3:
        return value.replace(/(^\s*)/g, '');
        case 4:
        return value.replace(/(\s*$)/g, '');
        default:
        return value;
    }
};
/**
     * 现金额大写转换函数
     * @param {Number} n 金额数
     * upDigit(168752632) "人民币壹亿陆仟捌佰柒拾伍万贰仟陆佰叁拾贰元整"
     * upDigit(1682) "人民币壹仟陆佰捌拾贰元整"
     * upDigit(-1693) "欠人民币壹仟陆佰玖拾叁元整"
*/
let upDigit = (n) => {
    let num = n;
    let fraction = ['角', '分', '厘'];
    let digit = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];
    let unit = [
        ['元', '万', '亿'],
        ['', '拾', '佰', '仟']
    ];
    let head = num < 0 ? '欠人民币' : '人民币';
    num = Math.abs(num);
    let s = '';
    for (let i = 0; i < fraction.length; i++) {
        s += (digit[Math.floor(num * 10 * Math.pow(10, i)) % 10] + fraction[i]).replace(/零./, '');
    }
    s = s || '整';
    num = Math.floor(num);
    for (let i = 0; i < unit[0].length && num > 0; i++) {
        let p = '';
        for (let j = 0; j < unit[1].length && num > 0; j++) {
            p = digit[num % 10] + unit[1][j] + p;
            num = Math.floor(num / 10);
        }
        s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s;
        //s = p + unit[0][i] + s;
    }
    return head + s.replace(/(零.)*零元/, '元').replace(/(零.)+/g, '零').replace(/^整$/, '零元整');
};
export { dateFormat, fileSize, phraseType, toString, isEmpty, trim, upDigit };
