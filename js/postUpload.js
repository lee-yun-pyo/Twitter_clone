const postMain = document.getElementById("postMain");
const chatInput = document.querySelector("#chat-text");
const postUploadInput = document.querySelector(".postUpload-text");
const LS_NICKNAME = localStorage.getItem("nickname");

const nickname_text = document.querySelectorAll(".nickname");
if(LS_NICKNAME) {
    for(let i=0;i<nickname_text.length;i++) {
        nickname_text[i].innerText = LS_NICKNAME;
    }
    postUploadInput.placeholder = `${LS_NICKNAME}님, 무슨 생각을 하고 계신가요?`;
    chatInput.innerText = `${LS_NICKNAME}님, 무슨 생각을 하고 계신가요?`
}
const modal = document.querySelector(".postModal");
const postBtn = document.querySelector("#chat-text");
const overlay = document.querySelector(".postModal-overlay");
const modalCloseBtn = document.querySelector(".postUpload-closeBtn");
const postUploadBtn = document.querySelector(".postUpload-btn");

let posts = [];
const LS_POST = "POST";

const handleOpenModal = () => {
    modal.classList.remove("hidden");
}

const handleCloseModal = () => {
    modal.classList.add("hidden");
}

function savePost() {
    localStorage.setItem(LS_POST, JSON.stringify(posts)); // JSON.stringfy : 배열로 저장 가능
}

const handleDeletePost = (event) => {
    // HTML post 삭제
    let post = event.target.parentNode.parentNode;
    if(post.className !== "post") {
        post = post.parentNode;
    }
    postMain.removeChild(post);
    // localStorage post 삭제
    const cleanPosts = posts.filter(function (post_one) {
        return post_one.id !== parseInt(post.id);
    });
    posts = cleanPosts;
    savePost();
}

const paintPost = (value) => {
    const post = document.createElement("div");
    post.classList.add("post");
    const postId = posts.length + 1;
    post.id = postId;
    const post_name = document.createElement("div");
    post_name.classList.add("post-name");
    const post_name_img_text = document.createElement("div");
    post_name_img_text.classList.add("post-name__img-text");
    const chat_img = document.createElement("img");
    chat_img.src = "img/user.png";
    chat_img.className = "chat-img";
    const post_name_text = document.createElement("div");
    post_name_text.classList.add("post-name__text");
    const nicknameText = document.createElement("span");
    nicknameText.classList.add("nickname");
    nicknameText.innerText = LS_NICKNAME;
    post_name_text.append(nicknameText);
    post_name_img_text.append(chat_img, post_name_text);
    const ellipsis_icon = document.createElement("i");
    ellipsis_icon.classList.add("fas", "fa-ellipsis-h", "icon_hover");
    post_name.append(post_name_img_text, ellipsis_icon); // one div
    const post_content = document.createElement("p"); // two p
    post_content.classList.add("post-content");
    post_content.innerText = value;
    const post_likeComment = document.createElement("div");
    post_likeComment.classList.add("post-likeCommnet");
    const chat_sub_icon1 = document.createElement("div");
    chat_sub_icon1.classList.add("chat-sub__icon");
    const thumbsUp_icon = document.createElement("i");
    thumbsUp_icon.classList.add("far", "fa-thumbs-up");
    const like_p = document.createElement("p");
    like_p.innerText = "좋아요";
    chat_sub_icon1.append(thumbsUp_icon, like_p);
    const chat_sub_icon2 = document.createElement("div");
    chat_sub_icon2.classList.add("chat-sub__icon");
    const comment_icon = document.createElement("i");
    comment_icon.classList.add("fas", "fa-trash");
    const comment_p = document.createElement("p");
    comment_p.innerText = "삭제";
    chat_sub_icon2.append(comment_icon, comment_p);
    post_likeComment.append(chat_sub_icon1, chat_sub_icon2); // three doiv
    const post_comment = document.createElement("div");
    post_comment.classList.add("post-comment");
    const phoneNumber_img = document.createElement("img");
    phoneNumber_img.classList.add("phoneNumber-img");
    phoneNumber_img.src = "img/user.png";
    const post_comment_text = document.createElement("div");
    post_comment_text.classList.add("post-comment__text");
    const postInput = document.createElement("input");
    postInput.type = "text";
    postInput.placeholder = "댓글을 입력하세요...";
    const post_comment_p = document.createElement("p");
    post_comment_p.innerText = "글을 게시하려면 Enter키를 누르세요.";
    post_comment_text.append(postInput, post_comment_p);
    post_comment.append(phoneNumber_img, post_comment_text); // four div
    post.append(post_name, post_content, post_likeComment, post_comment);
    postMain.prepend(post);
    const postObj = {
        text: value,
        id: postId,
    }
    posts.push(postObj);
    savePost();
    chat_sub_icon2.addEventListener("click", handleDeletePost);
}

const handlePost = () => {
    const { value } = postUploadInput;
    postUploadInput.value = "";
    paintPost(value);
}

overlay.addEventListener("click", handleCloseModal);
modalCloseBtn.addEventListener("click", handleCloseModal);
postBtn.addEventListener("click", handleOpenModal);
postUploadBtn.addEventListener("click", handleCloseModal);
postUploadBtn.addEventListener("click", handlePost);

function loadPost() {
    const loadedPost = localStorage.getItem(LS_POST);
    if (loadedPost !== null) {
        const parsedPost = JSON.parse(loadedPost);
        parsedPost.forEach(element => {
            paintPost(element.text);
        });
    }
}

function init() {
    loadPost();
}

init();