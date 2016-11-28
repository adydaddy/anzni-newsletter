var bodyParser = require('body-parser')
,articleDA = require('../services/articleDataAccess.js')
,jwt = require('jsonwebtoken')
,authService = require('../services/authenticationService.js')
,fileUpload = require('express-fileupload');



module.exports = {
  registerAppRoutes : function(app){

    app.get('/', function (req, res) {
      res.render('index',
      { title : 'Home' }
      )
    })

    app.get('/newsletter', function(req, res) {
      res.render('newsletter');
    }
  )

  app.get('/newsletter/create', function(req, res) {
      authService.authenticate(req, res, app);
      articleDA.getAllNewsletters().then( newsletterList => {
      res.render('newsletter/create', {newsletters: newsletterList});
      });
    }
  )

  app.get('/newsletter/article/:article', function(req, res) {
    articleDA.getArticlesByName(req.params.article).then( articleList => {
      res.render('newsletter/article', {article : articleList[0]});
      });
    }
  )

  app.post('/newsletter/create', function(req, res) {
    articleDA.saveNewsletter(req).then(function(err, item) {
      res.redirect('/newsletter/articles/create/?NewsletterName=' + req.body.NewsletterName);
  })
  });

app.get('/newsletter/articles/create/', function(req, res) {

  authService.authenticate(req, res, app);
    articleDA.getNewsletterByName(req.param('NewsletterName')).then(newsletter => {
      articleDA.getArticlesByNewsletter(newsletter[0].Newsletter).then( articleList => {
        res.render('newsletter/articles', {Newsletter: newsletter[0], articles: articleList});
      });
    }
  )
}),
  app.post('/upload', function(req, res) {

    	if (!req.files) {
    		return;
    	}

      var	image = req.files.image;

      var target_path = './public/images/' + image.name;
    	image.mv(target_path, function(err) {
    		if (err) {
    			res.status(500).send(err);
    		}
    		else {
          res.send("<script>top.$('.mce-btn.mce-open').parent().find('.mce-textbox').val('" + '/images/' + image.name + "').closest('.mce-window').find('.mce-primary').click();</script>");
    		}
    	});
  })



app.put('/newsletter/article', function(req, res)
{
  authService.authenticate(req, res, app);
  articleDA.saveArticle(req.body).then( () => {
    articleDA.getArticlesByNewsletter(req.body.Newsletter).then( articleList => {
      res.render('newsletter/partials/articleList', {articles : articleList});
    });
  });
})

app.put('/newsletter', function(req, res)
{
  authService.authenticate(req, res, app);
  articleDA.updateNewsletter({Newsletter:req.body.Newsletter, Published: req.body.Published == "on" ? true : false}).then( () => {
      res.status(200).send("ok");
  });
})
app.get('/newsletter/email/:Newsletter', function(req, res)
{
  articleDA.getNewsletterByName2(req.params.Newsletter).then(newsletter => {
    if (!newsletter.Published)
    {
      authService.authenticate(req, res, app);
    }

  articleDA.getArticlesByNewsletter(req.params.Newsletter).then( articleList => {
    res.render('newsletter/email', {articles : articleList, Newsletter: articleList[0].Newsletter});
  })
});
}
),
app.get('/newsletter/:Newsletter', function(req, res)
{
  articleDA.getNewsletterByName2(req.params.Newsletter).then(newsletter => {
    if (!newsletter.Published)
    {
      authService.authenticate(req, res, app);
    }
      articleDA.getArticlesByNewsletter(req.params.Newsletter).then( articleList => {
        res.render('newsletter/allarticles', {articles : articleList, Newsletter:articleList[0].Newsletter});
      });
})
})
},
registerApiRoutes : function(app){

    app.get('/api/newsletter/article/:articleId', function(req, res) {
      authService.authenticate(req, res, app);
      articleDA.getArticleById(req.params.articleId).then( article => {
        res.setHeader('Content-Type', 'application/json');
        res.send(article);
      });
    })

    app.get('/api/newsletter/article/:Newsletter/:Id/remove', function(req, res) {
      authService.authenticate(req, res, app);
        articleDA.deleteArticle(req.params.Id).then( () => {
          articleDA.getArticlesByNewsletter(req.params.Newsletter).then( articleList => {
            res.render('newsletter/partials/articleList', {articles : articleList});
          });
        });
      })

      app.post('/api/authenticate', function(req, res) {
        if (req.body.user == 'Amin' && req.body.pass == "lakhani!234")
        {
            var user = { user: 'Amin'};
            var token = jwt.sign(user, app.get('superSecret'));
            res.cookie('token', token);
            res.redirect('/newsletter/create');
        }
        else {
              res.redirect('/');
            }
        })
  }
}
