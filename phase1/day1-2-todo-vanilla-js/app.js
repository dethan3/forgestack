// ES6+ 待办事项应用 - 展示现代 JavaScript 语法
// 学习目标：箭头函数、解构、模板字符串、Promise、async/await

class TodoApp {
    constructor() {
        // 使用 ES6+ 语法初始化应用状态
        this.todos = JSON.parse(localStorage.getItem('todos')) || [];
        this.currentFilter = 'all';
        
        // 使用解构赋值获取 DOM 元素
        this.elements = this.getDOMElements();
        
        // 初始化应用
        this.init();
    }

    // 使用解构赋值和对象简写语法获取 DOM 元素
    getDOMElements() {
        const todoForm = document.getElementById('todoForm');
        const todoInput = document.getElementById('todoInput');
        const prioritySelect = document.getElementById('prioritySelect');
        const todoList = document.getElementById('todoList');
        const emptyState = document.getElementById('emptyState');
        const filterButtons = document.querySelectorAll('.filter-btn');
        const totalCount = document.getElementById('totalCount');
        const pendingCount = document.getElementById('pendingCount');
        const completedCount = document.getElementById('completedCount');

        // 返回对象简写语法
        return {
            todoForm,
            todoInput,
            prioritySelect,
            todoList,
            emptyState,
            filterButtons,
            totalCount,
            pendingCount,
            completedCount
        };
    }

    // 初始化应用 - 使用箭头函数保持 this 绑定
    init = () => {
        this.bindEvents();
        this.render();
        this.updateStats();
        
        // 演示 async/await - 模拟异步数据加载
        this.loadInitialData();
    }

    // 绑定事件监听器 - 使用箭头函数
    bindEvents = () => {
        const { todoForm, filterButtons } = this.elements;

        // 表单提交事件
        todoForm.addEventListener('submit', this.handleAddTodo);

        // 过滤按钮事件 - 使用事件委托
        filterButtons.forEach(btn => {
            btn.addEventListener('click', this.handleFilterChange);
        });

        // 列表事件委托
        this.elements.todoList.addEventListener('click', this.handleListClick);
    }

    // 处理添加待办事项 - 使用箭头函数和解构
    handleAddTodo = (e) => {
        e.preventDefault();
        
        const { todoInput, prioritySelect } = this.elements;
        const text = todoInput.value.trim();
        const priority = prioritySelect.value;

        if (!text) return;

        // 创建新的待办事项对象 - 使用对象简写和计算属性
        const newTodo = {
            id: Date.now(),
            text,
            priority,
            completed: false,
            createdAt: new Date().toISOString()
        };

        // 使用扩展运算符添加新项目
        this.todos = [...this.todos, newTodo];
        
        // 清空输入框
        todoInput.value = '';
        
        // 更新视图
        this.saveAndUpdate();
        
        // 演示 Promise - 添加成功提示
        this.showNotification('待办事项添加成功！', 'success');
    }

    // 处理过滤器变化 - 使用箭头函数和解构
    handleFilterChange = (e) => {
        const { filterButtons } = this.elements;
        const filter = e.target.dataset.filter;
        
        if (!filter) return;

        // 更新活动状态
        filterButtons.forEach(btn => btn.classList.remove('active'));
        e.target.classList.add('active');
        
        this.currentFilter = filter;
        this.render();
    }

    // 处理列表点击事件 - 事件委托
    handleListClick = (e) => {
        const todoItem = e.target.closest('.todo-item');
        if (!todoItem) return;

        const todoId = parseInt(todoItem.dataset.id);

        if (e.target.classList.contains('todo-checkbox')) {
            this.toggleTodo(todoId);
        } else if (e.target.classList.contains('todo-delete')) {
            this.deleteTodo(todoId);
        }
    }

    // 切换待办事项完成状态 - 使用 map 和箭头函数
    toggleTodo = (id) => {
        this.todos = this.todos.map(todo => 
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        );
        
        this.saveAndUpdate();
        this.showNotification('状态更新成功！', 'info');
    }

    // 删除待办事项 - 使用 filter 和箭头函数
    deleteTodo = (id) => {
        this.todos = this.todos.filter(todo => todo.id !== id);
        this.saveAndUpdate();
        this.showNotification('待办事项已删除！', 'warning');
    }

    // 获取过滤后的待办事项 - 使用箭头函数和条件运算符
    getFilteredTodos = () => {
        const { currentFilter } = this;
        
        return this.todos.filter(todo => {
            switch (currentFilter) {
                case 'pending':
                    return !todo.completed;
                case 'completed':
                    return todo.completed;
                default:
                    return true;
            }
        });
    }

    // 渲染待办事项列表 - 使用模板字符串和解构
    render = () => {
        const { todoList, emptyState } = this.elements;
        const filteredTodos = this.getFilteredTodos();

        if (filteredTodos.length === 0) {
            todoList.style.display = 'none';
            emptyState.style.display = 'block';
            return;
        }

        todoList.style.display = 'block';
        emptyState.style.display = 'none';

        // 使用 map 和模板字符串渲染列表
        todoList.innerHTML = filteredTodos
            .map(todo => this.createTodoHTML(todo))
            .join('');
    }

    // 创建单个待办事项的 HTML - 使用模板字符串和解构
    createTodoHTML = (todo) => {
        const { id, text, priority, completed, createdAt } = todo;
        const formattedTime = this.formatTime(createdAt);
        
        return `
            <li class="todo-item ${completed ? 'completed' : ''}" data-id="${id}">
                <input 
                    type="checkbox" 
                    class="todo-checkbox" 
                    ${completed ? 'checked' : ''}
                >
                <span class="todo-text">${this.escapeHtml(text)}</span>
                <span class="todo-priority priority-${priority}">${this.getPriorityText(priority)}</span>
                <span class="todo-time">${formattedTime}</span>
                <button class="todo-delete">删除</button>
            </li>
        `;
    }

    // 获取优先级文本 - 使用对象映射
    getPriorityText = (priority) => {
        const priorityMap = {
            high: '高',
            medium: '中',
            low: '低'
        };
        return priorityMap[priority] || '中';
    }

    // 格式化时间 - 使用 Intl API
    formatTime = (isoString) => {
        const date = new Date(isoString);
        return new Intl.DateTimeFormat('zh-CN', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        }).format(date);
    }

    // HTML 转义 - 安全处理用户输入
    escapeHtml = (text) => {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // 更新统计信息 - 使用解构和箭头函数
    updateStats = () => {
        const { totalCount, pendingCount, completedCount } = this.elements;
        
        const total = this.todos.length;
        const pending = this.todos.filter(todo => !todo.completed).length;
        const completed = this.todos.filter(todo => todo.completed).length;

        // 使用模板字符串更新内容
        totalCount.textContent = `总计: ${total}`;
        pendingCount.textContent = `待完成: ${pending}`;
        completedCount.textContent = `已完成: ${completed}`;
    }

    // 保存到本地存储并更新视图
    saveAndUpdate = () => {
        this.saveToLocalStorage();
        this.render();
        this.updateStats();
    }

    // 保存到本地存储 - 使用 JSON.stringify
    saveToLocalStorage = () => {
        localStorage.setItem('todos', JSON.stringify(this.todos));
    }

    // 演示 async/await - 模拟异步数据加载
    loadInitialData = async () => {
        try {
            // 模拟 API 调用延迟
            await this.delay(500);
            
            // 如果没有本地数据，添加示例数据
            if (this.todos.length === 0) {
                const sampleTodos = await this.getSampleTodos();
                this.todos = [...sampleTodos];
                this.saveAndUpdate();
            }
            
            console.log('初始数据加载完成');
        } catch (error) {
            console.error('加载初始数据失败:', error);
        }
    }

    // 获取示例数据 - 返回 Promise
    getSampleTodos = () => {
        return new Promise((resolve) => {
            const sampleData = [
                {
                    id: 1,
                    text: '学习 ES6+ 箭头函数语法',
                    priority: 'high',
                    completed: false,
                    createdAt: new Date().toISOString()
                },
                {
                    id: 2,
                    text: '掌握解构赋值和扩展运算符',
                    priority: 'medium',
                    completed: false,
                    createdAt: new Date().toISOString()
                },
                {
                    id: 3,
                    text: '练习 Promise 和 async/await',
                    priority: 'high',
                    completed: false,
                    createdAt: new Date().toISOString()
                }
            ];
            
            // 模拟异步操作
            setTimeout(() => resolve(sampleData), 100);
        });
    }

    // 工具函数：延迟执行 - 返回 Promise
    delay = (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // 显示通知 - 使用 async/await 和模板字符串
    showNotification = async (message, type = 'info') => {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        // 添加样式
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '12px 20px',
            borderRadius: '8px',
            color: 'white',
            backgroundColor: this.getNotificationColor(type),
            zIndex: '1000',
            opacity: '0',
            transform: 'translateY(-20px)',
            transition: 'all 0.3s ease'
        });

        document.body.appendChild(notification);

        // 显示动画
        await this.delay(50);
        notification.style.opacity = '1';
        notification.style.transform = 'translateY(0)';

        // 自动隐藏
        await this.delay(2000);
        notification.style.opacity = '0';
        notification.style.transform = 'translateY(-20px)';
        
        await this.delay(300);
        document.body.removeChild(notification);
    }

    // 获取通知颜色 - 使用对象映射
    getNotificationColor = (type) => {
        const colors = {
            success: '#28a745',
            info: '#17a2b8',
            warning: '#ffc107',
            error: '#dc3545'
        };
        return colors[type] || colors.info;
    }
}

// 使用立即执行函数表达式 (IIFE) 和箭头函数
(() => {
    // DOM 加载完成后初始化应用
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => new TodoApp());
    } else {
        new TodoApp();
    }
})();

// 演示其他 ES6+ 特性的工具函数

// 使用默认参数和剩余参数
const logWithTimestamp = (message, ...args) => {
    const timestamp = new Date().toLocaleTimeString();
    console.log(`[${timestamp}] ${message}`, ...args);
};

// 使用解构和默认值
const createUser = ({ name = '匿名用户', age = 0, ...otherProps } = {}) => {
    return {
        name,
        age,
        id: Date.now(),
        ...otherProps
    };
};

// 使用 Map 和 Set 数据结构
const todoCategories = new Map([
    ['work', '工作'],
    ['personal', '个人'],
    ['study', '学习']
]);

const completedTodoIds = new Set();

// 使用 Symbol 创建私有属性
const PRIVATE_KEY = Symbol('private');

// 导出给全局使用（在实际模块化项目中会使用 export）
window.TodoUtils = {
    logWithTimestamp,
    createUser,
    todoCategories,
    completedTodoIds,
    PRIVATE_KEY
};

// 在控制台输出学习提示
console.log(`
🎯 ES6+ 学习要点已在此应用中展示：
✅ 箭头函数 - 简洁的函数语法，自动绑定 this
✅ 解构赋值 - 从对象和数组中提取值
✅ 模板字符串 - 使用反引号和 \${} 插值
✅ Promise - 处理异步操作的现代方式
✅ async/await - 更直观的异步代码写法
✅ 扩展运算符 - 展开数组和对象
✅ 默认参数 - 函数参数默认值
✅ 类语法 - ES6 类的使用
✅ Map/Set - 新的数据结构
✅ Symbol - 创建唯一标识符

继续学习第3-4天的 DOM 操作和事件处理！
`);
