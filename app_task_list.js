const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

loadEventListeners();

function loadEventListeners()
{

    //DOM load event
    document.addEventListener('DOMContentLoaded', getTasks);

    //Add task event
    form.addEventListener('submit', addTask);

    //Remove task event
    taskList.addEventListener('click', removeTask);

    //Clear Task Event
    clearBtn.addEventListener('click', clearTasks);

    //Filter Task Event
    filter.addEventListener('keyup', filterTasks);
}

//Get tasks from LS
function getTasks()
{
    let tasks;
    if(localStorage.getItem('tasks') === null)
    {
        tasks = [];
    }
    else
    {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    
    tasks.forEach(function(task)
    {
        //Create li element
        const li = document.createElement('li');
        li.className = 'collection-item';

        //Create text node and append to li
        li.appendChild(document.createTextNode(task));

        //Create new link element
        const link = document.createElement('a');
        link.className = 'delete-item secondary-content';
        //Add cross icon
        link.innerHTML = '<i class = "fa fa-remove"></i>';
        //Append link into li
        li.appendChild(link);

        //Append li to ul
        taskList.appendChild(li);
    });
}
//Add Task
function addTask(e)
{
    if(taskInput.value === '')
    {
        alert('Add a task!');
    }
    else
    {

        //Create li element
        const li = document.createElement('li');
        li.className = 'collection-item';

        //Create text node and append to li
        li.appendChild(document.createTextNode(taskInput.value));

        //Create new link element
        const link = document.createElement('a');
        link.className = 'delete-item secondary-content';
        //Add cross icon
        link.innerHTML = '<i class = "fa fa-remove"></i>';
        //Append link into li
        li.appendChild(link);

        //Append li to ul
        taskList.appendChild(li);

        //Store in LS
        storeTaskInLocalStorage(taskInput.value);

        //Clear input 
        taskInput.value = '';
    }
    e.preventDefault();//Prevents form to be redirected

}

//function Store in LS
function storeTaskInLocalStorage(task)
{
    let tasks;
    if(localStorage.getItem('tasks') === null)
    {
        tasks = [];
    }
    else
    {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));
}


//Remove Task
function removeTask(f)
{
    if(f.target.parentElement.classList.contains('delete-item'))
    {
        if(confirm('Are you sure?'))
        {
            f.target.parentElement.parentElement.remove();

            //Remove from LS
            removeTaskFromLocalStorage(f.target.parentElement.parentElement);
        }
    }
}

//Remove from LS
function removeTaskFromLocalStorage(taskItem)
{
    let tasks;
    if(localStorage.getItem('tasks') === null)
    {
        tasks = [];
    }
    else
    {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task, index)
    {
        if(taskItem.textContent === task)
        {
            tasks.splice(index, 1);
        }
    })
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

//clearTasks
function clearTasks(g)
{
    // if(confirm("Are you sure you want clear all tasks?"))
    // {
    //     taskList.innerHTML = '';
    // }

    //Faster method thru while loop
    while(taskList.firstChild)
    {
        taskList.removeChild(taskList.firstChild);
    }

    //Clear from LS
    clearTasksFromLocalStorage();
}

//Clear tasks from LS
function clearTasksFromLocalStorage()
{
    localStorage.clear();
}

//Filtertasks
function filterTasks(h)
{
    const text = h.target.value.toLowerCase();
    
    //Since querySelectorAll returns a node list so we can use forEach
    //Otherwise if we've used getElementByClassNames it would have returned html list
    //Which we had to first convert into an array and then could have used forEach
    document.querySelectorAll('.collection-item').forEach
    (
        function(task)
        {
            const item = task.firstChild.textContent;
            if(item.toLowerCase().indexOf(text) != -1)
            {
                task.style.display = 'block';
            }
            else
            {
                task.style.display = 'none';
            }
        }
    );

    
}
