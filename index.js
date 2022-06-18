// Your code here
function createEmployeeRecord(info){
    return {
        firstName: info[0],
        familyName: info[1],
        title: info[2],
        payPerHour: info[3],
        timeInEvents:[],
        timeOutEvents:[],
};
};

function createEmployeeRecords(arrayOfArrays){
    return arrayOfArrays.map(createEmployeeRecord)
}

const createTimeInEvent = (employeeRecord, dateStamp) => {
    const date = dateStamp.split(" ")[0];
    const time = dateStamp.split(" ")[1];
    const timeInEntry = {
      type: "TimeIn",
      hour: parseInt(time),
      date: date
    }
    employeeRecord.timeInEvents.push(timeInEntry);
    return employeeRecord;
  }


function createTimeOutEvent(object, datastamp){
    object.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(datastamp.slice(-4)),
        date: datastamp.slice(0, 10)
         })
       return object
};


function hoursWorkedOnDate(object,dataForm){
    let inTime = object.timeInEvents.find(function(event){
        return event.date === dataForm
    });
    let outTime = object.timeOutEvents.find(function(event){
        return event.date === dataForm
    });
    return (outTime.hour - inTime.hour) / 100
}

function wagesEarnedOnDate(object, dataForm){
    const payowed = hoursWorkedOnDate(object, dataForm)* object.payPerHour
    return parseFloat(payowed.toString())
}

function allWagesFor(object){
    const dates = object.timeInEvents.map(function(event){
        return event.date
    })
    const paysNumber = dates.reduce(function(amount, dateForm){
        return amount + wagesEarnedOnDate(object, dateForm)
    }, 0)
    return paysNumber
}

const calculatePayroll= function (arrayofObject){
    return arrayofObject.reduce(function(amount, record){
        return amount + allWagesFor(record)
    }, 0)
}