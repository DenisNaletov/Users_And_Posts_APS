const baseUrl = 'https://jsonplaceholder.typicode.com';
const users = new Users();
const controller = new Controller(users);

const btnFormUser = document.querySelector('#btn_form_user');
const btnListUser = document.querySelector('#btn_user_list');
const btnGetPosts = document.querySelector('#btn_form_get_posts');
const btnAddPost = document.querySelector('#btn_form_add_post');
const formUser = document.querySelector('#form_user');
const formGetPosts = document.querySelector('#form_get_posts');
const formAddPost = document.querySelector('#form_add_post');
const list = document.querySelector('#list');

// btnFormUser.addEventListener('click', e => {
//     e.preventDefault();
//     formUser.classList.toggle('hidden', false);
//     formAddPost.classList.toggle('hidden', true);
//     formGetPosts.classList.toggle('hidden', true);
// });

Toolbox.addNavButtonControl('#btn_form_user',
    ['#form_user', '#form_add_post', '#form_get_posts'])

btnAddPost.addEventListener('click', e => {
    e.preventDefault();
    formUser.classList.toggle('hidden', true);
    formAddPost.classList.toggle('hidden', false);
    formGetPosts.classList.toggle('hidden', true);
});

btnGetPosts.addEventListener('click', e => {
    e.preventDefault();
    formUser.classList.toggle('hidden', true);
    formAddPost.classList.toggle('hidden', true);
    formGetPosts.classList.toggle('hidden', false);
});

(async () => {
    const response = await fetch(`${baseUrl}/users`);
    const json = await response.json();
    //******************************************************************
    await (json.forEach(item => controller.createUser(item)));

    await controller.processUsers(user =>
        Toolbox.addItemToList('ul',
            `User ID: ${user.id} , user Name: ${user.name},
         user Nickname: ${user.username}`))
})();

//*************************Form User Handler***************************
Toolbox.formHandler('#form_user', user => {
    controller.createUser(user);
    Toolbox.addItemToList('ul',`User ID: ${user.id} ,
     user Name: ${user.name},
     user Nickname: ${user.username}` );
});

//**********************Form Add Post**********************************
Toolbox.formHandler('#form_add_post', item => {
    let post = {
        title: item.title,
        body: item.body,
        userId: item.userId
    };
    fetch(`${baseUrl}/posts`, {
        method: 'POST',
        body: JSON.stringify(post),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        }
    }).then(response => {
        console.log(response);
        response.json()})
        .then(data => {
            console.log(data);
            alert(`Post by User#${data.userId} successfully added`)});
});
