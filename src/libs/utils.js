/**
 * @file:      util工具
 * @author:    花夏(liubiao@itoxs.com) 柏林（735815255@qq.com）
 * @version:   V2.0.0
 * @date:      2020/8/27 下午4:24:09
 */
import * as CryptoJS from 'crypto-js';
import md5 from 'js-md5'
export default {
    /**
     * @param {Number} times 回调函数需要执行的次数
     * @param {Function} callback 回调函数
     */
    doCustomTimes(times, callback) {
        let i = -1;
        while (++i < times) {
            callback(i);
        }
    },
    randomString(len) {
        let random = '';
        random = Math.ceil(Math.random() * 100000000000000)
            .toString()
            .substr(0, len || 4);
        random = random + Date.now();
        return random;
    },
    /**
     *加密处理
    */
    encryption(params) {
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
    },
    downloadExcel(data, name) {
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
    },
    /**
     * tree 数据转换
     * @param  {Array} tree 待转换的 tree
     * @param  {Object} map  键值对映射
     * @return {Array}      转换后的 tree
     */
    convertTree(tree, map) {
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
    },
    /**
     * 时间格式化
     * @param {Date} date 日期
     * @param {string} fmt 格式
     */
    dateFormat(date, fmt) {
        var o = {
            "M+": date.getMonth() + 1,
            "d+": date.getDate(),
            "h+": date.getHours(),
            "m+": date.getMinutes(),
            "s+": date.getSeconds(),
            "q+": Math.floor((date.getMonth() + 3) / 3),
            "S": date.getMilliseconds()
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o) {
            if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
        return fmt;
    },
    /**
    * 获取当前月初
    * @param {Date} date 日期
    * @param {string} fmt 格式
    */
    dateFormatStart(date, fmt) {
        var o = {
            "M+": date.getMonth() + 1,
            "d+": '01',
            "h+": date.getHours(),
            "m+": date.getMinutes(),
            "s+": date.getSeconds(),
            "q+": Math.floor((date.getMonth() + 3) / 3),
            "S": date.getMilliseconds()
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o) {
            if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
        return fmt;
    },
    /**
     * 组装select数据(键值对形式)
     * @param {Array} data 数据
     * @param {String} label label字段名
     * @param {String} value value字段名
     */
    getSelectItems(data, label, value) {
        if (!data && data.length === 0) return
        let arr = [];
        for (let item of data) {
            arr.push({
                value: item[value],
                label: item[label]
            })
        }
        return arr;
    },
    /**
     * 组装select数据(纯数组形式)
     * @param {*} data
     */
    getArraySelectItems(data) {
        if (!data && data.length === 0) return
        let arr = [];
        for (let val of data) {
            arr.push({
                label: val,
                value: val
            })
        }
        return arr;
    },
    /**
     * 数组对象求和
     * @param {Array} data 数据
     * @param {string} fields 字段
     */
    getSum(data, fields) {
        if (!data && data.length === 0) return
        let sum = 0;
        for (let item of data) {
            if (typeof item[fields] === 'string') {
                item[fields] = parseInt(item[fields])
            }
            sum += item[fields]
        }
        return sum
    },
    /**
     * 签名校验排序及md5加密
     * @param {*} data
     */
    sortByMd5(data) {
        let newData = {}
        let str = ''
        let sortData = Object.keys(data).sort()
        for (let key of sortData) {
            newData[key] = data[key]
        }
        for (let key in newData) {
            str += newData[key]
        }
        return md5(str)
    },
    /**
     * 设置cookie
     * @param {*} cname
     * @param {*} value
     * @param {*} exdays
     */
    setCookie(cname, value, exdays) {
        var exdate = new Date();
        exdate.setTime(exdate.getTime() + exdays * 24 * 60 * 60 * 1000);
        document.cookie = cname + "=" + escape(value) + ((exdays === null) ? "" : ";expires=" + exdate.toGMTString());
    },
    /**
     * 获取cookie
     * @param {*} cname
     */
    getCookie(cname) {
        if (document.cookie.length > 0) {
            var start = document.cookie.indexOf(cname + "=");
            if (start !== -1) {
                start = start + cname.length + 1;
                var end = document.cookie.indexOf(";", start);
                if (end === -1) {
                    end = document.cookie.length
                }
                return unescape(document.cookie.substring(start, end))
            }
        }
        return ""
    },
    /**
     * 删除cookie
     * @param {*} cname
     */
    delCookie(cname) {
        var exp = new Date();
        exp.setTime(exp.getTime() - 1);
        var cval = this.getCookie(cname);
        if (cval != null) {
            document.cookie = cname + "=" + cval + ";expires=" + exp.toGMTString();
        }
    },
    getQueryString(name) {
        var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
        var r = window.location.search.substr(1).match(reg);
        if (r != null) {
            return unescape(r[2]);
        }
        return null;
    },
    /**
     * 排序
     * @param {*} data
     * @param {*} field
     */
    getSort(data, field = 'value') {
        data.sort(function (a, b) {
            return b[field] - a[field]
        })
        return data
    },
    // 设置水印
    watermark(settings) {
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
    }
}
