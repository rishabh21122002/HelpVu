
// cee2809654194be3890b51526d106880
console.log("This is my index js file");

// Initialize the news api parameters
let source = 'bbc-news';
let apiKey = 'e817656813c0e3f80b4638b6086ccb8b'

console.log("This is my index js file");



// Grab the news container
let newsAccordion = document.getElementById('newsAccordion');

// Create an ajax get request
const xhr = new XMLHttpRequest();
xhr.open('GET', `http://api.mediastack.com/v1/news?%20sources=bbc&access_key=e817656813c0e3f80b4638b6086ccb8b` , true);

// What to do when response is ready
xhr.onload = function () {
    if (this.status === 200) {
        let json = JSON.parse(this.responseText);
        let data = json.data;
        console.log(data);
        let newsHtml = "";
        data.forEach (function(element, index) {
            console.log(element, index)
            let news = `<div class="accordion" id="newsAccordion">
<div class="accordion-item">
    <h2 class="accordion-header" id="heading${index}">
        <button class="accordion-button collpsed" type="button" data-bs-toggle="collapse"
            data-bs-target="#collapse${index}" aria-expanded="true" aria-controls="collapse${index}">
           <b>BREAKING NEWS ${index+1} </b>  :  ${element["title"]}
        </button>
    </h2>
    <div id="collapse${index}" class="accordion-collapse collapse " aria-labelledby="heading${index}"
        data-bs-parent="#newsAccordion">
        <div class="accordion-body">
           ${element["description"]}. <a href="${element["url"]}" target= "_blank"> Read more here </a>
        </div>
    </div>
</div>




</div>
`;
           
            newsHtml += news;
        });
        newsAccordion.innerHTML = newsHtml;
    }
    else {
        console.log("Some error occured")
    }
}

xhr.send()


