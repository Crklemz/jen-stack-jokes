console.log('client.js sourced');

$(document).ready(onReady);

function onReady() {
    console.log('DOM ready');

    //click listeners
    $('#addJokeButton').on('click', addJoke);

    getJokes();
}

//funtion to take in data from DOM, send to server, then print new array on DOM
let jokeObject = {};

function addJoke() {
    console.log('in addJoke');
    //get info from DOM
    let who = $('#whoseJokeIn').val();
    let question = $('#questionIn').val();
    let punchline = $('#punchlineIn').val();

    //create object from info gatherd from DOM for transfer to server
    jokeObject.who = who;
    jokeObject.question = question;
    jokeObject.punchline = punchline;
    console.log('showing jokeObject', jokeObject);

    //post to server
    $.ajax({
        method: 'POST',
        url: '/addingjoke',
        data: jokeObject,
    }).then(function (response) {
        console.log(response);
    }).catch(function (error) {
        console.log(error);
        alert('something went wrong with POST')
    }) //end ajax post
    getJokes();
} //end addJoke



// getting the original jokes on the DOM
function getJokes() {
    console.log('in getJokes');
    //ajax get --> goes into server to grab the info and bring it back
    $.ajax({
        method: 'GET',
        url: '/getjokes'
    }).then(function (response) { //happens right after ajax gets us the info
        console.log(response);
        renderDom(response); //loop through info and print to DOM
    }).catch(function (error) { //looking out for errors
        console.log(error);
        alert('something went wrong with GET')
    }) //end ajax get
} //end getJokes


function renderDom(info) {
    console.log('in renderDom');
    //clear DOM so we don't double up the list
    $('#outputDiv').text('');
    //loop through the info we get back and append to the DOM
    for (let i = 0; i < info.length; i++) {
        $('#outputDiv').append(`
            <li>${info[i].whoseJoke}: ${info[i].jokeQuestion} --> ${info[i].punchLine}</li>
        `);
    }
    return;
} // end renderDom