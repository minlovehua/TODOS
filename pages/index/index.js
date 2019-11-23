//index.js

Page({
  data: {
    //文本框的数据模型
    search:'',
    //任务清单数据模型
    todos:[
      { name: '学习前端', completed: false },
      { name: '跑步健身', completed: false },
      { name: '看电影', completed: true },
      { name: '联系朋友',completed: true}
    ],
    leftCount:2
  }, 
  //由于小程序的数据绑定是单向的，必须给文本注册改变事件，才能将界面的数据同步到数据源。
  searchChangeHandle: function (e) {
    //当文本框数值发生改变时触发。e.detail：文本框对象。
    //console.log('文本框数值发生改变了' + e.detail);
    this.setData({ search: e.detail.value });
  },
  addTodoHandle:function(){
    //当添加按钮点击时，执行该函数
    //console.log(this.data.search);
    //如果文本框为空，return结束
    if(!this.data.search) return;
    //如果文本框不为空
    var todo = this.data.todos;
    todo.push({
      name:this.data.search,
      completed:false
    }); 
    //将todos换成一个已经新增完的todo
    //必须显式地通过setData去改变数据，这样子，界面才会得到变化
    this.setData({todos:todo,search:'',leftCount:this.data.leftCount+1});
  },
  toggleTodoHandle:function(e){
    //切换当前点击的item的完成状态
    //不管点击哪一个item，控制台输出的结果都是一样的，
    //如何来标识当前点击的到底是哪一个item呢？通过自定义属性
    //console.log(e.currentTarget);

    //拿到当前这个项
    var item = this.data.todos[e.currentTarget.dataset.index];
    //console.log(item);
    item.completed=!item.completed;  //对当前被点击的项的完成状态取相反
    //根据当前任务的完成状态来决定是添加一个还是减少一个
    var leftCount1=this.data.leftCount+(item.completed?-1:1);
    //通知界面要发生改变 setData
    this.setData({todos:this.data.todos,leftCount:leftCount1});
  },
  removeTodoHandle:function(e){
    //删除任务（注意冒泡问题）
    
    //拿到当前这个项
    var item = this.data.todos[e.currentTarget.dataset.index];
    //根据当前任务的完成状态来决定是添加一个还是减少一个
    var leftCount1 = this.data.leftCount + (item.completed ? 0 : -1);

    var todo = this.data.todos;
    todo.splice(e.currentTarget.dataset.index,1); //todo中会移除index所指向的元素
    this.setData({ todos: todo, leftCount: leftCount1}); //告诉页面要做出改变
  },
  toggleAllHandle:function(){
    //任务状态全完成或全不完成
    var todo = this.data.todos;
    var allCompleted=true;
    if(todo[0].completed) allCompleted=false;
    for (var item of todo) {
      item.completed = allCompleted;
      var leftCount1=item.completed?0:todo.length;  
    }
    this.setData({ todos: todo,leftCount:leftCount1});
  },
  clearCompletedHandle:function(){
    //清空已经完成的任务
    var todo = this.data.todos;
    var flag=0;
    while(flag<todo.length){
      if (todo[flag].completed){
        todo.splice(flag, 1);
        flag-=1;
      }
      flag++;
    }
    this.setData({ todos: todo});
  }
})
