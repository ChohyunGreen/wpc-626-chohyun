// DOM 요소 가져오기
const todoInput = document.getElementById("todoInput");
const addBtn = document.getElementById("addBtn");
const pendingList = document.getElementById("pendingList");
const completedList = document.getElementById("completedList");

// 로컬스토리지 키
const STORAGE_KEY = "todos";

// 할 일 목록 배열
let todos = [];

// 페이지 로드 시 초기화
function init() {
    loadTodos();
    renderTodos();
    setupEventListeners();
}

// 이벤트 리스너 설정
function setupEventListeners() {
    // 추가 버튼 클릭
    addBtn.addEventListener("click", addTodo);

    // Enter 키로 추가
    todoInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            addTodo();
        }
    });
}

// 로컬스토리지에서 할 일 불러오기
function loadTodos() {
    const savedTodos = localStorage.getItem(STORAGE_KEY);
    if (savedTodos) {
        todos = JSON.parse(savedTodos);
    }
}

// 로컬스토리지에 할 일 저장하기
function saveTodos() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

// 할 일 추가
function addTodo() {
    const text = todoInput.value.trim();

    // 빈 입력 체크
    if (text === "") {
        alert("할 일을 입력해주세요!");
        return;
    }

    // 새 할 일 객체 생성
    const newTodo = {
        id: Date.now(), // 고유 ID로 타임스탬프 사용
        text: text,
        completed: false,
    };

    // 배열에 추가
    todos.push(newTodo);

    // 저장 및 렌더링
    saveTodos();
    renderTodos();

    // 입력창 초기화
    todoInput.value = "";
    todoInput.focus();
}

// 할 일 삭제
function deleteTodo(id) {
    todos = todos.filter((todo) => todo.id !== id);
    saveTodos();
    renderTodos();
}

// 할 일 완료 토글
function toggleTodo(id) {
    const todo = todos.find((todo) => todo.id === id);
    if (todo) {
        todo.completed = !todo.completed;
        saveTodos();
        renderTodos();
    }
}

// 할 일 목록 렌더링
function renderTodos() {
    // 기존 목록 초기화
    pendingList.innerHTML = "";
    completedList.innerHTML = "";

    // 완료 여부에 따라 분류
    const pendingTodos = todos.filter((todo) => !todo.completed);
    const completedTodos = todos.filter((todo) => todo.completed);

    // 예정 목록 렌더링
    pendingTodos.forEach((todo) => {
        const li = createTodoElement(todo);
        pendingList.appendChild(li);
    });

    // 완료 목록 렌더링
    completedTodos.forEach((todo) => {
        const li = createTodoElement(todo);
        completedList.appendChild(li);
    });
}

// 할 일 항목 요소 생성
function createTodoElement(todo) {
    const li = document.createElement("li");
    li.className = `todo-item ${todo.completed ? "completed" : ""}`;

    // 체크박스
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.completed;
    checkbox.addEventListener("change", () => toggleTodo(todo.id));

    // 텍스트
    const text = document.createElement("span");
    text.className = "todo-text";
    text.textContent = todo.text;

    // 삭제 버튼
    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn";
    deleteBtn.textContent = "삭제";
    deleteBtn.addEventListener("click", () => deleteTodo(todo.id));

    // 요소들을 li에 추가
    li.appendChild(checkbox);
    li.appendChild(text);
    li.appendChild(deleteBtn);

    return li;
}

// 앱 초기화
init();
