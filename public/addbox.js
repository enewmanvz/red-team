let selectPaletteOption = document.getElementById('select_palette_value');
let selectBoxOption = document.getElementById('select_box_value');
let firstTimePalette = true
let firstTimeBox = true

selectPaletteOption.addEventListener('change', async () => {
     // need to attach the id with this form
     const selectPaletteValue = document.getElementById(selectPaletteOption.id).value
     const addBoxForm = document.getElementById("addBoxForm");
     // check to see if this element already exists
        
        if (firstTimePalette) {
            let newDiv = document.createElement('input')
            newDiv.type = "hidden";
            newDiv.id = "selectPaletteValue";
            newDiv.name = "selectedPaletteValue"
            newDiv.value = selectPaletteValue;
            addBoxForm.appendChild(newDiv)
            firstTimePalette = false
        } else {
            let hiddenElement = document.getElementById("selectPaletteValue")
            hiddenElement.value = selectPaletteValue;
        }

    
   
});

selectBoxOption.addEventListener('change', async () => {
    // need to attach the id with this form
    const selectBoxValue = document.getElementById(selectBoxOption.id).value
    const addBoxForm = document.getElementById("addBoxForm");
    // check to see if this element already exists
       
       if (firstTimeBox) {
           let newDiv = document.createElement('input')
           newDiv.type = "hidden";
           newDiv.id = "selectBoxValue";
           newDiv.name = "selectedBoxValue"
           newDiv.value = selectBoxValue;
           addBoxForm.appendChild(newDiv)
           firstTimeBox= false
       } else {
           let hiddenElement = document.getElementById("selectBoxValue")
           hiddenElement.value = selectBoxValue;
       }

   
  
});