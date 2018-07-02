jQuery(document).ready(function($) {

  //Particles JS
  particlesJS.load('particles-js', 'assets/js/particles.json', function() {
      console.log('callback - particles.js config loaded');
  });

    $('body').on('click', ".save-article-btn", function() {
        const buttonSave = {};
        const articleId = $(this).data("id"); 

        buttonSave.id = articleId
        buttonSave.savedArticle = true;


      $.ajax({
            method: "POST", 
            url: "/articles/" + articleId,
            data: buttonSave
        }).then(function(){
            swal("Hey! ", "You successfully added a new article!", "success");
            renderSavedArticles();

        }).catch(err => {
          console.log(err);

        });
    }); 


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
      const articleId = data[i]['_id'];  
      const title = data[i].title;
      const link = data[i].link;
      const summary = data[i].summary;
      const authorName = data[i].authorName;
      const authorURL = data[i].authorURL;
      const authorImage = data[i].authorImage;
      const date = data[i].date;

      const articleBlock = `
        <div class="col-md-4">
          <div class="scrape-container">
              <div class="scrape-image">
                  <a href="${link}"><img src="assets/images/headerBack.jpg"/></a>
                  <div class="overlay-date">
                      <p>${date}</p>
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
                      <img src="${authorImage}"/>
                      <a href="${authorURL}" ><p>by <span> ${authorName}</span></p></a>
                  </div>
              </div>
              <div class="scrape-favorite main-button">
                  <button class="save-article-btn" data-id="${articleId}" >Save Article</button>
              </div>
          </div>
      </div>
      `
    $("#mediumTitle").append(articleBlock);
    }
  }

    setTimeout(function () {
    $("#scrapeArticle").click(function(){
            event.preventDefault();
            $.get("/scrape").then(function() {
                swal("Success", "The Medium Articles has been added!", "success") 
            .then(() => {
                window.location.reload();

                });         
            });
        });
    }, 1000)


});

