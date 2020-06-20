(function() {
    const postContainer = document.getElementById('post-container');
    const loader = document.getElementById('loader');
    const  HOST_URL = 'https://message-list.appspot.com/';
    let token;

    const createList = messages => {
        loader.style.display = 'none';
        messages.forEach((message, id) => {
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
            if(id == 7) {
                serObserver(card);
            }
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


    const option = {};
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if(!entry.isIntersecting) {
                return
            }
            loader.style.display = 'block';
            getPost();
            observer.unobserve(entry.target);
        })
    }, option);

    const serObserver = (card) => {
        observer.observe(card);
    }
    getPost();
})();
