var departments = [];
var employees = [];

const initialize = () => {
    const fs = require('fs');

    fs.readFile('./data/employees.json',(err,data)=>{
        if (err) {
            rej("Failure to read file employees.json!");
        } else {
            employees = JSON.parse(data);
        }
    });

    fs.readFile('./data/departments.json',(err,data)=>{
        if (err) { 
            rej("Failure to read file departments.json!");
        } else {
            departments = JSON.parse(data);
        }
    });

    return new Promise((res, rej) => {
        console.log("initialize called");
        res("Data succesfully initialized!");
    });
}

const getAllEmployees = () => {
    return new Promise((res, rej) => {
            console.log("getAllEmployees called");

            res(employees);
            rej(reason);
    });
}

const getManagers = () => {
    return new Promise((res, rej) => {
        console.log("getManagers called");
        const managers = [];

        for(e of employees){
            if(e.isManager){
                managers.push(e);
            }
        }

        res(managers);
        rej(reason);
    });
}

const getDepartments = () => {
    return new Promise((res, rej) => {
        console.log("getDepartments called");

        res(departments);
    });
}


const addEmployee = (e) => {
    return new Promise((res, rej) => {
        console.log("addEmployee called");

        e.employeeNum = employees.length + 1; 
        e.isManager = (e.isManager == null) ? false : true; 
        
        employees.push(e);
        res();
    });
}

const getEmployeesByStatus = (s) => {
    return new Promise((res, rej) => {
        console.log("getEmployeeByStatus called");
        
        let l = [];

        for(e of employees){
            if(e.status == s){
                l.push(e);
            }
        }
        
        res(l);
    });
}

const getEmployeesByDepartment = (d) => {
    return new Promise((res, rej) => {
        console.log("getEmployeesByDepartment called");
        
        let l = [];
        
        for(e of employees){
            if(e.department == d){
                l.push(e);
            }
        }
        
        res(l);
    });
}

const getEmployeesByManager = (m) => {
    return new Promise((res, rej) => {
        console.log("getEmployeesByManager called");
        
        let l = [];
        
        for(e of employees){
            if(e.employeeManagerNum == m){
                l.push(e);
            }
        }

        res(l);
    });
}

const getEmployeeByNum = (n) => {
    return new Promise((res, rej) => {
        console.log("getEmployeesByNum called");

        for(e of employees){
            if(e.employeeNum == n){
                res(e);
            }
        }
    });
}

exports.initialize = initialize;
exports.getAllEmployees = getAllEmployees;
exports.getManagers = getManagers;
exports.getDepartments = getDepartments;
exports.addEmployee = addEmployee;
exports.getEmployeesByStatus = getEmployeesByStatus;
exports.getEmployeesByDepartment = getEmployeesByDepartment;
exports.getEmployeesByManager = getEmployeesByManager;
exports.getEmployeeByNum = getEmployeeByNum;