const dfd = require("danfojs-node")
const path = require("path")

let local_xcel = path.join(process.cwd(), "test.xlsx")
// let local_xcel = "/Users/nullpoint/development/project/web/electron/second-app/test.xlsx"

let df
async function load_process_data() {
    df = await dfd.readExcel(local_xcel)
    df['test'].head().print()
    dfd.toExcel()
}

load_process_data()

console.log(df)