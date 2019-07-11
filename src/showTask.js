import React from 'react';
import './App.css';
// import DeleteTask from './deleteTask';

export default class ShowTask  extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            allTask: this.props.tasks,
        };
        this.delTask= this.delTask.bind(this);
        this.completedTask = this.completedTask.bind(this);
    }

    componentDidMount(){
        console.log("cdm")
    }
    delTask(index){
        // this.state.alltask.splice(index,1);
        // this.setState({alltask: this.state.alltask});
        // this.setState({alltask: React.addons.update(this.state.alltask, {$splice: [[index,1]]})})
        this.setState({allTask: this.state.allTask.filter((a,ind) => ind !==index)});
    }

    completedTask(index){
        // (this.state.getDone[index]==="Pending") ? 
        // (this.state.getDone[index]="Done"): (this.state.getDone[index]="Pending") ;
        // this.setState({getDone: this.state.getDone});

        this.setState({
            allTask: this.state.allTask.filter((item,i)=>{
                if(index === i){
                    item.isCompleted = !item.isCompleted;
                    return item;
                }
                else{
                    return item;
                }
            })
        })
        // this.setState({getDone: this.state.getDone.filter((a,ind)=> )
        // this.setState({getDone: React.addons.update(this.state.getDone, {index: {$set: "Pending"}})});
    }

    componentWillReceiveProps(nextProps){
        this.setState({allTask: this.props.tasks})
    }
    render(){
        
        console.log(this.props.tasks, this.state.allTask, "props and state")
    const listItems = this.state.allTask.map((task,index) =>
        <div keys = {index}>
         <p className={(this.state.allTask[index].isCompleted)? "Completed": "Pending"} keys = {index}>{task.task}</p>
        
        {/* pending task */}
        <input type="button" value= {(this.state.allTask[index].isCompleted)? "Completed": "Pending"} onClick = {()=> {
            this.completedTask(index);
            }} />

       {/* to delete task  */}
        <input type="button" value= "Delete" onClick = {()=>{
            this.delTask(index);
        } } />
        </div>
        );

        return(
            <ul> {listItems}</ul>
        );
    };
}



// 
// this.state = {
//     tasks: [
//         {id:'task1', name:'task1', isCompleted: false}
//     ]
// }

// var newTask= {
//     id: '',
//     name: e.target.value,
//     isCompleted: false
// }

// this.setState({
//     tasks:[...this.state.tasks, newTask]
// })


// newState = [
//     ...this.state.tasks.splice(0,1),
//     newUpdated
//     ...this.state.tasks.splice(index, lengh)
// ]