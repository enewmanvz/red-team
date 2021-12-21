let selectOption = document.getElementById('select_value');
let firstTime = true
selectOption.addEventListener('change', async () => {
     // need to attach the id with this form
     const selectValue = document.getElementById(selectOption.id).value
     const updateWarehouseForm = document.getElementById("warehouseUpdateForm");
     // check to see if this element already exists
        
        if (firstTime) {
            let newDiv = document.createElement('input')
            newDiv.type = "hidden";
            newDiv.id = "selectValue";
            newDiv.name = "selectedValue"
            newDiv.value = selectValue;
            updateWarehouseForm.appendChild(newDiv)
            firstTime = false
        } else {
            let hiddenElement = document.getElementById("selectValue")
            hiddenElement.value = selectValue;
        }
        
       
        
     
    updateWarehouseForm.style.visibility = "visible";
    // use fetch to get the current values and then update
    let response = await window.fetch(`/warehouse/getOneWarehouse/${selectValue}`);
    //convert the response to json
    let responseJSON = await response.json()
    //store the response in the variable coolTrends
    let {singleWarehouseForUserID} = responseJSON;
    
    //for each element in coolTrends, 
    let formElementName = document.getElementById("name")
    formElementName.value = singleWarehouseForUserID.name
    let formElementLocation = document.getElementById("location")
    formElementLocation.value = singleWarehouseForUserID.location
    let formElementImage = document.getElementById("image")
    formElementImage.value = singleWarehouseForUserID.image
    let formElementCapacity = document.getElementById("capacity")
    formElementCapacity.value = singleWarehouseForUserID.capacity
    
    


    
   
});