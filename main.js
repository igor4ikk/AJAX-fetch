const API = 'https://jsonplaceholder.typicode.com/';


//звернення до сервера 
const post = () =>{
    return fetch(API + 'users').then(res =>{
        return res.json();
    }).catch(err =>{
        console.log('ERROR', err)
    })
    
}
const deletUser = async (userId, boxUser) =>{
    try{
        const delUser = await fetch(API + 'users/' + userId, {method: 'DELETE'});
        boxUser.remove();
    }catch(err){
        console.log('Sorry its error', err)
    }

}

const renderUsers = (users) =>{
    const listUser = document.querySelector('#listUser');
 renderUsers.innerHTML = "";

    users.forEach(item => {

        const boxUser = document.createElement('div');
        boxUser.classList.add('boxUser');
        boxUser.innerHTML = `
          
            <h3>${item.name}</h3>
            <h3>${item.email}</h3>
        `;

        const btDelet = document.createElement('button');
        btDelet.classList.add('userDel');
        btDelet.innerHTML = 'X';
        btDelet.addEventListener('click', () =>{
            deletUser(item.id, boxUser)
        })

        boxUser.append(btDelet)
        listUser.append(boxUser)
    })
}

const total = async () =>{
    const people = await post();
    console.log(people)
    renderUsers(people);
}

const addnewUser = () =>{
    const name = document.querySelector('#name').value;
    const email = document.querySelector('#email').value;
    
    
    fetch(API + 'users',{
        method: 'POST',
        body: JSON.stringify({name: name, email: email})
    }).then(res =>{
        return res.json();
    }).then(({id}) =>{
        const user = {
            name,
            email,
            id
        };
       
        // users.unshift(user)
        renderUsers([user])
    })
    .catch(err =>{
        console.log('ERROR', err)
    })
}



//при натисненні кнопки 
document.addEventListener('DOMContentLoaded', () =>{

    const userForm = document.querySelector('#get-user');
    userForm.addEventListener('click', total)

    const createnewUser = document.querySelector('#btCreate');
    createnewUser.addEventListener('click', addnewUser)

})
