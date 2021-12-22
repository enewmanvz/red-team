let selectOption = document.getElementById('select_value');
let firstTime = true
selectOption.addEventListener('change', async () => {
     // need to attach the id with this form
     const selectValue = document.getElementById(selectOption.id).value
     const updateEmployeeForm = document.getElementById("employeeUpdateForm");
     // check to see if this element already exists
        
        if (firstTime) {
            let newDiv = document.createElement('input')
            newDiv.type = "hidden";
            newDiv.id = "selectValue";
            newDiv.name = "selectedValue"
            newDiv.value = selectValue;
            updateEmployeeForm.appendChild(newDiv)
            firstTime = false
        } else {
            let hiddenElement = document.getElementById("selectValue")
            hiddenElement.value = selectValue;
        }
        
       
        
     
    updateEmployeeForm.style.visibility = "visible";
    // use fetch to get the current values and then update
    let response = await window.fetch(`/employee/getOneEmployee/${selectValue}`);
    //convert the response to json
    let responseJSON = await response.json()
    //store the response in the variable coolTrends
    let {singleEmployeeForUserID} = responseJSON;
    
    //for each element in coolTrends, 
    let formElementFirstName = document.getElementById("firstName")
    formElementFirstName.value = singleEmployeeForUserID.firstName
    let formElementLastName = document.getElementById("lastName")
    formElementLastName.value = singleEmployeeForUserID.lastName
    let formElementEmail = document.getElementById("email")
    formElementEmail.value = singleEmployeeForUserID.email
    let formElementPassword = document.getElementById("password")
    formElementPassword.value = singleEmployeeForUserID.password
    
    


    
   
});