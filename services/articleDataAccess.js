var mongoose = require('mongoose');
var dbSettings = require('../configs/config.js')
var ObjectId = require('mongodb').ObjectId;
var articleItem = mongoose.model('article', { Name: String, Excerpt: String, Content: String, ExternalUrl:String, Newsletter: String, Category: String, Sequence: Number});
var newsletterSchema = mongoose.model('newsletter', { Newsletter: String, Published: Boolean});
mongoose.connect('localhost', 'iVoice');

module.exports = {


  saveNewsletter: function(req) {

    var newsletter = new newsletterSchema();
    newsletter.set('Newsletter', req.body.NewsletterName);
    newsletter.set('Published', false);
    return newsletter.save();
  },

  updateNewsletter: function(newsletter) {
    return newsletterSchema.findOneAndUpdate({Newsletter: newsletter.Newsletter}, {$set:{Newsletter:newsletter.Newsletter, Published: newsletter.Published}}, {new: true, upsert:true});
  },

  getNewsletterByName: function(newsletterName) {
    return newsletterSchema.where('Newsletter').equals('' + newsletterName + '').exec();
  },

  getNewsletterByName2: function(newsletterName) {
    return newsletterSchema.findOne({'Newsletter': '' + newsletterName + ''});
  },

  saveArticle: function(article) {
    return articleItem.findOneAndUpdate({Name: article.OldArticle}, {$set:{Name:article.Name, Category: article.Category, ExternalUrl: article.ExternalUrl, Excerpt:article.Excerpt, Content:article.Content, Newsletter:article.Newsletter, Sequence: article.Sequence}}, {new: true, upsert:true})
  },

  deleteArticle: function(Id) {
    return articleItem.findByIdAndRemove(Id);
  },

  getArticlesByNewsletter: function(newsLetter) {
    return articleItem.where('Newsletter').equals('' + newsLetter + '').sort({Sequence:1}).exec();
  },

  getArticlesByName: function(articleName) {
    return articleItem.where('Name').equals('' + articleName + '').sort({Sequence:1}).exec();
  },

  getAllNewsletters: function(){
    return newsletterSchema.find().distinct('Newsletter').exec();
  },

  getArticleById: function(Id){
    return articleItem.findOne({'_id': '' + Id + ''}).exec();
  },

};
