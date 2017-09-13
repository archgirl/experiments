Vue.config.debug = true;
Vue.config.devtools = true;

var taskApp = new Vue({
  el: "#taskApp",
  data: {
    displayTasks: true,
    displayProgressBar: true,
    displayAddTasks: true,
    deletedTasks: 0,
    tasks: [
      { 
        name: "Click a task to cross it off", 
        done: false 
      }
    ]
  },
  methods: {
    addTask: function(e) {
      e.preventDefault();
      this.tasks.push({
        name: this.tasks.name,
        done: false
      });
    },
    deleteTask: function(task) {
      this.tasks.splice(this.tasks.indexOf(task), 1);
      this.deletedTasks++;
    }
  },
  computed: {
    checkMarkedTasks: function() {
      let count = 0;
      for (let i = 0; i < this.tasks.length; ++i) {
        if (this.tasks[i].done == true) {
          count++;
        }
      }
      return count;
    },
    leftToDo: function() {
      return this.tasks.length - this.checkMarkedTasks;
    },
    percentageOfTasksCompleted: function() {
      if (this.tasks.length == 0) {
        return 0;
      } else {
        return this.checkMarkedTasks / this.tasks.length * 100;
      }
    }
  }
});
