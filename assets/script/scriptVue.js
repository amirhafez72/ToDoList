const {createApp} = Vue;
let id = 0;
createApp({
    data(){
        return {
            message : "Add a New Tasks",
            toDoList:[
                { id: id++, title: "Weekly Planning with a Bullet Journal", completed: true, unfinished: false, selected : false},
                { id: id++, title: "Create a Playlist for Every Activity", completed: false, unfinished: false, selected : false},
                { id: id++, title: "Design a Personal Finance Management System", completed: false, unfinished: false, selected : false},
                { id: id++, title: "Start a Small Home Garden", completed: false, unfinished: true, selected : false},
                { id: id++, title: "Learn a New Skill in 30 Days", completed: false, unfinished: true, selected : false},
                { id: id++, title: "Create a 'Mood Booster' Box", completed: true, unfinished: false, selected : false},
                { id: id++, title: "Host a Family Movie or Game Night", completed: false, unfinished: true, selected : false},
                { id: id++, title: "Establish a Morning or Evening Routine", completed: true, unfinished: false, selected : false},
                { id: id++, title: "Create a Digital Memory Album", completed: false, unfinished: true, selected : false},
                { id: id++, title: "Take on a 'Zero Waste' Challenge", completed: false, unfinished: true, selected : false},
                // { id: id++, title: "New Task 10", completed: false, unfinished: true, selected : false},
            ],
            filteredItems:[],
            showItemForm: false,
            // 0 هیچ آتمی انتخاب نشده 
            // 1 برخی آیتم ها انتخاب شده‌اند
            // 2 تمام آیتم ها انتخاب شدند
            allTasksSelected: 0,
            draggedItemIndex: null
        }
    },
    methods:{
        addNewTask(){
            if(this.newTitle != undefined && this.newTitle != ''){
                let newTask = {id: id++, title: this.newTitle, completed: false, unfinished: false, selected: false};
                this.toDoList.unshift(newTask);
                this.newTitle = '';
            }
        },
        changeDisplayInput(){
            this.showItemForm = !this.showItemForm;
        },
        removeTask(task){
            this.toDoList = this.toDoList.filter((item) => item !== task);
            this.filteredItems = this.toDoList;
            //this.saveToDoList();
        },
        removeAllSelectedTasks(){
            this.toDoList = this.toDoList.filter((item) => !item.selected);
            this.filteredItems = this.toDoList;
            this.allTasksSelected= 0;
        },
        completedTask(id){
            if(this.toDoList[id].unfinished){
                this.toDoList[id].unfinished = !this.toDoList[id].unfinished;
            }
            this.toDoList[id].completed = !this.toDoList[id].completed;
            this.filteredItems = this.toDoList;
            ///this.saveToDoList();

        },
        completedAllSelectedTasks(){
            for (const [index,element] of this.toDoList.entries()) {
                if (element.selected && !element.completed) {
                    this.completedTask(index);
                }
            }
        },
        unfinishedTask(id){
            if(this.toDoList[id].completed){
                this.toDoList[id].completed = !this.toDoList[id].completed;
            }
            this.toDoList[id].unfinished = !this.toDoList[id].unfinished;
            this.filteredItems = this.toDoList;
            //this.saveToDoList();
        },
        selectingTask(id){
            this.toDoList[id].selected = !this.toDoList[id].selected;
            this.changeStatusItemAllTasks();
        },
        selectingAllTasks(){
            if (this.toDoList.length > 0) {
                for (const element of this.toDoList) {
                    element.selected = !element.selected;
                }
                //this.filteredItems = this.toDoList;
                this.changeStatusItemAllTasks();
            }
        },
        checkingAllTasksSelected(){
            let flag;
            for (const [index,element] of this.toDoList.entries()) {
                if(!element.selected){
                    if (flag == 1) {
                        return 1;
                    }
                    flag = 0; 
                    if(index === this.toDoList.length - 1 && !flag){
                        return 0;
                    }
                }
                else{
                    if(flag == 0){
                        return 1;
                    }
                    flag = 1;
                    if(index === this.toDoList.length - 1 && flag){
                        return 2;
                    }
                }
            }
            return 1;
        },
        changeStatusItemAllTasks(){
            let checkResult = this.checkingAllTasksSelected();
            if(checkResult == 0) this.allTasksSelected = 0;
            else if (checkResult == 1) this.allTasksSelected = 1;
            else this.allTasksSelected = 2;
        },
        completedSelect(){
            this.filteredItems =  this.toDoList.filter(item => item.completed == true);
        },
        unfinishedSelect(){
            this.filteredItems =  this.toDoList.filter(item => item.unfinished == true);
        },
        showAllTasks(){
            this.filteredItems = this.toDoList;
        },
        saveToDoList(){
            if (this.filteredItems.length > 0) {
                this.toDoList = this.filteredItems;
            }
            for (const element of this.toDoList) {
                element.selected = false;
            }   
            const savedToDoList = JSON.stringify(this.toDoList);
            //localStorage.removeItem('savedToDoList');
            localStorage.setItem('savedToDoList', savedToDoList);
        },
        onDragStart(index) {
            this.draggedItemIndex = index;
          },
          onDrop(index) {
            const draggedItem = this.toDoList.splice(this.draggedItemIndex, 1)[0];
            this.toDoList.splice(index, 0, draggedItem);
          }
    },
    computed(){

    },
    mounted(){
        this.saveToDoList();
        this.toDoList = JSON.parse(localStorage.getItem('savedToDoList'));
        this.filteredItems = this.toDoList;
    }

}).mount("#app");