let selectOption = document.getElementById('select_value');

selectOption.addEventListener('change', async () => {
   
    const selectValue = document.getElementById(selectOption.id).value
    const updateWarehouseForm = document.getElementById("warehouseUpdateForm");
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
    // need to attach the id with this form
    let newDiv = document.createElement('input')
    newDiv.type = "hidden";
    newDiv.id = selectValue;
    newDiv.value = selectValue;
    newDiv.name = "selectedValue"
    updateWarehouseForm.appendChild(newDiv)

    


    
   
});