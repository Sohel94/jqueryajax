$(function(){


    var users = $("#users");
    var name = $("#name");
    var username = $("#username");
    var email = $("#email");
    var phone = $("#phone");
    var website = $("#website");
    

    //****Using Mustache JS Template Format *****
    var userTemplate = $("#user-template").html();
    


    function userAdd(newUser){
        // **** Mustache JS Template Render Method Use
        users.append(Mustache.render(userTemplate,newUser))
    }


    // **** Fetch Data From Server ****
    $.ajax({
        type:"GET",
        url:"https://jsonplaceholder.typicode.com/users",
        success:function(data){
            $.each(data,function(i,item){
                userAdd(item)
            })
        },
        error:function(){
            alert("error loading users")
        }
    });


    // **** POST Data To Request Send Server ****
    $("#add-order").on("click",function(){
        var user = {
            name:name.val(),
            username:username.val(),
            email:email.val(),
            phone:phone.val(),
            website:website.val()

        }
        $.ajax({
            type:"POST",
            url:"https://jsonplaceholder.typicode.com/users",
            data:user,
            success:function(user){
                userAdd(user)
            },
            error:function(){
                alert("error! saving user")
            }
        })
    });


    // **** DELETE Data From Server **** 
    // **** Instead of using '''delegate''' method use '''on''' ****
    
    users.on("click",".remove",function(){
        var li = $(this).closest('li');
        $.ajax({
            type:"DELETE",
            url:"https://jsonplaceholder.typicode.com/users/"+$(this).attr('data-id'),
            success:function(){
                li.fadeOut(300,function(){
                    $(this).remove()
                })
                // alert(response.id)
            },
            error:function(){
                alert("error Delete user")
            }
        })
    });
    

    // **** Click Edit ****
    // **** Instead of using '''delegate''' method use '''on''' ****

    users.on("click",".editUser",function(){
        var li = $(this).closest('li');
        li.find('input.name').val(li.find('span.name').html());
        li.find('input.username').val(li.find('span.name').html());
        li.find('input.email').val(li.find('span.email').html());
        li.find('input.phone').val(li.find('span.phone').html());
        li.find('input.website').val(li.find('span.website').html())
        li.addClass('edit')
    });


    // **** UPDATE Method use Ajax****
    // **** Instead of using '''delegate''' method use '''on''' ****

    users.on("click",".saveEdit",function(){
        var li = $(this).closest('li');
        var user ={
            name: li.find('input.name').val(),
            username: li.find('input.username').val(),
            email: li.find('input.email').val(),
            phone: li.find('input.phone').val(),
            website: li.find('input.website').val()
        };
        $.ajax({
            type:"PUT",
            url:"https://jsonplaceholder.typicode.com/users/"+li.attr('data-id'),
            data:user,
            success:function(){
                li.find('span.name').html(user.name),
                li.find('span.username').html(user.username),
                li.find('span.email').html(user.email),
                li.find('span.phone').html(user.phone),
                li.find('span.website').html(user.website),
                li.removeClass('edit')
            },
            error:function(){
                alert("error updating user")
            }
        })
    })


    // **** Cancel Edit Button ****
    // **** Instead of using '''delegate''' method use '''on''' ****

    users.on("click",".cancelEdit",function(){
        $(this).closest('li').removeClass('edit');
    });

})