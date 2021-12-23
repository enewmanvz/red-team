let selectPaletteOption = document.getElementById('select_palette_value');
let firstTimePalette = true


selectPaletteOption.addEventListener('change', async () => {
     // need to attach the id with this form
     const selectPaletteValue = document.getElementById(selectPaletteOption.id).value
     const removeBoxForm = document.getElementById("removeBoxForm");
     // check to see if this element already exists
        
        if (firstTimePalette) {
            let newDiv = document.createElement('input')
            newDiv.type = "hidden";
            newDiv.id = "selectPaletteValue";
            newDiv.name = "selectedPaletteValue"
            newDiv.value = selectPaletteValue;
            removeBoxForm.appendChild(newDiv)
            firstTimePalette = false
        } else {
            let hiddenElement = document.getElementById("selectPaletteValue")
            hiddenElement.value = selectPaletteValue;
        }

    
   
});

