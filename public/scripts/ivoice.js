$(function () {

               $.fn.serializeObject = function()
               {
                   var o = {};
                   var a = this.serializeArray();
                   $.each(a, function() {
                       if (o[this.name] !== undefined) {
                           if (!o[this.name].push) {
                               o[this.name] = [o[this.name]];
                           }
                           o[this.name].push(this.value || '');
                       } else {
                           o[this.name] = this.value || '';
                       }
                   });
                   return o;
               };


              $("#articles").on("click", ".editArticleButton", function(evt)
               {
                 evt.preventDefault();
                    var articleId = $(this).attr("data-val-article-id");
                                    $.ajax({
                                        url: "/api/newsletter/article/" + articleId,
                                        type: "Get",
                                        contentType: "application/json",
                                        success: function (data, textStatus, jqXHR) {
                                          $("#Category").val(data.Category);
                                           $("#Name").val(data.Name);
                                           tinyMCE.get('Excerpt').setContent(data.Excerpt);
                                           tinyMCE.get('Content').setContent(data.Content);
                                          $("#_id").val(data._id);
                                           $("#Newsletter").val(data.Newsletter);
                                           $("#ExternalUrl").val(data.ExternalUrl);
                                           $("#Sequence").val(data.Sequence);
                                           $("#OldArticle").val(data.Name);


                                       },
                                        error: function (jqXHR, textStatus, errorThrown) {
                                        }
                                    });
               });

               $("#articles").on("click", ".deleteArticleButton", function(evt)
                {
                  evt.preventDefault();

                     var articleId = $(this).attr("data-val-article-id");
                     var newsletter = $("#Newsletter").val();
                                     $.ajax({
                                         url: "/api/newsletter/article/"+ newsletter + "/" + articleId +'/remove',
                                         type: "get",
                                         contentType: "application/json",
                                         success: function (data, textStatus, jqXHR) {
                                           $("#articles").html(data);
                                           $("#Category").val("");
                                            $("#Name").val("");
                                            $("#ExternalUrl").val("");
                                            $("#Sequence").val("");
                                            tinyMCE.get('Excerpt').setContent("");
                                            tinyMCE.get('Content').setContent("");
                                           $("#_id").val("");
                                        },
                                         error: function (jqXHR, textStatus, errorThrown) {

                                             // likewise do something with your error here.
                                         }
                                     });
                });

                $("#newsletterForm").bind("submit", function(evt) {
                  tinyMCE.triggerSave();

                    $.ajax({
                        url: "/newsletter/",
                        type: "PUT",
                        contentType: "application/json",
                        data: JSON.stringify($("#newsletterForm").serializeObject()),
                        success: function (data, textStatus, jqXHR) {
                       },
                        error: function (jqXHR, textStatus, errorThrown) {
                            // likewise do something with your error here.
                        }
                    });

                    return false;
                });
               $("#articleForm").bind("submit", function(evt) {
                 tinyMCE.triggerSave();

                   $.ajax({
                       url: "/newsletter/article",
                       type: "PUT",
                       contentType: "application/json",
                       data: JSON.stringify($("#articleForm").serializeObject()),
                       success: function (data, textStatus, jqXHR) {
                          $("#articles").html(data);
                          $("#Category").val("");
                           $("#Name").val("");
                           $("#ExternalUrl").val("");
                           $("#Sequence").val("");
                           tinyMCE.get('Excerpt').setContent("");
                           tinyMCE.get('Content').setContent("");
                          $("#_id").val("");
                          $("#OldArticle").val("");

                      },
                       error: function (jqXHR, textStatus, errorThrown) {
                          alert('something went wrong! - see error :' + errorThrown);
                       }
                   });

                   return false;
               });

           });
tinymce.init({ selector:'#Content',plugins: "image link table", relative_urls : false,
remove_script_host : false,
convert_urls : true,  font_formats: 'Arial=arial,helvetica,sans-serif;Courier New=courier new,courier,monospace;AkrutiKndPadmini=Akpdmi-n',  fontsize_formats: '8pt 10pt 12pt 14pt 18pt 24pt 36pt',   file_browser_callback: function(field_name, url, type, win) {
            if(type=='image') $('#my_form input').click();
        }
      });

      tinymce.init({ selector:'#Excerpt',plugins: "image link table", relative_urls : false,
remove_script_host : false,
convert_urls : true,font_formats: 'Arial=arial,helvetica,sans-serif;Courier New=courier new,courier,monospace;AkrutiKndPadmini=Akpdmi-n',  fontsize_formats: '8pt 10pt 12pt 14pt 18pt 24pt 36pt',    file_browser_callback: function(field_name, url, type, win) {
                  if(type=='image') $('#my_form input').click();
              }
            });
