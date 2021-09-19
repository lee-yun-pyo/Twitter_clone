const h1 = document.querySelector("h1");
const postFrame = document.getElementById("post-entitle");

const uploadForm = document.getElementById("post-upload");
const uploadInput = document.getElementById("post-input");

const nickname = localStorage.getItem("nickname");

if(nickname) {
    h1.innerText = nickname;
}

const handleEditClick = (event) => {
    event.preventDefault();
    const { parentNode } = event.target;
    const post_form = parentNode.parentNode; // form 태그
    const post_one = post_form.parentNode; // div 태그
    const { children } = post_form.parentNode;
    children[0].classList.remove("unshowing"); // p 태그
    children[1].classList.remove("unshowing"); // button div 태그
    children[0].innerText = post_form.children[0].value;
    post_one.removeChild(post_form); 
    // localStorage 수정
}

const handleCancleClick = (event) => {
    const { parentNode } = event.target;
    const post_form = parentNode.parentNode; // form 태그
    const post_one = post_form.parentNode; // div 태그
    const { children } = post_form.parentNode;
    children[0].classList.remove("unshowing"); // p 태그
    children[1].classList.remove("unshowing"); // button div 태그
    post_one.removeChild(post_form);    
}

const handleDelete = (event) => {
    const { parentNode } = event.target;
    const post_one = parentNode.parentNode;
    postFrame.removeChild(post_one);
    // localStorage 삭제
}

const handleEdit = (event) => {
    const { parentNode } = event.target;
    const post_one = parentNode.parentNode;
    const { children } = post_one;
    children[0].classList.add("unshowing"); 
    children[1].classList.add("unshowing");
    const form = document.createElement("form");
    const input = document.createElement("input");
    const btnDiv = document.createElement("div");
    const editBtn = document.createElement("button");
    const cancleBtn = document.createElement("button");
    input.type = "text";
    input.value = children[0].innerText;
    editBtn.innerText = "편집";
    cancleBtn.innerText = "취소";
    btnDiv.append(editBtn, cancleBtn);
    form.append(input, btnDiv);
    post_one.append(form);
    editBtn.addEventListener("click", handleEditClick);
    cancleBtn.addEventListener("click", handleCancleClick);
}

const postUpload = () => {
    const { value } = uploadInput;
    uploadInput.value = "";
    const post = document.createElement("div");
    const postBtnDiv = document.createElement("div");
    const p = document.createElement("p");
    const delBtn = document.createElement("button");
    const editBtn = document.createElement("button");
    delBtn.innerText = "삭제";
    editBtn.innerText = "편집";
    postBtnDiv.append(delBtn, editBtn);
    p.innerText = value;
    post.append(p, postBtnDiv);
    postFrame.appendChild(post);
    delBtn.addEventListener("click", handleDelete);
    editBtn.addEventListener("click", handleEdit);
    // localStorage 추가
}

const handleForm = (event) => {
    event.preventDefault();
    postUpload();
}

uploadForm.addEventListener("submit", handleForm);