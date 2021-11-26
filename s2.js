movie_list = [];

async function loadData()
{
    
    var movie_name = document.getElementById("myInput").value;
    document.getElementById("sbmt").disabled = true;               // disabling submit button

    /*const response = await fetch("http://itunes.apple.com/search?term=" + movie_name + "&entity=movie"); // searches based on movie name
    const data = await response.json();*/
    
    if (movie_name=='')
    {
        alert("enter the movie title");
    }
    else
    {
        const response = await fetch("http://itunes.apple.com/search?term=" + movie_name + "&entity=movie");       
        const data = await response.json();
      
        movie_list = data;     
        displayMovie();
    }
   
}

// error handling 
/*apiCall()
.catch(error => {
        console.log("error occured while loading the movies file");
       
        console.error(error);
        });*/

var count = 1;

function onClickAdd(event)                                      // event of add button
{
    var myobj = document.getElementById("p2");                  // removing the description once add button is clicked
    myobj.remove();
    let btns = document.getElementById("btn_id");               // add button id
    //let qs = document.querySelector("btn_id");
    

    let div2 = document.createElement('div');                // creating div tag
    let uTag = document.createElement('ul');                 // creating unordered list
    div2.className = "wrapper2";
    uTag.className = "u_class";
   
      
       let ltg = document.createElement('li');
       ltg.className = "l_class";

       /*let x = document.getElementById('btn2');                 // close button in html
       x.style.display = 'block';
       //alert(x);
       document.body.append(x);
       */

       let a = document.createElement('a');                        // creating anchor tag to display movie title and artist name
       a.setAttribute('id', 'a_id');                                 // a_id is the id
       a.className = "watchListItem";
       let close = document.getElementById("close");
       close.innerHTML = 'x';
       a.innerHTML = event.target.parentElement.parentElement.children[1].innerHTML +"  "+ '[' + event.target.parentElement.parentElement.children[2].innerHTML + ']'+""; // inserting the title and artist name
       console.log(a);
       a.href = "movie_list.results[i].longDescription";

       ltg.appendChild(close);
       alert("sadad00");
       ltg.appendChild(a);
       uTag.appendChild(ltg);
       div2.appendChild(uTag);        
       document.body.appendChild(div2);                             // appending the div to the body

                                                                    // adding the mail recommendation button
       count += 1;


    
    //getMailBtn();
}



function getDes()                                                      // watch list description
{

    let Pdiv = document.createElement('div');                            // para
    Pdiv.setAttribute('id', 'para_id');
    let p = document.getElementById('p2');
    para.appendChild(p);
    document.body.append(para);
  

}

function getMailBtn() {                                             // mail recommendation button
    
    let btn = document.createElement("button");
    btn.setAttribute('id', 'mail_id');
    btn.setAttribute('class', 'mail_class'); 
    btn.innerHTML = "Mail Recommendations";
    document.body.appendChild(btn);
    btn.setAttribute("onclick", "sendMail()");                       // click event to send the mail
    alert("Mail sent successfully");
}

function displayMovie()
{
    let len = 10;                                         // displays only 10 movies
    for (let i = 0; i < len; i++)
    {
        console.log(movie_list.results[i]);
        let divTag = document.createElement("div");
        divTag.classList.add("wrapper");                  //class name for div elemeent
        divTag.style.width = "600px";
        divTag.style.height = "180px";
        let ul_list = document.createElement('ul');
        ul_list.setAttribute('class', 'ul_class');           //ul_class
        
        let p1 = document.createElement('li');
        p1.setAttribute('class', 'li_class');                   // li_class

        let img = document.createElement("img");                  // album cover
        img.setAttribute('src', movie_list.results[i].artworkUrl60);
        img.setAttribute('alt', 'Movie album');
        img.setAttribute('height', '50px');
        img.setAttribute('width', '50px');        
        p1.appendChild(img);
        ul_list.appendChild(p1);
              

        let p2 = document.createElement("li");                        // movie title
        let mve_title = movie_list.results[i].trackName;
        p2.innerHTML = "<b>"+mve_title+"<b>";
        ul_list.appendChild(p2);

        let p3 = document.createElement("li");
        let artistName = "<b>"+movie_list.results[i].artistName+"<b>"    //artist name
        p3.innerHTML = artistName;
        ul_list.appendChild(p3);

        let p4 = document.createElement("li");
        let btn = document.createElement("button");                       // add button
        btn.setAttribute('id', 'btn_id');
        btn.setAttribute('class', 'btn_class'); 
        btn.innerHTML = "ADD";
        btn.setAttribute("onclick", "onClickAdd(event)");                 // onclick event
        p4.appendChild(btn);
        ul_list.appendChild(p4);

        let p5 = document.createElement("li");
        var a = document.createElement('a');                             //  anchor tag for read more
        a.setAttribute("class", "a_class");
        var link = document.createTextNode("Read more");       
        a.appendChild(link);
        a.href = "movie_list.results[i].longDescription";
        p5.appendChild(a);
        ul_list.appendChild(p5);   
      
        divTag.appendChild(ul_list);
        console.log(divTag);
        
        let x=document.body.appendChild(divTag);                           // appending the elements to the body
        console.log("final",x);       

    }

}
//sendMail();
function sendMail() {
    fetch('http://vimgrep.com/mail/sendmail.php', {
        method:'POST',

        body: JSON.stringify(

            {
                "recipient": "hemadharmala8978@gmail.com",

                "subject": "movie watchList",

                "body": "Hello",

                "key": "UOL"
            }

        )

    })
        .then(response => response.json())

        .then(data => console.log(data))
}


 



