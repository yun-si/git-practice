
export default class Stack {
    #items;
    /* 
    加上 # 代表這是一個 private 的 property 或 method
    private: 這個 property 或 method 只能在 class 內部被 access，不能透過外部或繼承這個 class 的 class 直接使用

    e.g. 
    let stack = new Stack()
    console.log(stack.#items) // Error

    此處表示 item 是一個 private 的 property
    */

    constructor() {
        this.#items = [];
    }

    // 在 stack 頂部加入元素i
    push(element) {
        this.#items.push(element);
    }

    // 移除並回傳 stack 頂部的元素
    pop() {
        return this.#items.pop();
    }

    // 回傳 stack 頂部的元素，但不移除它
    peek() {
        return this.#items.at(-1);
    }

    // 檢查 stack 是否為空
    isEmpty() {
        return this.#items.length == 0;
    }

    // 回傳 stack 中元素的個數
    size() {
        return this.#items.length;
    }

    // 清空 stack 
    clear() {
        this.#items = [];
    }

    // 印出 stack 內容
    print() {
        console.log(this.#items)
    }
}