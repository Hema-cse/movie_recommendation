var movie_list = [];    // stores the list of movies based on search key
var final_movies = []; // holds the list of final movies

async function loadData()
{

    var movie_name = document.getElementById("myInput").value;  // stores the value entered in textbox

    if (movie_name=='')
    {
        alert("enter the movie title");
    }
   else
    {
        
        const response = await fetch("http://itunes.apple.com/search?term=" + movie_name + "&entity=movie");  // fetching the data       
        const data = await response.json();
        document.getElementById("loading").style.display = "none";
        movie_list = data;  // storing the list of movies 
        displayMovie();
    }
   
}

var desc = document.getElementById("p2");                  // removing the description once add button is clicked
desc.remove();

function onClickAdd(event)                                      // event of add button
{

    
    const value = event.target.parentElement.parentElement.children[1].innerText;   // returns the movie title
    let found = final_movies.indexOf(value) >= 0;              // returns true if movie alredy exists in final_movies
   
    if (final_movies.length >= 5 || found)              // checks to add movies in the watch list
    {                 
        let msg = "";
        if (found)
        {
            alert("movie already added in watchlist");      
        }
        else
        {
            alert("only 5 movies can be added");
        }
        return;
    }

    
        let div2 = document.createElement('div');                // creating div tag
        let uTag = document.createElement('ul');                 // creating unordered list
        div2.className = "wrapper2";
        uTag.className = "u_class";
      
        let ltg = document.createElement('li');
        ltg.className = "l_class";
        let a = document.createElement('a');                        // creating anchor tag to display movie title and artist name
        a.setAttribute('id', 'a_id');                                 // a_id is the id
        a.className = "watchListItem";
        a.innerHTML = event.target.parentElement.parentElement.children[1].innerHTML + "  " + '[' + event.target.parentElement.parentElement.children[2].innerHTML + ']' + ""; // inserting the title and artist name
        a.href = movie_list.results.trackViewUrl;

        let span = document.createElement('span');
        span.innerHTML = 'x';                                       // close button
        span.setAttribute('id', "close");

        span.onclick = (event) => {
            const value = event.target.parentElement.innerText.slice(1, event.target.parentElement.innerText.indexOf("[") - 1); // returns movie name
            final_movies = final_movies.filter((mve) => {
            let exists = mve != value;              
            return exists;
            })       
            event.target.parentElement.style.display = "none";

        };
        
        final_movies.push(event.target.parentElement.parentElement.children[1].innerText); // pushing the movie titles in final list
       
       ltg.appendChild(span);
       ltg.appendChild(a);
       uTag.appendChild(ltg);
       div2.appendChild(uTag);        
       document.body.appendChild(div2);                      // appending the div to the body
                                                                   
    if (final_movies.length == 1)
    {
        getMailBtn();                                       // adding the mail recommendation button

    }                                                            
             
}

function getMailBtn()                                       
{                                             
    
    let btn = document.createElement("button");                  // mail recommendation button
    btn.setAttribute('id', 'mail_id');
    btn.setAttribute('class', 'mail_class');
    btn.setAttribute("onclick", "sendMail()");                  // click event to send the mail
    btn.innerHTML = "Mail Recommendations";
    document.body.appendChild(btn);

}

 function displayMovie()
{
     let len = movie_list.results.length;                        // displays only 10 movies
     for (let i = 0; i < len && i<10; i++)
    {
        let divTag = document.createElement("div");
        divTag.classList.add("wrapper");                        //class name for div elemeent
        let ul_list = document.createElement('ul');
        ul_list.setAttribute('class', 'ul_class');              //ul_class
        
        let p1 = document.createElement('li');
        p1.setAttribute('class', 'li_class');                   // li_class

        let img = document.createElement("img");                  // album cover
        img.src = movie_list.results[i].artworkUrl60 ;
        img.setAttribute('alt', 'Movie album');
        img.setAttribute('height', '50px');
        img.setAttribute('width', '50px');        
        p1.appendChild(img);
        ul_list.appendChild(p1);
              

        let p2 = document.createElement("li");                        // movie title
        let mve_title =  movie_list.results[i].trackName;
        p2.innerHTML = "<b>"+mve_title+"<b>";
        ul_list.appendChild(p2);

        let p3 = document.createElement("li");
        let artistName =  movie_list.results[i].artistName           //artist name
        p3.innerHTML = artistName;
        ul_list.appendChild(p3);

        let p4 = document.createElement("li");
        let btn = document.createElement("button");                   // add button
        btn.setAttribute('id', 'btn_id');
        btn.setAttribute('class', 'btn_class'); 
        btn.innerHTML = "ADD";
        btn.setAttribute("onclick", "onClickAdd(event)");             // onclick event
        p4.appendChild(btn);
        ul_list.appendChild(p4);

        let p5 = document.createElement("li");
        var a = document.createElement('a');                             //  anchor tag for read more
        a.setAttribute("class", "a_class");
        a.innerHTML="Read more";
        
        a.href = movie_list.results[i].trackViewUrl;
        p5.appendChild(a);
        ul_list.appendChild(p5);   
      
        divTag.appendChild(ul_list);
        
        document.body.appendChild(divTag);                    // appending the elements to the body    

    }

}

function sendMail()                                              //sendMail()
{
    fetch('http://vimgrep.com/mail/sendmail.php',
        {
             method: 'POST',

            body: JSON.stringify
                ({

                    "recipient": "hemadharmala8978@gmail.com",

                    "subject": "movie watchList",

                    "body": final_movies,

                    "key": "UOL"
                })

        })
        .then(response => response.json())
        .then(data => console.log(data))
        .then((check) => {
                alert("mail sent successfully");
            });
}