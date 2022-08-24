let timer;
let isActive = true;

const counter = document.querySelector('#counter')
const minus = document.querySelector('#minus')
const plus = document.querySelector('#plus')
const heart = document.querySelector('#heart')
const pause = document.querySelector('#pause')
const likes = document.querySelector('.likes')
const comments = document.querySelector('#list')
const commentForm = document.querySelector('#comment-form')

document.addEventListener('DOMContentLoaded', startTimer)
plus.addEventListener('click', incrementCounter);
minus.addEventListener('click', decrementCounter);
heart.addEventListener('click', addLike)
pause.addEventListener('click', pauseOrResumeActivities)
commentForm.addEventListener('submit', displayComment)


// Counter

function startTimer(){
    timer = setInterval(incrementCounter, 1000)
}


// Manually increment and decrement the counter using the plus and minus buttons

function decrementCounter() {
    const currentCount = parseInt(counter.textContent, 10);
    if (currentCount > 0){
    counter.textContent = `${currentCount - 1}`;
   }
}

function incrementCounter() {
    const currentCount = parseInt(counter.textContent, 10);
    counter.textContent = `${currentCount + 1}`;
}

// Like button

function addLike(){
    const currentCount = parseInt(counter.textContent, 10);
    const previousLikes = Array.from(document.querySelectorAll('.likes >li'));
    const previousLike = previousLikes.find(previousLike => {
    const previousLikeCount = parseInt(previousLike.textContent.split(" ")[0], 10)
        return previousLikeCount === currentCount
    })

    function addHeartToLike(){
        const previousHearts = previousLike.textContent.split(" ").slice(-2)[0];
        const numberOfHearts = parseInt(previousHearts, 10)
        previousLike.textContent = `${currentCount} has been liked ${numberOfHearts + 1} times`
    }

    function  createNewLike(){
        const newLike = document.createElement('li')
        newLike.textContent = `${currentCount} has been liked 1 time`
        likes.appendChild(newLike)
    }

    
    if (previousLike){
        addHeartToLike()
        
    }else{
        createNewLike();
       }
}

// Pause

function pauseOrResumeActivities(){
const buttons = Array.from(document.querySelectorAll('button'))
const nonPauseButtons = buttons.filter((button) => button.id !== 'pause')

    if (isActive){
       clearInterval(timer);
       pause.textContent = 'resume';
       
    }else {
        startTimer();
        pause.textContent = 'pause';
        
        
    }
    
    toggleActivities(nonPauseButtons)

    
    }

    function toggleActivities(nonPauseButtons) {
        nonPauseButtons.forEach(button => button.disabled = isActive)
        isActive = !isActive
        

}



// Leave comments

function displayComment(e) {
    e.preventDefault();
    const commentFormData = new FormData(e.target)
    const commentText = commentFormData.get("comment")
    const comment = document.createElement('p');
    comment.textContent = commentText
    comments.appendChild(comment)
    e.target.reset();
}










