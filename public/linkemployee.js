let selectEmployeeOption = document.getElementById('select_employee_value');
let selectWarehouseOption = document.getElementById('select_warehouse_value');
let firstTimeEmployee = true
let firstTimeWarehouse = true

selectEmployeeOption.addEventListener('change', async () => {
     // need to attach the id with this form
     const selectEmployeeValue = document.getElementById(selectEmployeeOption.id).value;
     const linkEmployeeForm = document.getElementById("employeeLinkForm");
     // check to see if this element already exists
        
        if (firstTimeEmployee) {
            let newDiv = document.createElement('input');
            newDiv.type = "hidden";
            newDiv.id = "selectEmployeeValue";
            newDiv.name = "selectedEmployeeValue";
            newDiv.value = selectEmployeeValue;
            linkEmployeeForm.appendChild(newDiv);
            firstTimeEmployee = false;
        } else {
            let hiddenElement = document.getElementById("selectEmployeeValue");
            hiddenElement.value = selectEmployeeValue;
        }
});

selectWarehouseOption.addEventListener('change', async () => {
    // need to attach the id with this form
    const selectWarehouseValue = document.getElementById(selectWarehouseOption.id).value
    const linkEmployeeForm = document.getElementById("employeeLinkForm");
    // check to see if this element already exists
       
       if (firstTimeWarehouse) {
           let newDiv = document.createElement('input')
           newDiv.type = "hidden";
           newDiv.id = "selectWarehouseValue";
           newDiv.name = "selectedWarehouseValue"
           newDiv.value = selectWarehouseValue;
           linkEmployeeForm.appendChild(newDiv)
           firstTimeWarehouse= false
       } else {
           let hiddenElement = document.getElementById("selectWarehouseValue")
           hiddenElement.value = selectWarehouseValue;
       }
});