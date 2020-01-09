'use strict';

function displayResults(responseJson) {
  console.log(responseJson);
  const repos = responseJson;
  $('.results-list').empty();
  for (let i = 0; i < repos.length; i++){
    $('.results-list').append(
        `<li><h3>${repos[i].name}</h3>
        <p><a href="${repos[i].html_url}">${repos[i].html_url}</a></p></li>`
    )}; 
  $('.results').removeClass('hidden');
  $('.error').addClass('hidden');
}

function getRepos(username) {
    const url = `https://api.github.com/users/${username}/repos`;
    fetch(url)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(responseJson => displayResults(responseJson))
        .catch(err => {
            //$('.js-error-message').text(`Something went wrong: ${err.message}`);
            $('.error').removeClass('hidden');
            $('.error').text(`Something went wrong: ${err.message}`);
            $('.results-list').empty();
            $('.results').addClass('hidden');
        });
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const username = $('#user').val();
    getRepos(username);
  });
}

$(watchForm);