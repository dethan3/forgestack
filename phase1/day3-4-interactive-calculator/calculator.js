/**
 * 动态计算器 - Day 3-4 项目
 * 重点练习：DOM 操作、事件监听、表单处理
 */

class Calculator {
    constructor() {
        // 计算器状态
        this.currentInput = '0';
        this.previousInput = '';
        this.operator = null;
        this.waitingForNewInput = false;
        this.history = '';
        
        // DOM 元素引用
        this.displayElement = document.getElementById('display');
        this.historyElement = document.getElementById('history');
        this.themeToggle = document.getElementById('themeToggle');
        
        // 初始化
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.loadTheme();
        this.updateDisplay();
        console.log('计算器初始化完成 - DOM 操作练习项目');
    }
    
    /**
     * 绑定事件监听器 - 练习事件处理
     */
    bindEvents() {
        // 数字按钮事件
        const numberButtons = document.querySelectorAll('[data-number]');
        numberButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                this.inputNumber(e.target.dataset.number);
            });
        });
        
        // 运算符按钮事件
        const operatorButtons = document.querySelectorAll('[data-operator]');
        operatorButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                this.inputOperator(e.target.dataset.operator);
            });
        });
        
        // 功能按钮事件
        const actionButtons = document.querySelectorAll('[data-action]');
        actionButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                this.handleAction(e.target.dataset.action);
            });
        });
        
        // 主题切换事件
        this.themeToggle.addEventListener('click', () => {
            this.toggleTheme();
        });
        
        // 键盘事件监听
        document.addEventListener('keydown', (e) => {
            this.handleKeyboard(e);
        });
        
        // 防止右键菜单
        document.addEventListener('contextmenu', (e) => {
            e.preventDefault();
        });
    }
    
    /**
     * 处理数字输入 - DOM 操作练习
     */
    inputNumber(number) {
        if (this.waitingForNewInput) {
            this.currentInput = number;
            this.waitingForNewInput = false;
        } else {
            this.currentInput = this.currentInput === '0' ? number : this.currentInput + number;
        }
        
        this.updateDisplay();
        this.addButtonFeedback(event.target);
    }
    
    /**
     * 处理运算符输入
     */
    inputOperator(nextOperator) {
        const inputValue = parseFloat(this.currentInput);
        
        if (this.previousInput === '') {
            this.previousInput = inputValue;
        } else if (this.operator) {
            const currentValue = this.previousInput || 0;
            const newValue = this.calculate(currentValue, inputValue, this.operator);
            
            this.currentInput = String(newValue);
            this.previousInput = newValue;
            this.updateDisplay();
        }
        
        this.waitingForNewInput = true;
        this.operator = nextOperator;
        this.updateHistory(`${this.previousInput} ${this.getOperatorSymbol(nextOperator)}`);
        this.highlightOperator(nextOperator);
        this.addButtonFeedback(event.target);
    }
    
    /**
     * 处理功能按钮
     */
    handleAction(action) {
        switch (action) {
            case 'clear':
                this.clear();
                break;
            case 'clear-entry':
                this.clearEntry();
                break;
            case 'delete':
                this.delete();
                break;
            case 'decimal':
                this.inputDecimal();
                break;
            case 'equals':
                this.equals();
                break;
        }
        
        this.addButtonFeedback(event.target);
    }
    
    /**
     * 执行计算
     */
    calculate(firstValue, secondValue, operator) {
        switch (operator) {
            case '+':
                return firstValue + secondValue;
            case '-':
                return firstValue - secondValue;
            case '*':
                return firstValue * secondValue;
            case '/':
                if (secondValue === 0) {
                    this.showError('不能除以零');
                    return firstValue;
                }
                return firstValue / secondValue;
            default:
                return secondValue;
        }
    }
    
    /**
     * 等号计算
     */
    equals() {
        const inputValue = parseFloat(this.currentInput);
        
        if (this.previousInput !== '' && this.operator) {
            const newValue = this.calculate(this.previousInput, inputValue, this.operator);
            const calculation = `${this.previousInput} ${this.getOperatorSymbol(this.operator)} ${inputValue} =`;
            
            this.currentInput = String(newValue);
            this.previousInput = '';
            this.operator = null;
            this.waitingForNewInput = true;
            
            this.updateHistory(calculation);
            this.updateDisplay();
            this.clearOperatorHighlight();
        }
    }
    
    /**
     * 清除所有
     */
    clear() {
        this.currentInput = '0';
        this.previousInput = '';
        this.operator = null;
        this.waitingForNewInput = false;
        this.history = '';
        this.updateDisplay();
        this.updateHistory('');
        this.clearOperatorHighlight();
        this.clearError();
    }
    
    /**
     * 清除当前输入
     */
    clearEntry() {
        this.currentInput = '0';
        this.updateDisplay();
        this.clearError();
    }
    
    /**
     * 删除最后一位
     */
    delete() {
        if (this.currentInput.length > 1) {
            this.currentInput = this.currentInput.slice(0, -1);
        } else {
            this.currentInput = '0';
        }
        this.updateDisplay();
        this.clearError();
    }
    
    /**
     * 输入小数点
     */
    inputDecimal() {
        if (this.waitingForNewInput) {
            this.currentInput = '0.';
            this.waitingForNewInput = false;
        } else if (this.currentInput.indexOf('.') === -1) {
            this.currentInput += '.';
        }
        this.updateDisplay();
    }
    
    /**
     * 更新显示屏 - DOM 操作练习
     */
    updateDisplay() {
        // 格式化显示数字
        const formattedNumber = this.formatNumber(this.currentInput);
        this.displayElement.textContent = formattedNumber;
        
        // 添加动画效果
        this.displayElement.style.transform = 'scale(1.02)';
        setTimeout(() => {
            this.displayElement.style.transform = 'scale(1)';
        }, 100);
    }
    
    /**
     * 更新历史记录显示
     */
    updateHistory(text) {
        this.history = text;
        this.historyElement.textContent = text;
    }
    
    /**
     * 格式化数字显示
     */
    formatNumber(num) {
        const number = parseFloat(num);
        
        // 处理特殊情况
        if (isNaN(number)) return '0';
        if (!isFinite(number)) return 'Error';
        
        // 限制小数位数
        if (number % 1 !== 0) {
            return number.toFixed(8).replace(/\.?0+$/, '');
        }
        
        // 大数字使用科学计数法
        if (Math.abs(number) >= 1e10) {
            return number.toExponential(5);
        }
        
        return number.toString();
    }
    
    /**
     * 获取运算符显示符号
     */
    getOperatorSymbol(operator) {
        const symbols = {
            '+': '+',
            '-': '-',
            '*': '×',
            '/': '÷'
        };
        return symbols[operator] || operator;
    }
    
    /**
     * 高亮当前运算符
     */
    highlightOperator(operator) {
        this.clearOperatorHighlight();
        const operatorButton = document.querySelector(`[data-operator="${operator}"]`);
        if (operatorButton) {
            operatorButton.classList.add('active');
        }
    }
    
    /**
     * 清除运算符高亮
     */
    clearOperatorHighlight() {
        const activeOperators = document.querySelectorAll('.btn-operator.active');
        activeOperators.forEach(button => {
            button.classList.remove('active');
        });
    }
    
    /**
     * 显示错误
     */
    showError(message) {
        this.displayElement.parentElement.classList.add('error');
        this.displayElement.textContent = message;
        
        setTimeout(() => {
            this.clearError();
            this.clear();
        }, 2000);
    }
    
    /**
     * 清除错误状态
     */
    clearError() {
        this.displayElement.parentElement.classList.remove('error');
    }
    
    /**
     * 按钮反馈效果
     */
    addButtonFeedback(button) {
        button.style.transform = 'scale(0.95)';
        setTimeout(() => {
            button.style.transform = '';
        }, 150);
    }
    
    /**
     * 键盘事件处理
     */
    handleKeyboard(event) {
        const key = event.key;
        
        // 阻止默认行为
        if ('0123456789+-*/.='.includes(key) || key === 'Enter' || key === 'Backspace' || key === 'Escape') {
            event.preventDefault();
        }
        
        // 数字键
        if ('0123456789'.includes(key)) {
            this.inputNumber(key);
        }
        
        // 运算符键
        else if ('+-*/'.includes(key)) {
            this.inputOperator(key);
        }
        
        // 小数点
        else if (key === '.') {
            this.inputDecimal();
        }
        
        // 等号或回车
        else if (key === '=' || key === 'Enter') {
            this.equals();
        }
        
        // 退格键
        else if (key === 'Backspace') {
            this.delete();
        }
        
        // ESC键清除
        else if (key === 'Escape') {
            this.clear();
        }
    }
    
    /**
     * 主题切换功能
     */
    toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        this.themeToggle.textContent = newTheme === 'dark' ? '☀️' : '🌙';
        
        // 保存主题偏好
        localStorage.setItem('calculator-theme', newTheme);
        
        // 添加切换动画
        document.body.style.transition = 'all 0.3s ease';
        setTimeout(() => {
            document.body.style.transition = '';
        }, 300);
    }
    
    /**
     * 加载保存的主题
     */
    loadTheme() {
        const savedTheme = localStorage.getItem('calculator-theme') || 'light';
        document.documentElement.setAttribute('data-theme', savedTheme);
        this.themeToggle.textContent = savedTheme === 'dark' ? '☀️' : '🌙';
    }
}

/**
 * DOM 内容加载完成后初始化计算器
 */
document.addEventListener('DOMContentLoaded', () => {
    // 创建计算器实例
    const calculator = new Calculator();
    
    // 全局暴露计算器实例（用于调试）
    window.calculator = calculator;
    
    // 添加加载完成的视觉反馈
    setTimeout(() => {
        document.querySelector('.calculator').style.opacity = '1';
        document.querySelector('.calculator').style.transform = 'translateY(0)';
    }, 100);
    
    console.log('🧮 动态计算器已启动');
    console.log('📚 这是 Day 3-4 的 DOM 操作与事件处理练习项目');
    console.log('⌨️  支持键盘操作：数字键、运算符、回车(=)、退格、ESC(清除)');
    console.log('🎨 支持深色/浅色主题切换');
});
