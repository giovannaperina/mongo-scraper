jQuery(document).ready(function($) {

  //Particles JS
  particlesJS.load('particles-js', 'assets/js/particles.json', function() {
      console.log('callback - particles.js config loaded');
  });
    // Save Article
    $('body').on('click', ".save-article-btn", function(e) {
        const buttonSave = {};
        const mongoId = e.target.dataset.id;
  
        buttonSave.id = mongoId
        buttonSave.savedArticle = true;


      $.ajax({
            method: "POST", 
            url: "/articles/" + mongoId,
            data: buttonSave
        }).then(function(){
            swal("Hey! ", "You successfully added a new article!", "success");

        }).catch(err => {
          console.log(err);

        });
    }); 
    // Delete article
    $('body').on('click', ".remove-article-btn", function(e) {
        const buttonSave = {};
        const mongoId = e.target.dataset.id;
  
        buttonSave.id = mongoId
        buttonSave.savedArticle = true;


      $.ajax({
            method: "POST", 
            url: "/articles/delete/" + mongoId,
            data: buttonSave
        }).then(function(){
            swal("Hey! ", "You successfully removed the article!", "success")
            .then(function(){
                window.location.reload();
            }) 
        }).catch(err => {
          console.log(err);

        });
    }); 

    $.ajax({ 

        url: "/articles/saved",
        method: "GET",
        error: function(){
          console.log("error");
        },
        success: (data) => {
            renderSavedArticles(data);
        } 
      })

    const renderSavedArticles = (data) => {
        console.log(data)
        for(let i = 0; i < data.length; i++) {
          const mongoId = data[i]['_id'];  
          const title = data[i].title;
          const articleUrl = data[i].articleUrl;
          const summary = data[i].summary;
          const authorName = data[i].authorName
          const authorUrl = data[i].authorUrl;
          const authorAvatar = data[i].authorAvatar;
          const articleDate = moment(data[i].articleDate).format('MMMM Do');
          const articleImage = data[i].articleImage;
    
          const articleBlock = `
            <div class="col-md-4 article-item">
              <div class="scrape-container">
                  <div class="scrape-image">
                      <a href="${articleUrl}"><img src="${articleImage ? articleImage : 'http://placehold.it/300x250'}"/></a>
                      <div class="overlay-date">
                          <p>${articleDate}</p>
                      </div>
                  </div>
                  <div class="scrape-information">
                      <div class="scrape-title">
                          <h5>${title}</h5>
                      </div>
                      <div class="scrape-description">
                          <p>${summary}</p>
                      </div>
                      <div class="scrape-author">
                          <img src="${authorAvatar ? authorAvatar : '../images/user.png'}"/>
                          <a href="${authorUrl}" ><p>by <span> ${authorName}</span></p></a>
                      </div>
                  </div>
                  <div class="scrape-favorite main-button">
                        <button type="button" data-toggle="modal" class="main-button  pull-left" data-target="#myModal">Article Notes</button>
                        <button class="remove-article-btn" data-id="${mongoId}" >Remove Article</button>        
                  </div>
              </div>
          </div>
          `
        $("#savedArticles").append(articleBlock);
        }
      }
    // Home Page
    $.ajax({ 

      url: "/articles",
      method: "GET",
      error: function(){
        console.log("error");
      },
      success: (data) => {
        renderArticles(data);
      } 
    })

  const renderArticles = (data) => {
    console.log(data)
    for(let i = 0; i < data.length; i++) {
      const mongoId = data[i]['_id'];  
      const title = data[i].title;
      const articleUrl = data[i].articleUrl;
      const summary = data[i].summary;
      const authorName = data[i].authorName
      const authorUrl = data[i].authorUrl;
      const authorAvatar = data[i].authorAvatar;
      const articleDate = moment(data[i].articleDate).format('MMMM Do')
      const articleImage = data[i].articleImage;

      const articleBlock = `
        <div class="col-md-4 article-item">
          <div class="scrape-container">
              <div class="scrape-image">
                  <a href="${articleUrl}"><img src="${articleImage ? articleImage : 'http://placehold.it/300x250'}"/></a>
                  <div class="overlay-date">
                      <p>${articleDate}</p>
                  </div>
              </div>
              <div class="scrape-information">
                  <div class="scrape-title">
                      <h5>${title}</h5>
                  </div>
                  <div class="scrape-description">
                      <p>${summary}</p>
                  </div>
                  <div class="scrape-author">
                      <img src="${authorAvatar ? authorAvatar : '../images/user.png'}"/>
                      <a href="${authorUrl}" ><p>by <span> ${authorName}</span></p></a>
                  </div>
              </div>
              <div class="scrape-favorite main-button">
                  <button class="save-article-btn" data-id="${mongoId}" >Save Article</button>
              </div>
          </div>
      </div>
      `
    $("#mediumTitle").append(articleBlock);
    }
  }

    $("#scrapeArticle").click(function(e){
        e.preventDefault();
        $.get("/scrape").then(function(res) {
            swal("Success", "The Medium Articles has been added!", "success") 
            .then(() => {
                window.location.reload();
            });         
        });
     });
});

