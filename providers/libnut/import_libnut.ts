import ln from "./libnut";

const libnut: typeof ln = (process.platform === 'win32') ?
    require("@nut-tree-fork/libnut-win32") :
    (process.platform === 'linux') ?
        require("@nut-tree-fork/libnut-linux") :
        require("@nut-tree-fork/libnut-darwin")

export {
    libnut,
}