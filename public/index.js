const light = document.getElementById("lightItUp");
const dark = document.getElementById("home");
let change = true;

dark.addEventListener('click', function modeChange(){
    if(change){
        this.style.backgroundImage = "url('https://images.unsplash.com/photo-1590209680469-534b21078b1a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1548&q=80')";
        light.style.backgroundImage = "url('https://images.unsplash.com/reserve/oGLumRxPRmemKujIVuEG_LongExposure_i84.jpeg?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1773&q=80')";
        change = false;
    } else {
        this.style.backgroundImage = "url('https://images.unsplash.com/reserve/oGLumRxPRmemKujIVuEG_LongExposure_i84.jpeg?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1773&q=80')";
        change = true;
    }
});