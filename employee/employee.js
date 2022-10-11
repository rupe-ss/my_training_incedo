clickBtn = ()=>{
    //alert('button clicked..');
    //console.log('button clicked');
    document.getElementById('msg').innerHTML='<h3>Hey Button Clicked!!!</h3>';
}
//var let const 
function readEmployeeData(){
    let name = document.getElementById('ename').value;
    let city = document.getElementById('ecity').value;
    let salary = document.getElementById('esalary').value;
    let id = parseInt(Math.random() * 100); //1 - 99 
    e1={
        "id": id,
        "name": name,
        "city": city, 
        "salary": salary
    }
    const employees = [];
    let filteredEmployeeArry = [];
    let sortedArray = [];
    fetch('http://localhost:3000/employees')  //get the Promise
        .then(response=> response.json()) //get the response
        .then(data=> data.map(e=>employees.push(e)));

    employees.push(e1); 
     
     /* for-each */
    const cars = ["Saab", "Volvo", "BMW"];
    cars.forEach(e => console.log(e)); //displays all employee objects 

    console.log(employees)

     /* filteration */
     //Display those employees having city as london 
     filteredEmployeeArry = employees.filter(e=>e.city=='london'); 
     console.log(filteredEmployeeArry);

     /* sorting */ 
     sortedArray =  employees.sort((emp1,emp2)=> emp1.salary - emp2.salary); //ASC order
     console.log(sortedArray);

     [11,2,22,1].sort((a, b) => a - b).forEach(n=>console.log(n));
     [11,2,22,1].sort((a, b) => b - a).forEach(n=>console.log(n));

     /* searching: find */
     let num = [11,2,22,1].find(n=>n==22); 
     console.log(num); //returns a num if present

     num = [11,2,22,1].find(n=>n==1);
     console.log( !(num == undefined)?'found':'not found'); //returns undefined as 30 not present

//[12000 14000] : -2000 : -VE -- do nothing(No swap)
//[12000 12000] : 0 (equal) - do nothing - no swap
//[14000 12000] : +2000 : +VE - I will swap 

}

buttonClicked = () => {
    console.log("button Clicked")
    const employees = [];
}