const nodeXlsx = require('node-xlsx')   //引用node-xlsx模块

 

//下方ex1是读取出来的数组，数组长度取决于Excel文件的工作表(sheet)

const ex1 = nodeXlsx.parse("/Users/nullpoint/development/project/web/electron/second-app/test.xlsx") //读取excel表格

 

let excel_content = ex1[0].data //取出excel文件中的第一个工作表中的全部数据

 

// excel_content .splice(0,1)  //一般来说表中的第一条数据可能是标题没有用，所以删掉

 

console.log(excel_content)  //查看读取出来的数据