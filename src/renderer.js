// const {
//     ipcRenderer
// } = require('electron')
const nodeXlsx = require('node-xlsx') //引用node-xlsx模块
// document.getElementById('excel-read').addEventListener('click', () => {
//     const ex1 = nodeXlsx.parse("/Users/nullpoint/development/project/web/electron/second-app/test.xlsx") //读取excel表格
//     let excel_content = ex1[0].data //取出excel文件中的第一个工作表中的全部数据
//     console.log(excel_content) //查看读取出来的数据
// })

const panelRightDom = document.querySelector('.panel-right')
const dragAreaDom = document.querySelector('.drag-area')
const excelDataDom = document.querySelector('.excel-data')
var excel_table = layui.table;

panelRightDom.addEventListener('dragover', (e) => {
    e.preventDefault()
    e.stopPropagation()
    // dragAreaDom.style.backgroundColor = "gray"
    dragAreaDom.style.display = 'block'
})
dragAreaDom.addEventListener('dragleave', (e) => {
    e.preventDefault()
    e.stopPropagation()
    // panelRightDom.style.backgroundColor = ""
    dragAreaDom.style.display = 'none'
})
dragAreaDom.addEventListener('drop', (e) => {
    e.preventDefault()
    e.stopPropagation()
    dragAreaDom.style.display = 'none'
    // console.log(e.dataTransfer.files[0].path)
    filePath = e.dataTransfer.files[0].path
    excelReadResult = excelRead(filePath)
    toTable(excelReadResult.title, excelReadResult.data, e.dataTransfer.files[0].path)
})

const excelRead = (filePath) => {
    try {
        excel = nodeXlsx.parse(filePath)
        excel_content = excel[0].data
        excel_title = excel_content.shift() // 取第一个, 作为title
        return {
            title: excel_title,
            data: excel_content,
        }
    } catch (error) {
        console.log(error)
        ipcRenderer.send('showErrorBox', {
            title: "excel read error",
            msg: error.message
        })
        // dialog.showErrorBox("error", "error")
    }
}


function toTable(title_array, data_array, filePath) {

    // 表格标题
    table_title = title_array.map((it) => {
        return {
            field: it,
            title: it,
        }
    })
    // 数据
    table_data = data_array.map((it) => {
        table_data_item = {}
        for (i = 0; i < it.length; i++) {
            table_data_item[excel_title[i]] = it[i]
        }
        return table_data_item
    })

    //执行渲染
    excel_table.render({
        elem: '#excel-table', //指定原始表格元素选择器（推荐id选择器）
        toolbar: '#toolbarDemo',
        defaultToolbar: [],
        height: 'full-60', //容器高度
        // width: 'auto',
        cols: [table_title], //设置表头
        data: table_data,
        page: true,
        size: 'sm',
    });

    excel_table.on('toolbar(excel-table)', function (obj) {
        // console.log(filePath)
        // var id = obj.config.id;
        // var othis = lay(this);
        switch (obj.event) {
            case 'export':
                exportFileToExcelOrCsv('xls', title_array, data_array);
                break;
        };
    });

    // layui.use('table', function () {
    //     var table = layui.table;
    //     //第一个实例
    //     table.render({
    //         elem: '.excel-data',
    //         height: 800,
    //         // url: '/static/json/table/user.json', //数据接口
    //         size: 'sm',
    //         page: true, //开启分页
    //         cols: [title],
    //         data: data,
    //     });
    // });
}


/**
 * 
 * @param type 'csv','excel'
 * @param title ['title1', ....]
 * @param data ['data1', ...]
 */
function exportFileToExcelOrCsv(type, title_array, data_array) {
    new_title = ['id', 'json']

    // 数据转成json格式
    let id = 1 ;
    table_data = data_array.map((it) => {
        table_data_item = {}
        for (i = 0; i < it.length; i++) {
            table_data_item[title_array[i]] = it[i]
        }
        return [id++,JSON.stringify(table_data_item).replace(/\"/g, "\"\"")]
    });

    excel_table.exportFile(new_title, table_data, {
        type: 'csv', // 导出格式
        title: '导出文件'
    });


}