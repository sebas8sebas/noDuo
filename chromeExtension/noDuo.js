REQUEST_URL = "http://localhost:5005/codes"   //URL of lacal server, make sure port is correct

/**
 * Function run when page loads
 */
function onLoad(){
    //This is necessary to get first digit of code
    loginBtn = document.getElementById('passcode');
    loginBtn.click();
    //console.log(firstDigit); 

    //create extension button and add action to it
    var div = document.createElement("div");
    div.align = "right";
    var noDuoBtn = document.createElement('button');
    noDuoBtn.style.background = "green"
    noDuoBtn.innerHTML = "I don't think this is necessary";
    noDuoBtn.addEventListener('click', onClickNoDuoBtn);
    div.appendChild(noDuoBtn);
    document.getElementById('auth_methods').appendChild(div);

}



/**
 * Function called when new button is clicked
 */
function onClickNoDuoBtn(){
    firstDigit = getFirstDigitOfCode();
    if (firstDigit == -1){
        setTimeout(() => automateDuoAuthentication(1),2500); //Delay is necessary or it will get old codes that dont work
    } else {
        automateDuoAuthentication(firstDigit);
    }
}


/**
 * Automates authentication process
 */
function automateDuoAuthentication(firstDigit){
    try {
        var codesStr = httpGet(REQUEST_URL);    //codes str has the format "code1,code2,..,code10" and codes are sorted
        if (codesStr == "ERROR"){
            alert("Something went wrong on the server");
        } else {
            var codes = codesStr.split(',');
            login(codes[firstDigit]);     //Since codes are sorted, the code can be accessd with the first number as index
        }
    } catch (error) {
        alert("Can't connect to server");
    }
    

}

/**
 * Make http get request
 */
function httpGet(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}

/**
 * Log in
 */
function login(code){
    loginBtn = document.getElementById('passcode');
    txtInput = document.getElementsByName("passcode")[0];
    txtInput.value = code;
    loginBtn.click();
}


/**
 * Get first digit of next code, if there are no codes available
 * sends more and returns -1
 */
function getFirstDigitOfCode(){
    s = document.getElementsByClassName('next-passcode-msg')[0].innerText;
    
    if(s.length == 0){
        document.getElementById('message').click();
        //potentially add wait
        return -1;
    }
    firstDigit = s[s.length-1];

    return parseInt(firstDigit);
}





window.addEventListener("load", onLoad);
