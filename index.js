const postContainer = document.getElementById('post-container');
const  HOST_URL = 'http://message-list.appspot.com/';
let token;

const createList = messages => {
    messages.forEach(message => {
        const card = document.createElement('div');
        card.className = 'card'
        const cardHead = document.createElement('div');
        cardHead.className = 'card-header';
        const img = document.createElement('img');
        img.className = 'author-img';
        img.src = HOST_URL + message.author.photoUrl;
        const author = document.createElement('strong');
        author.innerText = message.author.name;
        cardHead.appendChild(img);
        cardHead.appendChild(author);
        card.appendChild(cardHead);
        const cardBody = document.createElement('p');
        cardBody.innerText = message.content;
        card.appendChild(cardBody);
        postContainer.appendChild(card);
    })

}

const getPost = () => {
    fetch(`${HOST_URL}messages?limit=10&pageToken=${token}`)
      .then(res => res.json())
      .then(data => {
          token = data.pageToken;
          createList(data.messages);
      });
}

(function() {
    const option = {};
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if(!entry.isIntersecting) {
                return
            }
            getPost();
        })
    }, option);
    const endDiv = document.getElementById('end');
    observer.observe(endDiv);
})();
