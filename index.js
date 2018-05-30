let user={
    userName:"",
    userID:"",
    userAddress:""
};
window.onload = function () {

    $(document).on('click', '#log-in', function(event){
        loginUser();
    });

    $(document).on('click', '#cheese', function(event){
        //orderPizza();
        document.location.href = "#success";
    });

    $(document).on('click', '#hawaiian', function(event){
        //orderPizza();
        document.location.href = "#success";
    });    

    $(document).on('click', '#bbqchicken', function(event){
        //orderPizza();
        document.location.href = "#success";
    });

    $(document).on('click', '#delete', function(event){
        //deleteUser();
        document.location.href = "#log";
    });    

    $(document).on('click', '#createButton', function(event){
        createUser();

    });   

    $(document).on('click', '#changeAccount', function(event){
        //changeUser
        document.location.href = "#log";
    });

    $(document).on("pagebeforeshow", "#order",function(event){
        if(user.userName===""){
            document.location.href = "#log";
        }
        else{
            $("#welcomeOrder").text("Welcome, "+user.userName+"! What do you want to eat today.");
        }
    });
}
function deleteUser()
{
    //this delets the user from the mongo database
}
function loginUser()
{
    //this delets the user from the mongo database
    let loginUername=$("#uername").val();
    if(uername===""){
        alert("Please input username.");
        return
    }
    let loginPassword=$("#password").val();
    if(password===""){
        alert("Please input password.");
        return
    }
    let loginUser={
        username:loginUername,
        password:loginPassword
    };
    fetch('/users/login', {
        method: 'POST', // or 'PUT'
        body: JSON.stringify(loginUser), // data can be `string` or {object}!
        headers: new Headers({
          'Content-Type': 'application/json'
        })
    })
    .then(res => res.json())
    .then((response) => {
        console.log(response);
        if(response.loginSuccess){
            $('#uername').val('');
            $('#password').val('');
            user.userAddress=response.userInfo.address;
            user.userName=response.userInfo.username;
            user.userID=response.userInfo._id;
            document.location.href = "#order";
        }
        else{
            alert(response.msg);
            $('#uername').val('');
            $('#password').val('');
            return;
        }
    })
    .catch(error => console.error('Error:', error));

}

function createUser()
{
    //this creates the user once the info is submitted
    let createUername=$("#createUername").val();
    if(createUername===""){
        alert("Please input username.");
        return
    }
    console.log(createUername);
    let createPassword=$("#createPassword").val();
    if(createPassword===""){
        alert("Please input password.");
        return
    }
    console.log(createPassword);
    let reinputPassword=$("#reinputPassword").val();
    console.log(reinputPassword);
    if(createPassword!=reinputPassword){
        alert("The password is not match.");
        return
    }
    let createAddress=$("#createAddress").val();
    if(createAddress===""){
        alert("Please input your address.");
        return
    }
    let newUser={
        username:createUername,
        password:createPassword,
        address:createAddress
    };
    fetch('/users/adduser', {
        method: 'POST', // or 'PUT'
        body: JSON.stringify(newUser), // data can be `string` or {object}!
        headers: new Headers({
          'Content-Type': 'application/json'
        })
    })
    .then(res => res.json())
    .then((response) => {
        console.log(response);
        if(response.accoutExsit){
            alert("This user is already exist!");
            $('#createUername').val('');
            $('#createPassword').val('');
            $('#reinputPassword').val('');
            $('#createAddress').val('');
            return;
        }
        else{
            $('#createUername').val('');
            $('#createPassword').val('');
            $('#reinputPassword').val('');
            $('#createAddress').val('');
            user.userAddress=response.userInfo.address;
            user.userName=response.userInfo.username;
            user.userID=response.userInfo._id;
            console.log(user.userID);
            document.location.href = "#order";
        }
    })
    .catch(error => console.error('Error:', error));
}

function changeUser()
{
    //this function allows the user to change their information
}

function orderPizza()
{
    //this will allow their order to be added to their account
    //different prices based on the id of the pizza the user chooses
}