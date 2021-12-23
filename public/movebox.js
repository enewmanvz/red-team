let selectBoxption = document.getElementById('select_box_value');
let selectPaletteeOption = document.getElementById('select_palette_value');
let firstTimeBox = true
let firstTimePalette = true

selectBoxOption.addEventListener('change', async () => {
     // need to attach the id with this form
     const selectBoxValue = document.getElementById(selectBoxOption.id).value
     const linkEmployeeForm = document.getElementById("employeeLinkForm");
     // check to see if this element already exists
        
        if (firstTimeEmployee) {
            let newDiv = document.createElement('input')
            newDiv.type = "hidden";
            newDiv.id = "selectEmployeeValue";
            newDiv.name = "selectedEmployeeValue"
            newDiv.value = selectEmployeeValue;
            linkEmployeeForm.appendChild(newDiv)
            firstTimeEmployee = false
        } else {
            let hiddenElement = document.getElementById("selectEmployeeValue")
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