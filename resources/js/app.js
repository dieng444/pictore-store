$(document).ready(function(){
  $("#album-form").hide();
  $("#btn-add-album").click(function(){
    $("#album-form").fadeToggle("fast","linear");
    //$("#album-form").css("display","flex");
  });
  $("#icone-menu").click(function() {
    $("#navigations").fadeToggle("slow","linear");
  });
  /**
	 * Function permettant de gérer les formulaires
	 * @param form : le formulaire à valider
	 */
	function validateForm(form)
	{
		$(form).submit(function(event){
			var isErrorTrigger = false;
			$('.form-child').each(function(){
				if(($(this).attr('type')=="text" || $(this).get(0).nodeName=="TEXTAREA"
					|| $(this).attr('type')=="password" || $(this).get(0).nodeName=="SELECT")
					&& $(this).val()=="")
				{
					$(this).next().show();
					isErrorTrigger = true;
				}
				else if($(this).val()!="")
				{
					$(this).next().hide();
				}

			});
			if(isErrorTrigger)
			{
				event.preventDefault();
			}
		});
	}
	/*****Appel aux functions*****/
	validateForm("#login-form");
	validateForm("#signup-form");
	validateForm("#album-form");
});
