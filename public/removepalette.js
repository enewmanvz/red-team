let selectOption = document.getElementById('select_value');
let firstTime = true
selectOption.addEventListener('change', async () => {
     // need to attach the id with this form
     const selectValue = document.getElementById(selectOption.id).value
     const removePaletteForm = document.getElementById("removePaletteForm");
     // check to see if this element already exists
        
        if (firstTime) {
            let newDiv = document.createElement('input')
            newDiv.type = "hidden";
            newDiv.id = "selectValue";
            newDiv.name = "selectedValue"
            newDiv.value = selectValue;
            removePaletteForm.appendChild(newDiv)
            firstTime = false
        } else {
            let hiddenElement = document.getElementById("selectValue")
            hiddenElement.value = selectValue;
        }

    
   
});