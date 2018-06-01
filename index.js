let user={//user state, can change to save in session
    userName:"",
    userID:"",
    userAddress:""
};
window.onload = function () {
    if(user.userName===""){//if not login, go login page
        document.location.href = "#log";
    }
    $(document).on('click', '#backSignInIcon', function(event){
        $('#createUername').val('');
        $('#createPassword').val('');
        $('#reinputPassword').val('');
        $('#createAddress').val('');
        document.location.href = "#log";
    });
    $(document).on('click', '#log-in', function(event){
        loginUser();
    });
    $(document).on('click', '.signOutIcon', function(event){
        signOut();
    });
    $(document).on('click', '.backManageIcon', function(event){
        $("#oldpassword").val("");
        $("#newpassword").val("");
        $("#matchpassword").val("");
        $("#passwordAddress").val("");
        $("#newaddress").val("");
        $("#passworddelet").val("");
        document.location.href = "#manageaccount";
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

    $(document).on('click', '#m_passwordbt', function(event){
        //move to passwordchange page;
        document.location.href = "#passwordchange";
    });
    $(document).on('click', '#changepasswordbt', function(event){
        changePassword();
    });
    $(document).on('click', '#m_addressbt', function(event){
        //move to addresschange page;
        document.location.href = "#addresschange";
    });
    $(document).on('click', '#changeAdressbt', function(event){
        changeAdress();
    });
    $(document).on('click', '#m_deletbt', function(event){
        //move to deletaccount page;
        document.location.href = "#deletaccount";
    });
    $(document).on('click', '#deletAccountbt', function(event){
        deletAccount();
    });

    $(document).on('click', '#createButton', function(event){
        createUser();

    });   

    $(document).on("pagebeforeshow", "#order",function(event){
        if(user.userName===""){//if not login, go login page
            alert("Please login!");
            document.location.href = "#log";
        }
        else{//if login, show welcome message
            $("#welcomeOrder").text("Welcome, "+user.userName+"! What do you want to eat today.");
        }
    });
    $(document).on("pagebeforeshow", "#manageaccount",function(event){
        if(user.userName===""){//if not login, go login page
            alert("Please login!");
            document.location.href = "#log";
        }
    });
    $(document).on("pagebeforeshow", "#passwordchange",function(event){
        if(user.userName===""){//if not login, go login page
            alert("Please login!");
            document.location.href = "#log";
        }
    });
    $(document).on("pagebeforeshow", "#addresschange",function(event){
        if(user.userName===""){//if not login, go login page
            alert("Please login!");
            document.location.href = "#log";
        }
    });
    $(document).on("pagebeforeshow", "#deletaccount",function(event){
        if(user.userName===""){//if not login, go login page
            alert("Please login!");
            document.location.href = "#log";
        }
    });
    $(document).on("pagebeforeshow", "#success",function(event){
        if(user.userName===""){//if not login, go login page
            alert("Please login!");
            document.location.href = "#log";
        }
    });
}
function signOut(){
    user={//reset user state, can change to clear session
        userName:"",
        userID:"",
        userAddress:""
    };
    document.location.href = "#log";
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
function changePassword()
{
    //this function allows the user to change their password
    let oldpassword=$("#oldpassword").val();
    let newpassword=$("#newpassword").val();
    let matchpassword=$("#matchpassword").val();
    if(newpassword!=matchpassword){
        $("#oldpassword").val("");
        $("#newpassword").val("");
        $("#matchpassword").val("");
        alert("please check your new password, they don't match each other.");
        return;
    }
    else{
        let userInfo={
            userID:user.userID,
            password:oldpassword,
            newpassword:newpassword
        };
        fetch('/users/updatepassword', {
            method: 'POST', // or 'PUT'
            body: JSON.stringify(userInfo), // data can be `string` or {object}!
            headers: new Headers({
              'Content-Type': 'application/json'
            })
        })
        .then(res => res.json())
        .then((res) => {
            console.log(res);
            if(res.updateSuccess){
                alert("Password changed successfully!");
                document.location.href = "#manageaccount";
            }
            else{
                alert("Password incorrect!");
            }
        })
        .catch(error => console.error('Error:', error));
        $("#oldpassword").val("");
        $("#newpassword").val("");
        $("#matchpassword").val("");
    }
}
function changeAdress()
{
    //this function allows the user to change their address
    let passwordAddress=$("#passwordAddress").val();
    let newaddress=$("#newaddress").val();
    let userInfo={
        userID:user.userID,
        password:passwordAddress,
        newaddress:newaddress
    };
    console.log("before fetch");
    fetch('/users/updateaddress', {
        method: 'POST', // or 'PUT'
        body: JSON.stringify(userInfo), // data can be `string` or {object}!
        headers: new Headers({
          'Content-Type': 'application/json'
        })
    })
    .then(res => res.json())
    .then((res) => {
        console.log(res);
        if(res.updateSuccess){
            $("#passwordAddress").val("");
            $("#newaddress").val("");
            alert("Address changed successfully!");
            document.location.href = "#manageaccount";
        }
        else{
            $("#passwordAddress").val("");
            $("#newaddress").val("");
            alert("Password incorrect!");
        }
    })
    .catch(error => console.error('Error:', error));
}
function deletAccount()
{
    //this function allows the user to delet their account
    let passworddelet=$("#passworddelet").val();
    let userInfo={
        userID:user.userID,
        password:passworddelet,
    };
    fetch('/users/deleteuser', {
        method: 'POST', // or 'PUT'
        body: JSON.stringify(userInfo), // data can be `string` or {object}!
        headers: new Headers({
          'Content-Type': 'application/json'
        })
    })
    .then(res => res.json())
    .then((res) => {
        console.log(res);
        if(res.deletSuccess){
            $("#passworddelet").val("");
            alert("The account deleted successfully")
            document.location.href = "#log";
        }
        else{
            $("#passworddelet").val("");
            alert("Password incorrect!");
        }
    })
    .catch(error => console.error('Error:', error));
}

function orderPizza()
{
    //this will allow their order to be added to their account
    //different prices based on the id of the pizza the user chooses
}