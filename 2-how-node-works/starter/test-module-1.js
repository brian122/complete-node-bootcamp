//Way to export a class 1: Class Declaration
// class Calculator {
//     add(a, b) {
//         return a + b
//     }

//     multiply(a, b) {
//         return a * b
//     }

//     divide(a, b) {
//         return a / b
//     }
// }

//module.export = class Calculator


//Way to export a class 2: Class Expression
module.exports = class {
    add(a, b) {
        return a + b
    }

    multiply(a, b) {
        return a * b
    }

    divide(a, b) {
        return a / b
    }
}